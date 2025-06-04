import type { Logger as drizzleLogger } from "drizzle-orm/logger";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

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
