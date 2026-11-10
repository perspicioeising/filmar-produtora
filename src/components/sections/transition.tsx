import type { TransitionContent } from "@/lib/supabase/types";
import { Reveal } from "@/components/ui/reveal";

/** Frase-manifesto em azul: respiro entre o portfólio e a apresentação. */
export function Transition({ content }: { content: TransitionContent }) {
  return (
    <section
      aria-label="Manifesto"
      className="relative overflow-hidden bg-sky-glow py-24 text-ink-950 sm:py-32 lg:py-44"
    >
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply" />
      <div className="container-x relative">
        <Reveal>
          <span
            aria-hidden
            className="block font-display text-7xl leading-none text-ink-950/25 sm:text-8xl"
          >
            “
          </span>
          <p className="-mt-4 max-w-4xl font-display text-3xl leading-[1.15] text-balance sm:text-5xl lg:text-6xl">
            {content.text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
