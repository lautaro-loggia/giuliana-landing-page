import { Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { plans, type Plan } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

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
      className={`relative flex h-full flex-col rounded-panel border p-6 md:p-8 ${
        plan.featured
          ? "border-lilac/60 bg-gradient-to-b from-lilac/15 to-ink-2 shadow-lilac"
          : "border-line/8 bg-ink-2"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="display text-4xl md:text-5xl">{plan.name}</h3>
        {plan.featured && (
          <span className="rounded-md bg-lilac px-2.5 py-1 text-xs font-semibold text-on-lilac">
            Recomendado
          </span>
        )}
      </div>
      <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-bone-2 md:text-base">
        {plan.lead}
      </p>
      <div className="mt-6 border-t hairline pt-5">
        {plan.includesLabel && (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-lilac">
            {plan.includesLabel}
          </p>
        )}
        <Items items={plan.items} />
      </div>
      <div className="mt-auto pt-8">
        <ButtonLink
          href={whatsappLink(plan.whatsappMessage)}
          variant={plan.featured ? "primary" : "outline"}
          className="w-full sm:w-auto"
        >
          {plan.cta}
        </ButtonLink>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="planes" className="scroll-mt-24 py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Planes</p>
          <h2 className="display mt-2 max-w-2xl text-4xl sm:text-[2.75rem] lg:text-[3.25rem]">
            Elegí cómo querés <em className="accent">entrenar</em>
          </h2>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-bone-2">
            Dos niveles de acompañamiento para el plan online. Si no sabés cuál te
            conviene, escribime y lo charlamos.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:gap-5">
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
