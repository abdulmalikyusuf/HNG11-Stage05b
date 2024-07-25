"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { Icons } from "@/components/ui/icons";

import { Button } from "@/components/ui/button";

function ShareLink() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, [router]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setOpen(true);
  };
  return (
    <>
      <Button className="w-fit" onClick={handleCopy}>
        Share Link
      </Button>
      <Toast.Root open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-2 bg-grey-dark py-4 px-6 rounded-xl w-fit [box-shadow:_0px_0px_32px_0px_#0000001A]">
          <Icons.link className="size-5 fill-grey" />
          <p className="body-s md:heading-s text-grey-light">
            The link has been copied to your clipboard!
          </p>
        </div>
      </Toast.Root>
    </>
  );
}

export default ShareLink;
