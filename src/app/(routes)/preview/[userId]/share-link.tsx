"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

function ShareLink() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, [router]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const handleCopy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(url);
    toast({
      icon: "link",
      description: " The link has been copied to your clipboard!",
    });
  };
  return (
    <>
      <Button className="w-fit" onClick={handleCopy}>
        {copied ? "Copied" : "Share Link"}
      </Button>
    </>
  );
}

export default ShareLink;
