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
        "min-h-28 w-full rounded-lg border border-ink-600 bg-ink-850 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-500 transition-colors focus:border-sky-glow focus:outline-none focus:ring-1 focus:ring-sky-glow/40 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
