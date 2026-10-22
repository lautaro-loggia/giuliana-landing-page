import type { Metadata, Viewport } from "next";
import { Landing } from "@/components/Landing";

// Versión blanca para mostrarle a Giuliana. No se indexa: duplica la portada.
export const metadata: Metadata = {
  title: "Versión clara",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf9fd",
};

export default function Claro() {
  return <Landing theme="light" />;
}
