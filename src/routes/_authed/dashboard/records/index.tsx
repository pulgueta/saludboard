import { ClipboardText } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@ui/card";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";

export const Route = createFileRoute("/_authed/dashboard/records/")({
  component: RecordsPage,
  pendingComponent: DashboardPageSkeleton,
});

function RecordsPage() {
  return (
    <>
      <PageHeader
        title="Historia clínica"
        description="Consulta y gestión de historias clínicas"
      />
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <ClipboardText
              size={28}
              weight="duotone"
              className="text-muted-foreground"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-foreground">
              Sin historias clínicas
            </h3>
            <p className="max-w-sm text-muted-foreground text-sm">
              Las historias clínicas de tus pacientes aparecerán aquí una vez
              registres consultas.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
