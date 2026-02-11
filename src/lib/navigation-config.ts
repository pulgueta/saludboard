import type { Icon } from "@phosphor-icons/react";
import {
  Baby,
  Bone,
  Brain,
  CalendarDots,
  Camera,
  ChartLineUp,
  ClipboardText,
  Clock,
  Drop,
  FileText,
  FolderOpen,
  House,
  Leaf,
  Needle,
  Stethoscope,
  Tooth,
  UserPlus,
  Users,
} from "@phosphor-icons/react";

import type { HealthFieldId } from "@/lib/health-fields";

export type NavItem = {
  title: string;
  url: string;
  icon: Icon;
  items?: { title: string; url: string }[];
};

export type NavProject = {
  name: string;
  url: string;
  icon: Icon;
};

/** Main navigation items shared by ALL health fields. */
export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: House,
  },
  {
    title: "Pacientes",
    url: "/dashboard/patients",
    icon: Users,
    items: [
      { title: "Lista de pacientes", url: "/dashboard/patients" },
      { title: "Nuevo paciente", url: "/dashboard/patients/new" },
    ],
  },
  {
    title: "Historia clínica",
    url: "/dashboard/records",
    icon: ClipboardText,
    items: [{ title: "Ver historias", url: "/dashboard/records" }],
  },
  {
    title: "Agenda",
    url: "/dashboard/appointments",
    icon: CalendarDots,
    items: [{ title: "Citas programadas", url: "/dashboard/appointments" }],
  },
  {
    title: "Documentos",
    url: "/dashboard/documents",
    icon: FileText,
    items: [
      { title: "Archivos", url: "/dashboard/documents" },
      { title: "Consentimientos", url: "/dashboard/documents/consent-forms" },
    ],
  },
];

/** Field-specific navigation sections. */
export const FIELD_SPECIFIC_NAV: Record<HealthFieldId, NavProject[]> = {
  "general-medicine": [
    { name: "Interconsultas", url: "/dashboard/referrals", icon: UserPlus },
    {
      name: "Archivos clínicos",
      url: "/dashboard/clinical-files",
      icon: FolderOpen,
    },
  ],
  pediatrics: [
    { name: "Vacunación", url: "/dashboard/vaccines", icon: Needle },
    { name: "Crecimiento", url: "/dashboard/growth", icon: ChartLineUp },
  ],
  dermatology: [
    { name: "Fotografías clínicas", url: "/dashboard/photos", icon: Camera },
    { name: "Seguimiento lesiones", url: "/dashboard/lesions", icon: Drop },
  ],
  orthopedics: [
    { name: "Imágenes diagnósticas", url: "/dashboard/imaging", icon: Bone },
    { name: "Rehabilitación", url: "/dashboard/rehab", icon: Clock },
  ],
  dentistry: [
    { name: "Odontograma", url: "/dashboard/odontogram", icon: Tooth },
    { name: "Radiografías", url: "/dashboard/xrays", icon: Camera },
  ],
  nutrition: [
    { name: "Plan nutricional", url: "/dashboard/meal-plans", icon: Leaf },
    {
      name: "Composición corporal",
      url: "/dashboard/body-comp",
      icon: ChartLineUp,
    },
  ],
  psychology: [
    { name: "Notas de sesión", url: "/dashboard/session-notes", icon: Brain },
    {
      name: "Tests psicométricos",
      url: "/dashboard/tests",
      icon: ClipboardText,
    },
  ],
};

/**
 * Returns the icon component for a given health field ID.
 */
export const HEALTH_FIELD_SIDEBAR_ICONS: Record<HealthFieldId, Icon> = {
  "general-medicine": Stethoscope,
  pediatrics: Baby,
  dermatology: Drop,
  orthopedics: Bone,
  dentistry: Tooth,
  nutrition: Leaf,
  psychology: Brain,
};
