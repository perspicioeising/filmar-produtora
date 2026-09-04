import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Transition } from "@/components/sections/transition";
import { About } from "@/components/sections/about";
import { Studio } from "@/components/sections/studio";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { Beliefs } from "@/components/sections/beliefs";
import { Contact } from "@/components/sections/contact";
import { getProjects } from "@/lib/data/projects";
import { getSiteContent } from "@/lib/data/site-content";

// A home carrega o portfólio e o conteúdo do Supabase a cada requisição.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, content] = await Promise.all([
    getProjects(),
    getSiteContent(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero content={content.hero} />
        <Transition content={content.transition} />
        <About content={content.about} />
        <Studio content={content.studio} />
        <Services content={content.services} />
        <Portfolio projects={projects} content={content.portfolio} />
        <Process content={content.process} />
        <Beliefs content={content.beliefs} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.contact} />
    </>
  );
}
