"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export type FadePhoto = { src: string; alt: string; position?: string };

/** Milisegundos que se ve cada foto */
const SLIDE_MS = 4500;

/**
 * Fotos que se van fundiendo una con otra, con un zoom lento en la que está a
 * la vista. Ocupa todo su contenedor: el degradado que la funde con el fondo lo
 * pone quien la usa. Corre solo mientras está en pantalla; con movimiento
 * reducido queda la primera foto quieta.
 */
export function PhotoFade({ photos, sizes }: { photos: FadePhoto[]; sizes: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % photos.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, inView, reduce, photos.length]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {photos.map((p, i) => {
        const active = i === index;
        return (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            fill
            sizes={sizes}
            aria-hidden={!active}
            className="object-cover"
            style={{
              objectPosition: p.position ?? "50% 40%",
              opacity: active ? 1 : 0,
              // La que entra hace un zoom lento; la que sale vuelve a su tamaño
              // recién cuando ya se desvaneció
              transform: active && inView && !reduce ? "scale(1.08)" : "scale(1)",
              transition: active
                ? `opacity 1200ms ease, transform ${SLIDE_MS + 1200}ms linear`
                : "opacity 1200ms ease, transform 0s 1200ms",
            }}
          />
        );
      })}
    </div>
  );
}
