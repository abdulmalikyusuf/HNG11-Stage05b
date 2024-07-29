"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";
import { Database } from "@/supabase/database.types";
import { env } from "@/env.mjs";

export async function updateProfile(
  data: Database["public"]["Tables"]["profile"]["Update"]
) {
  const supabase = createClient();

  console.log(data);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) {
    redirect("/error");
  }

  const { error } = await supabase
    .from("profile")
    .update({
      ...data,
    })
    .eq("userId", user.id);
  console.log(error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

interface ProfilePayLoad {
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
}
export async function updateProfileInfo(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) {
    redirect("/error");
  }
  const payload: ProfilePayLoad = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    photo: "",
  };

  const avatarFile = formData.get("profilePhoto") as File;

  if (avatarFile.size === 0) {
    return {
      message: "Invalid image",
    };
  }
  const { data: userAvatar, error: imageUploadError } = await supabase.storage
    .from(env.SUPABASE_BUCKET_NAME)
    .upload(
      `avatars/${payload.firstName} ${payload.lastName}-${avatarFile.name}`,
      avatarFile,
      {
        cacheControl: "3600",
        upsert: false,
      }
    );
  if (imageUploadError?.error === "Duplicate")
    throw new Error("The resource already exists", {});
  if (userAvatar) {
    const { data } = supabase.storage
      .from(env.SUPABASE_BUCKET_NAME)
      .getPublicUrl(userAvatar.path, {
        // transform: {
        //   width: 100,
        //   height: 100,
        // },
      });
    payload.photo = data.publicUrl;
  }

  const { error: profileError } = await supabase
    .from("profile")
    .update({
      ...payload,
    })
    .eq("userId", user.id);

  console.log(imageUploadError, profileError);

  if (imageUploadError) {
    redirect("/error");
  }

  revalidatePath("/profile", "layout");
}
