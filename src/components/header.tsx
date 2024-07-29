"use client";

import React from "react";
import { Icons } from "./ui/icons";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Header({ userId }: { userId: string }) {
  const pathname = usePathname();
  return (
    <header className="md:p-6">
      <div className="p-4 pr-6 bg-white rounded-xl">
        <div className="flex justify-between items-center gap-2">
          <div className="inline-flex items-center gap-1.5">
            <Icons.logo className="size-8" />
            <p className="hidden md:inline-flex text-[21px] text-grey-dark font-bold">
              devlinks
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap font-instrument-sans rounded-lg px-7 py-3 font-semibold",
                pathname === "/" ? "text-purple bg-purple-light" : "text-grey"
              )}
            >
              <Icons.link
                className={cn(
                  "size-5",
                  pathname === "/" ? "!fill-purple" : "fill-grey"
                )}
              />
              <span className="hidden md:inline-flex">Links</span>
            </Link>
            <Link
              href="/profile"
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap font-instrument-sans rounded-lg px-7 py-3 font-semibold",
                pathname === "/profile"
                  ? "text-purple bg-purple-light"
                  : "text-grey"
              )}
            >
              <Icons.userCircle
                className={cn(
                  "size-5",
                  pathname === "/profile" ? "fill-purple" : "fill-grey"
                )}
              />
              <span className="hidden md:inline-flex">Profile Details</span>
            </Link>
          </div>
          <Button variant="secondary" className="w-fit" asChild>
            <Link href={`/preview/${userId}`}>
              <span className="hidden md:inline-block">Preview</span>
              <Icons.eye className="size-5 md:hidden" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
