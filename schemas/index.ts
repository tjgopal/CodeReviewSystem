import { UserRole } from "@prisma/client";
import * as z from "zod";

export const codeSchema = z.object({
  code: z
    .string()
    .min(1, { message: "Code cannot be empty" }) // Ensure code isn't empty
    .max(5000, { message: "Code exceeds maximum length" }), // Optional max length
  question: z
    .string()
    .min(1, { message: "Question cannot be empty" }) // Ensure question isn't empty
    .max(500, { message: "Question is too long" }), // Optional max length for questions
});

export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newpassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newpassword) {
        return false;
      }
      if (data.newpassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "New password requrired",
      path: ["newpassword"],
    }
  );

//for settings pagees change or user

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "minimum 6 digit password",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Pasword required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimmum 6 digit required",
  }),
  name: z.string().min(1, {
    message: "name required",
  }),
});
