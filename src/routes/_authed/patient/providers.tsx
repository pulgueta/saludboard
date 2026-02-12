import {
  CalendarDotsIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  PlusIcon,
  StethoscopeIcon,
  XIcon,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/drawer";
import { Separator } from "@ui/separator";

import { DashboardPageSkeleton } from "@/components/primitives/dashboard-skeleton";
import { PageHeader } from "@/components/primitives/page-header";

import {
  MOCK_PATIENT_INVITES,
  MOCK_PATIENT_PROVIDERS,
} from "@/lib/patient-mock-data";

export const Route = createFileRoute("/_authed/patient/providers")({
  component: PatientProvidersPage,
  pendingComponent: DashboardPageSkeleton,
});

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

function PatientProvidersPage() {
  const providers = MOCK_PATIENT_PROVIDERS;
  const invites = MOCK_PATIENT_INVITES;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mis profesionales de salud"
        description="Profesionales conectados e invitaciones"
        actions={
          <div className="flex items-center gap-2">
            {/* Invite drawer trigger */}
            <Drawer direction="right">
              <DrawerTrigger
                render={
                  <Button variant="outline">
                    <EnvelopeIcon weight="bold" className="size-4" />
                    Invitaciones
                    {invites.length > 0 && (
                      <Badge className="ml-1 flex size-5 items-center justify-center rounded-full p-0 text-[10px]">
                        {invites.length}
                      </Badge>
                    )}
                  </Button>
                }
              />

              <DrawerContent className="sm:max-w-md">
                <DrawerHeader className="border-b">
                  <DrawerTitle>Invitaciones pendientes</DrawerTitle>
                  <DrawerDescription>
                    Profesionales que te han invitado a conectarte
                  </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-4">
                  {invites.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-12 text-center">
                      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                        <EnvelopeIcon
                          size={24}
                          className="text-muted-foreground"
                        />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        No tienes invitaciones pendientes
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {invites.map((invite) => (
                        <div
                          key={invite.id}
                          className="flex flex-col gap-3 rounded-lg border p-4"
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="size-10">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {invite.providerName
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
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground text-sm">
                                {invite.providerName}
                              </span>
                              <span className="text-muted-foreground text-xs">
                                {invite.providerSpecialty} — {invite.clinicName}
                              </span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {invite.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-xs">
                              {formatDateTime(invite.sentAt)}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" className="h-7 text-xs">
                                <XIcon size={12} weight="bold" />
                                Rechazar
                              </Button>
                              <Button className="h-7 text-xs">
                                <CheckIcon size={12} weight="bold" />
                                Aceptar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DrawerContent>
            </Drawer>

            <Button>
              <PlusIcon weight="bold" className="size-4" />
              Conectar profesional
            </Button>
          </div>
        }
      />

      {/* Providers grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {providers.map((provider) => (
          <Card key={provider.id}>
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-start gap-3">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-primary/10 font-medium text-primary">
                    {provider.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {provider.name}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {provider.specialty}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {provider.clinic}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <PhoneIcon size={14} />
                  <span>{provider.phone}</span>
                </div>
                {provider.nextAppointment ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDotsIcon size={14} />
                    <span>
                      Proxima cita: {formatDateTime(provider.nextAppointment)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDotsIcon size={14} />
                    <span>Sin citas programadas</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <StethoscopeIcon size={14} />
                  Ver perfil
                </Button>
                <Button variant="outline" className="flex-1">
                  <EnvelopeIcon size={14} />
                  Mensaje
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
