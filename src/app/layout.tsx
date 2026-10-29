import type { Metadata, Viewport } from "next";
import { Geist, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { resolveSiteUrl } from "@/lib/site-url";
import { SmoothScroll } from "@/components/SmoothScroll";

// Inter: cuerpo de texto, interfaz y la marca.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Geist: titulares, en semibold.
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});


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
    default: "Giuliana Zitella | Personal trainer online y entrenamiento de fuerza",
    template: "%s | GZ Training",
  },
  description:
    "Entrená online con Giuliana Zitella, preparadora física y atleta de CrossFit. Plan a tu medida en la app, con videos de cada ejercicio y ajustes dos veces por mes. Planes Base y Full.",
  keywords: [
    "personal trainer online",
    "entrenamiento online",
    "entrenamiento de fuerza",
    "plan de entrenamiento personalizado",
    "preparadora física",
    "musculación",
    "CrossFit",
    "halterofilia",
    "Argentina",
    "Giuliana Zitella",
  ],
  authors: [{ name: "Giuliana Zitella" }],
  // Una sola URL para la portada: las versiones /oscura y /mixto no se indexan
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "GZ Training",
    url: "/",
    title: "Giuliana Zitella | Personal trainer online",
    description:
      "Tu cambio no empieza el lunes. Empieza hoy. Plan de entrenamiento a tu medida, en la app y con seguimiento.",
    // Pieza armada para compartir: marca, el lema del hero y la foto de Giuli
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Giuliana Zitella: Tu cambio no empieza el lunes. Empieza hoy.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/images/og.jpg"] },
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
    <html lang="es-AR" className={`${inter.variable} ${geist.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh bg-ink text-bone">
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
