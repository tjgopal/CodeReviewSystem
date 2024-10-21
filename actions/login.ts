"use server";
import * as z from "zod";
import { loginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getuserByEmail } from "@/data/user";
import { genrateTwoFactor, TokenVerified } from "@/lib/token";
import { sendEmailVerification, twoFactorToken } from "@/lib/mail";
import { getTwoFactorByEmail } from "@/data/two-factor-token"; //twofactorbyemail
import { error } from "console";
import { getTwoFactorConfrimationById } from "@/data/two-factor-confirmation";
import { db } from "@/lib/db";

export const login = async (value: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: "invalid login", success: null };
  }
  console.log("validate data", validateFields.data);
  const { email, password, code } = validateFields.data;
  console.log({ email, password, code });
  const exsistinguser = await getuserByEmail(email);
  if (!exsistinguser || !exsistinguser.email || !exsistinguser.password) {
    return { error: "User not found  ", success: null };
  }
  const passwordMatch = await bcrypt.compare(password, exsistinguser.password);
  if (!passwordMatch) {
    return { error: "Invalid password", success: null }; // Incorrect password
  }
  console.log(exsistinguser.emailVerified);
  if (!exsistinguser.emailVerified) {
    const verifiedtoken = await TokenVerified(exsistinguser.email);
    await sendEmailVerification(verifiedtoken.email, verifiedtoken.token);
    return { success: "email verification sent", error: null };
  }
  if (exsistinguser.isTwoFactorEnabled && exsistinguser.email) {
    console.log({ code });
    if (code) {
      //verfiy code
      //checkign of the code with the database
      // check if the token exsists or not
      // check if its same or not
      // check if its expired or not
      const twofactortoken = await getTwoFactorByEmail(exsistinguser.email);
      if (!twofactortoken) {
        return { error: "Invalid code", success: null };
      }
      if (twofactortoken.token !== code) {
        return { error: "Invalid code", success: null };
      }
      const hasExipred = new Date(twofactortoken.expires) < new Date();
      if (hasExipred) {
        return { error: "Code expired", success: null };
      }
      await db.twoFactorToken.delete({
        where: { id: twofactortoken.id },
      });
      const existingconfirmation = await getTwoFactorConfrimationById(
        exsistinguser.id
      );
      if (existingconfirmation) {
        await db.twoFactorCofirmation.delete({
          where: { id: existingconfirmation.id },
        });
      }
      await db.twoFactorCofirmation.create({
        data: {
          userId: exsistinguser.id,
        },
      });
    } else {
      const twofactor = await genrateTwoFactor(exsistinguser.email);
      await twoFactorToken(twofactor.email, twofactor.token);
      return { twofactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Inavlid credentials", success: null };
        default:
          return { error: "something went wrong ", success: null };
      }
    }
    throw error;
  }
  console.log("success:login successfull");
  return { success: "Login successful", error: null };
};
