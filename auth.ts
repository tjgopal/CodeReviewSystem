import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getuserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { twoFactorToken } from "./lib/mail";
import { getTwoFactorConfrimationById } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/accounts";
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      try {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      console.log("provider", account.provider);
      const exsistingUser = await getuserById(user.id);
      if (!exsistingUser?.emailVerified) return false;
      console.log("userlogged in");
      if (exsistingUser.isTwoFactorEnabled) {
        const twofactor = await getTwoFactorConfrimationById(exsistingUser.id);
        console.log({ twofactor });
        if (!twofactor) {
          return false;
        }
        //delete the twofactor for next user
        await db.twoFactorCofirmation.delete({
          where: {
            id: twofactor.id,
          },
        });
      }
      return true;
    },
    async session({ token, session }) {
      console.log({
        sessiontoken: token,
      });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      console.log("i am beign called here");
      if (!token.sub) return token;

      const existinguser = await getuserById(token.sub);

      if (!existinguser) return token;
      const exsistingAccount = await getAccountByUserId(existinguser.id);
      token.isOAuth == !!exsistingAccount;
      token.email = existinguser.email;
      token.name = existinguser.name;
      token.role = existinguser.role;
      token.isTwoFactorEnabled = existinguser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

// checking try catch blocak near update emial verified
