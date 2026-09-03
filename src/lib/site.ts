/**
 * Configuração de identidade do site (não editável pelo admin).
 *
 * Os dados de contato, redes sociais, descrição e textos das seções
 * agora são editáveis pelo painel e vivem em `src/lib/content/defaults.ts`
 * (com fallback) + tabela `site_content` no Supabase. Mantenha aqui apenas
 * o que é fixo por marca.
 */

export const siteConfig = {
  name: "Filmar Produtora",
  shortName: "Filmar",
  tagline: "Histórias em movimento",
};

export const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
] as const;
