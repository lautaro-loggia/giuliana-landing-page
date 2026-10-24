import type { Metadata } from "next";
import { Landing } from "@/components/Landing";

// Versión oscura (la original). No se indexa: duplica la portada.
export const metadata: Metadata = {
  title: "Versión oscura",
  robots: { index: false, follow: false },
};

export default function Oscura() {
  return <Landing theme="dark" />;
}
