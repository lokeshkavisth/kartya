import { z } from "zod";
import { passwordRegex, reservedUsernames, usernameRegex } from "./constants";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be 8 characters long.")
    .max(60, "Passwod cannot exceed 60 characters.")
    .regex(
      passwordRegex,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character (@._-+!*#$=%?), and cannot contain spaces."
    ),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(63, "Username cannot exceed 63 characters.")
    .regex(
      usernameRegex,
      "Username can only contain letters, numbers and hyphens. It must start and end with a letter or number."
    )
    .refine(
      (val) => !val.includes("__"),
      "Username cannot contain consecutive hyphens."
    )
    .refine(
      (val) => !reservedUsernames.includes(val.toLowerCase()),
      "This username is reserved and cannot be used."
    )
    .refine((val) => !/^\d+$/.test(val), "Username cannot be only numbers.")
    .transform((val) => val.toLowerCase()),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInFormData = z.infer<typeof signinSchema>;
export type SignUpFormData = z.infer<typeof signupSchema>;
