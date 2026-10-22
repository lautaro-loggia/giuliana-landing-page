import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

// Inter: cuerpo de texto, interfaz y la marca.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Archivo: titulares. Variable en peso y ancho, así el hero puede
// contrastar una línea pesada contra dos más livianas en la misma familia.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

/**
 * URL pública del sitio, para los metadatos.
 * Una variable definida pero vacía rompía el build, porque `??` no cubre la
 * cadena vacía y `new URL("")` lanza. Acá se descarta cualquier valor que no
 * sirva y se cae a la URL que Vercel expone, o al dominio propio.
 */
function resolveSiteUrl(): URL {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    "https://gztraining.com.ar",
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    try {
      return new URL(/^https?:\/\//.test(value) ? value : `https://${value}`);
    } catch {
      // valor mal formado: se prueba el siguiente
    }
  }

  return new URL("https://gztraining.com.ar");
}

// Newsreader cursiva: solo para remarcar una palabra por título. Serif editorial
// con eje de tamaño óptico, así en grande gana contraste como una display.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-newsreader",
});

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Giuliana Zitella | Entrenamiento de fuerza online y presencial",
    template: "%s | GZ Training",
  },
  description:
    "Entrená con Giuliana Zitella, fitness coach y atleta de CrossFit. Planes de fuerza Starter y Premium, online o presencial, con seguimiento desde la app.",
  keywords: [
    "personal trainer",
    "entrenamiento online",
    "entrenamiento de fuerza",
    "CrossFit",
    "Buenos Aires",
    "Giuliana Zitella",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "GZ Training",
    title: "Giuliana Zitella | Entrenamiento de fuerza online y presencial",
    description:
      "Planes de fuerza a medida, seguimiento en la app y una coach que compite. Online o presencial.",
    images: [{ url: "/images/comp-smile.jpg", width: 1440, height: 960 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0b10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${archivo.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh bg-ink text-bone">
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
