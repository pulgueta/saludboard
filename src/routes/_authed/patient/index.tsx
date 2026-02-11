import {
  ArrowRight,
  CalendarDots,
  ClipboardText,
  Clock,
  Pill,
  Stethoscope,
  VideoCamera,
} from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";

import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import {
  MOCK_PATIENT_STATS,
  MOCK_RECENT_ACTIVITY,
  MOCK_UPCOMING_PATIENT_APPOINTMENTS,
} from "@/lib/patient-mock-data";

export const Route = createFileRoute("/_authed/patient/")({
  component: PatientHomePage,
  pendingComponent: DashboardPageSkeleton,
});

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(iso));
}

function formatTime(time: string): string {
  const [h, m] = time.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${suffix}`;
}

const ACTIVITY_ICONS = {
  prescription: Pill,
  appointment: CalendarDots,
  record: ClipboardText,
  invite: Stethoscope,
} as const;

function PatientHomePage() {
  const stats = MOCK_PATIENT_STATS;
  const upcoming = MOCK_UPCOMING_PATIENT_APPOINTMENTS;
  const nextAppointment = upcoming[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div>
        <h1 className="font-bold text-2xl text-foreground tracking-tight">
          Buenos dias, Santiago
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          {formatDate(new Date().toISOString())} — Asi esta tu salud hoy.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarDots size={20} weight="duotone" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Proxima cita
              </span>
              <span className="font-medium text-foreground text-sm">
                {stats.nextAppointmentDate
                  ? formatDate(stats.nextAppointmentDate)
                  : "Sin citas"}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-success-bg text-success">
              <Pill size={20} weight="duotone" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Medicamentos activos
              </span>
              <span className="font-medium text-foreground text-sm">
                {stats.activeMedications}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-chart-1/10 text-chart-1">
              <Stethoscope size={20} weight="duotone" />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">
                Profesionales conectados
              </span>
              <span className="font-medium text-foreground text-sm">
                {stats.connectedProviders}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left: Upcoming appointment + activity */}
        <div className="flex flex-col gap-6">
          {/* Prominent appointment card */}
          {nextAppointment && (
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="p-0">
                <div className="flex items-center gap-1.5 bg-primary/5 px-5 py-2.5">
                  <Clock size={14} weight="bold" className="text-primary" />
                  <span className="font-medium text-primary text-xs">
                    Proxima cita
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-11">
                        <AvatarFallback className="bg-primary/10 font-medium text-primary text-sm">
                          {nextAppointment.doctorName
                            .split(" ")
                            .filter(
                              (w) =>
                                w[0] === w[0].toUpperCase() &&
                                !["Dra.", "Dr."].includes(w),
                            )
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {nextAppointment.doctorName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {nextAppointment.specialty}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        nextAppointment.status === "confirmada"
                          ? "default"
                          : "secondary"
                      }
                      className="shrink-0 text-xs"
                    >
                      {nextAppointment.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDots size={14} />
                      <span>
                        {formatDate(nextAppointment.date)} a las{" "}
                        {formatTime(nextAppointment.time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {nextAppointment.isTelemedicine ? (
                        <VideoCamera size={14} />
                      ) : (
                        <Stethoscope size={14} />
                      )}
                      <span>{nextAppointment.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                    {nextAppointment.isTelemedicine && (
                      <Button size="sm">
                        Unirse a la llamada
                        <VideoCamera className="ml-1 size-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Other upcoming appointments */}
          {upcoming.length > 1 && (
            <Card>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-medium text-foreground text-sm">
                    Otras citas programadas
                  </h2>
                  <Link
                    to="/patient/appointments"
                    className="flex items-center gap-1 text-primary text-xs hover:underline"
                  >
                    Ver todas
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  {upcoming.slice(1).map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        {apt.isTelemedicine ? (
                          <VideoCamera size={16} />
                        ) : (
                          <CalendarDots size={16} />
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate font-medium text-foreground text-sm">
                          {apt.doctorName}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(apt.date)} - {formatTime(apt.time)}
                        </span>
                      </div>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {apt.specialty}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Activity feed */}
        <Card className="h-fit">
          <CardContent className="p-5">
            <h2 className="mb-4 font-medium text-foreground text-sm">
              Actividad reciente
            </h2>
            <div className="flex flex-col gap-4">
              {MOCK_RECENT_ACTIVITY.map((activity) => {
                const Icon = ACTIVITY_ICONS[activity.type];
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Icon size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground text-sm">
                        {activity.title}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {activity.description}
                      </span>
                      <span className="mt-0.5 text-muted-foreground/70 text-xs">
                        {formatDate(activity.date)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
