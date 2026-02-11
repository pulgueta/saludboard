/**
 * Mock data for the patient dashboard.
 *
 * Uses realistic Colombian names, EPS, and medical context.
 */

export type PatientAppointment = {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: "confirmada" | "pendiente" | "completada" | "cancelada";
  isTelemedicine: boolean;
};

export type PatientPrescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  dateIssued: string;
  dateExpires: string;
  refillsRemaining: number;
  isActive: boolean;
};

export type PatientProvider = {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  phone: string;
  nextAppointment: string | null;
  initials: string;
};

export type PatientInvite = {
  id: string;
  providerName: string;
  providerSpecialty: string;
  clinicName: string;
  message: string;
  sentAt: string;
};

export type PatientRecord = {
  id: string;
  date: string;
  type: "consulta" | "laboratorio" | "imagen" | "receta" | "procedimiento";
  doctorName: string;
  summary: string;
  details: string;
};

export type PatientStats = {
  nextAppointmentDate: string | null;
  activeMedications: number;
  connectedProviders: number;
  lastCheckup: string;
};

// --- Mock data ---

export const MOCK_PATIENT_STATS: PatientStats = {
  nextAppointmentDate: "2026-02-14T09:30:00",
  activeMedications: 3,
  connectedProviders: 4,
  lastCheckup: "2026-01-28",
};

export const MOCK_UPCOMING_PATIENT_APPOINTMENTS: PatientAppointment[] = [
  {
    id: "pa-1",
    doctorName: "Dra. Carolina Mejia",
    specialty: "Medicina General",
    date: "2026-02-14",
    time: "09:30",
    location: "Centro Medico Sanitas - Chapinero",
    status: "confirmada",
    isTelemedicine: false,
  },
  {
    id: "pa-2",
    doctorName: "Dr. Andres Felipe Rios",
    specialty: "Dermatologia",
    date: "2026-02-20",
    time: "14:00",
    location: "Teleconsulta",
    status: "pendiente",
    isTelemedicine: true,
  },
  {
    id: "pa-3",
    doctorName: "Dra. Laura Valentina Ruiz",
    specialty: "Nutricion",
    date: "2026-02-25",
    time: "11:00",
    location: "Clinica del Country - Consultorio 312",
    status: "confirmada",
    isTelemedicine: false,
  },
];

export const MOCK_PAST_PATIENT_APPOINTMENTS: PatientAppointment[] = [
  {
    id: "pa-4",
    doctorName: "Dra. Carolina Mejia",
    specialty: "Medicina General",
    date: "2026-01-28",
    time: "10:00",
    location: "Centro Medico Sanitas - Chapinero",
    status: "completada",
    isTelemedicine: false,
  },
  {
    id: "pa-5",
    doctorName: "Dr. Jorge Eduardo Pineda",
    specialty: "Ortopedia",
    date: "2026-01-15",
    time: "08:30",
    location: "Fundacion Santa Fe - Torre B",
    status: "completada",
    isTelemedicine: false,
  },
  {
    id: "pa-6",
    doctorName: "Dra. Maria Isabel Castano",
    specialty: "Psicologia",
    date: "2026-01-10",
    time: "16:00",
    location: "Teleconsulta",
    status: "completada",
    isTelemedicine: true,
  },
];

export const MOCK_PATIENT_PRESCRIPTIONS: PatientPrescription[] = [
  {
    id: "rx-1",
    medication: "Losartan 50mg",
    dosage: "1 tableta",
    frequency: "Cada 12 horas",
    prescribedBy: "Dra. Carolina Mejia",
    dateIssued: "2026-01-28",
    dateExpires: "2026-07-28",
    refillsRemaining: 5,
    isActive: true,
  },
  {
    id: "rx-2",
    medication: "Metformina 850mg",
    dosage: "1 tableta",
    frequency: "Con el desayuno",
    prescribedBy: "Dra. Carolina Mejia",
    dateIssued: "2026-01-28",
    dateExpires: "2026-04-28",
    refillsRemaining: 2,
    isActive: true,
  },
  {
    id: "rx-3",
    medication: "Vitamina D3 1000 UI",
    dosage: "1 capsula",
    frequency: "Diario con el almuerzo",
    prescribedBy: "Dra. Laura Valentina Ruiz",
    dateIssued: "2025-12-15",
    dateExpires: "2026-06-15",
    refillsRemaining: 4,
    isActive: true,
  },
  {
    id: "rx-4",
    medication: "Ibuprofeno 400mg",
    dosage: "1 tableta",
    frequency: "Cada 8 horas por 5 dias",
    prescribedBy: "Dr. Jorge Eduardo Pineda",
    dateIssued: "2026-01-15",
    dateExpires: "2026-01-20",
    refillsRemaining: 0,
    isActive: false,
  },
];

export const MOCK_PATIENT_PROVIDERS: PatientProvider[] = [
  {
    id: "prov-1",
    name: "Dra. Carolina Mejia",
    specialty: "Medicina General",
    clinic: "Centro Medico Sanitas",
    phone: "+57 301 234 5678",
    nextAppointment: "2026-02-14T09:30:00",
    initials: "CM",
  },
  {
    id: "prov-2",
    name: "Dr. Andres Felipe Rios",
    specialty: "Dermatologia",
    clinic: "Clinica Dermacenter",
    phone: "+57 310 987 6543",
    nextAppointment: "2026-02-20T14:00:00",
    initials: "AR",
  },
  {
    id: "prov-3",
    name: "Dra. Laura Valentina Ruiz",
    specialty: "Nutricion",
    clinic: "Clinica del Country",
    phone: "+57 320 111 2233",
    nextAppointment: "2026-02-25T11:00:00",
    initials: "LR",
  },
  {
    id: "prov-4",
    name: "Dra. Maria Isabel Castano",
    specialty: "Psicologia",
    clinic: "Consultorio privado",
    phone: "+57 315 444 5566",
    nextAppointment: null,
    initials: "MC",
  },
];

export const MOCK_PATIENT_INVITES: PatientInvite[] = [
  {
    id: "inv-1",
    providerName: "Dr. Sebastian Herrera",
    providerSpecialty: "Odontologia",
    clinicName: "Dental Smile Colombia",
    message:
      "Hola, te invito a conectarte como paciente para gestionar tus citas y tratamientos odontologicos.",
    sentAt: "2026-02-10T14:30:00",
  },
  {
    id: "inv-2",
    providerName: "Dra. Natalia Gomez",
    providerSpecialty: "Pediatria",
    clinicName: "Clinica Infantil Santa Ana",
    message:
      "Te invitamos a unirte para el seguimiento del crecimiento y vacunacion de tu hijo.",
    sentAt: "2026-02-08T09:15:00",
  },
];

export const MOCK_PATIENT_RECORDS: PatientRecord[] = [
  {
    id: "rec-1",
    date: "2026-01-28",
    type: "consulta",
    doctorName: "Dra. Carolina Mejia",
    summary: "Control general - Hipertension y diabetes tipo 2",
    details:
      "Paciente en buen estado general. PA: 130/80 mmHg. HbA1c: 6.8%. Se ajusta medicacion y se solicitan examenes de control.",
  },
  {
    id: "rec-2",
    date: "2026-01-28",
    type: "laboratorio",
    doctorName: "Dra. Carolina Mejia",
    summary: "Hemograma completo + Perfil lipidico",
    details:
      "Hemoglobina: 14.2 g/dL. Colesterol total: 195 mg/dL. LDL: 120 mg/dL. HDL: 48 mg/dL. Trigliceridos: 135 mg/dL.",
  },
  {
    id: "rec-3",
    date: "2026-01-15",
    type: "consulta",
    doctorName: "Dr. Jorge Eduardo Pineda",
    summary: "Evaluacion dolor lumbar cronico",
    details:
      "Se evidencia contractura paravertebral lumbar bilateral. Se indica manejo con AINES por 5 dias y terapia fisica.",
  },
  {
    id: "rec-4",
    date: "2026-01-15",
    type: "imagen",
    doctorName: "Dr. Jorge Eduardo Pineda",
    summary: "Radiografia columna lumbar AP y lateral",
    details:
      "Disminucion del espacio intervertebral L4-L5. Sin fracturas ni lesiones oseas agudas. Alineacion conservada.",
  },
  {
    id: "rec-5",
    date: "2026-01-10",
    type: "consulta",
    doctorName: "Dra. Maria Isabel Castano",
    summary: "Sesion de psicoterapia - Manejo de estres laboral",
    details:
      "Paciente refiere mejoria parcial en manejo de estres. Se trabajan tecnicas de mindfulness y reestructuracion cognitiva.",
  },
  {
    id: "rec-6",
    date: "2025-12-15",
    type: "receta",
    doctorName: "Dra. Laura Valentina Ruiz",
    summary: "Suplementacion nutricional",
    details:
      "Se prescribe Vitamina D3 1000 UI diario por deficit encontrado en examenes previos. Control en 6 meses.",
  },
];

export const MOCK_RECENT_ACTIVITY = [
  {
    id: "act-1",
    type: "prescription" as const,
    title: "Nueva receta emitida",
    description: "Losartan 50mg - Dra. Carolina Mejia",
    date: "2026-01-28",
  },
  {
    id: "act-2",
    type: "appointment" as const,
    title: "Cita confirmada",
    description: "Dermatologia - 20 Feb, 2:00 PM",
    date: "2026-02-09",
  },
  {
    id: "act-3",
    type: "record" as const,
    title: "Resultados de laboratorio disponibles",
    description: "Hemograma + Perfil lipidico",
    date: "2026-01-30",
  },
  {
    id: "act-4",
    type: "invite" as const,
    title: "Nueva invitacion recibida",
    description: "Dr. Sebastian Herrera - Odontologia",
    date: "2026-02-10",
  },
];
