import { Reveal } from "@/components/ui/reveal";
import type { AboutContent } from "@/lib/supabase/types";

export function About({ content }: { content: AboutContent }) {
  const hasPhoto = Boolean(content.photoUrl);

  return (
    <section id="sobre" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Coluna do texto — assimétrica, editorial */}
          <div className={hasPhoto ? "lg:col-span-7" : "lg:col-span-8"}>
            <Reveal>
              <h2 className="text-3xl leading-tight text-balance text-mist-100 sm:text-4xl lg:text-5xl">
                {content.title}
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-mist-300 sm:text-2xl">
                {content.openingLine}
              </p>
            </Reveal>

            <div className="mt-10 max-w-2xl space-y-5">
              {content.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={120 + i * 60}>
                  <p className="font-light leading-relaxed text-mist-400">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Coluna da foto (opcional) — slot preparado para o futuro */}
          {hasPhoto && (
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.photoUrl}
                    alt="Andressa Bittencourt"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
