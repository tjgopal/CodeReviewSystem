// getAccountByUserId async  userid
// try catch find user id
//return  account

import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });
    return account;
  } catch {
    return null;
  }
};
