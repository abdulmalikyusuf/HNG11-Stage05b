import { JWT as NextAuthJWT } from "next-auth/jwt";

// Extend User Type Directly Here
declare module "next-auth" {
  interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    avatar: string | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    user: User;
  }
}
