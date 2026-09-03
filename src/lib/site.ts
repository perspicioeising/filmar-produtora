/** Configuração central do site — usada por navbar, footer e seções. */

export const siteConfig = {
  name: "Filmar Produtora",
  shortName: "Filmar",
  tagline: "Histórias em movimento",
  description:
    "Produtora audiovisual especializada em comerciais, clipes, coberturas de eventos e motion design.",
  email: "contato@filmarprodutora.com",
  phone: "+55 (11) 90000-0000",
  whatsapp: "5511900000000",
  location: "São Paulo, Brasil",
  socials: {
    instagram: "https://instagram.com/filmarprodutora",
    youtube: "https://youtube.com/@filmarprodutora",
    vimeo: "https://vimeo.com/filmarprodutora",
  },
};

export const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
] as const;
