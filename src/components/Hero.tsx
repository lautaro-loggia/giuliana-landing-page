"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site, whatsappLink } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;
/** Curva de la apertura: arranca y frena suave, como un telón */
const opening = [0.65, 0, 0.35, 1] as const;
const OPEN_DURATION = 1.25;

/* El texto entra recién cuando la foto terminó de abrirse */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: OPEN_DURATION - 0.25 } },
};

const rise = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

/**
 * Hero a pantalla completa con la foto de fondo, sin color encima: solo un
 * degradado negro donde va el texto, para que se lea.
 *
 * Entrada: la foto arranca como una tarjeta más chica y se abre hasta ocupar
 * la pantalla (con un margen fino alrededor); después entra el texto, línea por
 * línea, subiendo y enfocándose. Con movimiento reducido aparece todo quieto.
 *
 * Va siempre en tokens oscuros (texto claro), en cualquier versión del sitio,
 * porque el texto está sobre la foto.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // La foto se mueve más lento que la página: da profundidad sin distraer.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[600px] p-2 md:p-3">
      <motion.div
        initial={reduce ? false : { clipPath: "inset(9% 7% 9% 7% round 2rem)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
        transition={{ duration: OPEN_DURATION, ease: opening }}
        className="theme-dark relative h-full overflow-hidden rounded-[1.5rem] bg-ink text-bone"
      >
        {/* Parallax por fuera, zoom de entrada por dentro: no se pisan */}
        <motion.div style={{ y: imgY }} className="absolute inset-x-0 top-0 -bottom-[12%]">
          <motion.div
            initial={reduce ? false : { scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: OPEN_DURATION + 0.3, ease: opening }}
            className="absolute inset-0"
          >
            {/* Mobile: una foto vertical, así no hay que recortar de más la
                apaisada. Giuliana queda arriba y el texto se apoya abajo. */}
            <Image
              src="/images/hero-mobile.jpg"
              alt="Giuliana Zitella sentada en un banco, mirando hacia adelante antes de entrenar"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-[45%_15%] md:hidden"
            />
            <Image
              src="/images/hero-exterior.jpg"
              alt="Giuliana Zitella atándose el pelo antes de entrenar al aire libre"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="hidden object-cover object-[68%_30%] md:block"
            />
          </motion.div>
        </motion.div>

        {/* Solo negro, nada de color: abajo y a la izquierda, donde va el texto,
            y arriba un toque para el menú */}
        {/* Mobile: el texto va abajo, ahí el velo es más fuerte. Desktop: el
            texto va a la izquierda, el velo baja suave y se corta antes de la cara */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.75),rgb(0_0_0/0.25)_45%,transparent_70%)] md:bg-[linear-gradient(to_top,rgb(0_0_0/0.35),transparent_40%)]" />
        <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.5),rgb(0_0_0/0.2)_40%,transparent_62%)] md:block" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/30 to-transparent" />

        {/* Mobile: el texto abajo (la cara ocupa la parte de arriba).
            Desktop: centrado en la altura, apenas corrido hacia abajo por el menú */}
        <div className="shell relative flex h-full flex-col justify-end pb-10 pt-24 md:justify-center md:pb-12 md:pt-28">
          <motion.div
            style={{ y: copyY, opacity: fade }}
            variants={stagger}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="max-w-[40rem]"
          >
            <motion.h1
              variants={rise}
              className="display text-[9.4vw] leading-[1.04] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
            >
              {/* Dos líneas en Geist regular y el remate entero en serif cursiva,
                  todo en blanco */}
              <span className="display-soft">Tu cambio no</span>
              <br />
              <span className="display-soft">empieza el lunes.</span>
              <br />
              <em className="accent accent-inherit accent-strong">Empieza hoy.</em>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-[34rem] text-base leading-relaxed text-bone-2 md:text-lg"
            >
              Entrenamiento de fuerza online, con un plan a tu medida
              y seguimiento desde la app para que progreses de verdad.
            </motion.p>

            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={whatsappLink()} size="lg">
                {site.ctaLabel}
              </ButtonLink>
              <ButtonLink href="#planes" size="lg" variant="outline">
                Ver planes
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
