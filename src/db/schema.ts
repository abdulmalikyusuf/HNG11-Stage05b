import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  json,
} from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

import { type PlatformTypes } from "@/lib/schema";

export const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const users = mysqlTable(
  "devLinks_users",
  {
    id: varchar({ length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    firstName: varchar({ length: 256 }),
    lastName: varchar({ length: 256 }),
    email: varchar({ length: 256 }).notNull().unique(),
    avatar: varchar({ length: 1024 }),
    password: varchar({ length: 1024 }).notNull(),
    socialLinks: json()
      .$type<{ url: string; platform: PlatformTypes }[]>()
      .default([
        {
          platform: "github",
          url: "https://www.github.com/johnappleseed",
        },
      ]),
    ...timestamps,
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)]
);

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
