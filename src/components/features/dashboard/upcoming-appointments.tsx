import { Clock } from "@phosphor-icons/react";
import { Badge } from "@ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import type { FC } from "react";

import type { UpcomingAppointment } from "@/lib/dashboard-mock-data";

type UpcomingAppointmentsProps = {
  appointments: UpcomingAppointment[];
};

function formatTime(isoString: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoString));
}

function getRelativeTime(isoString: string): string {
  const diff = new Date(isoString).getTime() - Date.now();
  const minutes = Math.round(diff / 60_000);

  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `En ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  return `En ${hours}h ${minutes % 60}m`;
}

const statusVariant: Record<
  UpcomingAppointment["status"],
  "default" | "secondary" | "destructive"
> = {
  programada: "default",
  completada: "secondary",
  cancelada: "destructive",
};

/**
 * List of upcoming appointments for the dashboard.
 * Shows patient name, time, type, and status badge.
 */
export const UpcomingAppointments: FC<UpcomingAppointmentsProps> = ({
  appointments,
}) => {
  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Próximas citas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No hay citas programadas para hoy.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas citas</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {appointments.map((apt) => (
            <li
              key={apt.id}
              className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock size={18} weight="duotone" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-medium text-foreground text-sm">
                  {apt.patientName}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <span>{formatTime(apt.time)}</span>
                  <span aria-hidden>·</span>
                  <span>{apt.type}</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge variant={statusVariant[apt.status]} className="text-xs">
                  {apt.status}
                </Badge>
                <span className="text-muted-foreground text-xs tabular-nums">
                  {getRelativeTime(apt.time)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
