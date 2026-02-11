import { SignInButton, SignUpButton } from "@clerk/tanstack-react-start";
import { List, Stethoscope, X } from "@phosphor-icons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import { type FC, useCallback, useEffect, useState } from "react";

import {
  WhenSignedIn,
  WhenSignedOut,
} from "@/components/compounds/auth/auth-guard";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "/", isAnchor: false },
  { label: "Funcionalidades", href: "/#features", isAnchor: true },
  { label: "Precios", href: "/pricing", isAnchor: false },
] as const;

export const MarketingNavbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const _location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 shadow-xs backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope size={18} weight="bold" />
          </div>
          <span className="font-semibold text-foreground text-lg tracking-tighter">
            Salud<span className="text-primary">Board</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) =>
            link.isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2 md:flex">
          <WhenSignedOut>
            <SignInButton mode="redirect">
              <Button variant="ghost" size="sm">
                Iniciar sesion
              </Button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <Button size="sm">Crear cuenta</Button>
            </SignUpButton>
          </WhenSignedOut>
          <WhenSignedIn>
            <Button size="sm" render={<Link to="/dashboard" />}>
              Dashboard
            </Button>
          </WhenSignedIn>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b bg-background/95 backdrop-blur-lg md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-4">
            {NAV_LINKS.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2.5 text-foreground text-sm transition-colors hover:bg-muted"
                  onClick={closeMobile}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="rounded-md px-3 py-2.5 text-foreground text-sm transition-colors hover:bg-muted"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ),
            )}
            <Separator className="my-2" />
            <WhenSignedOut>
              <div className="flex flex-col gap-2">
                <SignInButton mode="redirect">
                  <Button variant="outline" className="w-full">
                    Iniciar sesion
                  </Button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <Button className="w-full">Crear cuenta</Button>
                </SignUpButton>
              </div>
            </WhenSignedOut>
            <WhenSignedIn>
              <Button className="w-full" render={<Link to="/dashboard" />}>
                Dashboard
              </Button>
            </WhenSignedIn>
          </div>
        </div>
      )}
    </header>
  );
};
