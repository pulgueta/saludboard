import {
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/tanstack-react-start";
import { ListIcon, StethoscopeIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/drawer";
import { Separator } from "@ui/separator";
import { type FC, useEffect, useState } from "react";

import {
  WhenSignedIn,
  WhenSignedOut,
} from "@/components/compounds/auth/auth-guard";
import { BrandLogo } from "@/components/primitives/brand-logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Funcionalidades", href: "/" },
  { label: "Precios", href: "/pricing" },
] as const;

export const MarketingNavbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-10 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 shadow-xs backdrop-blur-lg"
          : "border-border/50 border-b bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <StethoscopeIcon size={18} weight="bold" />
          </div>
          <BrandLogo className="text-lg" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <WhenSignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Iniciar sesión</Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button>Crear cuenta</Button>
            </SignUpButton>
          </WhenSignedOut>

          <WhenSignedIn>
            <Button nativeButton={false} render={<Link to="/dashboard" />}>
              Dashboard
            </Button>

            <SignOutButton>
              <Button variant="destructive-outline">Cerrar sesión</Button>
            </SignOutButton>
          </WhenSignedIn>
        </div>

        <div className="md:hidden">
          <Drawer
            open={mobileOpen}
            onOpenChange={setMobileOpen}
            direction="top"
          >
            <DrawerTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
                >
                  <ListIcon size={20} />
                </Button>
              }
            />

            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  <Link to="/">
                    <BrandLogo />
                  </Link>
                </DrawerTitle>
              </DrawerHeader>

              <div className="flex w-full flex-col gap-1 px-4 pb-4">
                {NAV_LINKS.map((link) => (
                  <DrawerClose
                    key={link.label}
                    nativeButton={false}
                    render={(props) => (
                      <Link
                        {...props}
                        to={link.href}
                        className="rounded-md px-3 py-2.5 text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  />
                ))}

                <Separator className="my-2" />

                <WhenSignedOut>
                  <div className="flex flex-col gap-2">
                    <DrawerClose
                      nativeButton={false}
                      render={() => (
                        <SignInButton mode="modal">
                          <Button variant="outline" className="w-full">
                            Iniciar sesion
                          </Button>
                        </SignInButton>
                      )}
                    />
                    <DrawerClose
                      nativeButton={false}
                      render={() => (
                        <SignUpButton mode="modal">
                          <Button className="w-full">Crear cuenta</Button>
                        </SignUpButton>
                      )}
                    />
                  </div>
                </WhenSignedOut>
                <WhenSignedIn>
                  <DrawerClose
                    nativeButton={false}
                    render={() => (
                      <Link to="/dashboard" className={buttonVariants()}>
                        Dashboard
                      </Link>
                    )}
                  />

                  <SignOutButton>
                    <Button variant="destructive-outline">Cerrar sesión</Button>
                  </SignOutButton>
                </WhenSignedIn>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};
