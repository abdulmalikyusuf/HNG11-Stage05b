import { z } from "zod";

const required_error = "This field cannot be empty";
export const FileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  lastModified: z.number(), // Or z.date() if you want a Date object
  // Add other properties if needed (e.g., path for server-side processing)
});

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string().max(256, "Title must be at most 256 characters long"),
  email: z.string().email().nonempty(),
  password: z
    .string({
      required_error,
    })
    .trim()
    .min(1, { message: "Password confirmation is required" }),
  password_confirmation: z
    .string({
      required_error,
    })
    .trim()
    .min(1, { message: "Password confirmation is required" }),
  avatar: z
    .string()
    .max(1024, "Avatar image URL must be at most 1024 characters long")
    .url("Avatar image must be a valid URL")
    .optional(), // Ensures a valid URL
});

userSchema.refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

const StringId = z.object({ id: z.string(), authorId: z.string() });

export const FormDataSchema = userSchema.merge(StringId);
