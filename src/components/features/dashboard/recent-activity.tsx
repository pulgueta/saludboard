import { UserPlus } from "@phosphor-icons/react";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import type { FC } from "react";

import type { RecentPatient } from "@/lib/dashboard-mock-data";

type RecentActivityProps = {
  patients: RecentPatient[];
};

function getRelativeTimeLabel(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.round(diff / 60_000);

  if (minutes < 60) return `hace ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;

  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Recent activity feed showing newly added patients.
 * Later this can be extended to include documents, appointments, etc.
 */
export const RecentActivity: FC<RecentActivityProps> = ({ patients }) => {
  if (patients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No hay actividad reciente.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad reciente</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {patients.map((patient) => (
            <li
              key={patient.id}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
            >
              <Avatar size="sm">
                <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-medium text-foreground text-sm">
                  {patient.name}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <UserPlus size={12} weight="bold" />
                  <span>Nuevo paciente</span>
                  <span aria-hidden>·</span>
                  <span>CC {patient.documentNumber}</span>
                </div>
              </div>
              <span className="shrink-0 text-muted-foreground text-xs tabular-nums">
                {getRelativeTimeLabel(patient.addedAt)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
