"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    title: "Hablamos",
    body:
      "Una llamada de 20 minutos para conocer tu punto de partida, tu objetivo y cómo es tu semana real.",
  },
  {
    title: "Armo tu plan",
    body:
      "Fuerza como base. Cargas, volumen y progresiones pensadas para vos, no un PDF genérico.",
  },
  {
    title: "Entrenás con la app",
    body:
      "Cada sesión en el celular: ejercicios en video, series, pesos y descansos. Registrás y yo lo veo.",
  },
  {
    title: "Ajustamos",
    body:
      "Reviso tus registros cada semana y adapto el plan a cómo venís. Si algo no funciona, cambia.",
  },
];

export function Method() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  // The line fills as you read down: progress made visible, nothing more.
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="metodo" className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
                Así
                <br />
                trabajamos
              </h2>
              <p className="mt-6 max-w-[38ch] text-bone-2 leading-relaxed">
                Sin fórmulas mágicas. Un plan que se ajusta a tu vida y una coach que lo revisa cada semana.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div aria-hidden className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : scaleY, originY: 0 }}
            className="absolute left-[11px] top-2 bottom-2 w-px bg-coral"
          />
          <ol ref={ref} className="space-y-14 md:space-y-20">
            {steps.map((s, i) => (
              <li key={s.title} className="relative pl-12">
                <Reveal amount={0.5} className="contents">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-coral/50 bg-ink"
                  >
                    <span className="h-2 w-2 rounded-full bg-coral" />
                  </span>
                  <h3 className="display-wide text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-bone-2 leading-relaxed md:text-lg">{s.body}</p>
                </Reveal>
                <span className="sr-only">{`Paso ${i + 1} de ${steps.length}`}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
