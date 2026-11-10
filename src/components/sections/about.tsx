import Image from "next/image";
import { Camera } from "lucide-react";
import type { AboutContent } from "@/lib/supabase/types";
import { Reveal } from "@/components/ui/reveal";

export function About({ content }: { content: AboutContent }) {
  const hasPhoto = Boolean(content.photoUrl);

  return (
    <section
      id="sobre"
      className="bg-paper py-20 text-ink-950 sm:py-28 lg:py-36"
    >
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className={hasPhoto ? "lg:col-span-5" : "hidden lg:col-span-5 lg:block"}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-ink-950 lg:sticky lg:top-28 lg:max-w-none">
            {hasPhoto ? (
              <Image
                src={content.photoUrl}
                alt={content.title}
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-mist-500">
                <Camera size={48} strokeWidth={1} />
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={100}>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-deep">
            {content.title}
          </p>
          {content.openingLine && (
            <h2 className="mt-5 text-3xl leading-[1.15] text-balance sm:text-5xl">
              {content.openingLine}
            </h2>
          )}
          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-700 sm:text-lg">
            {content.paragraphs.map((p, i) => (
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
