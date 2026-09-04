import { Reveal } from "@/components/ui/reveal";
import { resolveIcon } from "@/lib/content/icons";
import type { ServicesContent } from "@/lib/supabase/types";

export function Services({ content }: { content: ServicesContent }) {
  return (
    <section
      id="servicos"
      className="border-t border-ink-800 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-mist-500">
            {content.eyebrow}
          </p>
          <h2 className="mt-6 text-3xl leading-tight text-balance text-mist-100 sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-2xl font-light leading-relaxed text-mist-400">
            {content.paragraph}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-12 sm:mt-20 sm:grid-cols-2">
          {content.items.map((service, i) => {
            const Icon = resolveIcon(service.icon);
            return (
              <Reveal key={`${service.title}-${i}`} delay={i * 80}>
                <article className="group border-t border-ink-700 pt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-normal text-mist-100 sm:text-3xl">
                      {service.title}
                    </h3>
                    <Icon
                      size={22}
                      strokeWidth={1.25}
                      className="shrink-0 text-mist-500 transition-colors group-hover:text-mist-100"
                    />
                  </div>
                  <p className="mt-4 max-w-md font-light leading-relaxed text-mist-400">
                    {service.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
