"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  Clock,
  VideoCamera,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { site } from "@/lib/site";

/** El valor nunca cambia: solo distingue servidor de navegador. */
const subscribe = () => () => {};

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const SLOTS = ["08:00", "09:00", "10:00", "11:00", "17:00", "18:00", "19:00"];

/** Lunes = 0, domingo = 6 */
function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Disponibilidad de muestra: días de semana, sin feriados ni fines de semana. */
function isAvailable(date: Date, today: Date) {
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  if (date < today && !sameDay(date, today)) return false;
  return date.getDate() % 7 !== 3;
}

/** Horarios ocupados de muestra, estables para una misma fecha. */
function takenSlots(date: Date) {
  const seed = date.getDate();
  return SLOTS.filter((_, i) => (seed + i) % 4 === 0);
}

/**
 * Agenda de muestra con el aspecto de Cal.com.
 * Se usa mientras no haya un enlace real de Cal: elegir un horario abre
 * WhatsApp con el día y la hora ya escritos, así la reserva no se pierde.
 */
export function CalPreview() {
  const reduce = useReducedMotion();
  // El calendario depende del reloj: durante el render del servidor no se dibuja,
  // así el HTML entregado y el del navegador no pueden diferir.
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedIso, setSelectedIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const today = useMemo(() => {
    if (!isClient) return null;
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, [isClient]);

  const month = useMemo(
    () =>
      today
        ? new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
        : null,
    [today, monthOffset],
  );

  const selected = useMemo(() => {
    if (!today) return null;
    if (selectedIso) return new Date(selectedIso);
    const first = new Date(today);
    while (!isAvailable(first, today)) first.setDate(first.getDate() + 1);
    return first;
  }, [today, selectedIso]);

  const days = useMemo(() => {
    if (!month) return [];
    const total = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0,
    ).getDate();
    const offset = mondayIndex(month);
    const cells: (Date | null)[] = Array.from({ length: offset }, () => null);
    for (let d = 1; d <= total; d++) {
      cells.push(new Date(month.getFullYear(), month.getMonth(), d));
    }
    return cells;
  }, [month]);

  const monthLabel = month
    ? new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric" }).format(
        month,
      )
    : "";

  const selectedLabel = selected
    ? new Intl.DateTimeFormat("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(selected)
    : "";

  const taken = selected ? takenSlots(selected) : [];

  const whatsappHref = (() => {
    if (!selected || !time) return site.whatsapp;
    const texto = `Hola Giu! Quiero reservar la charla de 20 minutos el ${selectedLabel} a las ${time} hs.`;
    return `${site.whatsapp}?text=${encodeURIComponent(texto)}`;
  })();

  const shiftMonth = (delta: number) => {
    setMonthOffset((o) => Math.max(0, o + delta));
    setTime(null);
  };

  if (!today || !month) {
    // Mismo alto que la versión cargada: evita que la página salte.
    return <div className="min-h-[520px]" aria-hidden />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,13rem)]">
      {/* Datos del evento */}
      <div className="border-b border-white/8 p-6 lg:border-b-0 lg:border-r">
        <p className="text-sm font-semibold text-bone">{site.coach}</p>
        <p className="display-wide mt-1 text-xl">Charla inicial</p>
        <ul className="mt-5 space-y-3 text-sm text-bone-2">
          <li className="flex items-center gap-2.5">
            <Clock size={16} className="shrink-0 text-coral" />
            20 minutos
          </li>
          <li className="flex items-center gap-2.5">
            <VideoCamera size={16} className="shrink-0 text-coral" />
            Videollamada
          </li>
          <li className="flex items-center gap-2.5">
            <CalendarBlank size={16} className="shrink-0 text-coral" />
            Argentina, GMT-3
          </li>
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-bone-2">
          Charlamos de tu objetivo, tu nivel y cómo es tu semana. Sin
          compromiso.
        </p>
      </div>

      {/* Calendario */}
      <div className="border-b border-white/8 p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold first-letter:uppercase">{monthLabel}</p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              disabled={monthOffset === 0}
              aria-label="Mes anterior"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-coral hover:text-coral disabled:pointer-events-none disabled:opacity-30"
            >
              <CaretLeft size={14} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Mes siguiente"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-coral hover:text-coral"
            >
              <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d, i) => (
            <span
              key={`${d}-${i}`}
              className="pb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted"
            >
              {d}
            </span>
          ))}

          {days.map((date, i) => {
            if (!date) return <span key={`empty-${i}`} />;
            const free = isAvailable(date, today);
            const isSelected = !!selected && sameDay(date, selected);
            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={!free}
                onClick={() => {
                  setSelectedIso(date.toISOString());
                  setTime(null);
                }}
                aria-label={date.toLocaleDateString("es-AR")}
                aria-pressed={isSelected}
                className={`aspect-square rounded-lg text-sm transition-colors ${
                  isSelected
                    ? "bg-coral font-semibold text-ink"
                    : free
                      ? "bg-ink-3 text-bone hover:bg-ink-4"
                      : "text-muted/40"
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horarios */}
      <div className="p-6">
        <p className="text-sm font-semibold first-letter:uppercase">{selectedLabel}</p>

        {time ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4"
          >
            <p className="text-sm leading-relaxed text-bone-2">
              Elegiste las{" "}
              <span className="font-semibold text-bone">{time} hs</span>.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-coral px-4 text-sm font-semibold text-ink shadow-coral transition-transform duration-200 active:scale-[0.98]"
            >
              <WhatsappLogo size={16} weight="fill" /> Confirmar
            </a>
            <button
              type="button"
              onClick={() => setTime(null)}
              className="mt-3 w-full text-center text-xs text-muted underline-offset-4 hover:text-bone hover:underline"
            >
              Elegir otro horario
            </button>
          </motion.div>
        ) : (
          <ul className="mt-4 space-y-2">
            {SLOTS.map((s) => {
              const busy = taken.includes(s);
              return (
                <li key={s}>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setTime(s)}
                    className={`h-10 w-full rounded-lg border text-sm font-medium transition-colors ${
                      busy
                        ? "border-white/5 text-muted/40"
                        : "border-white/15 text-bone hover:border-coral hover:text-coral"
                    }`}
                  >
                    {busy ? "Ocupado" : `${s} hs`}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
