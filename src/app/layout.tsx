import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gztraining.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Giuliana Zitella | Entrenamiento de fuerza online y presencial",
    template: "%s | GZ Training",
  },
  description:
    "Entrená con Giuliana Zitella, fitness coach y atleta de CrossFit. Planes de fuerza online y presencial en El Talar, con seguimiento semanal desde la app.",
  keywords: [
    "personal trainer",
    "entrenamiento online",
    "entrenamiento de fuerza",
    "CrossFit",
    "El Talar",
    "Buenos Aires",
    "Giuliana Zitella",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "GZ Training",
    title: "Giuliana Zitella | Entrenamiento de fuerza online y presencial",
    description:
      "Planes de fuerza a medida, seguimiento semanal en la app y una coach que compite. Online o presencial en El Talar.",
    images: [{ url: "/images/comp-smile.jpg", width: 1440, height: 960 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0b0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${archivo.variable}`}>
      <body className="min-h-dvh bg-ink text-bone">
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
