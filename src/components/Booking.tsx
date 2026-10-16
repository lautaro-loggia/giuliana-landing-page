"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { CalPreview } from "@/components/CalPreview";
import { site } from "@/lib/site";

export function Booking() {
  useEffect(() => {
    if (!site.calLink) return;
    (async () => {
      const cal = await getCalApi({ namespace: site.calNamespace });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": "#b8a1f3" },
          dark: { "cal-brand": "#b8a1f3" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section id="agendar" className="scroll-mt-24 border-t hairline py-24 md:py-32">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
            Charlemos
            <br />
            20 minutos
          </h2>
          <p className="mt-6 max-w-[56ch] text-bone-2 leading-relaxed md:text-lg">
            Me contás qué buscás y cómo es tu semana, y vemos por dónde
            empezar. Sin compromiso. Elegí el día y la hora que te quede cómodo.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-panel border border-white/8 bg-ink-2">
          {site.calLink ? (
            <div className="cal-frame min-h-[680px]">
              <Cal
                namespace={site.calNamespace}
                calLink={site.calLink}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view", theme: "dark" }}
              />
            </div>
          ) : (
            <CalPreview />
          )}
        </Reveal>

        {!site.calLink && (
          <p className="mt-4 text-xs text-muted">
            Agenda de muestra. Al conectar Cal.com se reemplaza por tu calendario
            real, con tu disponibilidad y los recordatorios automáticos.
          </p>
        )}

        <p className="mt-6 text-sm text-bone-2">
          ¿Preferís escribir?{" "}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-bone underline decoration-lilac decoration-2 underline-offset-4 hover:text-lilac"
          >
            <WhatsappLogo size={16} /> WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
