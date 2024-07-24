import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { LinkSkeleton, Link } from "@/components/ui/link";
import Image1 from "@/assets/image/let's get started.png";
import { Icons } from "@/components/ui/icons";

function PreviewPage() {
  return (
    <div className="bg-grey-light">
      <header className="p-6 bg-purple h-96 rounded-b-[32px]">
        <div className="p-4 pr-6 bg-white rounded-xl flex justify-between">
          <Button className="w-fit" variant="secondary">
            Back to Editor
          </Button>
          <Button className="w-fit">Share Link</Button>
        </div>
      </header>
      <main className="min-h-screen p-6 pt-0">
        <div className="py-12 px-14 rounded-3xl bg-white [box-shadow:_0px_0px_32px_0px_#0000001A] w-96 mx-auto -translate-y-1/4">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-center gap-6">
              <div className="size-[104px] relative rounded-full border-4 border-purple overflow-clip">
                <Image src={Image1} fill alt="" />
              </div>
              <div className="text-center">
                <h3 className="heading-m text-grey-dark">Ben Wright</h3>
                <p className="body-m text-grey mt-2">ben@example.com</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Link variant="github" />
              <Link variant="youtube" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-grey-dark py-4 px-6 rounded-xl w-fit [box-shadow:_0px_0px_32px_0px_#0000001A]">
          <Icons.link className="size-5 fill-grey" />
          <p className="heading-s text-grey-light">
            The link has been copied to your clipboard!
          </p>
        </div>
      </main>
    </div>
  );
}

export default PreviewPage;
