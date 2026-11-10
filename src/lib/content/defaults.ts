import type {
  AboutContent,
  BeliefsContent,
  ContactContent,
  HeroContent,
  PortfolioContent,
  ProcessContent,
  ServicesContent,
  SiteContent,
  StudioContent,
  TransitionContent,
} from "@/lib/supabase/types";

/**
 * Conteúdo padrão da landing page (Filmar).
 *
 * Funciona como fallback quando o Supabase está vazio ou indisponível,
 * garantindo que a página nunca fique vazia. Os textos editados no admin
 * são mesclados sobre estes defaults (ver getSiteContent).
 */

const heroDefault: HeroContent = {
  eyebrow: "Produtora audiovisual",
  title: "Filmar é encontrar o que existe entre a história e o olhar.",
  description:
    "Direção e produção audiovisual para marcas, lugares e experiências.",
  cta: "Explorar portfólio",
  mediaUrl: "",
};

const transitionDefault: TransitionContent = {
  text: "Antes de criar uma imagem, é preciso entender o que existe por trás dela.",
};

const aboutDefault: AboutContent = {
  title: "Sobre mim",
  openingLine:
    "Nem toda história precisa ser inventada. Algumas só precisam ser percebidas.",
  paragraphs: [
    "Sou Andressa Bittencourt, diretora criativa e fundadora da Filmar.",
    "Meu trabalho nasce da curiosidade de observar pessoas, lugares e marcas antes mesmo de ligar a câmera. Acredito que um bom filme não é construído apenas por imagens bonitas, mas pela capacidade de revelar aquilo que torna cada projeto particular.",
    "Entre a publicidade, o turismo, a gastronomia, a hospitalidade e os pequenos negócios, encontrei um espaço onde a comunicação pode ser mais humana, mais sensível e menos apressada.",
    "Cada projeto começa com escuta. Procuro entender contextos, intenções e aquilo que torna cada trabalho diferente do outro para, então, encontrar a forma de contar isso através da imagem.",
  ],
  photoUrl: "",
};

const studioDefault: StudioContent = {
  title: "Quem é a Filmar",
  tagline: "Um estúdio independente de direção e produção audiovisual.",
  paragraphs: [
    "A Filmar nasceu do desejo de construir uma comunicação que não dependesse apenas da velocidade das tendências.",
    "Trabalhamos de perto com cada projeto, participando das escolhas que vão da concepção à entrega. A linguagem visual precisa nascer do que está sendo comunicado — e não o contrário.",
    "Por isso, cada produção encontra seu próprio ritmo, estética e abordagem.",
  ],
  pillars: [
    {
      icon: "Aperture",
      title: "Direção",
      text: "Ideias ganham forma a partir de escolhas conscientes de linguagem, ritmo e atmosfera.",
    },
    {
      icon: "Clapperboard",
      title: "Produção",
      text: "Do planejamento à execução, organizamos cada etapa para que a intenção do projeto esteja presente em cada detalhe.",
    },
    {
      icon: "Film",
      title: "Pós-produção",
      text: "Montagem, som, cor e finalização trabalham juntos para dar unidade ao que foi construído.",
    },
  ],
};

const servicesDefault: ServicesContent = {
  eyebrow: "Serviços",
  title: "O que podemos construir juntos",
  paragraph:
    "Cada projeto pede uma abordagem diferente. Desenvolvemos e produzimos trabalhos audiovisuais para comunicar, apresentar e aproximar.",
  items: [
    {
      icon: "Megaphone",
      title: "Marcas",
      text: "Filmes que apresentam produtos, serviços e posicionamentos de forma coerente com a identidade de cada marca.",
    },
    {
      icon: "MapPin",
      title: "Lugares",
      text: "Conteúdo audiovisual para hotéis, restaurantes, destinos e espaços que querem despertar o desejo de estar ali.",
    },
    {
      icon: "Sparkles",
      title: "Experiências",
      text: "Filmes que transformam acontecimentos, encontros e momentos em algo que pode ser revivido através da imagem.",
    },
    {
      icon: "Film",
      title: "Projetos autorais",
      text: "Documentários, ensaios e projetos desenvolvidos a partir de interesses, encontros e histórias que despertam curiosidade.",
    },
  ],
};

const portfolioDefault: PortfolioContent = {
  title: "Trabalhos selecionados",
  description: "Alguns projetos que passaram pelas nossas mãos.",
};

const processDefault: ProcessContent = {
  title: "Como trabalhamos",
  description:
    "Cada projeto começa em um lugar diferente. Nosso trabalho é entender onde ele está e construir, junto com você, o caminho até a imagem final.",
  steps: [
    {
      title: "Conversa",
      text: "Entendemos o projeto, seus objetivos e o contexto em que ele existe.",
    },
    {
      title: "Direção",
      text: "Desenvolvemos o conceito e definimos a linguagem que melhor traduz a proposta.",
    },
    {
      title: "Produção",
      text: "Planejamos e realizamos tudo o que precisa acontecer para transformar a ideia em imagem.",
    },
    {
      title: "Montagem",
      text: "Organizamos ritmo, som, cor e narrativa até encontrar a forma final.",
    },
    {
      title: "Entrega",
      text: "O projeto ganha seus formatos finais e segue pronto para encontrar o público.",
    },
  ],
};

const beliefsDefault: BeliefsContent = {
  title: "O que acreditamos",
  paragraphs: [
    "A comunicação não precisa parecer com todo o resto para funcionar.",
    "Uma imagem pode informar, mas também pode criar desejo, provocar curiosidade e fazer alguém parar por alguns segundos.",
    "É nesse espaço entre comunicar e despertar interesse que gostamos de trabalhar.",
  ],
};

const contactDefault: ContactContent = {
  eyebrow: "Contato",
  title: "O que você quer dizer?",
  paragraph: "A gente começa por aí.",
  cta: "Vamos conversar",
  email: "contato@filmarprodutora.com",
  phone: "+55 (11) 90000-0000",
  whatsapp: "5511900000000",
  location: "São Paulo, Brasil",
  instagram: "https://instagram.com/filmarprodutora",
  youtube: "https://youtube.com/@filmarprodutora",
  vimeo: "https://vimeo.com/filmarprodutora",
  description:
    "Estúdio independente de direção e produção audiovisual para marcas, lugares e experiências.",
};

export const defaultSiteContent: SiteContent = {
  hero: heroDefault,
  transition: transitionDefault,
  about: aboutDefault,
  studio: studioDefault,
  services: servicesDefault,
  portfolio: portfolioDefault,
  process: processDefault,
  beliefs: beliefsDefault,
  contact: contactDefault,
};
