import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icons, type Icon } from "./icons";

const linkVariants = cva(
  "w-full inline-flex items-center justify-between py-3 px-4 whitespace-nowrap rounded-lg font-instrument-sans body-s text-white",
  {
    variants: {
      variant: {
        github: "bg-[#1A1A1A]",
        youtube: "bg-red",
        linkedin: "bg-[#2D68FF]",
        codewars: "bg-grey-dark",
        devTo: "bg-[#8A1A50]",
        freeCodeCamp: "bg-[#302267]",
      },
    },
    defaultVariants: {
      variant: "github",
    },
  }
);

export interface LinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLButtonElement, LinkProps>(
  (
    { className, variant = "github", children, asChild = false, ...props },
    ref
  ) => {
    const IconBefore = Icons[variant ?? "github"] as Icon;

    return (
      <button
        className={cn(linkVariants({ variant, className }), "capitalize")}
        ref={ref}
        {...props}
      >
        <span className="inline-flex items-center gap-2">
          <IconBefore className="size-4 fill-white" />
          {variant}
        </span>
        <Icons.arrowRight className="size-4 fill-white" />
      </button>
    );
  }
);
Link.displayName = "Link";

function LinkSkeleton() {
  return <div className="rounded-lg bg-[#EEEEEE] h-11 w-full" />;
}

export { LinkSkeleton, Link, linkVariants };
