import { Reveal } from "@/components/ui/reveal";
import { resolveIcon } from "@/lib/content/icons";
import type { StudioContent } from "@/lib/supabase/types";

export function Studio({ content }: { content: StudioContent }) {
  return (
    <section
      id="estudio"
      className="border-t border-ink-800 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-3xl leading-tight text-balance text-mist-100 sm:text-4xl lg:text-5xl">
                {content.title}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 text-xl font-light leading-relaxed text-mist-300">
                {content.tagline}
              </p>
            </Reveal>
          </div>

          <div className="space-y-5 lg:col-span-7">
            {content.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={100 + i * 60}>
                <p className="font-light leading-relaxed text-mist-400">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Três pilares */}
        <div className="mt-16 grid gap-px overflow-hidden border-t border-ink-800 sm:mt-20 sm:grid-cols-3 sm:border-l">
          {content.pillars.map((pillar, i) => {
            const Icon = resolveIcon(pillar.icon);
            return (
              <Reveal key={`${pillar.title}-${i}`} delay={i * 100}>
                <div className="h-full border-b border-ink-800 bg-transparent p-8 sm:border-r">
                  <Icon size={24} className="text-mist-300" strokeWidth={1.25} />
                  <h3 className="mt-6 text-lg font-normal text-mist-100">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-mist-400">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
