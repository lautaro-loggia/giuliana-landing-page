"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { nav, site, whatsappLink } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { LogoWordmark } from "@/components/ui/Logo";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== solid) setSolid(next);
  });

  return (
    // Menú flotante: una barra con bordes redondeados, separada de los bordes
    // de la pantalla. Arriba de todo queda adentro del recuadro del hero.
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
      <motion.div
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // Entra cuando la foto del hero ya terminó de abrirse, nunca antes
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 1.05 }}
        // Arriba de todo va transparente sobre la foto del hero, con texto claro y
        // tan ancho como el contenido: el logo alineado con el texto del hero.
        // Al scrollear se achica a una tarjeta angosta con fondo, borde y sombra.
        className={`mx-auto rounded-2xl border transition-[max-width,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          solid || open
            ? "max-w-[900px] border-line/10 bg-ink/80 shadow-[0_14px_40px_-18px_rgb(0_0_0/0.35)] backdrop-blur-xl"
            : "theme-dark max-w-[1180px] border-transparent bg-transparent"
        }`}
      >
        {/* Arriba, el relleno compensa el margen del header y el del recuadro del
            hero para caer sobre la misma línea que su texto */}
        <nav
          aria-label="Principal"
          className={`flex h-14 items-center justify-between transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-16 ${
            solid || open
              ? "pl-4 pr-1.5 md:pl-6 md:pr-2.5"
              : "px-4 md:px-7 xl:px-8"
          }`}
        >
          <Link
            href="#top"
            className="text-lilac transition-colors hover:text-lilac-2"
            aria-label={`${site.name}, inicio`}
          >
            {/* Sin "TRAINING": a esta altura no se llega a leer */}
            <LogoWordmark tagline={false} className="h-7 w-auto md:h-8" />
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-bone-2 transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ButtonLink href={whatsappLink()} className="px-4 text-xs sm:px-5 sm:text-sm">
              {site.ctaLabel}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line/15 text-bone lg:hidden"
            >
              {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-mobile"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display block py-3 text-3xl text-bone"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <li className="pt-3">
                  <ButtonLink
                    href={whatsappLink()}
                    size="lg"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    {site.ctaLabel}
                  </ButtonLink>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
