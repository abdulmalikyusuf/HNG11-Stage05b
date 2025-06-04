"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { users } from "@/db/schema";
import { db } from "@/db";
import { fileToURI } from "../utils";
import { uploadToCloudinary } from "../cloudinary";
import { signIn } from "../auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    const authError = error as { type: string };
    if (authError.type) {
      switch (authError.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    if (error instanceof Error) {
      return error.message;
    }
    throw error;
  }
}

export async function uploadAvatar(
  file: File
): Promise<[string | null, { message: string } | null]> {
  try {
    const fileURI = await fileToURI(file);
    const result = await uploadToCloudinary(fileURI, "avatars");
    const secureUrl: string = (result as { secure_url: string }).secure_url;

    if (!result) {
      console.error("Error uploading avatar");
    }

    return [secureUrl, null];
  } catch (error) {
    console.error("Error in uploadAvatar function:", error);
    const errorMessage = error as string;
    return [null, { message: errorMessage }];
  }
}

export async function updateUser(formData: FormData) {
  try {
    const formDataObject: Record<string, unknown | File | string> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const avatarFile = formData.get("avatar") as File;
    let avatarUrl: string | null = null;
    if (avatarFile && avatarFile?.size > 0) {
      const [avatar, error] = await uploadAvatar(avatarFile);
      if (error) throw error;
      avatarUrl = avatar;
    }

    const userId = formData.get("userId") as string;

    const data: Record<string, Date | string> = {
      ...formDataObject,
      updatedAt: new Date(),
    };

    if (avatarUrl) data["avatar"] = avatarUrl;

    if (formDataObject["password"]) {
      const hashedPassword = await bcrypt.hash(
        formDataObject["password"] as string,
        10
      );
      data["password"] = hashedPassword;
    }

    const [result] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, userId));

    if (result.affectedRows === 0) {
      return {
        error: `Could not update user with ID: ${userId}`,
      };
    }

    const updatedUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .then((rows) => rows[0]);

    revalidatePath("/profile");
    return {
      success: true,
      message: `Successfully updated ${updatedUser.firstName}`,
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
