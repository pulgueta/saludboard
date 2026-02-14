import { SignUpButton } from "@clerk/tanstack-react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import {
  ArrowRightIcon,
  CalendarDotsIcon,
  ChartLineUpIcon,
  ClipboardTextIcon,
  FileTextIcon,
  LockIcon,
  PillIcon,
  UserCircleIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import type { FC, ReactNode } from "react";

import {
  WhenSignedIn,
  WhenSignedOut,
} from "@/components/compounds/auth/auth-guard";

export const Route = createFileRoute("/_marketing/")({
  component: LandingPage,
  beforeLoad: async ({ context }) => {
    if (context.userId) {
      const user = await auth();

      if (user.orgId) {
        throw redirect({ to: "/dashboard" });
      } else {
        throw redirect({ to: "/patient" });
      }
    }
  },
});

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="group relative overflow-hidden border-border/60 transition-shadow hover:shadow-xs">
    <CardContent className="flex flex-col gap-2 p-4">
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          {icon}
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-foreground text-lg">{title}</h3>
          <p className="text-pretty text-muted-foreground text-sm">
            {description}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

type StepCardProps = { step: number; title: string; description: string };

const StepCard: FC<StepCardProps> = ({ step, title, description }) => (
  <div className="relative flex flex-col items-center gap-4 text-center">
    <div className="flex size-12 items-center justify-center rounded-full bg-primary font-semibold text-lg text-primary-foreground">
      {step}
    </div>
    <h3 className="font-medium text-foreground">{title}</h3>
    <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

function LandingPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-[10%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/4 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center lg:px-8">
          <h1 className="max-w-3xl text-balance font-bold text-4xl text-foreground tracking-tight md:text-5xl">
            Gestión médica <span className="text-primary">simplificada</span>{" "}
            para tus pacientes
          </h1>

          <p className="max-w-prose text-pretty text-muted-foreground md:text-lg">
            Conecta profesionales de salud con pacientes de manera segura y
            eficiente. Historias clínicas, citas, recetas y documentos en un
            solo lugar.
          </p>

          <WhenSignedOut>
            <SignUpButton mode="modal">
              <Button>
                Empezar ahora
                <ArrowRightIcon weight="bold" className="ml-1 size-4" />
              </Button>
            </SignUpButton>
          </WhenSignedOut>

          <WhenSignedIn>
            <Button nativeButton={false} render={<Link to="/dashboard" />}>
              Ir al dashboard
              <ArrowRightIcon weight="bold" className="ml-1 size-4" />
            </Button>
          </WhenSignedIn>
        </div>
      </section>

      <section id="features" className="border-t bg-muted/20 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <h2 className="max-w-prose font-bold text-3xl text-foreground tracking-tight">
              Todo lo que necesitas para gestionar tu salud
            </h2>
            <p className="max-w-prose text-pretty text-muted-foreground">
              Herramientas disenadas para cada actor del sistema de salud
              colombiano.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="mb-6 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
              Para profesionales
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<CalendarDotsIcon size={22} weight="duotone" />}
                title="Agenda inteligente"
                description="Gestiona citas, disponibilidad y recordatorios automaticos para tus pacientes."
              />
              <FeatureCard
                icon={<ClipboardTextIcon size={22} weight="duotone" />}
                title="Historias clinicas digitales"
                description="Registra consultas, diagnosticos y evoluciones con formatos adaptados a tu especialidad."
              />
              <FeatureCard
                icon={<FileTextIcon size={22} weight="duotone" />}
                title="Gestion de documentos"
                description="Consentimientos informados, ordenes medicas y certificados en formato digital."
              />
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mb-6 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
              Para pacientes
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<VideoCameraIcon size={22} weight="duotone" />}
                title="Citas online y presenciales"
                description="Agenda citas con tus profesionales de confianza y accede a teleconsultas."
              />
              <FeatureCard
                icon={<UserCircleIcon size={22} weight="duotone" />}
                title="Acceso a tu historial"
                description="Consulta tus historias clinicas, resultados de laboratorio e imagenes diagnosticas."
              />
              <FeatureCard
                icon={<PillIcon size={22} weight="duotone" />}
                title="Recetas digitales"
                description="Recibe y gestiona tus recetas medicas de forma digital con tu farmacia preferida."
              />
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
              Para clínicas y organizaciones
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<UsersIcon size={22} weight="duotone" />}
                title="Multi-sede y equipos"
                description="Administra multiples sedes, profesionales y personal administrativo en una sola cuenta."
              />
              <FeatureCard
                icon={<ChartLineUpIcon size={22} weight="duotone" />}
                title="Reportes y analytics"
                description="Visualiza metricas de atencion, ocupacion y rendimiento de tu organizacion."
              />
              <FeatureCard
                icon={<LockIcon size={22} weight="duotone" />}
                title="Control de acceso"
                description="Roles y permisos granulares para proteger la informacion clinica de tus pacientes."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-14 flex flex-col items-center gap-3 text-center">
            <h2 className="max-w-lg font-bold text-3xl text-foreground tracking-tight md:text-4xl">
              Comienza en minutos
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <StepCard
              step={1}
              title="Regístrate gratis"
              description="Crea tu cuenta como profesional de salud o como paciente."
            />
            <StepCard
              step={2}
              title="Conecta"
              description="Invita a tus pacientes o conecta con tus profesionales de salud de confianza."
            />
            <StepCard
              step={3}
              title="Gestiona"
              description="Administra citas, historias clínicas, recetas y documentos desde un solo lugar."
            />
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/20 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center lg:px-8">
          <h2 className="font-bold text-3xl text-foreground tracking-tight md:text-4xl">
            Comienza a gestionar tu salud hoy
          </h2>
          <p className="max-w-prose text-pretty text-muted-foreground">
            Unete a los profesionales de salud y pacientes que ya confian en
            SaludBoard para la gestion de su informacion medica.
          </p>

          <WhenSignedOut>
            <SignUpButton mode="redirect">
              <Button>
                Crear cuenta gratis
                <ArrowRightIcon weight="bold" className="ml-1 size-4" />
              </Button>
            </SignUpButton>
          </WhenSignedOut>

          <WhenSignedIn>
            <Button nativeButton={false} render={<Link to="/dashboard" />}>
              Ir al dashboard
              <ArrowRightIcon weight="bold" className="ml-1 size-4" />
            </Button>
          </WhenSignedIn>
        </div>
      </section>
    </div>
  );
}
