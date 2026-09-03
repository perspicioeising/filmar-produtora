import type {
  AboutContent,
  ContactContent,
  HeroContent,
  ServicesContent,
  SiteContent,
} from "@/lib/supabase/types";

/**
 * Conteúdo padrão da landing page.
 *
 * Extraído do conteúdo hardcoded original (site.ts + componentes de seção).
 * Funciona como fallback quando o Supabase está vazio ou indisponível,
 * garantindo que a página nunca fique vazia. Os textos editados no admin
 * são mesclados sobre estes defaults (ver getSiteContent).
 */

const heroDefault: HeroContent = {
  badge: "Produtora Audiovisual",
  titlePrefix: "Damos vida às suas ",
  titleHighlight: "histórias",
  titleSuffix: " em movimento",
  paragraph:
    "Da concepção à entrega, produzimos comerciais, clipes, coberturas de eventos e motion design com uma linguagem visual marcante e cinematográfica.",
  primaryCta: "Ver portfólio",
  secondaryCta: "Começar um projeto",
  metrics: [
    { value: "+120", label: "Projetos entregues" },
    { value: "+8", label: "Anos de estrada" },
    { value: "+50", label: "Marcas atendidas" },
  ],
};

const aboutDefault: AboutContent = {
  eyebrow: "Quem somos",
  title: "Uma produtora movida por imagem, ritmo e emoção",
  paragraph1:
    "A Filmar Produtora nasceu do desejo de transformar ideias em experiências audiovisuais memoráveis. Somos um time enxuto e apaixonado que une técnica apurada e sensibilidade criativa para contar histórias que conectam marcas e pessoas.",
  paragraph2:
    "Trabalhamos lado a lado com nossos clientes, do briefing à entrega, garantindo que cada frame carregue intenção. Acreditamos que uma boa produção não se mede só pela beleza da imagem, mas pela história que ela é capaz de contar.",
  pillars: [
    {
      icon: "Eye",
      title: "Olhar autoral",
      text: "Cada projeto começa com uma leitura cuidadosa da sua marca e do que ela precisa comunicar.",
    },
    {
      icon: "Clapperboard",
      title: "Produção completa",
      text: "Roteiro, direção, captação, edição e finalização — tudo sob o mesmo teto, com processo transparente.",
    },
    {
      icon: "Sparkles",
      title: "Acabamento premium",
      text: "Color grading, sound design e motion que elevam o resultado ao nível de cinema.",
    },
  ],
};

const servicesDefault: ServicesContent = {
  eyebrow: "O que fazemos",
  title: "Serviços audiovisuais de ponta a ponta",
  paragraph:
    "Cobrimos todas as etapas da produção. Escolha um formato ou combine vários — montamos o pacote ideal para o seu objetivo.",
  items: [
    {
      icon: "Megaphone",
      title: "Comerciais",
      text: "Filmes publicitários para TV e digital que posicionam sua marca com impacto e clareza.",
    },
    {
      icon: "Music",
      title: "Clipes",
      text: "Videoclipes com direção de arte marcante e narrativa visual alinhada à identidade do artista.",
    },
    {
      icon: "CalendarDays",
      title: "Eventos",
      text: "Cobertura e aftermovies que capturam a energia do seu evento com dinamismo e emoção.",
    },
    {
      icon: "Wand2",
      title: "Motion Design",
      text: "Animação, motion graphics e VFX para dar movimento e vida às suas ideias e produtos.",
    },
  ],
};

const contactDefault: ContactContent = {
  eyebrow: "Vamos conversar",
  title: "Conte sua ideia. A gente coloca em movimento.",
  paragraph:
    "Preencha o formulário ou fale com a gente pelos canais abaixo. Respondemos rápido e adoramos um bom projeto.",
  email: "contato@filmarprodutora.com",
  phone: "+55 (11) 90000-0000",
  whatsapp: "5511900000000",
  location: "São Paulo, Brasil",
  instagram: "https://instagram.com/filmarprodutora",
  youtube: "https://youtube.com/@filmarprodutora",
  vimeo: "https://vimeo.com/filmarprodutora",
  description:
    "Produtora audiovisual especializada em comerciais, clipes, coberturas de eventos e motion design.",
};

export const defaultSiteContent: SiteContent = {
  hero: heroDefault,
  about: aboutDefault,
  services: servicesDefault,
  contact: contactDefault,
};
