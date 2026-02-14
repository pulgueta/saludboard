import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Input } from "@ui/input";
import { useState } from "react";

import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import { patientsQueryOptions, useSearchPatients } from "@/hooks/use-patients";

export const Route = createFileRoute("/_authed/dashboard/patients/")({
  component: PatientsPage,
  pendingComponent: DashboardPageSkeleton,
  loader: async ({ context }) => {
    if (!context.userId) {
      throw redirect({ to: "/" });
    }

    await context.queryClient.ensureQueryData(patientsQueryOptions());
  },
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
  const [query, setQuery] = useState<string>("");

  const [search] = useDebouncedValue(query, {
    wait: 500,
  });

  const { data: patients } = useSearchPatients(search);

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
                <PlusIcon weight="bold" className="size-4" />
                Nuevo paciente
              </Link>
            }
          />
        }
      />
      <div className="relative max-w-sm">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o documento..."
          value={search}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {patients.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground text-sm">
              No se encontraron pacientes.
            </CardContent>
          </Card>
        ) : (
          patients.map((patient) => (
            <Card
              key={patient?._id}
              className="p-4 transition-colors hover:bg-muted/30"
            >
              <CardContent className="flex items-center gap-4 p-0">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(`${patient.firstName} ${patient.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate font-medium text-sm">
                    {patient.firstName} {patient.lastName}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {patient.email}
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
