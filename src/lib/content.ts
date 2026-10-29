import { whatsappMessages } from "@/lib/site";

/**
 * Contenido editable de la sección "Resultados".
 *
 * Todo es real: el cambio físico de una alumna (antes y después, con su
 * testimonio resumido) y, al costado, lo que cuentan otras alumnas.
 */
export type Photo = { src: string; alt: string };

export type Testimonial = {
  id: string;
  name: string;
  detail: string;
  quote: string;
};

/** El caso principal: las fotos se alternan solas entre el antes y el después */
export const featuredCase: Testimonial & { before: Photo; after: Photo } = {
  id: "cambio-fisico",
  name: "Florencia Ramirez",
  detail: "Antes y después",
  // Resumen de su mensaje: "Cuando te hablé por primera vez, te dije que
  // quería cambiar mi vida y sumar hábitos saludables. Hoy entrenar es mi plan
  // de todos los días y me hace súper bien. ¡Gracias por eso!"
  quote: "Quería cambiar mi vida y sumar hábitos saludables. Hoy entrenar es mi plan de todos los días y me hace súper bien 💖",
  before: {
    src: "/images/cambio-antes.jpg",
    alt: "La alumna antes de empezar, de frente, en su casa",
  },
  after: {
    src: "/images/cambio-despues.jpg",
    alt: "La misma alumna después, sacándose una foto en el espejo del gimnasio",
  },
};

export const testimonials: Testimonial[] = [
  {
    id: "dos-anos",
    // Mensaje reenviado por WhatsApp
    name: "Lucila Badano",
    detail: "Entrena con Giuli hace casi 2 años",
    quote:
      "Lo que sabe esta mujer y el amor que le pone a lo que hace es de otro nivel. Progresé un montón: sabe llevarte muy bien a que te desafíes y cada vez te animes a ir por más. Si estás pensando entrenar con ella, ni lo dudes 🤍",
  },
  {
    id: "primer-mensaje",
    // Extracto de su primer mensaje por WhatsApp
    name: "Florencia Ramirez",
    detail: "Su primer mensaje, antes de empezar",
    quote:
      "Fui mamá hace casi 4 años y desde ese entonces no logré volver a mi cuerpo. Me gustaría empezar a entrenar, generar un hábito, constancia, y sentirme bien con uno mismo.",
  },
];

export const faqs = [
  {
    q: "¿Es para cualquier persona?",
    a: "Sí. Entreno a cualquier persona que quiera ganar fuerza, sin importar edad, género o punto de partida. El plan se arma alrededor de tu objetivo.",
  },
  {
    q: "¿Necesito experiencia para arrancar?",
    a: "No. El plan se arma desde tu nivel actual. Si nunca levantaste una barra, empezamos por la técnica y las cargas suben cuando corresponde.",
  },
  {
    q: "¿Qué material necesito para el plan online?",
    a: "Con un gimnasio alcanza. Si entrenás en casa, lo adaptamos a lo que tengas: mancuernas, bandas, una barra. Lo definimos cuando hablemos.",
  },
  {
    q: "¿Cada cuánto cambia el plan?",
    a: "En los dos planes reviso lo que registrás en la app y ajusto la rutina dos veces por mes.",
  },
  {
    q: "¿Qué diferencia hay entre Base y Full?",
    a: "Los dos tienen tu rutina en la app, con videos y explicaciones de cada ejercicio, y ajustes dos veces por mes. El Full suma corrección de técnica con tus videos y una comunicación más fluida conmigo por WhatsApp. Si no sabés cuál te conviene, escribime y lo charlamos.",
  },
  {
    q: "¿Cuánto cuestan los planes?",
    a: "Depende del plan que elijas. Te paso los valores por WhatsApp y te ayudo a ver cuál te conviene, sin compromiso.",
  },
  {
    q: "¿Puedo entrenar embarazada o en posparto?",
    a: "Sí, con el aval de tu médico. Entrené durante todo mi embarazo y adapto cargas, ejercicios y volumen a cada etapa.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Me escribís por WhatsApp. Me contás qué buscás y cómo es tu semana, y te digo qué plan te conviene. Sin compromiso.",
  },
];

/**
 * Planes de la sección "Planes". Es una propuesta para validar con Giuliana:
 * qué incluye cada nivel y si se muestran precios (hoy no se muestran).
 */
export type Plan = {
  id: string;
  name: string;
  lead: string;
  items: string[];
  cta: string;
  /** Mensaje con el que se abre WhatsApp al tocar el botón del plan */
  whatsappMessage: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "base",
    name: "Base",
    lead: "Tu rutina hecha a medida, para entrenar con autonomía y mi seguimiento.",
    items: [
      "Rutina personalizada en la app",
      "Video y explicación de cada ejercicio",
      "Registrás tus series y pesos, y yo los veo",
      "Ajusto tu rutina dos veces por mes",
    ],
    cta: "Quiero Base",
    whatsappMessage: whatsappMessages.base,
  },
  {
    id: "full",
    name: "Full",
    lead: "Para avanzar más rápido: te sigo de cerca y te corrijo la técnica.",
    items: [
      "Todo lo del plan Base",
      "Me mandás videos de tus series y te corrijo la técnica",
      "Comunicación más fluida conmigo por WhatsApp",
    ],
    cta: "Quiero Full",
    whatsappMessage: whatsappMessages.full,
    featured: true,
  },
];
