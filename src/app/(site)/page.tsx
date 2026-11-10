import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Transition } from "@/components/sections/transition";
import { About } from "@/components/sections/about";
import { Studio } from "@/components/sections/studio";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Beliefs } from "@/components/sections/beliefs";
import { Contact } from "@/components/sections/contact";
import { getProjects } from "@/lib/data/projects";
import { getSiteContent } from "@/lib/data/site-content";

export const dynamic = "force-dynamic";

/**
 * Ritmo visual da página (cada seção troca o fundo, como cenas):
 * hero (escuro) → trabalhos (escuro) → manifesto (azul) → sobre (claro) →
 * estúdio (escuro) → serviços (claro) → processo (escuro) → crenças (azul) →
 * contato (escuro).
 */
export default async function Home() {
  const [projects, content] = await Promise.all([
    getProjects(),
    getSiteContent(),
  ]);

  return (
    <>
      <Hero content={content.hero} />
      <Portfolio projects={projects} content={content.portfolio} />
      <Transition content={content.transition} />
      <About content={content.about} />
      <Studio content={content.studio} />
      <Services content={content.services} />
      <Process content={content.process} />
      <Beliefs content={content.beliefs} />
      <Contact content={content.contact} />
    </>
  );
}
