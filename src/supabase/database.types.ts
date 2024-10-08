import { MergeDeep } from "type-fest";
import { z } from "zod";
import { Platforms as PlatformsType } from "@/lib/schema";
import { Database as DatabaseGenerated } from "./database-generated.types";

type Platforms = z.infer<typeof PlatformsType>;
// Override the type for a specific column in a view:
export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        profile: {
          Row: {
            links: [{ link: string; platform: Platforms }] | null;
          };
        };
      };
    };
  }
>;
export type ProfileRow = MergeDeep<
  DatabaseGenerated["public"]["Tables"]["profile"]["Row"],
  {}
>;
