import { Reveal } from "@/components/ui/reveal";
import { resolveIcon } from "@/lib/content/icons";
import type { AboutContent } from "@/lib/supabase/types";

export function About({ content }: { content: AboutContent }) {
  return (
    <section id="sobre" className="border-t border-ink-800 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-sky-glow">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-mist-400">{content.paragraph1}</p>
          <p className="mt-4 text-mist-400">{content.paragraph2}</p>
        </Reveal>

        <div className="grid gap-4">
          {content.pillars.map((pillar, i) => {
            const Icon = resolveIcon(pillar.icon);
            return (
              <Reveal key={`${pillar.title}-${i}`} delay={i * 100}>
                <div className="group flex gap-4 rounded-2xl border border-ink-700 bg-ink-850/50 p-6 transition-colors hover:border-sky-glow/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-800 text-sky-glow transition-colors group-hover:bg-sky-glow group-hover:text-ink-950">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-medium text-mist-100">{pillar.title}</h3>
                    <p className="mt-1 text-sm text-mist-400">{pillar.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
