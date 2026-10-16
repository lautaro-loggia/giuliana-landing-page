"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { faqs } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="preguntas" className="scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-5xl sm:text-6xl">
              Preguntas
              <br />
              frecuentes
            </h2>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-white/8 border-y border-white/8">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                const id = `faq-${i}`;
                return (
                  <li key={f.q}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={id}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span className="display-wide text-xl md:text-2xl">{f.q}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                            isOpen ? "border-lilac text-lilac" : "border-white/15 text-bone"
                          }`}
                        >
                          <Plus size={16} weight="bold" />
                        </motion.span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={id}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[60ch] pb-7 text-bone-2 leading-relaxed">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
