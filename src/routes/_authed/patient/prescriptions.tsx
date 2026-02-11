import { ClockIcon, PillIcon, WarningIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { Card, CardContent } from "@ui/card";

import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import { MOCK_PATIENT_PRESCRIPTIONS } from "@/lib/patient-mock-data";

export const Route = createFileRoute("/_authed/patient/prescriptions")({
  component: PatientPrescriptionsPage,
  pendingComponent: DashboardPageSkeleton,
});

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function PatientPrescriptionsPage() {
  const active = MOCK_PATIENT_PRESCRIPTIONS.filter((p) => p.isActive);
  const archived = MOCK_PATIENT_PRESCRIPTIONS.filter((p) => !p.isActive);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mis recetas"
        description="Medicamentos activos y archivados"
      />

      {/* Active prescriptions */}
      <section>
        <h2 className="mb-3 font-semibold text-foreground text-sm">
          Activas ({active.length})
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {active.map((rx) => (
            <Card key={rx.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 bg-success-bg px-4 py-2">
                  <PillIcon size={14} weight="bold" className="text-success" />
                  <span className="font-medium text-sm text-success">
                    Activa
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {rx.medication}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {rx.dosage} — {rx.frequency}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 text-muted-foreground text-xs">
                    <div className="flex items-center justify-between">
                      <span>Prescrito por</span>
                      <span className="font-medium text-foreground">
                        {rx.prescribedBy}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emitida</span>
                      <span>{formatDate(rx.dateIssued)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Vence</span>
                      <span>{formatDate(rx.dateExpires)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
                    <span className="text-muted-foreground text-xs">
                      Recargas restantes
                    </span>
                    <Badge
                      variant={
                        rx.refillsRemaining <= 1 ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {rx.refillsRemaining}
                    </Badge>
                  </div>
                  {rx.refillsRemaining <= 1 && (
                    <div className="flex items-center gap-1.5 text-warning text-xs">
                      <WarningIcon size={12} weight="bold" />
                      <span>Pocas recargas — contacta a tu medico</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Archived prescriptions */}
      {archived.length > 0 && (
        <section>
          <h2 className="mb-3 font-semibold text-muted-foreground text-sm">
            Archivadas ({archived.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {archived.map((rx) => (
              <Card key={rx.id} className="opacity-60">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <ClockIcon size={16} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium text-foreground text-sm">
                      {rx.medication}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {rx.dosage} — {rx.prescribedBy}
                    </span>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    Vencida
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
