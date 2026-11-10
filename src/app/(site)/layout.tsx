import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { getSiteContent } from "@/lib/data/site-content";

export const dynamic = "force-dynamic";

/** Indica se há um admin logado (nunca lança). */
async function getIsAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return Boolean(user);
  } catch {
    return false;
  }
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [{ contact }, isAdmin] = await Promise.all([
    getSiteContent(),
    getIsAdmin(),
  ]);

  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-sky-glow px-5 py-3 text-sm font-medium text-ink-950 transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Navbar email={contact.email} instagram={contact.instagram} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer content={contact} />
      <WhatsAppButton number={contact.whatsapp} />

      {/* Atalho para o painel, visível só para quem já está logado */}
      {isAdmin && (
        <Link
          href="/admin"
          className="fixed bottom-5 left-5 z-40 flex h-12 items-center gap-2 rounded-full border border-mist-100/20 bg-ink-950/90 px-5 text-sm text-mist-100 shadow-lg shadow-black/40 backdrop-blur transition-colors hover:border-sky-glow hover:text-sky-glow sm:bottom-8 sm:left-8"
        >
          <LayoutDashboard size={16} />
          Painel
        </Link>
      )}
    </>
  );
}
