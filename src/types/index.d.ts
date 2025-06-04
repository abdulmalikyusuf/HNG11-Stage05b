import { z } from "zod";

type Platforms = z.infer<typeof PlatformsType>;
type SocialLink = { url: string; platform: Platforms };

type PlatformWithLabelAndIcon = {
  label: string;
  value: Platforms;
  icon: JSX.Element;
};

export type State =
  | { errors: { name?: string[] | undefined }; message?: undefined }
  | { message: string; errors?: undefined | null }
  | {
      data: {
        name: string;
        id: string | null;
      };
    };
