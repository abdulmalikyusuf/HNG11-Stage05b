import React from "react";
import Image from "next/image";
import NextLink from "next/link";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import ShareLink from "./share-link";
import { createClient } from "@/supabase/server";

interface PreviewPageProps {
  params: {
    userId: string;
  };
}

async function PreviewPage({ params }: PreviewPageProps) {
  const userId = params.userId;
  const supabase = createClient();
  console.log(userId);

  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("userId", userId)
    .single();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="bg-white md:bg-grey-light">
      <header className="md:p-6 md:bg-purple md:h-96 md:rounded-b-[32px]">
        <div className="p-4 pr-6 bg-white md:rounded-xl flex justify-between">
          {session ? (
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
                {!data?.photo ? (
                  <div className="bg-[#EEEEEE] size-full" />
                ) : (
                  <Image
                    src={data && data.photo}
                    alt={data.firstName + " " + data.lastName}
                    width={104}
                    height={104}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="text-center">
                {!data ? (
                  <>
                    <div className="h-4 w-[160px] rounded-full bg-[#EEEEEE]"></div>
                    <div className="h-2 w-[72px] rounded-full bg-[#EEEEEE]"></div>
                  </>
                ) : (
                  <>
                    <h3 className="heading-m text-grey-dark">
                      {data.firstName} {data.lastName}
                    </h3>
                    <p className="body-m text-grey mt-2">{data.email}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full">
              {data?.links ? (
                data?.links.map((link) => (
                  <Link
                    key={link.platform}
                    variant={link.platform}
                    href={link.link}
                  />
                ))
              ) : (
                <p className="body-s">No links added yet!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PreviewPage;
