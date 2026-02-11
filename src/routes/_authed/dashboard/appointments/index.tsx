import { CalendarDots } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import { MOCK_UPCOMING_APPOINTMENTS } from "@/lib/dashboard-mock-data";

export const Route = createFileRoute("/_authed/dashboard/appointments/")({
  component: AppointmentsPage,
  pendingComponent: DashboardPageSkeleton,
});

function formatDateTime(isoString: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoString));
}

function AppointmentsPage() {
  return (
    <>
      <PageHeader title="Agenda" description="Citas programadas y calendario" />
      <Card>
        <CardHeader>
          <CardTitle>Citas de hoy</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {MOCK_UPCOMING_APPOINTMENTS.length === 0 ? (
            <p className="px-4 py-8 text-center text-muted-foreground text-sm">
              No hay citas programadas.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {MOCK_UPCOMING_APPOINTMENTS.map((apt) => (
                <li
                  key={apt.id}
                  className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CalendarDots size={20} weight="duotone" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate font-medium text-sm">
                      {apt.patientName}
                    </span>
                    <span className="text-muted-foreground text-xs capitalize">
                      {formatDateTime(apt.time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {apt.type}
                    </Badge>
                    <Badge variant="default" className="text-xs">
                      {apt.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
