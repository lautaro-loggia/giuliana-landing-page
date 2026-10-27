import Link from "next/link";
import { ArrowUp, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { nav, site } from "@/lib/site";
import { LogoWordmark } from "@/components/ui/Logo";

const contacts = [
  { icon: WhatsappLogo, label: "WhatsApp", value: site.whatsappLabel, href: site.whatsapp },
  { icon: InstagramLogo, label: "Instagram", value: site.instagramHandle, href: site.instagram },
];

/**
 * Pie: marca y una línea de qué hace Giuli, las secciones y el contacto con
 * íconos. Abajo, el copyright y un atajo para volver arriba. Las líneas tienen
 * el ancho del contenido, como las de entre secciones.
 */
export function Footer() {
  return (
    <footer className="section-line">
      <div className="shell grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <LogoWordmark
            title={site.name}
            className="h-14 w-auto text-lilac [--logo-word:var(--color-bone)]"
          />
          <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-bone-2">
            {site.coach}, {site.role.toLowerCase()}. Entrenamiento de fuerza online, para
            cualquier persona que quiera ganar fuerza.
          </p>
        </div>

        <nav aria-label="Secciones" className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Secciones</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-bone-2 transition-colors hover:text-lilac">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Contacto</p>
          <ul className="mt-4 space-y-3">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac/12 text-lilac transition-colors group-hover:bg-lilac group-hover:text-on-lilac">
                    <Icon size={20} weight="fill" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block text-sm font-medium text-bone transition-colors group-hover:text-lilac">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell">
        <div className="flex flex-col-reverse gap-3 border-t hairline py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
          <Link href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-lilac">
            Volver arriba <ArrowUp size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
