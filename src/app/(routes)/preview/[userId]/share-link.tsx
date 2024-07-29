"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

function ShareLink() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, [router]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast({
      icon: "link",
      description: " The link has been copied to your clipboard!",
    });
  };
  return (
    <>
      <Button className="w-fit" onClick={handleCopy}>
        Share Link
      </Button>
    </>
  );
}

export default ShareLink;
