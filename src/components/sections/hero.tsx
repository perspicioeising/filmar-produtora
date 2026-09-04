import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/lib/supabase/types";

export function Hero({ content }: { content: HeroContent }) {
  const hasMedia = Boolean(content.mediaUrl);
  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(content.mediaUrl ?? "");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      {/* Mídia de fundo cinematográfica (imagem ou vídeo), com Ken Burns discreto */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-ink-950">
        {hasMedia &&
          (isVideo ? (
            <video
              className="animate-ken-burns h-full w-full object-cover opacity-60"
              src={content.mediaUrl}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className="animate-ken-burns h-full w-full object-cover opacity-60"
              src={content.mediaUrl}
              alt=""
            />
          ))}
        {/* Véu para legibilidade do texto sobre a mídia */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-40 sm:pb-28">
        <div className="max-w-4xl">
          <h1 className="animate-fade-up text-4xl leading-[1.05] text-balance text-mist-100 sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            {content.title}
          </h1>

          <p
            className="animate-fade-up mt-8 max-w-xl text-lg font-light text-mist-400 sm:text-xl"
            style={{ animationDelay: "0.12s" }}
          >
            {content.description}
          </p>

          <div
            className="animate-fade-up mt-10"
            style={{ animationDelay: "0.24s" }}
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-mist-100 transition-colors hover:text-mist-400"
            >
              {content.cta}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* indicador de rolagem discreto */}
      <a
        href="#transicao"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist-500 transition-colors hover:text-mist-300 md:flex"
      >
        <span className="h-12 w-px bg-gradient-to-b from-mist-500 to-transparent" />
      </a>
    </section>
  );
}
