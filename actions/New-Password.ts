"use server";
import { getuserByEmail } from "@/data/user";

import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { PasswrodResetTokenByToken } from "@/data/PasswordResetToken";

export const NewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return null;
  }
  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields) {
    return { error: "invalid field" };
  }
  const { password } = validateFields.data;

  const exsistingtoken = await PasswrodResetTokenByToken(token);
  console.log("token", exsistingtoken);
  if (!exsistingtoken) {
    return { error: "invalid token" };
  }
  const tokenexpired = new Date(exsistingtoken.expires) < new Date();
  if (tokenexpired) {
    return { error: "token expired" };
  }
  const exsistinguser = await getuserByEmail(exsistingtoken.email);
  if (!exsistinguser) {
    return { error: "Invalid user" };
  }
  console.log(exsistingtoken.id);
  const hashpassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: exsistinguser.id },
    data: { password: hashpassword },
  });
  await db.passwordRestToken.delete({
    where: { id: exsistingtoken.id },
  });
  return { success: "Password Updated succesfully" };
};

// validate the safeparse check
//check token is present or not
// check if its expired or not
//check email exsists or not
// check if
