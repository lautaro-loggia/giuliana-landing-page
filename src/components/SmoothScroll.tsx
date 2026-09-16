"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll con inercia.
 * El carrusel de resultados y cualquier caja con scroll propio se marcan con
 * data-lenis-prevent para que Lenis no les robe el gesto.
 * Si el sistema pide movimiento reducido, no se activa y manda el scroll nativo.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({
      duration: 1,
      // Curva de frenado: arranca rápido y se asienta sin rebote.
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // En touch conviene el scroll nativo: el del sistema ya tiene inercia.
      syncTouch: false,
      // Lenis se encarga de los links internos, con margen para el nav fijo.
      anchors: { offset: -72 },
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
