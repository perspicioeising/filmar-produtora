import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 text-base text-mist-100 placeholder:text-mist-500 transition-colors focus:border-sky-glow focus:outline-none focus:ring-2 focus:ring-sky-glow/25 aria-[invalid=true]:border-red-400/70 disabled:opacity-50 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
