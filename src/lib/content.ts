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
   * así queda claro que no es la alumna: es para ver cómo queda la tarjeta.
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
    name: "Nombre de la alumna",
    detail: "6 meses de plan online",
    quote:
      "Acá va un testimonio real de una alumna. Dos o tres líneas alcanzan: qué buscaba, qué cambió y cómo se siente hoy.",
  },
  {
    id: "ejemplo-2",
    sample: true,
    photo: {
      src: "/images/team-bearfit.jpg",
      alt: "Foto de referencia: grupo de entrenamiento",
    },
    name: "Nombre de la alumna",
    detail: "Presencial en El Talar",
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
    name: "Nombre de la alumna",
    detail: "Online + presencial",
    quote:
      "Tercer testimonio de ejemplo. Reemplazar en src/lib/content.ts.",
  },
];

export const faqs = [
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
    a: "Lo reviso todas las semanas con lo que registrás en la app. Las progresiones se ajustan en el momento y el bloque completo cambia cada 4 a 6 semanas.",
  },
  {
    q: "¿Dónde es el entrenamiento presencial?",
    a: "En El Talar, zona norte de Buenos Aires. Las sesiones son individuales o en grupo reducido.",
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
