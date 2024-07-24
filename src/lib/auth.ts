import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";

import { env } from "@/env.mjs";
// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/core/types#authconfig
export const { handlers, auth, signIn, signOut } = NextAuth({
  // https://authjs.dev/getting-started/authentication/oauth
  providers: [],
  adapter: SupabaseAdapter({
    url: env.SUPABASE_URL,
    secret: env.SUPABASE_KEY,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },
});
