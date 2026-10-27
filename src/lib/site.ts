export const site = {
  name: "GZ Training",
  coach: "Giuliana Zitella",
  role: "Preparadora física",
  instagram: "https://www.instagram.com/giulianazitella/",
  instagramHandle: "@giulianazitella",
  whatsapp: "https://wa.me/5491161740977",
  whatsappLabel: "+54 9 11 6174-0977",
  ctaLabel: "Empezar mi cambio",
};

/**
 * WhatsApp es el único canal de contacto. Cada botón abre el chat con un
 * mensaje ya escrito, así Giuli sabe desde dónde llega cada consulta.
 */
export const whatsappMessages = {
  general: "¡Hola Giuli! Quiero empezar a entrenar con vos.",
  base: "¡Hola Giuli! Me interesa el plan Base.",
  full: "¡Hola Giuli! Me interesa el plan Full.",
  consulta: "¡Hola Giuli! Tengo una consulta.",
} as const;

export function whatsappLink(message: string = whatsappMessages.general) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Mismo orden que las secciones de la página
export const nav = [
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Método", href: "#metodo" },
  { label: "Planes", href: "#planes" },
  { label: "Preguntas", href: "#preguntas" },
];
