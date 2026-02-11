import { UserButton } from "@clerk/tanstack-react-start";
import { clerkAppearance } from "@config/clerk-appearance";
import { Bell, List, Stethoscope, X } from "@phosphor-icons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { Separator } from "@ui/separator";
import { type FC, useCallback, useEffect, useState } from "react";
import { PATIENT_NAV_ITEMS } from "@/lib/patient-navigation-config";
import { cn } from "@/lib/utils";

export const PatientTopNav: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/patient"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Stethoscope size={14} weight="bold" />
          </div>
          <span className="font-semibold text-foreground text-sm tracking-tighter">
            Salud<span className="text-primary">Board</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {PATIENT_NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon size={16} weight={isActive ? "fill" : "regular"} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            type="button"
            className="relative flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Notificaciones"
          >
            <Bell size={18} />
            <Badge className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full p-0 text-[10px]">
              2
            </Badge>
          </button>

          {/* User button */}
          <UserButton
            appearance={{
              ...clerkAppearance,
              elements: {
                ...clerkAppearance.elements,
                userButtonAvatarBox: "size-7 rounded-md",
              },
            }}
          />

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {PATIENT_NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-foreground hover:bg-muted",
                  )}
                  onClick={closeMobile}
                >
                  <item.icon size={18} weight={isActive ? "fill" : "regular"} />
                  {item.label}
                </Link>
              );
            })}
            <Separator className="my-2" />
            <Link
              to="/"
              className="rounded-md px-3 py-2.5 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
              onClick={closeMobile}
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
