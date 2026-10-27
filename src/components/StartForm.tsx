"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Barbell,
  Buildings,
  CalendarCheck,
  ChatCircleDots,
  Check,
  Crown,
  House,
  type Icon,
  Medal,
  Plant,
  RocketLaunch,
  Sparkle,
  TrendUp,
  Trophy,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { whatsappLink } from "@/lib/site";
import { plans } from "@/lib/content";
import { buttonClass } from "@/components/ui/Button";

type PlanChoice = "Base" | "Full";

type Option = { value: string; hint?: string; icon?: Icon; badge?: string };

type Answers = {
  goal: string;
  level: string;
  place: string;
  plan: string;
  name: string;
  notes: string;
};

const empty: Answers = { goal: "", level: "", place: "", plan: "", name: "", notes: "" };

/** Las preguntas de opción, una por pantalla. Al elegir, pasa sola a la siguiente */
const questions: { key: keyof Answers; title: string; options: Option[]; columns?: 2 }[] = [
  {
    key: "goal",
    title: "¿Qué querés lograr?",
    columns: 2,
    options: [
      { value: "Ganar fuerza", icon: Barbell },
      { value: "Cambiar mi cuerpo", icon: Sparkle },
      { value: "Generar el hábito", icon: CalendarCheck },
      { value: "Mejorar en CrossFit", icon: Trophy },
    ],
  },
  {
    key: "level",
    title: "¿Cómo venís con el entrenamiento?",
    options: [
      { value: "Nunca entrené", hint: "Arrancamos por la técnica", icon: Plant },
      { value: "Entreno hace poco", hint: "Ya tengo algo de base", icon: TrendUp },
      { value: "Entreno hace años", hint: "Quiero llevarlo a otro nivel", icon: Medal },
    ],
  },
  {
    key: "place",
    title: "¿Dónde entrenarías?",
    options: [
      { value: "Gimnasio", icon: Buildings },
      { value: "En casa", hint: "Lo adaptamos a lo que tengas", icon: House },
      { value: "Box de CrossFit", icon: Barbell },
    ],
  },
  {
    key: "plan",
    title: "¿Qué plan te interesa?",
    options: [
      // Cada plan con su ícono, y el destacado con su etiqueta, como en las tarjetas de Planes
      ...plans.map((p) => ({
        value: p.name,
        hint: p.lead,
        icon: p.featured ? Crown : RocketLaunch,
        badge: p.featured ? "Recomendado" : undefined,
      })),
      { value: "No sé todavía", hint: "Lo charlamos y te recomiendo uno", icon: ChatCircleDots },
    ],
  },
];


/** Arma el mensaje de WhatsApp solo con lo que la persona completó */
function buildMessage(a: Answers) {
  const intro = a.name.trim()
    ? `¡Hola Giuli! Soy ${a.name.trim()} y quiero empezar a entrenar con vos.`
    : "¡Hola Giuli! Quiero empezar a entrenar con vos.";
  const lines = [
    a.goal && `• Objetivo: ${a.goal}`,
    a.level && `• Experiencia: ${a.level}`,
    a.place && `• Entreno en: ${a.place}`,
    a.plan && `• Plan: ${a.plan}`,
    a.notes.trim() && `• Algo más: ${a.notes.trim()}`,
  ].filter(Boolean);
  return lines.length ? `${intro}\n\n${lines.join("\n")}` : intro;
}

const StartFormContext = createContext<(plan?: PlanChoice) => void>(() => {});

/** Abre el formulario previo a WhatsApp, opcionalmente con un plan ya elegido */
export function useStartForm() {
  return useContext(StartFormContext);
}

function OptionCard({
  option,
  active,
  compact,
  onSelect,
}: {
  option: Option;
  active: boolean;
  compact?: boolean;
  onSelect: () => void;
}) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`flex w-full gap-3.5 rounded-2xl border p-4 text-left transition-[border-color,background-color,transform] duration-200 active:scale-[0.98] ${
        compact ? "flex-col items-start" : "items-center"
      } ${
        active
          ? "border-lilac bg-lilac/10"
          : option.badge
            ? "border-lilac/40 bg-gradient-to-b from-lilac/10 to-ink-2 hover:border-lilac/70"
            : "border-line/10 bg-ink-2 hover:border-lilac/50"
      }`}
    >
      {Icon && (
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
            active ? "bg-lilac text-on-lilac" : "bg-lilac/12 text-lilac"
          }`}
        >
          <Icon size={20} weight="duotone" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 font-semibold leading-snug text-bone">
          {option.value}
          {option.badge && (
            <span className="rounded-md bg-lilac px-2 py-0.5 text-[11px] font-semibold text-on-lilac">
              {option.badge}
            </span>
          )}
        </span>
        {option.hint && (
          <span className="mt-0.5 block text-sm leading-snug text-bone-2">{option.hint}</span>
        )}
      </span>
      {!compact && (
        <span
          className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
            active ? "border-lilac bg-lilac text-on-lilac" : "border-line/20 text-transparent"
          }`}
        >
          <Check size={12} weight="bold" />
        </span>
      )}
    </button>
  );
}

/**
 * Antes de ir a WhatsApp, unas preguntas cortas, de a una por pantalla: se
 * toca una opción y pasa sola a la siguiente. Todo es opcional (se puede
 * saltear). Al final, el nombre y un campo libre, y el botón abre el chat con
 * el mensaje armado con lo que la persona eligió. No se guarda nada.
 *
 * Es un <dialog> nativo: trae el foco atrapado, Escape para cerrar y el fondo
 * inerte. En mobile sube desde abajo como una hoja; en desktop va centrado.
 */
export function StartFormProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const [answers, setAnswers] = useState<Answers>(empty);
  const [step, setStep] = useState(0);
  // Para animar hacia el lado correcto: avanzar entra por la derecha
  const [dir, setDir] = useState(1);

  // Si se entró desde la tarjeta de un plan, esa pregunta ya está respondida
  const [planPreset, setPlanPreset] = useState(false);
  const steps = planPreset ? questions.filter((q) => q.key !== "plan") : questions;
  const TOTAL = steps.length + 1;

  const open = useCallback((plan?: PlanChoice) => {
    setPlanPreset(Boolean(plan));
    setStep(0);
    setDir(1);
    setAnswers(plan ? { ...empty, plan } : empty);
    dialog.current?.showModal();
    // Mientras está abierto, la página de atrás no scrollea
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlock = () => {
    document.documentElement.style.overflow = "";
  };
  // Cierre animado: baja la hoja y apaga el fondo, y recién ahí cierra el
  // <dialog> (que por sí solo desaparece de golpe)
  const close = () => {
    const el = dialog.current;
    if (!el?.open || el.classList.contains("closing")) return;
    const finish = () => {
      // Lo llaman el fin de la animación y el respaldo: solo cierra una vez
      if (!el.classList.contains("closing")) return;
      el.classList.remove("closing");
      el.close();
      unlock();
    };
    if (reduce) {
      el.close();
      return unlock();
    }
    el.classList.add("closing");
    el.addEventListener("animationend", finish, { once: true });
    // Por si el evento no llega (pestaña en segundo plano), cierra igual
    setTimeout(finish, 400);
  };

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(Math.max(0, Math.min(TOTAL - 1, to)));
  };

  const choose = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    // Un respiro para que se vea la selección antes de pasar
    setTimeout(() => go(step + 1), reduce ? 0 : 260);
  };

  const question = steps[step];
  const isLast = step === TOTAL - 1;
  const picked = questions.filter((q) => answers[q.key]);

  return (
    <StartFormContext.Provider value={open}>
      {children}

      <dialog
        ref={dialog}
        aria-labelledby="start-form-title"
        // Lenis no toma la rueda adentro: el formulario scrollea solo
        data-lenis-prevent
        // El evento llega después del cierre; si para entonces se volvió a abrir,
        // no hay que soltar el scroll
        // Escape también cierra con la animación
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => {
          if (!dialog.current?.open) unlock();
        }}
        onClick={(e) => {
          // Un click en el fondo (fuera de la hoja) cierra
          if (e.target === e.currentTarget) close();
        }}
        className="start-form m-0 mt-auto w-full max-w-none overscroll-contain bg-transparent p-0 text-bone backdrop:bg-black/55 backdrop:backdrop-blur-sm md:m-auto md:max-w-lg"
      >
        <div className="flex max-h-[90svh] flex-col overflow-hidden rounded-t-[1.75rem] border border-line/10 bg-ink md:rounded-[1.75rem]">
          {/* Barra de arriba: volver, progreso y cerrar */}
          <div className="flex items-center gap-3 px-4 pt-4 md:px-6 md:pt-5">
            <button
              type="button"
              onClick={() => go(step - 1)}
              aria-label="Volver"
              disabled={step === 0}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-bone transition-[opacity,color] hover:text-lilac disabled:pointer-events-none disabled:opacity-0"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
            <div className="flex flex-1 gap-1.5" aria-hidden>
              {Array.from({ length: TOTAL }, (_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-line/12">
                  <span
                    className={`block h-full rounded-full bg-lilac transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i <= step ? "w-full" : "w-0"
                    }`}
                  />
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-bone transition-colors hover:text-lilac"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 pb-6 pt-5 md:px-7 md:pb-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reduce ? false : { opacity: 0, x: dir * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: dir * -28 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lilac">
                  {isLast ? "Último paso" : `Paso ${step + 1} de ${TOTAL}`}
                </p>

                {question ? (
                  <>
                    <h2 id="start-form-title" className="display mt-2 text-[1.75rem] leading-tight">
                      {question.title}
                    </h2>
                    <div
                      className={`mt-5 grid gap-2.5 ${question.columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                    >
                      {question.options.map((o) => (
                        <OptionCard
                          key={o.value}
                          option={o}
                          compact={question.columns === 2}
                          active={answers[question.key] === o.value}
                          onSelect={() => choose(question.key, o.value)}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => go(step + 1)}
                      className="mx-auto mt-5 block text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-bone hover:underline"
                    >
                      Saltear esta pregunta
                    </button>
                  </>
                ) : (
                  <>
                    <h2 id="start-form-title" className="display mt-2 text-[1.75rem] leading-tight">
                      ¡Listo! <em className="accent">¿Cómo te llamás?</em>
                    </h2>

                    {/* Lo elegido, a mano para revisar: tocar uno vuelve a esa pregunta */}
                    {picked.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {picked.map((q) => (
                          <button
                            key={q.key}
                            type="button"
                            // El plan elegido desde su tarjeta no tiene paso: el chip no navega
                            onClick={() => steps.includes(q) && go(steps.indexOf(q))}
                            className="rounded-lg bg-lilac/12 px-2.5 py-1 text-xs font-medium text-lilac transition-colors hover:bg-lilac/20"
                          >
                            {answers[q.key]}
                          </button>
                        ))}
                      </div>
                    )}

                    <input
                      type="text"
                      name="nombre"
                      autoComplete="given-name"
                      aria-label="Tu nombre"
                      value={answers.name}
                      onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                      placeholder="Tu nombre"
                      className="mt-5 h-13 w-full rounded-xl border border-line/12 bg-ink-2 px-4 text-base text-bone outline-none transition-colors placeholder:text-muted focus:border-lilac"
                    />
                    <textarea
                      name="mensaje"
                      rows={2}
                      aria-label="Algo más que quieras contarme"
                      value={answers.notes}
                      onChange={(e) => setAnswers((a) => ({ ...a, notes: e.target.value }))}
                      placeholder="¿Algo más? Lesiones, horarios… (opcional)"
                      className="mt-2.5 w-full resize-none rounded-xl border border-line/12 bg-ink-2 px-4 py-3 text-base text-bone outline-none transition-colors placeholder:text-muted focus:border-lilac"
                    />

                    {/* Un link y no un submit: en iOS es la forma segura de abrir WhatsApp */}
                    <a
                      href={whatsappLink(buildMessage(answers))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className={`${buttonClass("primary", "lg")} mt-5 w-full`}
                    >
                      <WhatsappLogo size={20} weight="fill" />
                      Enviar por WhatsApp
                    </a>
                    <p className="mt-3 text-center text-xs text-muted">
                      Te llevamos a WhatsApp con tu mensaje listo.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </dialog>
    </StartFormContext.Provider>
  );
}

/** Botón que abre el formulario. Mismo aspecto que ButtonLink */
export function StartButton({
  plan,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  children,
}: {
  plan?: PlanChoice;
  variant?: Parameters<typeof buttonClass>[0];
  size?: Parameters<typeof buttonClass>[1];
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const open = useStartForm();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open(plan);
      }}
      className={`${buttonClass(variant, size)} ${className}`}
    >
      {children}
    </button>
  );
}
