/**
 * Mock data for the dashboard display.
 * To be replaced with real Convex queries once backend is connected.
 */

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type AppointmentDataPoint = {
  date: string;
  total: number;
  completed: number;
  cancelled: number;
};

/**
 * Generates mock appointment data for the last N days.
 */
export function generateAppointmentData(days: number): AppointmentDataPoint[] {
  return Array.from({ length: days }, (_, i) => {
    const date = daysAgo(days - 1 - i);
    const total = randomBetween(3, 14);
    const cancelled = randomBetween(0, Math.min(3, Math.floor(total * 0.3)));
    const completed = total - cancelled;

    return {
      date: date.toISOString(),
      total,
      completed,
      cancelled,
    };
  });
}

export type DashboardStats = {
  totalPatients: number;
  totalPatientsChange: number;
  todayAppointments: number;
  todayCompleted: number;
  todayPending: number;
  pendingDocuments: number;
  nextAppointmentMinutes: number;
};

/** Static mock stats for the dashboard. */
export const MOCK_STATS: DashboardStats = {
  totalPatients: 248,
  totalPatientsChange: 12,
  todayAppointments: 8,
  todayCompleted: 5,
  todayPending: 3,
  pendingDocuments: 4,
  nextAppointmentMinutes: 35,
};

export type UpcomingAppointment = {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: "programada" | "completada" | "cancelada";
};

/** Mock upcoming appointments. */
export const MOCK_UPCOMING_APPOINTMENTS: UpcomingAppointment[] = [
  {
    id: "1",
    patientName: "María Fernanda López",
    time: new Date(Date.now() + 35 * 60_000).toISOString(),
    type: "Control",
    status: "programada",
  },
  {
    id: "2",
    patientName: "Andrés Felipe Martínez",
    time: new Date(Date.now() + 95 * 60_000).toISOString(),
    type: "Consulta general",
    status: "programada",
  },
  {
    id: "3",
    patientName: "Laura Camila Rodríguez",
    time: new Date(Date.now() + 155 * 60_000).toISOString(),
    type: "Valoración inicial",
    status: "programada",
  },
];

export type RecentPatient = {
  id: string;
  name: string;
  documentNumber: string;
  addedAt: string;
};

/** Mock recently added patients. */
export const MOCK_RECENT_PATIENTS: RecentPatient[] = [
  {
    id: "p1",
    name: "Carlos Andrés Gutiérrez",
    documentNumber: "1032456789",
    addedAt: new Date(Date.now() - 2 * 3_600_000).toISOString(),
  },
  {
    id: "p2",
    name: "Valentina Ospina Restrepo",
    documentNumber: "1098765432",
    addedAt: new Date(Date.now() - 5 * 3_600_000).toISOString(),
  },
  {
    id: "p3",
    name: "Santiago Morales Vargas",
    documentNumber: "1015234567",
    addedAt: new Date(Date.now() - 24 * 3_600_000).toISOString(),
  },
];
