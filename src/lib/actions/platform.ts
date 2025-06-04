"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { SocialLink } from "@/types";
import { auth } from "../auth";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function addPlatforms(data: { socialLinks: SocialLink[] }) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return {
        error: "User not logged in",
        success: false,
      };
    }

    const [result] = await db
      .update(users)
      .set({
        socialLinks: data.socialLinks,
      })
      .where(eq(users.id, session.user.id));

    if (result.affectedRows === 0) {
      return {
        error: `Error adding user links`,
        success: false,
      };
    }

    revalidatePath("/");
    return {
      success: true,
      message: `Successfully added ${result.affectedRows} social media links`,
    };
  } catch (error: unknown) {
    console.error("Server action error:", error);
    let errMessage: string = "An error occurred during user creation/update";
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === "ER_DUP_ENTRY"
    )
      errMessage = "The email is already registered to another user";
    return {
      success: false,
      error: errMessage,
    };
  }
}
