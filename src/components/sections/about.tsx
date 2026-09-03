import { Clapperboard, Eye, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const pillars = [
  {
    icon: Eye,
    title: "Olhar autoral",
    text: "Cada projeto começa com uma leitura cuidadosa da sua marca e do que ela precisa comunicar.",
  },
  {
    icon: Clapperboard,
    title: "Produção completa",
    text: "Roteiro, direção, captação, edição e finalização — tudo sob o mesmo teto, com processo transparente.",
  },
  {
    icon: Sparkles,
    title: "Acabamento premium",
    text: "Color grading, sound design e motion que elevam o resultado ao nível de cinema.",
  },
];

export function About() {
  return (
    <section id="sobre" className="border-t border-ink-800 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-sky-glow">
            Quem somos
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
            Uma produtora movida por imagem, ritmo e emoção
          </h2>
          <p className="mt-6 text-mist-400">
            A Filmar Produtora nasceu do desejo de transformar ideias em
            experiências audiovisuais memoráveis. Somos um time enxuto e
            apaixonado que une técnica apurada e sensibilidade criativa para
            contar histórias que conectam marcas e pessoas.
          </p>
          <p className="mt-4 text-mist-400">
            Trabalhamos lado a lado com nossos clientes, do briefing à entrega,
            garantindo que cada frame carregue intenção. Acreditamos que uma boa
            produção não se mede só pela beleza da imagem, mas pela história que
            ela é capaz de contar.
          </p>
        </Reveal>

        <div className="grid gap-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 100}>
              <div className="group flex gap-4 rounded-2xl border border-ink-700 bg-ink-850/50 p-6 transition-colors hover:border-sky-glow/50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-800 text-sky-glow transition-colors group-hover:bg-sky-glow group-hover:text-ink-950">
                  <pillar.icon size={22} />
                </div>
                <div>
                  <h3 className="font-medium text-mist-100">{pillar.title}</h3>
                  <p className="mt-1 text-sm text-mist-400">{pillar.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
