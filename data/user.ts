"use server";
import { db } from "@/lib/db";

export const getuserByEmail = async (email: string) => {
  try {
    // console.log("Email being queried:", email);
    const user = await db.user.findUnique({
      where: {
        email, // hard-coded, you can replace with your email variable
      },
    });
    // console.log("User fetched:", user);

    if (!user) {
      // console.log("No user found with this email.");
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error in fetching user:", error); // Log full error details
    return null;
  }
};

export const getuserById = async (id: string) => {
  try {
    const user = db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
