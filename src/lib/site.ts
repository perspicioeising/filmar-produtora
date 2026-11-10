/**
 * Configuração de identidade do site (não editável pelo admin).
 *
 * Os dados de contato, redes sociais, descrição e textos das seções
 * agora são editáveis pelo painel e vivem em `src/lib/content/defaults.ts`
 * (com fallback) + tabela `site_content` no Supabase. Mantenha aqui apenas
 * o que é fixo por marca.
 */

export const siteConfig = {
  name: "Filmar",
  shortName: "Filmar",
  tagline: "Direção e produção audiovisual",
};

/** Links com "/#" para funcionarem também a partir das páginas de projeto. */
export const navLinks = [
  { label: "Trabalhos", href: "/#portfolio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Processo", href: "/#processo" },
  { label: "Contato", href: "/#contato" },
] as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://filmarprodutora.com";
