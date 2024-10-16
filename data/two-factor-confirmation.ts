"use server";
import { db } from "@/lib/db";
export const getTwoFactorConfrimationById = async (userId: string) => {
  try {
    const twoFactorCofirmation = await db.twoFactorCofirmation.findUnique({
      where: { userId },
    });
    return twoFactorCofirmation;
  } catch {
    return null;
  }
};
