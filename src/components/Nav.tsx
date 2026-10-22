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
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid || open
            ? "border-b border-line/8 bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Principal"
          className="shell flex h-16 items-center justify-between md:h-[72px]"
        >
          <Link
            href="#top"
            className="text-lilac transition-colors hover:text-lilac-2"
            aria-label={`${site.name}, inicio`}
          >
            {/* Sin "TRAINING": a esta altura no se llega a leer */}
            <LogoWordmark tagline={false} className="h-7 w-auto md:h-8" />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/15 text-bone lg:hidden"
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
