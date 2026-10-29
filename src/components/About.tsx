"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Barbell, DeviceMobile, Stack } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const stats = [
  { icon: DeviceMobile, label: "Modalidad", value: "Online, desde la app" },
  { icon: Stack, label: "Planes", value: "Base y Full" },
  { icon: Barbell, label: "Disciplinas", value: "Musculación, fuerza, CrossFit, halterofilia y acondicionamiento físico" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Recorte alto: el video se desplaza dentro de su marco mientras la sección pasa.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  // El video pesa: se pide recién cuando la sección se acerca, así no le
  // disputa la conexión al hero al abrir la página.
  const near = useInView(ref, { once: true, margin: "600px 0px" });

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="scroll-mt-24 section-line py-24 md:py-32"
    >
      <div className="shell grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="w-full md:mx-auto md:max-w-[28rem] lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel bg-ink-2">
            <motion.div style={{ y }} className="absolute inset-[-6%]">
              {/* Video de competencia, sin sonido y en loop. Con movimiento
                  reducido no arranca solo: queda el cuadro de portada. */}
              <video
                key={reduce ? "quieto" : near ? "loop" : "espera"}
                src={near ? "/videos/competencia.mp4" : undefined}
                poster="/videos/competencia-poster.jpg"
                autoPlay={!reduce && near}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Giuliana levantando la barra en una competencia de CrossFit, frente al público"
                className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
              />
            </motion.div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="display text-[1.75rem] min-[380px]:text-4xl sm:text-[2.75rem] lg:text-[3.25rem]">
              Compito, entreno
              <br />y <em className="accent">acompaño.</em>
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-bone-2 md:text-lg">
              <p>
                Soy {site.coach}, preparadora física y atleta de CrossFit y
                halterofilia. Entreno personas que quieren sentirse
                fuertes, no solo verse distintas.
              </p>
              <p>
                Entrené durante todo mi embarazo. Sé lo que es adaptar un plan a
                la vida real: al trabajo, al cansancio, a los días que no salen.
                Por eso cada plan que armo se revisa seguido, no cada tres
                meses.
              </p>
            </div>
            {/* Cada dato en su tarjeta con ícono: en mobile, una lista; en
                desktop, tres columnas */}
            <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-line/8 bg-ink-2 p-4 sm:flex-col sm:items-start sm:gap-3 sm:p-5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lilac/12 text-lilac">
                    <Icon size={22} weight="duotone" />
                  </span>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
                    <dd className="mt-0.5 font-semibold leading-snug">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
