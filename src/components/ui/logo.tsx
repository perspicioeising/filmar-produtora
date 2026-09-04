import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** tamanho do "filmar"; a linha de apoio escala junto */
  size?: "sm" | "md" | "lg";
  /** exibe a linha "ESTÚDIO" abaixo */
  showTagline?: boolean;
};

const sizes = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-5xl",
};

const taglineSizes = {
  sm: "text-[0.5rem]",
  md: "text-[0.6rem]",
  lg: "text-xs",
};

/**
 * Marca da Filmar em CSS: "filmar" com display editorial e a linha de apoio
 * "ESTÚDIO" em maiúsculas finas com amplo espaçamento entre letras.
 * Estética neutra (sem cor de marca saturada), alinhada ao tema editorial.
 */
export function Logo({ className, size = "md", showTagline = true }: LogoProps) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display font-medium tracking-tight text-mist-100",
          sizes[size],
        )}
      >
        filmar
      </span>
      {showTagline && (
        <span
          className={cn(
            "mt-1 font-sans font-light uppercase text-mist-400",
            taglineSizes[size],
          )}
          style={{ letterSpacing: "0.5em" }}
        >
          {/* padding-right compensa o tracking na última letra */}
          <span className="pl-[0.5em]">Estúdio</span>
        </span>
      )}
    </span>
  );
}
