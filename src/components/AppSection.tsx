"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import {
  Barbell,
  Camera,
  ForkKnife,
  NotePencil,
  PlayCircle,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Cinco funciones en tres filas: 3+4, 4+3 y una a lo ancho.
 * El ancho de cada celda acompaña al largo de su texto, así ninguna queda vacía.
 */
const cells = [
  {
    icon: Barbell,
    title: "Registrás series, pesos y repeticiones",
    body: "Cada sesión queda guardada. Yo veo qué hiciste y con cuánto, sin que me mandes nada.",
    span: "md:col-span-3",
  },
  {
    icon: NotePencil,
    title: "Te devuelvo observaciones",
    body: "Reviso tus series, tus check-ins y tus comidas, y te dejo devoluciones de entrenamiento, nutrición y progreso.",
    span: "md:col-span-4",
  },
  {
    icon: PlayCircle,
    title: "Video de cada ejercicio",
    body: "La técnica no depende de la memoria. Cada movimiento tiene su demostración.",
    span: "md:col-span-4",
  },
  {
    icon: Camera,
    title: "Check-ins con fotos y medidas",
    body: "Comparás tu progreso en el tiempo, con datos y no con sensaciones sueltas.",
    span: "md:col-span-3",
  },
  {
    icon: ForkKnife,
    title: "Cargás tus comidas",
    body: "Subís el plato y queda registrado, así la alimentación acompaña al entrenamiento.",
    span: "md:col-span-7",
    wide: true,
  },
] as const;

export function AppSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const centers = useRef<number[]>([]);
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();

  // Se miden los centros una sola vez y se vuelven a medir si cambia el tamaño.
  // Así el scroll no lee el layout en cada cuadro.
  const measure = useCallback(() => {
    centers.current = cardRefs.current.map((el) =>
      el ? el.getBoundingClientRect().top + window.scrollY + el.offsetHeight / 2 : Infinity,
    );
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    for (const el of cardRefs.current) if (el) ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // En mobile se tiñe la tarjeta más cercana al centro de la pantalla. Siempre
  // hay una y solo una activa, así el color no salta ni queda ninguna colgada.
  // En desktop el color lo decide el índice y este valor se ignora por CSS.
  useMotionValueEvent(scrollY, "change", (y) => {
    const middle = y + window.innerHeight / 2;
    let best = 0;
    let bestDistance = Infinity;
    centers.current.forEach((center, i) => {
      const distance = Math.abs(center - middle);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    setActive((current) => (current === best ? current : best));
  });

  return (
    <section id="app" className="scroll-mt-24 py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">La app</p>
          <h2 className="display mt-2 max-w-2xl text-4xl sm:text-5xl lg:text-[3.4rem]">
            Tu plan en tu celular
          </h2>
          <p className="mt-4 max-w-[62ch] leading-relaxed text-bone-2">
            Cada sesión, los videos, tus comidas y tu progreso, en un solo lugar.
            Yo reviso lo que registrás y ajusto el plan desde ahí.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[auto_auto_auto] md:gap-5">
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-panel bg-ink-2 md:col-span-5 md:row-span-3 md:min-h-0">
            <Image
              src="/images/one-more-pro.jpg"
              alt="Giuliana apoyada en una rodilla en el box, entre series"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </Reveal>

          {cells.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal
                key={c.title}
                delay={0.06 * (i + 1)}
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[i] = el;
                }}
                data-active={active === i}
                data-featured={i === 0}
                className={`bento-card flex gap-4 rounded-panel p-5 md:p-6 ${c.span} ${
                  "wide" in c && c.wide
                    ? "flex-col md:flex-row md:items-center md:gap-6"
                    : "flex-col"
                }`}
              >
                <Icon size={26} weight="regular" className="bento-icon shrink-0" />
                <div>
                  <h3 className="display-wide text-lg md:text-xl">{c.title}</h3>
                  <p className="bento-body mt-1.5 text-sm leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
