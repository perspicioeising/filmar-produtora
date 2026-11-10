import type { ProcessContent } from "@/lib/supabase/types";
import { Reveal } from "@/components/ui/reveal";

export function Process({ content }: { content: ProcessContent }) {
  return (
    <section id="processo" className="bg-ink-950 py-20 sm:py-28 lg:py-36">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="text-4xl leading-[1.08] text-balance text-mist-100 sm:text-5xl lg:col-span-7 lg:text-6xl">
            {content.title}
          </h2>
          <p className="text-base leading-relaxed text-mist-400 lg:col-span-5">
            {content.description}
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-0 sm:mt-20 lg:grid-flow-col lg:auto-cols-fr lg:gap-6">
          {content.steps.map((step, i) => (
            <Reveal as="li" key={i} delay={i * 70} className="group/step">
              <div className="relative flex gap-5 pb-10 lg:block lg:pb-0">
                {/* Linha do tempo: vertical no mobile, horizontal no desktop */}
                <span
                  aria-hidden
                  className="absolute left-[1.3rem] top-12 h-[calc(100%-3rem)] w-px bg-mist-100/15 group-last/step:hidden lg:left-14 lg:top-[1.3rem] lg:h-px lg:w-[calc(100%-3.5rem)]"
                />
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-glow/60 bg-ink-950 font-display text-sm text-sky-glow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-8">
                  <h3 className="text-2xl text-mist-100">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-400">
                    {step.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
