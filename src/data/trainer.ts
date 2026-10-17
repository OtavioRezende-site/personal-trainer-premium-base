import { assetPath } from "@/lib/paths";

export type VerifiedText = { text: string; verified: boolean };
export type TrainerService = {
  id: string; title: string; subtitle: string; description: string;
  details: string[]; image: string; imageAlt: string; enabled: boolean; verified: boolean;
};
export type TrainerConfig = {
  isDemo: boolean;
  name: string; firstName: string; lastName: string; initials: string; professionalTitle: string;
  brand: { background: string; surface: string; ivory: string; accent: string };
  hero: {
    eyebrow: string; headline: string[]; highlightLine: number; description: string;
    primaryCta: string; secondaryCta: string;
    desktopVideo: string; mobileVideo: string;
    desktopPoster: string; mobilePoster: string;
    desktopPosterSmall: string; mobilePosterSmall: string;
    desktopPosition: string; mobilePosition: string; tabletLandscapePosition: string; tabletPortraitPosition: string;
  };
  profile: {
    image: string; imageAlt: string; imagePosition: string; imageCaption: string;
    eyebrow: string; headline: string[]; biography: string[]; philosophy: string; signature: string;
  };
  credentials: VerifiedText[];
  personalized: {
    eyebrow: string; headline: string[]; description: string;
    pillars: { number: string; title: string; description: string }[];
  };
  services: TrainerService[];
  methodology: { title: string; description: string }[];
  differentiators: { title: string; description: string }[];
  gallery: { image: string; alt: string; label: string; position?: string; approved: boolean }[];
  testimonials: { quote: string; name: string; detail?: string; image?: string; authorized: boolean }[];
  serviceAreas: { city: string; region: string; location?: string; mapUrl?: string; verified: boolean }[];
  contact: { whatsapp: string | null; message: string; instagram: string | null; email: string | null };
  faq: { question: string; answer: string }[];
  finalCta: { eyebrow: string; headline: string[]; description: string; button: string };
  seo: { title: string; description: string; siteUrl: string | null; locale: string };
  sections: {
    about: boolean; personalized: boolean; services: boolean; methodology: boolean;
    differentiators: boolean; gallery: boolean; testimonials: boolean; location: boolean; faq: boolean;
  };
};

// Fictional profile. Replace with approved business data before disabling demo mode.
export const trainer: TrainerConfig = {
  isDemo: true,
  name: "Caio Almeida", firstName: "Caio", lastName: "Almeida", initials: "CA",
  professionalTitle: "Personal trainer",
  brand: { background: "#171916", surface: "#20231e", ivory: "#f2f1e9", accent: "#c4f35b" },
  hero: {
    eyebrow: "MOVIMENTO COM PROPÓSITO",
    headline: ["SEU CORPO.", "SEU PRÓXIMO", "NÍVEL."], highlightLine: 2,
    description: "Mais do que treinar. Construir uma versão mais forte de você, no seu ritmo e com direção.",
    primaryCta: "Começar minha evolução", secondaryCta: "Conheça o método",
    desktopVideo: assetPath("/videos/hero-desktop.mp4"), mobileVideo: assetPath("/videos/hero-mobile.mp4"),
    desktopPoster: assetPath("/images/hero-desktop.webp"), mobilePoster: assetPath("/images/hero-mobile.webp"),
    desktopPosterSmall: assetPath("/images/hero-desktop-small.webp"), mobilePosterSmall: assetPath("/images/hero-mobile-small.webp"),
    desktopPosition: "65% center", mobilePosition: "50% 35%", tabletLandscapePosition: "50% center", tabletPortraitPosition: "50% 55%",
  },
  profile: {
    image: assetPath("/images/trainer-demo.webp"), imageAlt: "Cena ilustrativa de um treinador em uma academia",
    imagePosition: "50% 38%", imageCaption: "Imagem ilustrativa · mídia de demonstração",
    eyebrow: "MUITO PRAZER, CAIO",
    headline: ["TREINAR É HUMANO.", "O PLANO TAMBÉM", "PRECISA SER."],
    biography: [
      "Cada pessoa chega ao treino com uma história. Uma rotina, um ponto de partida e um motivo para querer ir além.",
      "Na proposta deste perfil, o trabalho começa por escutar. Entender o que faz sentido para você e transformar essa conversa em um caminho possível, com intenção em cada movimento.",
    ],
    philosophy: "O melhor treino é aquele que faz sentido para a sua vida.",
    signature: "Caio Almeida",
  },
  credentials: [],
  personalized: {
    eyebrow: "FEITO PARA VOCÊ. DE VERDADE.",
    headline: ["VOCÊ NÃO É IGUAL", "A TODO MUNDO.", "SEU TREINO TAMBÉM NÃO."],
    description: "O ponto de partida é você. Seus objetivos, sua experiência e o tempo que você tem. Um plano individual considera tudo isso para que o treino encontre espaço na vida real.",
    pillars: [
      { number: "01", title: "Seu objetivo", description: "Mais força, condicionamento ou uma relação melhor com o movimento. O caminho começa com o que importa para você." },
      { number: "02", title: "Sua rotina", description: "Um planejamento que considera os seus horários, os equipamentos disponíveis e o seu dia a dia." },
      { number: "03", title: "Seu momento", description: "Experiência, preferências e necessidades individuais orientam a escolha e a progressão dos exercícios." },
    ],
  },
  services: [
    {
      id: "presencial", title: "PRESENÇA QUE\nFAZ DIFERENÇA.", subtitle: "Personal presencial",
      description: "Orientação próxima, atenção à execução e um treino que acompanha o seu momento. Movimento a movimento.",
      details: ["Acompanhamento durante o treino", "Atenção à execução dos movimentos", "Planejamento individual"],
      image: assetPath("/images/training-demo.webp"), imageAlt: "Cena ilustrativa de orientação durante um exercício com kettlebell",
      enabled: true, verified: false,
    },
    {
      id: "online", title: "SEU TREINO.\nONDE VOCÊ ESTIVER.", subtitle: "Acompanhamento online",
      description: "Uma proposta de orientação a distância, com planejamento pensado para os recursos e a rotina de cada pessoa.",
      details: ["Orientação a distância", "Treinos adaptados à sua estrutura", "Ajustes de planejamento"],
      image: assetPath("/images/online-demo.webp"), imageAlt: "Cena ilustrativa de preparação do equipamento de musculação",
      enabled: true, verified: false,
    },
    {
      id: "programa", title: "DIREÇÃO PARA\nO SEU MOVIMENTO.", subtitle: "Programa individualizado",
      description: "Uma estrutura de treino com propósito: exercícios, organização e progressão pensados para o seu ponto de partida.",
      details: ["Plano de exercícios individual", "Organização da rotina de treino", "Progressão conforme avaliação"],
      image: assetPath("/images/progress-demo.webp"), imageAlt: "Cena ilustrativa de treino com cordas na academia",
      enabled: true, verified: false,
    },
  ],
  methodology: [
    { title: "A conversa vem primeiro.", description: "Um primeiro contato para conhecer você, ouvir seus objetivos e entender o que procura no acompanhamento." },
    { title: "Entender antes de planejar.", description: "Sua rotina, experiência, preferências e necessidades ajudam a definir um ponto de partida realista." },
    { title: "Avaliar o ponto de partida.", description: "Uma avaliação inicial orienta as escolhas do plano, respeitando limites e necessidades individuais." },
    { title: "Um plano com a sua medida.", description: "Exercícios, frequência e progressão são organizados a partir das informações levantadas. Cada escolha tem um porquê." },
    { title: "Evoluir é ajustar o caminho.", description: "O acompanhamento do progresso permite rever o planejamento e ajustar o treino conforme a sua resposta." },
  ],
  differentiators: [
    { title: "Atenção a você", description: "Escuta e orientação individual para uma experiência de treino mais consciente." },
    { title: "Clareza no caminho", description: "Entender o que está fazendo e por quê é parte do processo." },
    { title: "Consistência possível", description: "Uma proposta que considera a vida fora da academia, sem fórmulas universais." },
    { title: "Evolução acompanhada", description: "Observar, conversar e ajustar. O plano acompanha o seu momento." },
  ],
  gallery: [
    { image: assetPath("/images/gallery-guidance.webp"), alt: "Cena ilustrativa de treinador orientando a execução de um exercício", label: "INTENÇÃO EM CADA MOVIMENTO", position: "60% center", approved: false },
    { image: assetPath("/images/gallery-focus.webp"), alt: "Cena ilustrativa de ajuste de carga em equipamento de academia", label: "ATENÇÃO AOS DETALHES", position: "55% center", approved: false },
    { image: assetPath("/images/gallery-energy.webp"), alt: "Cena ilustrativa de exercício com cordas e orientação de treinador", label: "PRESENÇA NO PROCESSO", position: "60% center", approved: false },
  ],
  testimonials: [], serviceAreas: [],
  contact: {
    whatsapp: null, // E.164 Brazil: "55" + DDD + phone number. Never use a fictional number.
    message: "Olá! Conheci seu trabalho pelo site e gostaria de conversar sobre um treino para mim.",
    instagram: null, email: null,
  },
  faq: [
    { question: "Preciso ter experiência para começar?", answer: "O planejamento individual parte da experiência de cada pessoa, inclusive de quem está começando. No primeiro contato, conte como é sua rotina e se já pratica alguma atividade, para que o profissional possa orientar os próximos passos." },
    { question: "Como funciona a primeira conversa?", answer: "É um momento para falar sobre seus objetivos, tirar dúvidas e conhecer a proposta de acompanhamento. Avaliação, formatos e condições devem ser confirmados diretamente com o profissional." },
    { question: "Posso treinar em casa ou na academia?", answer: "O plano pode considerar o ambiente e os equipamentos disponíveis. A possibilidade de atendimento em cada local e os formatos oferecidos precisam ser confirmados com o profissional." },
    { question: "O treino é realmente individualizado?", answer: "A proposta apresentada considera objetivos, rotina, experiência e necessidades pessoais. A avaliação inicial e o acompanhamento orientam a organização e os ajustes do planejamento." },
    { question: "Como consultar horários e valores?", answer: "Horários, disponibilidade e valores são informados diretamente pelo profissional. Este site é uma demonstração e não apresenta uma oferta comercial ou agenda de atendimento." },
  ],
  finalCta: {
    eyebrow: "SEU PRÓXIMO PASSO",
    headline: ["A MUDANÇA COMEÇA", "COM UM MOVIMENTO."],
    description: "Não precisa ter tudo resolvido. O primeiro passo pode ser uma boa conversa.",
    button: "Vamos conversar",
  },
  seo: {
    title: "Caio Almeida | Treino com propósito — Demonstração",
    description: "Uma experiência de treino centrada em você. Conheça este modelo demonstrativo de personal trainer, com planejamento individual e movimento com propósito.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null, locale: "pt_BR",
  },
  sections: {
    about: true, personalized: true, services: true, methodology: true,
    differentiators: true, gallery: true, testimonials: false, location: false, faq: true,
  },
};
