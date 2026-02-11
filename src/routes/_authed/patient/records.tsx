import type { Icon } from "@phosphor-icons/react";
import {
  CameraIcon,
  ClipboardTextIcon,
  DownloadIcon,
  FlaskIcon,
  PillIcon,
  StethoscopeIcon,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { Card, CardContent } from "@ui/card";
import { useState } from "react";

import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import {
  MOCK_PATIENT_RECORDS,
  type PatientRecord,
} from "@/lib/patient-mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authed/patient/records")({
  component: PatientRecordsPage,
  pendingComponent: DashboardPageSkeleton,
});

const RECORD_TYPE_CONFIG: Record<
  PatientRecord["type"],
  { label: string; icon: Icon; color: string }
> = {
  consulta: {
    label: "Consulta",
    icon: StethoscopeIcon,
    color: "bg-primary/10 text-primary",
  },
  laboratorio: {
    label: "Laboratorio",
    icon: FlaskIcon,
    color: "bg-success-bg text-success",
  },
  imagen: {
    label: "Imagen",
    icon: CameraIcon,
    color: "bg-chart-1/10 text-chart-1",
  },
  receta: {
    label: "Receta",
    icon: PillIcon,
    color: "bg-warning-bg text-warning",
  },
  procedimiento: {
    label: "Procedimiento",
    icon: ClipboardTextIcon,
    color: "bg-destructive/10 text-destructive",
  },
};

type Filter = "todas" | PatientRecord["type"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "consulta", label: "Consultas" },
  { value: "laboratorio", label: "Laboratorios" },
  { value: "imagen", label: "Imagenes" },
  { value: "receta", label: "Recetas" },
];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function PatientRecordsPage() {
  const [filter, setFilter] = useState<Filter>("todas");
  const [expanded, setExpanded] = useState<string | null>(null);

  const records =
    filter === "todas"
      ? MOCK_PATIENT_RECORDS
      : MOCK_PATIENT_RECORDS.filter((r) => r.type === filter);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mi historial medico"
        description="Consulta tus registros clinicos y resultados"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={cn(
              "rounded-full px-3 py-1 font-medium text-xs transition-colors",
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-4">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-[19px] w-px bg-border" />

        {records.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              No se encontraron registros.
            </CardContent>
          </Card>
        ) : (
          records.map((record) => {
            const config = RECORD_TYPE_CONFIG[record.type];
            const Icon = config.icon;
            const isOpen = expanded === record.id;

            return (
              <div key={record.id} className="relative flex gap-4 pl-0">
                {/* Timeline node */}
                <div
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-background",
                    config.color,
                  )}
                >
                  <Icon size={16} weight="duotone" />
                </div>

                {/* Content card */}
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-3 text-left"
                      onClick={() => setExpanded(isOpen ? null : record.id)}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {config.label}
                          </Badge>
                          <span className="text-muted-foreground text-xs">
                            {formatDate(record.date)}
                          </span>
                        </div>
                        <span className="font-medium text-foreground text-sm">
                          {record.summary}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {record.doctorName}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-3 border-t pt-3">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {record.details}
                        </p>
                        <button
                          type="button"
                          className="mt-3 flex items-center gap-1.5 text-primary text-xs hover:underline"
                        >
                          <DownloadIcon size={12} />
                          Descargar registro
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
