"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";

export async function signin(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (error) {
    // throw new Error(error.message, { ...error });
    return { message: error.message, code: error.code };
  }

  await supabase
    .from("profile")
    .insert({ userId: user?.id, email: user?.email, id: randomUUID() });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
