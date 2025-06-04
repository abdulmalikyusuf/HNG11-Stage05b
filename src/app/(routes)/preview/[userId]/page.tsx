import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import ShareLink from "./share-link";
import { auth } from "@/lib/auth";
import { users } from "@/db/schema";
import { db } from "@/db";

interface PreviewPageProps {
  params: {
    userId: string;
  };
}

async function PreviewPage({ params }: PreviewPageProps) {
  const userId = params.userId;
  const session = await auth();

  const data = await db.select().from(users).where(eq(users.id, userId));
  const user = data.at(0);

  return (
    <div className="bg-white md:bg-grey-light">
      <header className="md:p-6 md:bg-purple md:h-96 md:rounded-b-[32px]">
        <div className="p-4 pr-6 bg-white md:rounded-xl flex justify-between">
          {session?.user && session.user.id === userId ? (
            <Button className="w-fit" variant="secondary" asChild>
              <NextLink href="/">Back to Editor</NextLink>
            </Button>
          ) : (
            <span className=""></span>
          )}
          <ShareLink />
        </div>
      </header>
      <main className="min-h-screen md:p-6 md:pt-0">
        <div className="py-12 md:px-14 md:rounded-3xl md:bg-white md:shadow-shadow w-[237px] md:w-96 mx-auto md:-translate-y-1/4">
          <div className="flex flex-col items-center h-full gap-14">
            <div className="flex flex-col items-center gap-6">
              <div className="size-[104px] relative rounded-full border-4 border-purple overflow-clip">
                {!user?.avatar ? (
                  <div className="bg-[#EEEEEE] size-full" />
                ) : (
                  <Image
                    src={user?.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={104}
                    height={104}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="text-center">
                {!user ? (
                  <>
                    <div className="h-4 w-[160px] rounded-full bg-[#EEEEEE]">
                      No user found
                    </div>
                    <div className="h-2 w-[72px] rounded-full bg-[#EEEEEE]"></div>
                  </>
                ) : (
                  <>
                    <h3 className="heading-m text-grey-dark">
                      {`${user.firstName} ${user.lastName}`}
                    </h3>
                    <p className="body-m text-grey mt-2">{user.email}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full">
              {user &&
                (user.socialLinks && user.socialLinks.length > 0 ? (
                  user.socialLinks.map((socialLink) => (
                    <Link
                      key={socialLink.url}
                      variant={socialLink.platform}
                      href={socialLink.url}
                    />
                  ))
                ) : (
                  <p className="body-s">No links added yet!</p>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PreviewPage;
