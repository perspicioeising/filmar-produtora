import type { ServicesContent } from "@/lib/supabase/types";
import { resolveIcon } from "@/lib/content/icons";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function Services({ content }: { content: ServicesContent }) {
  return (
    <section
      id="servicos"
      className="bg-paper py-20 text-ink-950 sm:py-28 lg:py-36"
    >
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {content.eyebrow && (
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-deep">
                {content.eyebrow}
              </p>
            )}
            <h2 className="mt-5 text-4xl leading-[1.08] text-balance sm:text-5xl">
              {content.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-700">
              {content.paragraph}
            </p>
            <Button
              href="/#contato"
              variant="outline-dark"
              className="mt-8 hidden lg:inline-flex"
            >
              Conversar sobre meu projeto
            </Button>
          </div>
        </Reveal>

        <ul className="lg:col-span-7">
          {content.items.map((item, i) => {
            const Icon = resolveIcon(item.icon);
            return (
              <Reveal as="li" key={i} delay={i * 60}>
                <div className="group -mx-3 flex gap-5 rounded-2xl border-t border-ink-950/10 px-3 py-7 transition-colors duration-300 first:border-t-0 hover:bg-sky-glow/20 sm:gap-7 sm:py-9">
                  <span className="font-display text-sm text-ink-950/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl sm:text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-700 sm:text-base">
                      {item.text}
                    </p>
                  </div>
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-950 text-sky-glow transition-transform duration-300 group-hover:scale-110 sm:flex">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Button
          href="/#contato"
          variant="outline-dark"
          className="w-full lg:hidden"
        >
          Conversar sobre meu projeto
        </Button>
      </div>
    </section>
  );
}
