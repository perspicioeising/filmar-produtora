import { Reveal } from "@/components/ui/reveal";
import { resolveIcon } from "@/lib/content/icons";
import type { ServicesContent } from "@/lib/supabase/types";

export function Services({ content }: { content: ServicesContent }) {
  return (
    <section id="servicos" className="border-t border-ink-800 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-glow">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-mist-400">{content.paragraph}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((service, i) => {
            const Icon = resolveIcon(service.icon);
            return (
              <Reveal key={`${service.title}-${i}`} delay={i * 80}>
                <article className="group h-full rounded-2xl border border-ink-700 bg-ink-850/50 p-7 transition-all hover:-translate-y-1 hover:border-sky-glow/50 hover:bg-ink-800/60">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-800 text-sky-glow transition-colors group-hover:bg-sky-glow group-hover:text-ink-950">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-mist-100">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-mist-400">{service.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
