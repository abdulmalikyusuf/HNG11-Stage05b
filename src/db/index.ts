import type { Logger as drizzleLogger } from "drizzle-orm/logger";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

import * as schema from "./schema";
import { env } from "@/env.mjs";
import { logger } from "@/lib/logger";

const DB_ERRORS = {
  DUPLICATE_KEY: "ER_DUP_ENTRY",
};

export interface DatabaseError {
  type: string;
  message: string;
  stack?: string;
  code: string;
  errno: number;
  sql: string;
  sqlState: string;
  sqlMessage: string;
}

class DBLogger implements drizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    logger.debug({ query, params });
  }
}

const poolConnection = mysql.createPool(env.DATABASE_URL);

const db = drizzle({
  client: poolConnection,
  casing: "snake_case",
  schema: schema,
  mode: "default",
  logger: new DBLogger(),
});
export { DB_ERRORS, poolConnection, db };

const data = {
  password: "password",
  email: "example@mail.com",
  firstName: "Example",
  lastName: "DevLinks",
} satisfies schema.InsertUser;

export async function createNewProfile(info: schema.InsertUser = { ...data }) {
  const saltRounds = 10;
  const password = await bcrypt.hash(info.password, saltRounds);
  try {
    const profile = await db.insert(schema.users).values({ ...info, password });

    const profileId = profile[0].insertId;

    if (!profile) {
      throw new Error(`Profile with Id ${profileId} not found.`);
    }

    console.log(`Password updated successfully for profile Id: ${profileId}`);
    return profile;
  } catch (error) {
    console.error("Error updating the password:", error);
    throw error;
  }
}
// (async () => {
//   try {
//     await createNewProfile();
//     console.log("Password updated successfully.");
//   } catch (error) {
//     console.error("Failed to update password:", error);
//   }
// })();
