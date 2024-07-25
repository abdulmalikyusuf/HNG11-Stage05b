"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";
import { Database } from "@/supabase/database.types";

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
export async function updateProfileInfo(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) {
    redirect("/error");
  }
  const data = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  };

  const avatarFile = formData.get("profilePhoto");
  if (formData.has("profilePhoto")) {
    const { data, error } = await supabase.storage
      .from("profile-photos")
      .upload("public/avatar1.png", avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log({ formData, error, data });
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

  revalidatePath("/profile", "layout");
}
