import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { PhotoMarquee } from "@/components/PhotoMarquee";
import { Services } from "@/components/Services";
import { Method } from "@/components/Method";
import { About } from "@/components/About";
import { AppSection } from "@/components/AppSection";
import { Results } from "@/components/Results";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

/**
 * Las tres versiones de la landing comparten secciones; solo cambia el tema.
 * - dark: toda oscura (la original).
 * - light: toda blanca, mismo lila.
 * - mixed: oscura, con las secciones de `mixedLight` en blanco.
 */
export type LandingTheme = "dark" | "light" | "mixed";

type Section = "services" | "method" | "about" | "app" | "results" | "contact" | "faq";

/** Secciones que van en blanco en la versión mixta. Cambiar acá para probar otras. */
const mixedLight: Section[] = ["services", "about", "faq"];

export function Landing({ theme }: { theme: LandingTheme }) {
  const isLight = (section: Section) =>
    theme === "light" || (theme === "mixed" && mixedLight.includes(section));

  // En la página toda blanca el tema lo pone el <html> (ver globals.css), así
  // que las secciones no necesitan envoltorio propio.
  const wrap = (section: Section, node: ReactNode) =>
    theme === "mixed" && isLight(section) ? <div className="theme-light">{node}</div> : node;

  return (
    <div data-page-theme={theme === "light" ? "light" : undefined}>
      <Nav />
      <main>
        <Hero />
        <PhotoMarquee />
        {wrap("services", <Services />)}
        {wrap("method", <Method />)}
        {wrap("about", <About />)}
        {wrap("app", <AppSection />)}
        {wrap("results", <Results />)}
        {wrap("contact", <Contact />)}
        {wrap("faq", <Faq />)}
      </main>
      <Footer />
    </div>
  );
}
