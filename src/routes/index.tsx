import { SignInButton, SignUpButton } from "@clerk/tanstack-react-start";
import { ArrowRight, Stethoscope } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@ui/button";

import {
  WhenSignedIn,
  WhenSignedOut,
} from "@/components/compounds/auth/auth-guard";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative z-10 flex max-w-lg flex-col items-center gap-8 text-center">
        {/* Brand */}
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Stethoscope size={32} weight="bold" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-4xl tracking-tight text-foreground">
            Salud<span className="text-primary">Board</span>
          </h1>
          <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
            La plataforma para profesionales de salud en Colombia. Gestiona
            pacientes, citas, historias clínicas y documentos en un solo lugar.
          </p>
        </div>

        {/* Auth-aware CTA */}
        <WhenSignedOut>
          <div className="flex items-center gap-3">
            <SignInButton mode="redirect">
              <Button variant="outline" size="lg">
                Iniciar sesión
              </Button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <Button size="lg">
                Crear cuenta
                <ArrowRight weight="bold" className="ml-1 size-4" />
              </Button>
            </SignUpButton>
          </div>
        </WhenSignedOut>

        <WhenSignedIn>
          <Button size="lg" render={<Link to="/dashboard" />}>
            Ir al dashboard
            <ArrowRight weight="bold" className="ml-1 size-4" />
          </Button>
        </WhenSignedIn>
      </div>

      {/* Bottom decoration */}
      <div className="fixed right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
