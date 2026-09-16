import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const online = {
  title: "Plan de entrenamiento online",
  lead:
    "Un plan de fuerza para tu objetivo y tu nivel, con seguimiento semanal desde la app.",
  items: [
    "Plan mensual personalizado",
    "Video y técnica de cada ejercicio",
    "Registro de series y cargas",
    "Check-in semanal con ajustes",
    "Devoluciones de entrenamiento y nutrición",
  ],
};

const presencial = {
  title: "Entrenamiento presencial",
  lead: "Sesiones 1 a 1 o en grupo reducido en El Talar.",
  items: [
    "Individual o grupo reducido",
    "Técnica de levantamientos",
    "Planificación por ciclos",
    "Combinable con el online",
  ],
};

function Items({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-sm text-bone">
          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral">
            <Check size={10} weight="bold" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Services() {
  return (
    <section id="planes" className="scroll-mt-24 py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Planes</p>
          <h2 className="display mt-2 max-w-2xl text-4xl sm:text-5xl lg:text-[3.4rem]">
            Dos formas de entrenar conmigo
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Foto vertical a la izquierda: acompaña al texto sin estirar la tarjeta */}
          <Reveal className="lg:col-span-7">
            <article className="flex h-full flex-col overflow-hidden rounded-panel border border-white/8 bg-ink-2 sm:flex-row">
              <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:w-[50%]">
                <Image
                  src="/images/plates-pro.jpg"
                  alt="Giuliana apoyada sobre una torre de discos en el box"
                  fill
                  sizes="(min-width: 1024px) 24vw, 100vw"
                  className="object-cover object-[42%_35%]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
                <h3 className="display-wide text-xl md:text-2xl">{online.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-2">{online.lead}</p>
                <Items items={online.items} />
                <div className="pt-6">
                  <ButtonLink href="#agendar">Quiero mi plan</ButtonLink>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Foto apaisada arriba: las cuatro alumnas entran en el cuadro */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <article className="flex h-full flex-col overflow-hidden rounded-panel border border-white/8 bg-ink-2">
              <div className="relative aspect-[16/9] w-full shrink-0 sm:aspect-auto sm:min-h-[180px] sm:flex-1">
                <Image
                  src="/images/alumnas-group.jpg"
                  alt="Giuliana con tres alumnas después de una sesión en el box"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-[50%_26%]"
                />
              </div>
              <div className="flex flex-col p-5 md:p-6">
                <h3 className="display-wide text-xl md:text-2xl">{presencial.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-2">{presencial.lead}</p>
                <Items items={presencial.items} />
                <div className="pt-6">
                  <ButtonLink href="#agendar">Quiero mi lugar</ButtonLink>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-12">
            <p className="rounded-panel border border-coral/25 bg-coral/10 px-5 py-4 text-sm leading-relaxed text-bone-2 md:text-center">
              <span className="font-semibold text-bone">¿Las dos? También se puede.</span>{" "}
              Entrenás presencial algunos días y seguís el plan online el resto de la
              semana. Lo definimos juntas en la llamada.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
