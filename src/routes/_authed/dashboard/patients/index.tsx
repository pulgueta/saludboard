import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Input } from "@ui/input";
import { useState } from "react";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import { MOCK_RECENT_PATIENTS } from "@/lib/dashboard-mock-data";

export const Route = createFileRoute("/_authed/dashboard/patients/")({
  component: PatientsPage,
  pendingComponent: DashboardPageSkeleton,
});

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PatientsPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_RECENT_PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.documentNumber.includes(search),
  );

  return (
    <>
      <PageHeader
        title="Pacientes"
        description="Gestiona la lista de pacientes"
        actions={
          <Button
            nativeButton={false}
            render={
              <Link to="/dashboard/patients/new">
                <Plus weight="bold" className="size-4" />
                Nuevo paciente
              </Link>
            }
          />
        }
      />
      <div className="relative max-w-sm">
        <MagnifyingGlass className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o documento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground text-sm">
              No se encontraron pacientes.
            </CardContent>
          </Card>
        ) : (
          filtered.map((patient) => (
            <Card
              key={patient.id}
              className="p-4 transition-colors hover:bg-muted/30"
            >
              <CardContent className="flex items-center gap-4 p-0">
                <Avatar>
                  <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate font-medium text-sm">
                    {patient.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    CC {patient.documentNumber}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Activo
                </Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
