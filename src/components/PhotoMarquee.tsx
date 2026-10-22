"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

// Sesión de fotos en el box intercalada con fotos de competencia
const photos = [
  { src: "/images/box-discos-apoyada.jpg", alt: "Giuliana apoyada sobre una torre de discos en el box", w: 1600, h: 2000 },
  { src: "/images/wtc-pullups.jpg", alt: "Giuliana en la barra durante una competencia de CrossFit", w: 1440, h: 1520 },
  { src: "/images/box-colchoneta.jpg", alt: "Giuliana en la colchoneta con muñequeras, mirando a cámara", w: 1333, h: 2000 },
  { src: "/images/exterior-paralelas.jpg", alt: "Giuliana entrenando con paralelas al aire libre", w: 1600, h: 2000 },
  { src: "/images/comp-lift.jpg", alt: "Levantamiento en competencia de CrossFit", w: 720, h: 900 },
  { src: "/images/box-barra.jpg", alt: "Giuliana apoyada sobre una barra olímpica", w: 1333, h: 2000 },
  { src: "/images/box-disco-frente.jpg", alt: "Giuliana sosteniendo un disco frente a la torre de discos", w: 1600, h: 2000 },
  { src: "/images/bar-muscleup.jpg", alt: "Bar muscle-up en competencia", w: 1440, h: 1546 },
  { src: "/images/box-v-up.jpg", alt: "Giuliana haciendo abdominales en V sobre la colchoneta", w: 1333, h: 2000 },
  { src: "/images/exterior-banco.jpg", alt: "Giuliana descansando en un banco al aire libre", w: 1333, h: 2000 },
];

/** Píxeles por segundo a velocidad normal. */
const SPEED = 46;
/** Fracción de la velocidad mientras el mouse está encima. */
const HOVER_SPEED = 0.12;

/**
 * Tira de fotos en movimiento continuo.
 * El desplazamiento lo lleva un motion value en lugar de una animación CSS,
 * así al pasar el mouse la velocidad baja de a poco en vez de frenar de golpe.
 */
export function PhotoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rate = useMotionValue(1);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const el = trackRef.current;
    if (!el) return;
    // La tira lleva las fotos dos veces: al recorrer la mitad, vuelve al inicio
    // y el salto es invisible.
    const half = el.scrollWidth / 2;
    if (!half) return;
    let next = x.get() - (delta / 1000) * SPEED * rate.get();
    if (next <= -half) next += half;
    x.set(next);
  });

  const easeTo = (value: number) => {
    if (reduce) return;
    animate(rate, value, { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
  };

  const track = [...photos, ...photos];

  return (
    <section
      aria-label="Fotos de entrenamiento y competencias"
      className="overflow-hidden py-6 md:py-10"
      onPointerEnter={() => easeTo(HOVER_SPEED)}
      onPointerLeave={() => easeTo(1)}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-4 md:gap-6">
        {track.map((p, i) => {
          const tall = p.h / p.w > 1.4;
          return (
            <div
              key={`${p.src}-${i}`}
              className={`relative shrink-0 overflow-hidden rounded-panel bg-ink-2 ${
                tall ? "aspect-[9/14] w-[180px] md:w-[240px]" : "aspect-[4/5] w-[220px] md:w-[300px]"
              }`}
              aria-hidden={i >= photos.length}
            >
              <Image
                src={p.src}
                alt={i >= photos.length ? "" : p.alt}
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
