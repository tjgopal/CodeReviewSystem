"use server";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/VertificationToken";
import { db } from "@/lib/db";
import { PasswrodResetTokenByEmail } from "@/data/PasswordResetToken";
import { getuserByEmail } from "@/data/user";
import { error } from "console";
import { getTwoFactorByEmail } from "@/data/two-factor-token";

// crypto cypto
//tokenbyemail
//generatetwofactor token ->email
// check if present tokenbyemail
//token delete

export const genrateTwoFactor = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const exisitingUser = await getTwoFactorByEmail(email);
  if (exisitingUser) {
    await db.twoFactorToken.delete({
      where: {
        id: exisitingUser.id,
      },
    });
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  console.log(twoFactorToken);
  return twoFactorToken;
};

export const generatePasswordByToken = async (email: string) => {
  //generating a new pasword
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const exisitingtoken = await PasswrodResetTokenByEmail(email); // checking if data is present inor not
  if (exisitingtoken) {
    await db.passwordRestToken.delete({
      // deleting if the data is present
      where: { id: exisitingtoken.id },
    });
  }
  const passwordgeneratetoken = await db.passwordRestToken.create({
    // creating a new token if it is present
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordgeneratetoken;
};

export const TokenVerified = async (email: string) => {
  //generateverificationtoken
  const token = uuidv4();
  const expiry = new Date(new Date().getTime() + 3600 * 1000);
  const existingtoken = await getVerificationTokenByEmail(email);
  console.log("emailverified", existingtoken);
  if (existingtoken) {
    await db.verificationToken.delete({
      where: {
        id: existingtoken.id,
      },
    });
  }

  // console.log("userData",userData)
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expiry,
    },
  });
  console.log("User created:", verificationToken);
  return verificationToken;
};
