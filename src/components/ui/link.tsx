import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icons, type Icon } from "./icons";

const linkVariants = cva(
  "w-full inline-flex items-center justify-between py-3 px-4 whitespace-nowrap rounded-lg font-instrument-sans body-s text-white",
  {
    variants: {
      variant: {
        github: "bg-[#1A1A1A] [&_path]:!fill-white",
        codepen: "bg-[#1A1A1A] [&_path]:!fill-white",
        youtube: "bg-red [&_path]:!fill-white",
        linkedin: "bg-[#2D68FF] [&_path]:!fill-white",
        codewars: "bg-grey-dark [&_path]:!fill-white",
        devTo: "bg-[#8A1A50] fill-white [&_path:not(:first-child)]:fill-grey",
        freeCodeCamp: "bg-[#302267] [&_path]:!fill-white",
        twitter: "bg-[#43B7E9] [&_path]:!fill-white",
        facebook: "bg-[#2442AC] [&_path]:!fill-white",
        twitch: "bg-[#EE3FC8] [&_path]:!fill-white",
        gitlab: "bg-[#EB4925] [&_path]:!fill-white",
        hashnode: "bg-[#0330D1] [&_path]:!fill-white",
        stackOverflow: "bg-[#EC7100] [&_path]:!fill-white",
        frontendMentor:
          "bg-white border border-borders text-grey-dark [&_path]:!fill-grey",
      },
    },
    defaultVariants: {
      variant: "github",
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, variant = "github", children, asChild = false, ...props },
    ref
  ) => {
    const IconBefore = Icons[variant ?? "github"] as Icon;

    return (
      <a
        className={cn(linkVariants({ variant, className }), "capitalize")}
        ref={ref}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        <span className="inline-flex items-center gap-2">
          <IconBefore className="size-4 fill-white" />
          {variant}
        </span>
        <Icons.arrowRight className="size-4 fill-white" />
      </a>
    );
  }
);
Link.displayName = "Link";

function LinkSkeleton({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "rounded-lg bg-[#EEEEEE] h-11 w-full animate-pulse",
        className
      )}
    />
  );
}

export { LinkSkeleton, Link, linkVariants };
