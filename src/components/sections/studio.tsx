import type { StudioContent } from "@/lib/supabase/types";
import { resolveIcon } from "@/lib/content/icons";
import { Reveal } from "@/components/ui/reveal";

export function Studio({ content }: { content: StudioContent }) {
  return (
    <section
      id="estudio"
      className="bg-ink-900 py-20 sm:py-28 lg:py-36"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-glow">
              {content.title}
            </p>
            <h2 className="mt-5 text-3xl leading-[1.12] text-balance text-mist-100 sm:text-5xl">
              {content.tagline}
            </h2>
          </Reveal>

          <Reveal className="space-y-5 text-base leading-relaxed text-mist-300 sm:text-lg lg:col-span-6" delay={100}>
            {content.paragraphs.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {content.pillars.length > 0 && (
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-mist-100/10 bg-mist-100/10 sm:mt-20 md:grid-cols-3">
            {content.pillars.map((pillar, i) => {
              const Icon = resolveIcon(pillar.icon);
              return (
                <li key={i} className="bg-ink-900 p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-glow/10 text-sky-glow">
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-sm text-mist-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl text-mist-100">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-400">
                    {pillar.text}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
