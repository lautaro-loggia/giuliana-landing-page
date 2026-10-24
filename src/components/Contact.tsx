import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StoryViewer, type Story } from "@/components/StoryViewer";
import { whatsappLink } from "@/lib/site";

/** Fotos de la historia: box, aire libre y competencia */
const stories: Story[] = [
  { src: "/images/cierre-paralelas.jpg", alt: "Giuliana haciendo flexiones sobre paralelas al aire libre", position: "40% 35%" },
  { src: "/images/box-discos-retrato.jpg", alt: "Giuliana apoyada sobre una torre de discos en el box", position: "50% 45%" },
  { src: "/images/exterior-banco.jpg", alt: "Giuliana descansando en un banco al aire libre", position: "45% 40%" },
  { src: "/images/wtc-pullups.jpg", alt: "Giuliana en la barra durante una competencia de CrossFit", position: "50% 30%" },
  { src: "/images/box-barra.jpg", alt: "Giuliana apoyada sobre una barra olímpica", position: "50% 40%" },
  { src: "/images/box-colchoneta.jpg", alt: "Giuliana en la colchoneta con muñequeras, mirando a cámara", position: "50% 45%" },
];

/**
 * Cierre de la landing: el empujón para empezar el cambio, no un bloque de
 * datos. Poco texto, un solo llamado fuerte a WhatsApp y las fotos de Giuli
 * en formato historia. Va siempre en tokens oscuros, en cualquier versión del sitio.
 */
export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-24 py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <div className="theme-dark grid grid-cols-1 overflow-hidden rounded-[1.75rem] bg-ink text-bone md:grid-cols-12">
            {/* Historias: arriba en mobile, a la derecha en desktop */}
            <div className="flex items-center justify-center p-3 md:order-last md:col-span-5 md:p-6">
              <div className="w-full max-w-[340px]">
                <StoryViewer stories={stories} />
              </div>
            </div>

            <div className="flex flex-col justify-center px-6 pb-10 pt-6 md:col-span-7 md:px-12 md:py-16 lg:px-16">
              <p className="eyebrow">El primer paso</p>
              <h2 className="display mt-3 text-[2.05rem] sm:text-[2.75rem] lg:text-[3.25rem]">
                Tu cambio empieza
                <br />
                con un <em className="accent">mensaje.</em>
              </h2>
              <p className="mt-5 max-w-[40ch] leading-relaxed text-bone-2 md:text-lg">
                No necesitás estar en forma para arrancar. Contame qué querés lograr y
                armamos tu plan.
              </p>
              <div className="mt-9 flex flex-col items-start gap-3">
                <ButtonLink href={whatsappLink()} size="lg">
                  <WhatsappLogo size={20} weight="fill" />
                  Quiero empezar mi cambio
                </ButtonLink>
                <p className="text-sm text-bone-2">Sin compromiso · Para cualquier nivel</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
