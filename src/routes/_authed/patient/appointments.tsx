import { PlusIcon, VideoCameraIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";

import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import {
  MOCK_PAST_PATIENT_APPOINTMENTS,
  MOCK_UPCOMING_PATIENT_APPOINTMENTS,
  type PatientAppointment,
} from "@/lib/patient-mock-data";

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
  return Intl.DateTimeFormat("es-CO", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(time));
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

function AppointmentList({
  appointments,
  emptyMessage,
}: {
  appointments: PatientAppointment[];
  emptyMessage: string;
}) {
  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground text-sm">
          {emptyMessage}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {appointments.map((apt) => (
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
                <VideoCameraIcon size={16} className="text-muted-foreground" />
              )}
              <Badge variant={STATUS_VARIANTS[apt.status]} className="text-xs">
                {apt.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PatientAppointmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mis citas"
        description="Consulta y gestiona tus citas medicas"
        actions={
          <Button>
            <PlusIcon weight="bold" className="size-4" />
            Agendar cita
          </Button>
        }
      />

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="past">Pasadas</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <AppointmentList
            appointments={MOCK_UPCOMING_PATIENT_APPOINTMENTS}
            emptyMessage="No tienes citas programadas."
          />
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <AppointmentList
            appointments={MOCK_PAST_PATIENT_APPOINTMENTS}
            emptyMessage="No tienes citas pasadas."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
