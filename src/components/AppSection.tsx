"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import {
  Barbell,
  Camera,
  NotePencil,
  PlayCircle,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Cuatro funciones en dos filas: 3+4 y 4+3.
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
    body: "Reviso tus series y tus check-ins, y te dejo devoluciones sobre tu entrenamiento y tu progreso.",
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
    <section id="app" className="scroll-mt-24 section-line py-20 md:py-24">
      <div className="shell">
        {/* Centrado en mobile, a la izquierda desde tablet */}
        <Reveal className="text-center md:text-left">
          <h2 className="display mx-auto max-w-2xl text-4xl md:mx-0 sm:text-[2.75rem] lg:text-[3.25rem]">
            Tu plan en tu <em className="accent">celular</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] leading-relaxed text-bone-2 md:mx-0">
            Cada sesión, los videos y tu progreso, en un solo lugar.
            Yo reviso lo que registrás y ajusto el plan desde ahí.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[auto_auto] md:gap-5">
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-panel bg-ink-2 md:col-span-5 md:row-span-2 md:min-h-0">
            <Image
              src="/images/box-pelota.jpg"
              alt="Giuliana sentada en el piso del box con una pelota medicinal"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_45%]"
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
                className={`bento-card flex flex-col gap-4 rounded-panel p-5 md:p-6 ${c.span}`}
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
