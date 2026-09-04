import { Reveal } from "@/components/ui/reveal";
import type { TransitionContent } from "@/lib/supabase/types";

export function Transition({ content }: { content: TransitionContent }) {
  return (
    <section id="transicao" className="py-32 sm:py-44 lg:py-56">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="text-balance text-center text-2xl font-light leading-[1.4] text-mist-300 sm:text-3xl md:text-4xl">
            {content.text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
