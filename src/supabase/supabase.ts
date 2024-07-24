import { createClient } from "@supabase/supabase-js";
import { auth } from "@/lib/auth";
import { env } from "@/env.mjs";

// Use `useSession()` or `unstable_getServerSession()` to get the NextAuth session.

const session = await auth();
const { supabaseAccessToken } = session;

// Create a single supabase client for interacting with your database
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
  global: {
    headers: {
      Authorization: `Bearer ${supabaseAccessToken}`,
    },
  },
});
// Now you can query with RLS enabled.
const { data, error } = await supabase.from("users").select("*");
