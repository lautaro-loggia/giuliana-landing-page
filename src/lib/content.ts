/**
 * Contenido editable de la sección "Resultados".
 *
 * El primer caso es real (el proceso de la propia Giuliana, con fotos suyas).
 * Los casos marcados con `sample: true` son EJEMPLOS de estructura y deben
 * reemplazarse por testimonios reales (nombre, texto y, si hay, fotos antes/después
 * en /public/images). Mientras sean ejemplos, la página los muestra etiquetados.
 */
export type Case = {
  id: string;
  name: string;
  detail: string;
  quote: string;
  before?: { src: string; alt: string; label: string };
  after?: { src: string; alt: string; label: string };
  /**
   * Foto de referencia para los casos de ejemplo. Se muestra con su leyenda,
   * así queda claro que no es la persona del testimonio: es para ver cómo queda la tarjeta.
   */
  photo?: { src: string; alt: string };
  sample?: boolean;
};

export const cases: Case[] = [
  {
    id: "giuliana",
    name: "Giuliana Zitella",
    detail: "Mi propio proceso",
    quote:
      "Me prometí entrenar todo el embarazo y lo cumplí. Cambió la carga, cambió el volumen, no cambió el hábito.",
    before: {
      src: "/images/wtc-pullups.jpg",
      alt: "Giuliana compitiendo en la barra",
      label: "Competencia",
    },
    after: {
      src: "/images/pregnant-gym.jpg",
      alt: "Giuliana entrenando embarazada en el gimnasio",
      label: "Embarazo",
    },
  },
  {
    id: "ejemplo-1",
    sample: true,
    photo: {
      src: "/images/front-rack.jpg",
      alt: "Foto de referencia: barra en posición de front rack",
    },
    name: "Nombre y apellido",
    detail: "6 meses de plan Starter",
    quote:
      "Acá va un testimonio real. Dos o tres líneas alcanzan: qué buscaba, qué cambió y cómo se siente hoy.",
  },
  {
    id: "ejemplo-2",
    sample: true,
    photo: {
      src: "/images/alumnas-group.jpg",
      alt: "Foto de referencia: grupo después de una sesión en el box",
    },
    name: "Nombre y apellido",
    detail: "Plan Premium",
    quote:
      "Segundo testimonio de ejemplo. Si hay fotos antes y después, se cargan en before/after y aparece el comparador.",
  },
  {
    id: "ejemplo-3",
    sample: true,
    photo: {
      src: "/images/overhead-squat.jpg",
      alt: "Foto de referencia: overhead squat en el box",
    },
    name: "Nombre y apellido",
    detail: "Premium + presencial",
    quote:
      "Tercer testimonio de ejemplo. Reemplazar en src/lib/content.ts.",
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
    a: "Con un gimnasio alcanza. Si entrenás en casa, lo adaptamos a lo que tengas: mancuernas, bandas, una barra. Lo definimos en la llamada.",
  },
  {
    q: "¿Cada cuánto cambia el plan?",
    a: "Depende del plan. En Premium reviso lo que registrás en la app todas las semanas; en Starter, una vez por mes. En los dos, el bloque completo cambia cada 4 a 6 semanas.",
  },
  {
    q: "¿Qué diferencia hay entre Starter y Premium?",
    a: "Los dos tienen un plan de fuerza armado para vos en la app. Premium suma check-in semanal, corrección de técnica con tus videos y devoluciones de nutrición. Si no sabés cuál te conviene, lo vemos en la llamada.",
  },
  {
    q: "¿Puedo entrenar embarazada o en posparto?",
    a: "Sí, con el aval de tu médico. Entrené durante todo mi embarazo y adapto cargas, ejercicios y volumen a cada etapa.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Reservás una charla de 20 minutos. Me contás qué buscás y cómo es tu semana, y te digo qué plan te conviene. Sin compromiso.",
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
  /** Línea que aparece antes de la lista (ej. "Todo lo de Starter, más:") */
  includesLabel?: string;
  items: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    lead: "Para arrancar con una base sólida y entrenar con un plan pensado para vos.",
    items: [
      "Plan de fuerza personalizado",
      "Video y técnica de cada ejercicio",
      "Registro de series y cargas en la app",
      "Revisión y ajuste del plan una vez por mes",
      "Bloque nuevo cada 4 a 6 semanas",
    ],
    cta: "Quiero Starter",
  },
  {
    id: "premium",
    name: "Premium",
    lead: "Seguimiento de cerca en todo: entrenamiento, técnica y alimentación.",
    includesLabel: "Todo lo de Starter, más:",
    items: [
      "Check-in semanal con ajustes",
      "Corrección de técnica con tus videos",
      "Devoluciones de nutrición sobre tus comidas",
      "Check-ins con fotos y medidas",
      "Contacto directo por WhatsApp",
    ],
    cta: "Quiero Premium",
    featured: true,
  },
];

export const presencial = {
  title: "Entrenamiento presencial",
  lead: "Sesiones 1 a 1 o en grupo reducido. Se suma a cualquiera de los dos planes.",
  items: [
    "Individual o grupo reducido",
    "Técnica de levantamientos",
    "Planificación por ciclos",
    "Combinable con Starter o Premium",
  ],
};
