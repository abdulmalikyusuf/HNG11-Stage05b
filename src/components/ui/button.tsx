import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-full inline-flex items-center justify-center gap-2 py-3 px-7 whitespace-nowrap rounded-lg font-instrument-sans text-base font-semibold text-white ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-25",
  {
    variants: {
      variant: {
        primary:
          "bg-purple hover:bg-purple-hover hover:[box-shadow:_0px_0px_32px_0px_#633CFF40]",
        secondary:
          "bg-white text-purple border border-purple hover:bg-purple-light focus:bg-purple-light",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
