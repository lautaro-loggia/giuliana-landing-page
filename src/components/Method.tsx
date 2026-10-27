"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowsClockwise, ChatCircleDots, DeviceMobile, NotePencil } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    icon: ChatCircleDots,
    title: "Hablamos",
    body:
      "Me escribís por WhatsApp y charlamos tu punto de partida, tu objetivo y cómo es tu semana real.",
  },
  {
    icon: NotePencil,
    title: "Armo tu plan",
    body:
      "Fuerza como base. Cargas, volumen y progresiones pensadas para vos, no un PDF genérico.",
  },
  {
    icon: DeviceMobile,
    title: "Entrenás con la app",
    body:
      "Cada sesión en el celular: ejercicios en video, series, pesos y descansos. Registrás y yo lo veo.",
  },
  {
    icon: ArrowsClockwise,
    title: "Ajustamos",
    body:
      "Reviso tus registros y adapto el plan a cómo venís: cada semana en el plan Full, cada mes en el Base. Si algo no funciona, cambia.",
  },
];

/**
 * Un paso del proceso. Cuando la línea de progreso llega a su altura (el 60% de
 * la pantalla, igual que el final del relleno), el ícono se pinta de lila y da
 * un saltito. Si se vuelve a subir, se despinta, como la línea.
 */
function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // Pasa de 0 a 1 justo cuando el borde de arriba del paso cruza el 60% de la
  // pantalla: arriba de esa línea queda pintado, abajo no
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "start 58%"] });
  const [reached, setReached] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(v > 0.5));
  const reduce = useReducedMotion();
  const Icon = step.icon;

  return (
    <li ref={ref} className="relative pl-16">
      <Reveal amount={0.5} className="contents">
        <span
          aria-hidden
          className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-500 ${
            reached ? "border-lilac bg-lilac text-on-lilac" : "border-lilac/30 bg-ink text-lilac"
          }`}
        >
          <motion.span
            animate={
              reached && !reduce
                ? { scale: [1, 1.3, 0.95, 1], rotate: [0, -12, 6, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex"
          >
            <Icon size={20} weight={reached ? "fill" : "duotone"} />
          </motion.span>
        </span>
        <h3 className="display-wide text-3xl md:text-[1.875rem]">{step.title}</h3>
        <p className="mt-2.5 max-w-[48ch] text-bone-2 leading-relaxed">{step.body}</p>
      </Reveal>
      <span className="sr-only">{`Paso ${index + 1} de ${steps.length}`}</span>
    </li>
  );
}

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
    <section id="metodo" className="scroll-mt-24 section-line py-24 md:py-32">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {/* Título y bajada centrados en mobile, a la izquierda en desktop */}
            <Reveal className="text-center lg:text-left">
              <h2 className="display text-4xl sm:text-[2.75rem] lg:text-[3.25rem]">
                ¿Cómo es
                <br />
                el <em className="accent">proceso?</em>
              </h2>
              <p className="mx-auto mt-6 max-w-[38ch] text-bone-2 leading-relaxed lg:mx-0">
                Sin fórmulas mágicas. Un plan que se ajusta a tu vida y una coach que lo revisa de cerca.
              </p>
              {/* Solo en desktop: acompaña la columna fija mientras se leen los pasos */}
              <div className="relative mt-10 hidden aspect-[4/5] max-w-[21rem] overflow-hidden rounded-panel bg-ink-2 lg:block">
                <Image
                  src="/images/box-discos-retrato.jpg"
                  alt="Giuliana apoyada sobre una torre de discos en el box, mirando a cámara"
                  fill
                  sizes="(min-width: 1024px) 21rem, 0px"
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div aria-hidden className="absolute left-[19.5px] top-5 bottom-5 w-px bg-line/10" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : scaleY, originY: 0 }}
            className="absolute left-[19.5px] top-5 bottom-5 w-px bg-lilac"
          />
          <ol ref={ref} className="space-y-12 md:space-y-14">
            {steps.map((s, i) => (
              <Step key={s.title} step={s} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
