"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

export type Story = { src: string; alt: string; position?: string };

/** Segundos que se ve cada foto */
const DURATION = 4.5;

/**
 * Fotos en formato historia de Instagram: barras de progreso arriba, avance
 * solo, toque a la izquierda o a la derecha para ir atrás o adelante y
 * mantener apretado para pausar. Corre solo mientras está en pantalla.
 * Con movimiento reducido no avanza solo: se navega con los toques.
 *
 * El progreso es una animación CSS por barra: al terminar pasa a la siguiente
 * foto, y pausarla es cambiar su animation-play-state.
 */
export function StoryViewer({ stories }: { stories: Story[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);

  const running = inView && !held && !reduce;
  const next = () => setIndex((i) => (i + 1) % stories.length);
  const prev = () => setIndex((i) => (i - 1 + stories.length) % stories.length);

  // Si se suelta el dedo fuera del visor, igual se reanuda
  useEffect(() => {
    if (!held) return;
    const release = () => setHeld(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, [held]);

  return (
    <div
      ref={ref}
      className="relative aspect-[9/16] w-full select-none overflow-hidden rounded-[1.25rem] bg-ink-2"
      onPointerDown={() => setHeld(true)}
      onContextMenu={(e) => e.preventDefault()}
      aria-roledescription="carrusel"
      aria-label="Fotos de Giuliana en formato historia"
    >
      {/* Todas las fotos montadas, así ya están cargadas al llegar su turno */}
      {stories.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            quality={85}
            sizes="(min-width: 768px) 360px, 90vw"
            draggable={false}
            className={`object-cover ${i === index && !reduce ? "story-zoom" : ""}`}
            style={{
              objectPosition: s.position ?? "50% 40%",
              animationDuration: `${DURATION}s`,
              animationPlayState: running ? "running" : "paused",
            }}
          />
        </div>
      ))}

      {/* Velo arriba para que se lean las barras y el usuario */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />

      {/* Barras de progreso */}
      <div className="absolute inset-x-3 top-3 flex gap-1">
        {stories.map((s, i) => (
          <div key={s.src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
            <div
              key={i === index ? `activa-${index}` : s.src}
              className={`h-full rounded-full bg-white ${i === index && !reduce ? "story-progress" : ""}`}
              style={
                i === index
                  ? {
                      animationDuration: `${DURATION}s`,
                      animationPlayState: running ? "running" : "paused",
                      width: reduce ? "100%" : undefined,
                    }
                  : { width: i < index ? "100%" : "0%" }
              }
              onAnimationEnd={i === index ? next : undefined}
            />
          </div>
        ))}
      </div>

      {/* Usuario, como en Instagram */}
      <a
        href={site.instagram}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute left-3 top-6 z-10 flex items-center gap-2 rounded-lg pr-2 text-white"
      >
        <span className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-lilac">
          <Image
            src="/images/box-discos-retrato.jpg"
            alt=""
            fill
            sizes="32px"
            className="scale-[2.4] object-cover object-[50%_22%]"
          />
        </span>
        <span className="text-sm font-semibold drop-shadow">
          {site.instagramHandle.replace("@", "")}
        </span>
      </a>

      {/* Zonas de toque: un tercio para volver, el resto para avanzar */}
      <button
        type="button"
        aria-label="Foto anterior"
        onClick={prev}
        className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize focus-visible:outline-offset-[-4px]"
      />
      <button
        type="button"
        aria-label="Foto siguiente"
        onClick={next}
        className="absolute inset-y-0 right-0 w-2/3 cursor-e-resize focus-visible:outline-offset-[-4px]"
      />
    </div>
  );
}
