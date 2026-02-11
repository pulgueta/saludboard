import { SignUpButton } from "@clerk/tanstack-react-start";
import {
  ArrowRightIcon,
  CalendarDotsIcon,
  ChartLineUpIcon,
  ClipboardTextIcon,
  CloudIcon,
  FileTextIcon,
  LockIcon,
  PillIcon,
  StethoscopeIcon,
  UserCircleIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import type { FC, ReactNode } from "react";

import {
  WhenSignedIn,
  WhenSignedOut,
} from "@/components/compounds/auth/auth-guard";

export const Route = createFileRoute("/_marketing/")({
  component: LandingPage,
});

// ---------------------------------------------------------------------------
// Feature card
// ---------------------------------------------------------------------------
type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="group relative overflow-hidden border-border/60 transition-shadow hover:shadow-md">
    <CardContent className="flex flex-col gap-3 p-6">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="font-medium text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </CardContent>
  </Card>
);

// ---------------------------------------------------------------------------
// Step card
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Landing page
// ---------------------------------------------------------------------------
function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* ----------------------------------------------------------- */}
      {/* HERO */}
      {/* ----------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-[10%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/4 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center lg:px-8">
          <Badge variant="secondary" className="px-4 py-1.5">
            Disenado para el sistema de salud colombiano
          </Badge>

          <h1 className="max-w-3xl font-bold text-4xl text-foreground leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Gestion medica <span className="text-primary">simplificada</span>{" "}
            para Colombia
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
            Conecta profesionales de salud con pacientes de manera segura y
            eficiente. Historias clinicas, citas, recetas y documentos en un
            solo lugar.
          </p>

          <WhenSignedOut>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <SignUpButton mode="redirect">
                <Button size="lg">
                  Soy profesional de salud
                  <ArrowRightIcon weight="bold" className="ml-1 size-4" />
                </Button>
              </SignUpButton>
              <SignUpButton mode="redirect">
                <Button variant="outline" size="lg">
                  Soy paciente
                </Button>
              </SignUpButton>
            </div>
          </WhenSignedOut>
          <WhenSignedIn>
            <Button size="lg" render={<Link to="/dashboard" />}>
              Ir al dashboard
              <ArrowRightIcon weight="bold" className="ml-1 size-4" />
            </Button>
          </WhenSignedIn>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-muted-foreground">
            <div className="flex items-center gap-2 text-xs">
              <LockIcon size={16} weight="duotone" />
              <span>Datos encriptados</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CloudIcon size={16} weight="duotone" />
              <span>100% en la nube</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <StethoscopeIcon size={16} weight="duotone" />
              <span>Cumple normatividad colombiana</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* FEATURES */}
      {/* ----------------------------------------------------------- */}
      <section id="features" className="border-t bg-muted/20 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-14 flex flex-col items-center gap-3 text-center">
            <Badge variant="secondary" className="px-4 py-1.5">
              Funcionalidades
            </Badge>
            <h2 className="max-w-xl font-bold text-3xl text-foreground tracking-tight md:text-4xl">
              Todo lo que necesitas para gestionar tu salud
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Herramientas disenadas para cada actor del sistema de salud
              colombiano.
            </p>
          </div>

          {/* Professional features */}
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

          {/* Patient features */}
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

          {/* Org features */}
          <div>
            <h3 className="mb-6 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
              Para clinicas y organizaciones
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

      {/* ----------------------------------------------------------- */}
      {/* HOW IT WORKS */}
      {/* ----------------------------------------------------------- */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-14 flex flex-col items-center gap-3 text-center">
            <Badge variant="secondary" className="px-4 py-1.5">
              Como funciona
            </Badge>
            <h2 className="max-w-lg font-bold text-3xl text-foreground tracking-tight md:text-4xl">
              Comienza en minutos
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <StepCard
              step={1}
              title="Registrate gratis"
              description="Crea tu cuenta como profesional de salud o como paciente. Sin tarjeta de credito requerida."
            />
            <StepCard
              step={2}
              title="Conecta"
              description="Invita a tus pacientes o conectate con tus profesionales de salud de confianza."
            />
            <StepCard
              step={3}
              title="Gestiona"
              description="Administra citas, historias clinicas, recetas y documentos desde un solo lugar."
            />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* CTA */}
      {/* ----------------------------------------------------------- */}
      <section className="border-t bg-muted/20 py-20 lg:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center lg:px-8">
          <h2 className="font-bold text-3xl text-foreground tracking-tight md:text-4xl">
            Comienza a gestionar tu salud hoy
          </h2>
          <p className="max-w-lg text-muted-foreground leading-relaxed">
            Unete a los profesionales de salud y pacientes que ya confian en
            SaludBoard para la gestion de su informacion medica.
          </p>
          <WhenSignedOut>
            <SignUpButton mode="redirect">
              <Button size="lg">
                Crear cuenta gratis
                <ArrowRightIcon weight="bold" className="ml-1 size-4" />
              </Button>
            </SignUpButton>
          </WhenSignedOut>
          <WhenSignedIn>
            <Button size="lg" render={<Link to="/dashboard" />}>
              Ir al dashboard
              <ArrowRightIcon weight="bold" className="ml-1 size-4" />
            </Button>
          </WhenSignedIn>
        </div>
      </section>
    </div>
  );
}
