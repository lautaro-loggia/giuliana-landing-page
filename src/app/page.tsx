import type { Viewport } from "next";
import { Landing } from "@/components/Landing";
import { StructuredData } from "@/components/StructuredData";

// La portada es la versión blanca. La oscura sigue en /oscura y la mixta en /mixto.
export const viewport: Viewport = {
  themeColor: "#fbf9fd",
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <Landing theme="light" />
    </>
  );
}
