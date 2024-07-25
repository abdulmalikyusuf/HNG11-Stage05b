import { z } from "zod";

export const LinkSchema = z.object({
  userLinks: z.array(
    z.object({
      platform: z.enum([
        "github",
        "codewars",
        "linkedIn",
        "devTo",
        "freeCodeCamp",
        "youtube",
      ]),
      link: z.string().url("Invalid url format"),
    })
  ),
});

export const profileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("Provide email"),
});
export const signInSchema = z.object({
  email: z.string().email("Provide email"),
  password: z.string().min(1, "Invalid"),
});
export const signUpSchema = z
  .object({
    email: z.string().email("Provide email"),
    password: z.string().min(8, {
      message: "Too short",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
