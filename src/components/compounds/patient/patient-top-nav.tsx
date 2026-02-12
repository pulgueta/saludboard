import { UserButton } from "@clerk/tanstack-react-start";
import { ListIcon } from "@phosphor-icons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/drawer";
import { Separator } from "@ui/separator";

import { BrandLogo } from "@/components/primitives/brand-logo";
import { PATIENT_NAV_ITEMS } from "@/lib/patient-navigation-config";

export const PatientTopNav = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link
          to="/patient"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <BrandLogo className="text-xl" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {PATIENT_NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                activeOptions={{
                  exact: true,
                }}
                activeProps={{
                  className:
                    "bg-primary/10 font-medium text-primary active:bg-primary/20 active:text-primary",
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-primary"
              >
                <item.icon size={16} weight={isActive ? "fill" : "regular"} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <UserButton />

          <Drawer>
            <DrawerTrigger nativeButton>
              <Button
                variant="outline"
                className="md:hidden"
                aria-label="Abrir menu"
                size="icon"
              >
                <ListIcon size={18} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col gap-1 px-2 md:hidden">
              <DrawerHeader>
                <DrawerTitle>
                  <Link to="/patient">
                    <BrandLogo className="text-xl" />
                  </Link>
                </DrawerTitle>
              </DrawerHeader>

              {PATIENT_NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <DrawerClose
                    key={item.href}
                    nativeButton={false}
                    render={(props) => (
                      <Link
                        {...props}
                        to={item.href}
                        activeOptions={{
                          exact: true,
                        }}
                        activeProps={{
                          className:
                            "bg-primary/10 font-medium text-primary active:bg-primary/20 active:text-primary",
                        }}
                        className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-muted-foreground text-sm transition-colors hover:text-primary"
                      >
                        <item.icon
                          size={18}
                          weight={isActive ? "fill" : "regular"}
                        />
                        {item.label}
                      </Link>
                    )}
                  />
                );
              })}

              <Separator className="my-2" />

              <DrawerFooter>
                <div className="max-w-max rounded-xl border p-1">
                  <UserButton showName />
                </div>

                <DrawerClose
                  render={(props) => (
                    <Link
                      {...props}
                      to="/"
                      className="text-muted-foreground text-sm"
                    >
                      Volver al inicio
                    </Link>
                  )}
                />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};
