import { z } from "zod";
import { LinkSchema, Platforms as PlatformsType } from "@/lib/schema";

type Platforms = z.infer<typeof PlatformsType>;
type Link = { link: string; platform: Platforms };

type PlatformWithLabelAndIcon = {
  label: string;
  value: Platforms;
  icon: JSX.Element;
};
