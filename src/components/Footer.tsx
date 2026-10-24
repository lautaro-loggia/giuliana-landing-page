import Link from "next/link";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { nav, site } from "@/lib/site";
import { LogoWordmark } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="shell grid grid-cols-1 gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <LogoWordmark
            title={site.name}
            className="h-20 w-auto text-lilac [--logo-word:var(--color-bone)]"
          />
          <p className="mt-3 max-w-[36ch] text-sm text-bone-2">
            {site.coach}, {site.role.toLowerCase()}. Entrenamiento de fuerza online, para cualquier persona que quiera ganar fuerza.
          </p>
        </div>

        <nav aria-label="Secciones" className="md:col-span-3">
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-bone-2 transition-colors hover:text-bone">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-bone-2 transition-colors hover:text-bone"
              >
                <InstagramLogo size={18} /> {site.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-bone-2 transition-colors hover:text-bone"
              >
                <WhatsappLogo size={18} /> {site.whatsappLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t hairline">
        <p className="shell py-5 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
