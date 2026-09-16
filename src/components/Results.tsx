"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";
import { cases, type Case } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Dos fotos y un divisor que se arrastra. La posición vive en un motion value,
 * nunca en el estado de React, así el arrastre no dispara renders.
 *
 * En touch el arrastre va sobre el tirador, que lleva touch-action: none. Si el
 * arrastre se tomara desde toda la foto, el navegador empieza a hacer scroll
 * vertical, cancela el puntero y el gesto se corta a la mitad. Tocar en
 * cualquier punto de la foto también mueve el divisor, así que en el celular se
 * puede usar sin arrastrar y la página sigue scrolleando con normalidad.
 */
function Compare({
  before,
  after,
}: {
  before: NonNullable<Case["before"]>;
  after: NonNullable<Case["after"]>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const x = useMotionValue(0.5);
  const clip = useTransform(
    x,
    (v) => `inset(0 ${Math.round((1 - v) * 100)}% 0 0)`,
  );
  const left = useTransform(x, (v) => `${v * 100}%`);

  const setFromPointer = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const v = Math.min(0.96, Math.max(0.04, (clientX - r.left) / r.width));
    x.set(v);
  };

  const startDrag = (event: React.PointerEvent) => {
    dragging.current = true;
    // La captura es lo que mantiene vivo el gesto cuando el dedo se va del
    // tirador. Si el navegador la rechaza, el contenedor sigue recibiendo los
    // movimientos mientras el dedo esté sobre la foto.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // sin captura: el arrastre sigue funcionando dentro de la foto
    }
  };

  const moveDrag = (event: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromPointer(event.clientX);
  };

  const endDrag = (event: React.PointerEvent) => {
    dragging.current = false;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // el puntero ya no existe: no hay nada que liberar
    }
  };

  return (
    <div>
      <div
        ref={ref}
        className="relative aspect-square w-full touch-pan-y select-none overflow-hidden rounded-panel bg-ink-3 md:aspect-[4/5]"
        onPointerDown={(event) => {
          setFromPointer(event.clientX);
          // Con mouse se puede arrastrar desde cualquier punto. En touch no,
          // porque compite con el scroll de la página.
          if (event.pointerType === "mouse") startDrag(event);
        }}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
          draggable={false}
        />
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            draggable={false}
          />
        </motion.div>

        <motion.div
          style={{ left }}
          className="pointer-events-none absolute inset-y-0 -ml-px w-0.5 bg-bone/90"
        >
          <button
            type="button"
            aria-label="Arrastrá para comparar las dos fotos"
            onPointerDown={(event) => {
              event.stopPropagation();
              startDrag(event);
            }}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full bg-bone text-ink shadow-panel"
          >
            <ArrowLeft size={12} weight="bold" />
            <ArrowRight size={12} weight="bold" />
          </button>
        </motion.div>

        <input
          type="range"
          min={4}
          max={96}
          defaultValue={50}
          aria-label="Comparar antes y después"
          onChange={(e) => x.set(Number(e.target.value) / 100)}
          className="sr-only"
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        <span>{before.label}</span>
        <span>{after.label}</span>
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: Case }) {
  const hasPhotos = c.before && c.after;
  return (
    <article
      className={`snap-start shrink-0 rounded-panel border border-white/8 bg-ink-2 ${
        hasPhotos ? "w-[min(88vw,760px)]" : "w-[min(88vw,420px)]"
      }`}
    >
      <div
        className={`grid grid-cols-1 gap-4 p-5 md:gap-6 md:p-6 ${hasPhotos ? "md:grid-cols-[1.05fr_1fr] md:items-center" : ""}`}
      >
        {hasPhotos && <Compare before={c.before!} after={c.after!} />}

        {!hasPhotos && c.photo && (
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-panel bg-ink-3 md:aspect-[4/3]">
              <Image
                src={c.photo.src}
                alt={c.photo.alt}
                fill
                sizes="(min-width: 768px) 30vw, 88vw"
                className="object-cover"
              />
            </div>
            <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Foto de referencia
            </p>
          </div>
        )}

        <div className="flex h-full flex-col justify-between gap-5 md:gap-8">
          <div>
            <Quotes size={24} weight="fill" className="text-coral" />
            <p className="mt-3 text-base leading-snug text-bone md:mt-4 md:text-xl">
              {c.quote}
            </p>
          </div>
          <footer className="border-t hairline pt-4">
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-muted">{c.detail}</p>
            {c.sample && (
              <p className="mt-2 inline-block rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-muted">
                Testimonio de ejemplo
              </p>
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}

export function Results() {
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  const go = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const next = Math.min(cards.length - 1, Math.max(0, idx + dir));
    cards[next]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
    setIdx(next);
  };

  return (
    <section
      id="resultados"
      className="scroll-mt-24 border-t hairline py-24 md:py-32"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Resultados</p>
            <h2 className="display mt-3 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
              Cambios que se ven
              <br />y se sienten
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-coral hover:text-coral active:scale-[0.98]"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-coral hover:text-coral active:scale-[0.98]"
            >
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </Reveal>
      </div>

      <div
        ref={scroller}
        data-lenis-prevent
        className="shell-start mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((c) => (
          <CaseCard key={c.id} c={c} />
        ))}
        <div aria-hidden className="w-2 shrink-0" />
      </div>
    </section>
  );
}
