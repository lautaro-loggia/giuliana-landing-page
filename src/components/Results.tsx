"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Quotes } from "@phosphor-icons/react";
import { featuredCase, testimonials, type Testimonial } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";

/** Milisegundos que se ve cada foto antes de pasar a la otra */
const SWITCH_MS = 3200;

const ease = [0.16, 1, 0.3, 1] as const;

/* El testimonio entra palabra por palabra, subiendo y enfocándose, como el hero */
const words = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } },
};
const word = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

/**
 * El cambio físico de la alumna: las fotos se alternan solas entre el antes y
 * el después mientras la tarjeta está en pantalla, y abajo va su testimonio
 * resumido. Los botones de arriba permiten elegir una foto; el ciclo sigue
 * desde ahí. Con movimiento reducido no cambia sola: se elige con los botones.
 */
function FeaturedCase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [showAfter, setShowAfter] = useState(false);
  const quoteSeen = useInView(ref, { amount: 0.5, once: true });

  // Un timeout por foto: si la persona elige una, el conteo arranca de cero
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setTimeout(() => setShowAfter((v) => !v), SWITCH_MS);
    return () => clearTimeout(id);
  }, [showAfter, inView, reduce]);

  const photos = [
    { ...featuredCase.before, label: "Antes", active: !showAfter, position: "50% 30%" },
    { ...featuredCase.after, label: "Después", active: showAfter, position: "57% 40%" },
  ];

  return (
    <article
      ref={ref}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-panel bg-ink-3 text-white md:aspect-auto md:h-full md:min-h-[400px]"
    >
      {photos.map((p) => (
        <Image
          key={p.src}
          src={p.src}
          alt={p.alt}
          fill
          sizes="(min-width: 768px) 50vw, 92vw"
          aria-hidden={!p.active}
          className={`object-cover ${p.active ? "opacity-100" : "opacity-0"}`}
          style={{
            objectPosition: p.position,
            // Zoom lento mientras la foto está a la vista. La que se va vuelve a
            // su tamaño recién cuando terminó de desvanecerse, así no se nota
            transform: p.active && inView && !reduce ? "scale(1.08)" : "scale(1)",
            transition: p.active
              ? `opacity 900ms cubic-bezier(0.16,1,0.3,1), transform ${SWITCH_MS + 900}ms linear`
              : "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 0s 900ms",
          }}
        />
      ))}

      {/* Velos: arriba para el nombre, abajo más fuerte para el testimonio */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.82),rgb(0_0_0/0.35)_38%,transparent_60%)]" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-6">
        <div>
          <p className="text-sm font-semibold md:text-base">{featuredCase.name}</p>
          <p className="text-xs text-white/75 md:text-sm">{featuredCase.detail}</p>
        </div>
        <div className="flex rounded-xl bg-black/35 p-1 backdrop-blur-md">
          {photos.map((p, i) => (
            <button
              key={p.label}
              type="button"
              aria-pressed={p.active}
              onClick={() => setShowAfter(i === 1)}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] md:px-3 md:text-xs transition-colors ${
                p.active ? "bg-white text-black" : "text-white/80 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <blockquote className="absolute inset-x-0 bottom-0 p-5 md:p-8">
        <motion.p
          variants={words}
          initial={reduce ? false : "hidden"}
          animate={quoteSeen ? "show" : "hidden"}
          aria-label={`“${featuredCase.quote}”`}
          className="display text-[1.55rem] leading-[1.12] sm:text-3xl md:text-[1.6rem] xl:text-[1.85rem]"
        >
          {`“${featuredCase.quote}”`.split(" ").map((w, i) => (
            // El espacio va afuera del span: es lo que deja cortar la línea
            <Fragment key={i}>
              <motion.span variants={word} aria-hidden className="inline-block">
                {w}
              </motion.span>{" "}
            </Fragment>
          ))}
        </motion.p>
      </blockquote>
    </article>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col justify-between gap-5 rounded-panel border border-line/8 bg-ink-2 p-6">
      <div>
        <Quotes size={24} weight="fill" className="text-lilac" />
        <p className="mt-3 text-base leading-relaxed text-bone">{t.quote}</p>
      </div>
      <footer className="border-t hairline pt-3.5">
        <p className="font-semibold">{t.name}</p>
        <p className="text-sm text-muted">{t.detail}</p>
      </footer>
    </article>
  );
}

/** Milisegundos entre un testimonio y el siguiente en el carrusel de mobile */
const SLIDE_MS = 5000;

/**
 * En desktop, los testimonios van apilados al costado de la foto. En mobile son
 * un carrusel que se desliza solo de a una tarjeta mientras está en pantalla;
 * si la persona lo toca, el avance automático espera un rato antes de seguir.
 */
function TestimonialList() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [pausedAt, setPausedAt] = useState(0);

  const goTo = (i: number) => {
    const el = ref.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 20, behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (!inView || reduce || !window.matchMedia("(max-width: 47.99rem)").matches) return;
    // Después de un toque, espera el doble antes de retomar
    const wait = pausedAt ? SLIDE_MS * 2 : SLIDE_MS;
    const id = setTimeout(() => goTo((index + 1) % testimonials.length), wait);
    return () => clearTimeout(id);
    // goTo solo lee el DOM; no hace falta como dependencia
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, inView, reduce, pausedAt]);

  // El índice sale de la posición real del scroll, así sirve igual para el
  // avance solo y para cuando la persona desliza con el dedo
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const width = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
    const i = Math.round(el.scrollLeft / (width + 12));
    if (i !== index) setIndex(Math.min(testimonials.length - 1, i));
  };

  // Un solo Reveal para toda la lista: por tarjeta, la que queda fuera del
  // carrusel no "entra en pantalla" y se quedaría invisible
  return (
    <Reveal delay={0.08} className="h-full">
      <div
        ref={ref}
        data-lenis-prevent-horizontal
        onScroll={onScroll}
        onPointerDown={() => setPausedAt(Date.now())}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:h-full md:flex-col md:gap-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <div key={t.id} className="w-[86%] shrink-0 snap-start md:w-auto md:flex-1">
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      {/* Puntos del carrusel, solo en mobile */}
      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Ver testimonio ${i + 1}`}
            aria-current={i === index}
            onClick={() => {
              setPausedAt(Date.now());
              goTo(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-lilac" : "w-1.5 bg-line/20"
            }`}
          />
        ))}
      </div>
    </Reveal>
  );
}

/**
 * Resultados: el antes y después de una alumna como pieza principal y, al
 * costado, lo que cuentan otras alumnas. En mobile va primero la foto.
 */
export function Results() {
  return (
    <section id="resultados" className="scroll-mt-24 section-line py-24 md:pb-16 md:pt-10">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Resultados</p>
          <h2 className="display mt-3 max-w-3xl text-4xl sm:text-[2.75rem] lg:text-[3.25rem]">
            Cambios que se ven
            <br className="md:hidden" /> y se <em className="accent">sienten</em>
          </h2>
        </Reveal>

        {/* En desktop la sección entera entra en una pantalla: la grilla toma el
            alto que queda debajo del menú y el título */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-6 md:h-[calc(100svh-16rem)] md:max-h-[460px] md:grid-cols-12 md:gap-5">
          <Reveal className="md:order-last md:col-span-5">
            <FeaturedCase />
          </Reveal>
          <div className="md:col-span-7">
            <TestimonialList />
          </div>
        </div>
      </div>
    </section>
  );
}
