"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const rise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // La foto se mueve más lento que la página: da profundidad sin distraer.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100dvh] overflow-hidden"
    >
      {/* Foto a sangre, con overscan para que el parallax no descubra bordes.
          En desktop el recuadro se estira hacia la derecha y queda anclado a la
          izquierda: eso corre a Giuliana al centro derecha, lejos del texto. */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-y-[-8%] left-[-8%] right-[-8%] -z-20 md:left-0 md:right-[-30%]"
      >
        {/* En mobile una foto vertical, que es donde mejor entra de cuerpo entero */}
        <Image
          src="/images/jump-rope-pro.jpg"
          alt="Giuliana Zitella de perfil, saltando la soga durante un entrenamiento"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_18%] md:hidden"
        />
        {/* En desktop la de la competencia, que es apaisada */}
        <Image
          src="/images/comp-smile.jpg"
          alt="Giuliana Zitella festejando con el brazo en alto en la Copa Sur de CrossFit"
          fill
          sizes="100vw"
          className="hidden object-cover object-[50%_42%] md:block"
        />
      </motion.div>

      {/* Velos: en mobile de abajo hacia arriba, en desktop de izquierda a derecha */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 to-ink/45 md:bg-gradient-to-r md:from-ink md:via-ink/75 md:to-ink/15"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="shell relative flex min-h-[100dvh] flex-col justify-end pb-16 pt-24 md:justify-center md:pb-28">
        <motion.div
          style={{ y: copyY, opacity: fade }}
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-[40rem] md:max-w-[34rem]"
        >
          <motion.h1
            variants={rise}
            className="display text-[10.5vw] leading-[1.02] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]"
          >
            {/* Dos líneas en peso medio, el remate en peso máximo: la jerarquía
                es de weight dentro de la misma familia, no de color */}
            <span className="display-soft">La fuerza no es</span>
            <br />
            <span className="display-soft">cuestión de ganas.</span>
            <br />
            <span className="text-coral">Es cuestión de plan.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-7 max-w-[34rem] text-base leading-relaxed text-bone-2 md:text-lg"
          >
            Entrenamiento de fuerza online o presencial, con un plan a tu medida
            y seguimiento semanal para que progreses de verdad.
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#agendar" size="lg">
              {site.ctaLabel}
            </ButtonLink>
            <ButtonLink href="#planes" size="lg" variant="outline">
              Ver planes
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
