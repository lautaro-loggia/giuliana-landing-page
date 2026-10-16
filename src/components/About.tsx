"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const stats = [
  { label: "Modalidad", value: "Online y presencial" },
  { label: "Planes", value: "Starter y Premium" },
  { label: "Disciplinas", value: "CrossFit y levantamiento olímpico" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Recorte alto: la foto se desplaza dentro de su marco mientras la sección pasa.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="scroll-mt-24 border-t hairline py-24 md:py-32"
    >
      <div className="shell grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel bg-ink-2">
            <motion.div style={{ y }} className="absolute inset-[-6%]">
              <Image
                src="/images/bar-muscleup.jpg"
                alt="Giuliana saliendo de un muscle-up en la barra durante una competencia"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_45%]"
              />
            </motion.div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="display text-5xl sm:text-6xl lg:text-[4.2rem]">
              Compito, entreno
              <br />y acompaño.
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-bone-2 md:text-lg">
              <p>
                Soy {site.coach}, preparadora física y atleta de CrossFit y
                levantamiento olímpico. Entreno personas que quieren sentirse
                fuertes, no solo verse distintas.
              </p>
              <p>
                Entrené durante todo mi embarazo. Sé lo que es adaptar un plan a
                la vida real: al trabajo, al cansancio, a los días que no salen.
                Por eso cada plan que armo se revisa seguido, no cada tres
                meses.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t hairline pt-6 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
