export const site = {
  name: "GZ Training",
  coach: "Giuliana Zitella",
  role: "Preparadora física",
  instagram: "https://www.instagram.com/giulianazitella/",
  instagramHandle: "@giulianazitella",
  whatsapp: "https://wa.me/5491161740977",
  whatsappLabel: "+54 9 11 6174-0977",
  location: "El Talar, Buenos Aires",
  // Cal.com: set NEXT_PUBLIC_CAL_LINK to "usuario/evento" (ej. "giulianazitella/llamada")
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",
  calNamespace: "llamada",
  ctaLabel: "Entrenemos juntas",
};

export const nav = [
  { label: "Planes", href: "#planes" },
  { label: "Método", href: "#metodo" },
  { label: "App", href: "#app" },
  { label: "Resultados", href: "#resultados" },
  { label: "Preguntas", href: "#preguntas" },
];
