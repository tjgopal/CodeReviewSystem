"use server";
import bcrypt from "bcrypt";

import { getuserByEmail, getuserById } from "@/data/user";
import { currentData } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";

import { z } from "zod";
import { NewVerification } from "./new-verification";
import { sendEmailVerification } from "@/lib/mail";
import { TokenVerified } from "@/lib/token";

export const SettingsServerActions = async (
  values: z.infer<typeof SettingsSchema>
) => {
  const user = await currentData();
  if (!user) {
    return { error: "unauthorizes" };
  }
  const dbuser = await getuserById(user.id);
  if (!dbuser) {
    return { error: "unauthorized" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newpassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existinguser = await getuserByEmail(values.email);
    if (existinguser?.email && existinguser.id) {
      return { error: "User Already Present" };
    }
    const verifcationtoken = await TokenVerified(values.email);
    await sendEmailVerification(verifcationtoken.email, verifcationtoken.token);
    return { succes: "Sucessfully email sent " };
  }
  if (values.password && values.newpassword && dbuser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbuser.password
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newpassword, 10);

    values.password = hashedPassword;
    values.newpassword = undefined;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });
  return { sucess: "settings updated!" };
};
// params users z checking
// check user currentUser  ! auntroized
// dbuser userbyId user.id
//check error authorized
// db updated ->user with id with vlaues
//return
