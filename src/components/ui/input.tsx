import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-ink-600 bg-ink-850 px-4 text-sm text-mist-100 placeholder:text-mist-500 transition-colors focus:border-sky-glow focus:outline-none focus:ring-1 focus:ring-sky-glow/40 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
