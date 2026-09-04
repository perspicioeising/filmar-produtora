import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
};

const sizes = { sm: "text-2xl", md: "text-3xl", lg: "text-5xl" };
const taglineSizes = { sm: "text-[0.5rem]", md: "text-[0.6rem]", lg: "text-xs" };

export function Logo({ className, size = "md", showTagline = true }: LogoProps) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className={cn("font-display font-semibold tracking-tight text-mist-100", sizes[size])}>
        film<span className="text-sky-glow">ar</span>
      </span>
      {showTagline && (
        <span
          className={cn("mt-0.5 font-sans font-light uppercase text-mist-300", taglineSizes[size])}
          style={{ letterSpacing: "0.55em" }}
        >
          <span className="pl-[0.55em]">Produtora</span>
        </span>
      )}
    </span>
  );
}
