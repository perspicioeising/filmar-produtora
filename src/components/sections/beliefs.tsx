import type { BeliefsContent } from "@/lib/supabase/types";
import { Reveal } from "@/components/ui/reveal";

export function Beliefs({ content }: { content: BeliefsContent }) {
  const [lead, ...rest] = content.paragraphs;

  return (
    <section
      id="acreditamos"
      className="relative overflow-hidden bg-sky-glow py-20 text-ink-950 sm:py-28 lg:py-36"
    >
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply" />
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="text-xs font-medium uppercase tracking-[0.3em]">
            {content.title}
          </p>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={100}>
          {lead && (
            <p className="font-display text-3xl leading-[1.15] text-balance sm:text-5xl">
              {lead}
            </p>
          )}
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-ink-800 sm:text-lg">
            {rest.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
