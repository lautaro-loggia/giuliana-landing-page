import { Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { StartButton } from "@/components/StartForm";
import { plans, type Plan } from "@/lib/content";

function Items({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-sm text-bone">
          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-lilac/15 text-lilac">
            <Check size={10} weight="bold" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-panel border p-6 md:p-7 ${
        plan.featured
          ? // Full en negro: tokens oscuros en cualquier versión del sitio
            "theme-dark border-line/10 bg-ink text-bone shadow-panel"
          : "border-line/8 bg-ink-2"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="display text-4xl md:text-[2.75rem]">
          {/* El nombre en la serif del sitio, mismo color que el resto del texto */}
          <em className="accent accent-inherit">{plan.name}</em>
        </h3>
        {plan.featured && (
          <span className="rounded-md bg-lilac px-2.5 py-1 text-xs font-semibold text-on-lilac">
            Recomendado
          </span>
        )}
      </div>
      <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-bone-2">
        {plan.lead}
      </p>
      <div className="mt-5 border-t hairline pt-5">
        {plan.includesLabel && (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-lilac">
            {plan.includesLabel}
          </p>
        )}
        <Items items={plan.items} />
      </div>
      <div className="mt-auto pt-7">
        <StartButton
          plan={plan.name as "Base" | "Full"}
          variant={plan.featured ? "primary" : "outline"}
          className="w-full"
        >
          {plan.cta}
        </StartButton>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="planes" className="scroll-mt-24 section-line py-20 md:py-24">
      <div className="shell">
        {/* Título centrado y los planes debajo, en un ancho más contenido */}
        <Reveal className="text-center">
          <h2 className="display mx-auto max-w-2xl text-4xl sm:text-[2.75rem] lg:text-[3.25rem]">
            Elegí cómo querés <em className="accent">empezar</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] leading-relaxed text-bone-2">
            Dos niveles de acompañamiento para el plan online. Si no sabés cuál te
            conviene, escribime y lo charlamos.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[880px] grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:gap-5">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={0.08 * i}>
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
