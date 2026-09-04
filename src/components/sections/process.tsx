import { Reveal } from "@/components/ui/reveal";
import type { ProcessContent } from "@/lib/supabase/types";

export function Process({ content }: { content: ProcessContent }) {
  return (
    <section
      id="processo"
      className="border-t border-ink-800 py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl leading-tight text-balance text-mist-100 sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-2xl font-light leading-relaxed text-mist-400">
            {content.description}
          </p>
        </Reveal>

        <div className="mt-16 sm:mt-20">
          {content.steps.map((step, i) => {
            const number = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={`${step.title}-${i}`} delay={i * 60}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink-800 py-8 sm:grid-cols-[6rem_1fr] sm:gap-10">
                  <span className="text-sm font-light text-mist-500 sm:text-base">
                    {number}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-normal text-mist-100 sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-light leading-relaxed text-mist-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
