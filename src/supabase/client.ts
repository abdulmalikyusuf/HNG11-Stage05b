import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/supabase/database.types";
import { env } from "@/env.mjs";

export function createClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_KEY!
  );
}
