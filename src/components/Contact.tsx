import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";

/** Accesos directos: cada uno abre el chat con su mensaje ya escrito. */
const topics = [
  { label: "Quiero el plan Starter", message: whatsappMessages.starter },
  { label: "Quiero el plan Premium", message: whatsappMessages.premium },
  { label: "Quiero entrenar presencial", message: whatsappMessages.presencial },
  { label: "Tengo una consulta", message: whatsappMessages.consulta },
];

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal className="lg:col-span-6">
          <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
            Escribime por
            <br />
            <em className="accent">WhatsApp</em>
          </h2>
          <p className="mt-6 max-w-[46ch] leading-relaxed text-bone-2 md:text-lg">
            Contame qué buscás y cómo es tu semana, y te digo qué plan te conviene.
            Sin compromiso.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <ButtonLink href={whatsappLink()} size="lg">
              <WhatsappLogo size={20} weight="fill" />
              Escribime por WhatsApp
            </ButtonLink>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bone-2 underline decoration-lilac decoration-2 underline-offset-4 transition-colors hover:text-bone"
            >
              {site.whatsappLabel}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="rounded-panel border border-line/8 bg-ink-2 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-lilac">
              ¿Sobre qué querés hablar?
            </p>
            <ul className="mt-4 divide-y divide-line/8">
              {topics.map((t) => (
                <li key={t.label}>
                  <a
                    href={whatsappLink(t.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 text-base font-semibold text-bone transition-colors hover:text-lilac md:text-lg"
                  >
                    {t.label}
                    <ArrowUpRight
                      size={20}
                      weight="bold"
                      className="shrink-0 text-bone-2 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lilac"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Se abre WhatsApp con el mensaje escrito. Lo podés cambiar antes de enviarlo.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
