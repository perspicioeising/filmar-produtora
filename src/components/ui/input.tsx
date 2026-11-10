import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      // text-base no mobile evita o zoom automático do iOS ao focar o campo
      className={cn(
        "h-12 w-full rounded-xl border border-ink-600 bg-ink-900 px-4 text-base text-mist-100 placeholder:text-mist-500 transition-colors focus:border-sky-glow focus:outline-none focus:ring-2 focus:ring-sky-glow/25 aria-[invalid=true]:border-red-400/70 disabled:opacity-50 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
