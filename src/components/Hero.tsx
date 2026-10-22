"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site, whatsappLink } from "@/lib/site";
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
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100dvh] overflow-hidden"
    >
      {/* Mobile: el retrato mirando hacia arriba, a sangre. El parallax baja la
          foto, así que el margen extra va solo abajo: arriba la cabeza entra
          entera. */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-x-0 top-0 -bottom-[12%] -z-20 md:hidden"
      >
        <Image
          src="/images/retrato-mirada.jpg"
          alt="Retrato de Giuliana Zitella sentada en un banco, mirando hacia arriba"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[45%_0%]"
        />
      </motion.div>
      {/* Velos: abajo para que el texto se apoye sobre el fondo (mobile) y arriba
          para que el menú se lea sobre la foto (todas las medidas) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/10 md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-ink/70 to-transparent"
      />

      {/* Desktop: el retrato de cuerpo entero ocupa el lado derecho, sin marco.
          Se desvanece hacia la izquierda, abajo y arriba, así la foto y el fondo
          del hero son una sola superficie y el texto queda sobre liso. Arranca
          debajo del menú para que la cabeza no quede tapada. */}
      <motion.div
        style={{ y: imgY }}
        className="hero-photo-fade absolute top-14 bottom-0 right-0 -z-20 hidden w-[62%] md:block lg:w-[58%]"
      >
        <Image
          src="/images/retrato-banco.jpg"
          alt="Retrato de Giuliana Zitella sentada en un banco, mirando a cámara"
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 58vw, 62vw"
          className="object-cover object-[50%_0%]"
        />
      </motion.div>
      {/* La pared de la foto es más clara que el fondo: un velo la acerca al tono */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink via-ink/40 to-ink/15 md:block"
      />

      <div className="shell relative grid min-h-[100dvh] grid-cols-1 items-end pb-16 pt-24 md:grid-cols-12 md:items-center md:pb-12 md:pt-28">
        <motion.div
          style={{ y: copyY, opacity: fade }}
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="max-w-[40rem] md:col-span-7"
        >
          <motion.h1
            variants={rise}
            className="display text-[10.5vw] leading-[1.02] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]"
          >
            {/* Dos líneas en peso medio, el remate en peso máximo y la palabra
                clave en serif cursiva lila */}
            <span className="display-soft">La fuerza no es</span>
            <br />
            <span className="display-soft">cuestión de ganas.</span>
            <br />
            <span>Es cuestión de <em className="accent">plan.</em></span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-7 max-w-[34rem] text-base leading-relaxed text-bone-2 md:text-lg"
          >
            Entrenamiento de fuerza online o presencial, con un plan a tu medida
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
    </section>
  );
}
