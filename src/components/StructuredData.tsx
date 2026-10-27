import { faqs, plans } from "@/lib/content";
import { site } from "@/lib/site";
import { resolveSiteUrl } from "@/lib/site-url";

/**
 * Datos estructurados (JSON-LD) para Google y los buscadores con IA: quién es
 * Giuli, qué ofrece con sus precios y las preguntas frecuentes. Todo sale del
 * mismo contenido que se ve en la página, así no se desincroniza.
 */
export function StructuredData() {
  const url = resolveSiteUrl().toString();
  const person = {
    "@type": "Person",
    "@id": `${url}#giuliana`,
    name: site.coach,
    jobTitle: "Preparadora física",
    url,
    image: new URL("/images/comp-smile.jpg", url).toString(),
    sameAs: [site.instagram],
    knowsAbout: ["Entrenamiento de fuerza", "Musculación", "CrossFit", "Halterofilia", "Acondicionamiento físico"],
  };

  const service = {
    "@type": "Service",
    "@id": `${url}#entrenamiento-online`,
    name: "Entrenamiento de fuerza online",
    serviceType: "Plan de entrenamiento personalizado",
    provider: { "@id": `${url}#giuliana` },
    areaServed: { "@type": "Country", name: "Argentina" },
    availableChannel: { "@type": "ServiceChannel", serviceUrl: site.whatsapp },
    offers: plans.map((p) => ({
      "@type": "Offer",
      name: `Plan ${p.name}`,
      description: p.lead,
    })),
  };

  const faq = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const data = { "@context": "https://schema.org", "@graph": [person, service, faq] };

  return (
    <script
      type="application/ld+json"
      // Se escapa "<" para que ningún texto pueda cerrar el <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
