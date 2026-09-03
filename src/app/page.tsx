import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
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
        <About content={content.about} />
        <Services content={content.services} />
        <Portfolio projects={projects} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.contact} />
    </>
  );
}
