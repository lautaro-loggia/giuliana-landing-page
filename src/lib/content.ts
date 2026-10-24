import { whatsappMessages } from "@/lib/site";

/**
 * Contenido editable de la sección "Resultados".
 *
 * Todos los casos son reales: una alumna con su antes y después, el proceso de
 * la propia Giuliana y el primer mensaje de otra alumna.
 * Un caso con `sample: true` se muestra etiquetado como ejemplo.
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
    id: "cambio-fisico",
    // Falta el nombre (o las iniciales) y su permiso para publicar fotos y texto.
    name: "Alumna de Giuliana",
    detail: "Antes y después",
    quote:
      "Cuando te hablé por primera vez, te dije que quería cambiar mi vida y sumar hábitos saludables. Hoy entrenar es mi plan de todos los días y me hace súper bien. ¡Gracias por eso!",
    before: {
      src: "/images/cambio-antes.jpg",
      alt: "La alumna antes de empezar, de frente, en su casa",
      label: "Antes",
    },
    after: {
      src: "/images/cambio-despues.jpg",
      alt: "La misma alumna después, sacándose una foto en el espejo del gimnasio",
      label: "Después",
    },
  },
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
    id: "primer-mensaje",
    // Extracto de su primer mensaje por WhatsApp. Falta el nombre y su permiso.
    name: "Alumna de Giuliana",
    detail: "Su primer mensaje, antes de empezar",
    quote:
      "Fui mamá hace casi 4 años y desde ese entonces no logré volver a mi cuerpo. Busco algo personalizado. Me gustaría empezar a entrenar, generar un hábito, constancia, y sentirme bien con uno mismo.",
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
    a: "Depende del plan. En Premium reviso lo que registrás en la app todas las semanas; en Starter, una vez por mes. En los dos, el bloque completo cambia cada 4 a 6 semanas.",
  },
  {
    q: "¿Qué diferencia hay entre Starter y Premium?",
    a: "Los dos tienen un plan de fuerza armado para vos en la app. Premium suma check-in semanal, corrección de técnica con tus videos y check-ins con fotos y medidas. Si no sabés cuál te conviene, escribime y lo charlamos.",
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
  /** Línea que aparece antes de la lista (ej. "Todo lo de Starter, más:") */
  includesLabel?: string;
  items: string[];
  cta: string;
  /** Mensaje con el que se abre WhatsApp al tocar el botón del plan */
  whatsappMessage: string;
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
    whatsappMessage: whatsappMessages.starter,
  },
  {
    id: "premium",
    name: "Premium",
    lead: "Seguimiento de cerca: ajustes cada semana y tu técnica revisada en video.",
    includesLabel: "Todo lo de Starter, más:",
    items: [
      "Check-in semanal con ajustes",
      "Corrección de técnica con tus videos",
      "Check-ins con fotos y medidas",
      "Contacto directo por WhatsApp",
    ],
    cta: "Quiero Premium",
    whatsappMessage: whatsappMessages.premium,
    featured: true,
  },
];
