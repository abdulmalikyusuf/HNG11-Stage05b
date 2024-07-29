import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-3 py-3 px-4 rounded-lg w-full font-instrument-sans bg-white border border-borders has-[:focus]:border-purple has-[:focus]:shadow-active-selection",
          error && "!border-red ![box-shadow:none]"
        )}
      >
        {/* <Icons.link className="size-4" /> */}
        {children}
        <input
          type={type}
          className={cn(
            "w-full text-base text-grey-dark placeholder:text-grey-dark/50 focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            error && "text-red",
            className
          )}
          {...props}
          ref={ref}
        />
        {error && (
          <small className="body-s text-red whitespace-nowrap">{error}</small>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
