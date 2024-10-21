import { auth } from "@/auth";

export const currentData = async () => {
  const session = await auth();
  return session?.user;
};

//server side using auth

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
