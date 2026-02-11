import { Plus, VideoCamera } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { useState } from "react";

import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import {
  MOCK_PAST_PATIENT_APPOINTMENTS,
  MOCK_UPCOMING_PATIENT_APPOINTMENTS,
  type PatientAppointment,
} from "@/lib/patient-mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authed/patient/appointments")({
  component: PatientAppointmentsPage,
  pendingComponent: DashboardPageSkeleton,
});

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

function formatTime(time: string): string {
  const [h, m] = time.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${suffix}`;
}

const STATUS_VARIANTS: Record<
  PatientAppointment["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  confirmada: "default",
  pendiente: "secondary",
  completada: "outline",
  cancelada: "destructive",
};

type Tab = "upcoming" | "past";

function PatientAppointmentsPage() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const appointments =
    tab === "upcoming"
      ? MOCK_UPCOMING_PATIENT_APPOINTMENTS
      : MOCK_PAST_PATIENT_APPOINTMENTS;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mis citas"
        description="Consulta y gestiona tus citas medicas"
        actions={
          <Button size="sm">
            <Plus weight="bold" className="size-4" />
            Agendar cita
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        <button
          type="button"
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 font-medium text-sm transition-colors",
            tab === "upcoming"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setTab("upcoming")}
        >
          Proximas
        </button>
        <button
          type="button"
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 font-medium text-sm transition-colors",
            tab === "past"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setTab("past")}
        >
          Pasadas
        </button>
      </div>

      {/* Appointment list */}
      <div className="flex flex-col gap-3">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              No tienes citas {tab === "upcoming" ? "programadas" : "pasadas"}.
            </CardContent>
          </Card>
        ) : (
          appointments.map((apt) => (
            <Card key={apt.id} className="transition-colors hover:bg-muted/20">
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {apt.doctorName
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
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate font-medium text-foreground text-sm">
                    {apt.doctorName}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {apt.specialty}
                  </span>
                </div>
                <div className="hidden flex-col items-end gap-0.5 sm:flex">
                  <span className="text-foreground text-sm">
                    {formatDate(apt.date)}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {formatTime(apt.time)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {apt.isTelemedicine && (
                    <VideoCamera size={16} className="text-muted-foreground" />
                  )}
                  <Badge
                    variant={STATUS_VARIANTS[apt.status]}
                    className="text-xs"
                  >
                    {apt.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
