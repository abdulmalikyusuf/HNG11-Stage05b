"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { users } from "@/db/schema";
import { db } from "@/db";
import { type SignUpSchema } from "../schema";

export async function signUp(data: SignUpSchema) {
  try {
    const { email, password } = data;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const [result] = await db.insert(users).values({ email, password: hash });

    const insertedId = result.insertId as unknown as string;

    const insertedUser = await db
      .select()
      .from(users)
      .where(eq(users.id, insertedId))
      .then((rows) => rows[0]);

    return {
      success: true,
      message: `Successfully added ${insertedUser.firstName}`,
    };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error.errors);
      return { success: false, error: error.errors[0].message };
    } else {
      const mysqlError = error as { cause: { code: string } };
      console.error("Server action error:", mysqlError.cause.code);
      let errMessage: string = "An error occurred during user registration";
      if (mysqlError.cause.code === "ER_DUP_ENTRY")
        errMessage = "The email is already registered to another user";
      return {
        success: false,
        error: errMessage,
      };
    }
  }
}
