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

export const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Estúdio", href: "#estudio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Trabalhos", href: "#portfolio" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
] as const;
