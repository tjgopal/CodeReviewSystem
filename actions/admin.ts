"use server";
import { UseCurrentUSer } from "@/hooks/use-current-user";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { error } from "console";

export const admin = async () => {
  const role = await currentRole();
  if (role == UserRole.ADMIN) {
    return { error: "Allowed User" };
  } else {
    return { success: "Forbidden User" };
  }
};
