"use client";
import { useSession } from "next-auth/react";

export const UseCurrentUSer = () => {
  const session = useSession();
  return session.data?.user;
};
