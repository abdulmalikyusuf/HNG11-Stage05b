import Image from "next/image";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import Header from "@/components/header";
import { Link, LinkSkeleton } from "@/components/ui/link";
import { arrayRange } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <div className="bg-grey-light">
      <Header userId={user.id} />
      <main className="min-h-screen p-4 md:p-6 md:pt-0 md:flex gap-6">
        <div className="w-[560px] shrink bg-white hidden md:sticky md:top-0 h-fit py-10 md:flex items-center justify-center rounded-xl">
          <div className="relative mx-auto border-[rgb(31,_41,_55)] bg-[rgb(31,_41,_55)] border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-[rgb(31,_41,_55)] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] bg-[rgb(31,_41,_55)] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-[rgb(31,_41,_55)] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-[rgb(31,_41,_55)] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
              <div className="flex flex-col items-center h-full gap-14 py-10">
                <div className="flex flex-col items-center gap-[25px]">
                  <div className="size-24 rounded-full overflow-clip">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={96}
                        height={96}
                      />
                    ) : (
                      <div className="bg-[#EEEEEE] size-full animate-pulse" />
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    {user.firstName && user.lastName ? (
                      <p className="heading-s text-grey-dark">
                        {`${user.firstName} ${user.lastName}`}
                      </p>
                    ) : (
                      <div className="h-4 w-[160px] rounded-full bg-[#EEEEEE]"></div>
                    )}
                    {user.email ? (
                      <p className="body-s text-grey">{user.email}</p>
                    ) : (
                      <div className="h-2 w-[72px] rounded-full bg-[#EEEEEE]"></div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-5 w-[237px] h-full overflow-y-auto no-scrollbar">
                  {user.socialLinks && user.socialLinks?.length > 0
                    ? user.socialLinks.map((socialLink) => (
                        <Link
                          variant={socialLink.platform}
                          key={socialLink.url}
                          href={socialLink.url}
                        />
                      ))
                    : arrayRange(1, 5, 1).map((i) => (
                        <LinkSkeleton
                          key={i}
                          className={`${
                            i % 2 === 0 ? "duration-200" : "duration-300"
                          }`}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
