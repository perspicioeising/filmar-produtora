import { Reveal } from "@/components/ui/reveal";
import type { BeliefsContent } from "@/lib/supabase/types";

/**
 * "O que acreditamos" — momento editorial dentro da página.
 * Fundo claro invertendo a paleta para quebrar o ritmo das demais seções.
 */
export function Beliefs({ content }: { content: BeliefsContent }) {
  return (
    <section
      id="acreditamos"
      className="bg-mist-100 py-28 text-ink-950 sm:py-40 lg:py-52"
    >
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-600">
            {content.title}
          </p>
        </Reveal>

        <div className="mt-10 space-y-8">
          {content.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className="text-balance text-2xl font-light leading-[1.4] sm:text-3xl md:text-4xl">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
