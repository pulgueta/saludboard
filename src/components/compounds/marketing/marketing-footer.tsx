import { Stethoscope } from "@phosphor-icons/react";
import { Separator } from "@ui/separator";
import type { FC } from "react";

const FOOTER_SECTIONS = [
  {
    title: "Producto",
    links: [
      { label: "Funcionalidades", href: "/#features" },
      { label: "Precios", href: "/pricing" },
      { label: "Para profesionales", href: "/register" },
      { label: "Para pacientes", href: "/register" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Acerca de", href: "/#" },
      { label: "Blog", href: "/#" },
      { label: "Contacto", href: "/#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terminos de uso", href: "/#" },
      { label: "Politica de privacidad", href: "/#" },
      { label: "Habeas data", href: "/#" },
    ],
  },
] as const;

export const MarketingFooter: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope size={18} weight="bold" />
              </div>
              <span className="font-semibold text-foreground text-lg tracking-tighter">
                Salud<span className="text-primary">Board</span>
              </span>
            </a>
            <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
              La plataforma de gestion medica disenada para profesionales de
              salud y pacientes en Colombia.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="font-medium text-foreground text-sm">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-xs">
            &copy; {year} SaludBoard. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground text-xs">Hecho en Colombia</p>
        </div>
      </div>
    </footer>
  );
};
