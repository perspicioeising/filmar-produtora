import Link from "next/link";
import { Play } from "lucide-react";
import type { HeroContent } from "@/lib/supabase/types";
import { isVideoFileUrl } from "@/lib/media";
import { Button } from "@/components/ui/button";

export function Hero({ content }: { content: HeroContent }) {
  const hasMedia = Boolean(content.mediaUrl);
  const isVideo = isVideoFileUrl(content.mediaUrl);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh items-end overflow-hidden"
    >
      {/* Fundo: mídia (se houver) + véus + textura de filme */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-ink-950">
        {hasMedia ? (
          isVideo ? (
            <video
              className="animate-ken-burns h-full w-full object-cover opacity-70"
              src={content.mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className="animate-ken-burns h-full w-full object-cover opacity-70"
              src={content.mediaUrl}
              alt=""
              fetchPriority="high"
            />
          )
        ) : (
          // Sem mídia: luz azul difusa, como um letreiro ao fundo
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_30%,rgba(125,184,232,0.22),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgba(125,184,232,0.10),transparent_70%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/25" />
        <div className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      </div>

      <div className="container-x pb-16 pt-32 sm:pb-24 lg:pb-28">
        {content.eyebrow && (
          <p className="animate-fade-up flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-sky-glow">
            <span className="h-px w-8 bg-sky-glow" />
            {content.eyebrow}
          </p>
        )}

        <h1
          className="animate-fade-up mt-6 max-w-5xl text-[2.5rem] leading-[1.04] text-balance text-mist-100 sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          style={{ animationDelay: "0.1s" }}
        >
          {content.title}
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-mist-300 sm:mt-8 sm:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          {content.description}
        </p>

        <div
          className="animate-fade-up mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Button href="/#portfolio" size="lg" className="w-full sm:w-auto">
            <Play size={16} fill="currentColor" />
            {content.cta}
          </Button>
          <Button
            href="/#contato"
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            Falar com a gente
          </Button>
        </div>
      </div>

      <Link
        href="/#portfolio"
        aria-label="Rolar para os trabalhos"
        className="absolute bottom-8 right-8 hidden h-20 w-px overflow-hidden bg-mist-100/15 lg:block"
      >
        <span className="animate-scroll-cue absolute inset-x-0 h-full bg-sky-glow" />
      </Link>
    </section>
  );
}
