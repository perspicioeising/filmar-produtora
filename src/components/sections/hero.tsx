import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Fundo cinematográfico: gradientes + brilho âmbar */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950" />
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sky-glow/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-deep/10 blur-[120px]" />
        {/* linhas sutis tipo grade de storyboard */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-28 sm:py-32">
        <div className="max-w-3xl">
          <p className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-850/60 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-sky-glow backdrop-blur sm:text-xs sm:tracking-[0.25em]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-bright" />
            Produtora Audiovisual
          </p>

          <h1 className="animate-fade-up mt-6 font-display text-4xl font-semibold leading-[1.08] text-balance sm:text-6xl md:text-7xl">
            Damos vida às suas{" "}
            <span className="text-sky-gradient">histórias</span> em movimento
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-xl text-base text-mist-400 sm:mt-6 sm:text-lg"
            style={{ animationDelay: "0.1s" }}
          >
            Da concepção à entrega, produzimos comerciais, clipes, coberturas de
            eventos e motion design com uma linguagem visual marcante e
            cinematográfica.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
            style={{ animationDelay: "0.2s" }}
          >
            <Button href="#portfolio" size="lg" className="w-full sm:w-auto">
              Ver portfólio
              <ArrowRight size={18} />
            </Button>
            <Button
              href="#contato"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Play size={16} />
              Começar um projeto
            </Button>
          </div>

          {/* Métricas rápidas */}
          <dl
            className="animate-fade-up mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-ink-700 pt-6 sm:mt-16 sm:gap-6 sm:pt-8"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { value: "+120", label: "Projetos entregues" },
              { value: "+8", label: "Anos de estrada" },
              { value: "+50", label: "Marcas atendidas" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-semibold text-mist-100 sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[0.7rem] text-mist-500 sm:text-xs">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* indicador de rolagem */}
      <a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist-500 transition-colors hover:text-sky-bright md:flex"
      >
        <span className="text-[10px] uppercase tracking-widest">Explore</span>
        <span className="h-10 w-6 rounded-full border border-ink-600 p-1">
          <span className="mx-auto block h-2 w-1 animate-bounce rounded-full bg-sky-glow" />
        </span>
      </a>
    </section>
  );
}
