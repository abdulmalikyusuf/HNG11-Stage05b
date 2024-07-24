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
      ]),
      link: z.string().url("Invalid url format"),
    })
  ),
});
