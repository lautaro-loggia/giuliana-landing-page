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
import { StartFormProvider } from "@/components/StartForm";

/**
 * Las tres versiones de la landing comparten secciones; solo cambia el tema.
 * - dark: toda oscura (la original).
 * - light: toda blanca, mismo lila.
 * - mixed: oscura, con las secciones de `mixedLight` en blanco.
 */
export type LandingTheme = "dark" | "light" | "mixed";

type Section =
  "services" | "method" | "about" | "app" | "results" | "contact" | "faq";

/** Secciones que van en blanco en la versión mixta (alternan con las oscuras). */
const mixedLight: Section[] = ["about", "app", "faq"];

export function Landing({ theme }: { theme: LandingTheme }) {
  const isLight = (section: Section) =>
    theme === "light" || (theme === "mixed" && mixedLight.includes(section));

  // En la página toda blanca el tema lo pone el <html> (ver globals.css), así
  // que las secciones no necesitan envoltorio propio.
  const wrap = (section: Section, node: ReactNode) =>
    theme === "mixed" && isLight(section) ? (
      <div className="theme-light">{node}</div>
    ) : (
      node
    );

  return (
    <div data-page-theme={theme === "light" ? "light" : undefined}>
      {/* Todos los botones de empezar abren el formulario corto antes de WhatsApp */}
      <StartFormProvider>
        <Nav />
        <main>
          {/* El orden sigue las preguntas de quien evalúa contratar a Giuli:
            ¿funciona? → ¿quién es? → ¿cómo se trabaja? → ¿qué contrato? →
            dudas → empezar. El cierre va último, justo después de las dudas. */}
          <Hero />
          <PhotoMarquee />
          {wrap("results", <Results />)}
          {wrap("about", <About />)}
          {wrap("method", <Method />)}
          {wrap("app", <AppSection />)}
          {wrap("services", <Services />)}
          {wrap("faq", <Faq />)}
          {wrap("contact", <Contact />)}
        </main>
        <Footer />
      </StartFormProvider>
    </div>
  );
}
