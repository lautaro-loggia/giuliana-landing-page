"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll con inercia.
 * El carrusel de resultados se marca con data-lenis-prevent-horizontal: Lenis
 * le deja el gesto horizontal y sigue moviendo la página con el vertical.
 * (Con data-lenis-prevent a secas, la rueda sobre el carrusel no scrolleaba nada.)
 * Si el sistema pide movimiento reducido, no se activa y manda el scroll nativo.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({
      // Suavizado corto: la rueda responde casi como la nativa, sin que la
      // página siga deslizándose después de soltarla. Más alto = más seco.
      lerp: 0.2,
      smoothWheel: true,
      // En touch conviene el scroll nativo: el del sistema ya tiene inercia.
      syncTouch: false,
      // Lenis se encarga de los links internos. El margen para el nav fijo ya
      // lo da el scroll-mt de cada sección, que Lenis respeta.
      anchors: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
