import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";
import {
  DOCUMENT_TYPES,
  EPS_LIST,
  GENDERS,
  HEALTH_REGIMES,
} from "@/lib/colombian-health-data";

export const Route = createFileRoute("/_authed/dashboard/patients/new")({
  component: NewPatientPage,
  pendingComponent: DashboardPageSkeleton,
});

function NewPatientPage() {
  return (
    <>
      <PageHeader
        title="Nuevo paciente"
        description="Registra un nuevo paciente en el sistema"
      />
      <Card>
        <CardHeader>
          <CardTitle>Información del paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {/* Personal info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">Nombres</Label>
                <Input id="firstName" placeholder="Ej: María Fernanda" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input id="lastName" placeholder="Ej: López García" />
              </div>
            </div>

            {/* Document */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="docType">Tipo de documento</Label>
                <Select>
                  <SelectTrigger id="docType">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCUMENT_TYPES.map((dt) => (
                      <SelectItem key={dt.value} value={dt.value}>
                        {dt.value} - {dt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="docNumber">Número de documento</Label>
                <Input id="docNumber" placeholder="Ej: 1032456789" />
              </div>
            </div>

            {/* Contact */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="paciente@correo.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" placeholder="+57 300 123 4567" />
              </div>
            </div>

            {/* Demographics */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                <Input id="birthDate" type="date" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="gender">Sexo</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDERS.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="regime">Régimen</Label>
                <Select>
                  <SelectTrigger id="regime">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {HEALTH_REGIMES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* EPS */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="eps">EPS</Label>
              <Select>
                <SelectTrigger id="eps">
                  <SelectValue placeholder="Seleccionar EPS" />
                </SelectTrigger>
                <SelectContent>
                  {EPS_LIST.map((eps) => (
                    <SelectItem key={eps.value} value={eps.value}>
                      {eps.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit">Guardar paciente</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
