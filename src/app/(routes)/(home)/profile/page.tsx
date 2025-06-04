import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import ProfileForm from "./form";

async function ProfilePage() {
  const session = await auth();
  const headersList = headers();
  const currentPath = headersList.get("x-pathname") || "";

  if (!session || !session.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
  }

  const data = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));
  const user = data.at(0);

  if (!user) {
    redirect("/signin");
  }
  return (
    <div className="bg-white rounded-xl flex-1">
      <div className="flex flex-col gap-10 p-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl leading-normal font-bold md:heading-m text-grey-dark">
            Profile Details
          </h2>
          <p className="text-grey body-m">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <ProfileForm
            key={user.email}
            profilePhoto={user?.avatar}
            userId={user.id}
            defaultValues={{
              firstName: user?.firstName ?? "",
              lastName: user?.lastName ?? "",
              email: user.email,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
