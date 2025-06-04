import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { Form } from "./form";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth";

async function PlatformsPage() {
  const session = await auth();
  const headersList = headers();
  const currentPath = headersList.get("x-pathname") || "";

  if (!session || !session.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
  }

  const data = await db
    .select({ socialLinks: users.socialLinks })
    .from(users)
    .where(eq(users.id, session.user.id));
  const socialLinks = data.at(0)?.socialLinks ?? [
    {
      platform: "github",
      url: "https://www.github.com/johnappleseed",
    },
  ];
  return <Form socialLinks={socialLinks} />;
}

export default PlatformsPage;
