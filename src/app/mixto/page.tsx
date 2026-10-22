import type { Metadata } from "next";
import { Landing } from "@/components/Landing";

// Versión oscura con algunas secciones en blanco. No se indexa: duplica la portada.
export const metadata: Metadata = {
  title: "Versión mixta",
  robots: { index: false, follow: false },
};

export default function Mixto() {
  return <Landing theme="mixed" />;
}
