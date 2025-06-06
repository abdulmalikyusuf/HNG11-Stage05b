import { z } from "zod";

export const typeOfPlatform = [
  "github",
  "codewars",
  "linkedin",
  "devTo",
  "freeCodeCamp",
  "youtube",
  "twitter",
  "twitch",
  "frontendMentor",
  "hashnode",
  "stackOverflow",
  "codepen",
] as const;

export const TypeOfPlatform = z.enum(typeOfPlatform);
export type PlatformTypes = (typeof typeOfPlatform)[number];

export const LinkSchema = z.object({
  socialLinks: z.array(
    z.object({
      platform: TypeOfPlatform,
      url: z.string().url("Invalid url format"),
    })
  ),
});

export const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name here"),
  lastName: z.string().min(1, "Last name here"),
  email: z.string().email("Provide email"),
});

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const imageSchema = z
  .any()
  .refine((file) => {
    if (file.size === 0 || file.name === undefined) return false;
    else return true;
  }, "Please update or add new image.")

  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    ".jpg, .jpeg, .png and .webp files are accepted."
  )
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`);

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Provide email",
    })
    .email("Invalid email"),
  password: z.string().min(1, "Too short"),
});
// VALIDATE THE IMAGE
// const validatedFields = imageSchema.safeParse({
//   image: data.image,
// });
export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: "Provide email",
      })
      .email("Invalid email"),
    password: z.string().min(8, {
      message: "Too short",
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
