import {
  CalendarDotsIcon,
  ClockIcon,
  FileTextIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import type { FC } from "react";

import { StatCard } from "@/components/primitives/stat-card";
import type { DashboardStats } from "@/lib/dashboard-mock-data";

type StatCardsProps = {
  stats: DashboardStats;
};

/**
 * Grid of 4 stat cards for the dashboard overview.
 * Displays patients, today's appointments, pending documents, and next appointment.
 */
export const StatCards: FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Pacientes totales"
        value={stats.totalPatients}
        icon={UsersIcon}
        trend={{ value: stats.totalPatientsChange, label: "este mes" }}
        variant="default"
      />
      <StatCard
        title="Citas hoy"
        value={stats.todayAppointments}
        subtitle={`${stats.todayCompleted} completadas, ${stats.todayPending} pendientes`}
        icon={CalendarDotsIcon}
        variant="success"
      />
      <StatCard
        title="Documentos pendientes"
        value={stats.pendingDocuments}
        subtitle="Por revisar o firmar"
        icon={FileTextIcon}
        variant={stats.pendingDocuments > 0 ? "warning" : "default"}
      />
      <StatCard
        title="Próxima cita"
        value={`${stats.nextAppointmentMinutes} min`}
        subtitle="Tiempo estimado"
        icon={ClockIcon}
      />
    </div>
  );
};
