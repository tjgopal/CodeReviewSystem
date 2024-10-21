import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
export type ExtendedUSer = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUSer;
  }
}
