export const site = {
  name: "GZ Training",
  coach: "Giuliana Zitella",
  role: "Preparadora física",
  instagram: "https://www.instagram.com/giulianazitella/",
  instagramHandle: "@giulianazitella",
  whatsapp: "https://wa.me/5491161740977",
  whatsappLabel: "+54 9 11 6174-0977",
  ctaLabel: "Quiero empezar",
};

/**
 * WhatsApp es el único canal de contacto. Cada botón abre el chat con un
 * mensaje ya escrito, así Giuli sabe desde dónde llega cada consulta.
 */
export const whatsappMessages = {
  general: "¡Hola Giuli! Quiero empezar a entrenar con vos.",
  starter: "¡Hola Giuli! Me interesa el plan Starter.",
  premium: "¡Hola Giuli! Me interesa el plan Premium.",
  presencial: "¡Hola Giuli! Me interesa el entrenamiento presencial.",
  consulta: "¡Hola Giuli! Tengo una consulta.",
} as const;

export function whatsappLink(message: string = whatsappMessages.general) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Planes", href: "#planes" },
  { label: "Método", href: "#metodo" },
  { label: "App", href: "#app" },
  { label: "Resultados", href: "#resultados" },
  { label: "Preguntas", href: "#preguntas" },
];
