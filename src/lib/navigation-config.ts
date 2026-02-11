import type { Icon } from "@phosphor-icons/react";
import {
  BabyIcon,
  BoneIcon,
  BrainIcon,
  CalendarDotsIcon,
  CameraIcon,
  ChartLineUpIcon,
  ClipboardTextIcon,
  ClockIcon,
  DropIcon,
  FileTextIcon,
  FolderOpenIcon,
  HouseIcon,
  LeafIcon,
  NeedleIcon,
  StethoscopeIcon,
  ToothIcon,
  UserPlusIcon,
  UsersIcon,
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
    icon: HouseIcon,
  },
  {
    title: "Pacientes",
    url: "/dashboard/patients",
    icon: UsersIcon,
    items: [
      { title: "Lista de pacientes", url: "/dashboard/patients" },
      { title: "Nuevo paciente", url: "/dashboard/patients/new" },
    ],
  },
  {
    title: "Historia clínica",
    url: "/dashboard/records",
    icon: ClipboardTextIcon,
    items: [{ title: "Ver historias", url: "/dashboard/records" }],
  },
  {
    title: "Agenda",
    url: "/dashboard/appointments",
    icon: CalendarDotsIcon,
    items: [{ title: "Citas programadas", url: "/dashboard/appointments" }],
  },
  {
    title: "Documentos",
    url: "/dashboard/documents",
    icon: FileTextIcon,
    items: [
      { title: "Archivos", url: "/dashboard/documents" },
      { title: "Consentimientos", url: "/dashboard/documents/consent-forms" },
    ],
  },
];

/** Field-specific navigation sections. */
export const FIELD_SPECIFIC_NAV: Record<HealthFieldId, NavProject[]> = {
  "general-medicine": [
    { name: "Interconsultas", url: "/dashboard/referrals", icon: UserPlusIcon },
    {
      name: "Archivos clínicos",
      url: "/dashboard/clinical-files",
      icon: FolderOpenIcon,
    },
  ],
  pediatrics: [
    { name: "Vacunación", url: "/dashboard/vaccines", icon: NeedleIcon },
    { name: "Crecimiento", url: "/dashboard/growth", icon: ChartLineUpIcon },
  ],
  dermatology: [
    {
      name: "Fotografías clínicas",
      url: "/dashboard/photos",
      icon: CameraIcon,
    },
    { name: "Seguimiento lesiones", url: "/dashboard/lesions", icon: DropIcon },
  ],
  orthopedics: [
    {
      name: "Imágenes diagnósticas",
      url: "/dashboard/imaging",
      icon: BoneIcon,
    },
    { name: "Rehabilitación", url: "/dashboard/rehab", icon: ClockIcon },
  ],
  dentistry: [
    { name: "Odontograma", url: "/dashboard/odontogram", icon: ToothIcon },
    { name: "Radiografías", url: "/dashboard/xrays", icon: CameraIcon },
  ],
  nutrition: [
    { name: "Plan nutricional", url: "/dashboard/meal-plans", icon: LeafIcon },
    {
      name: "Composición corporal",
      url: "/dashboard/body-comp",
      icon: ChartLineUpIcon,
    },
  ],
  psychology: [
    {
      name: "Notas de sesión",
      url: "/dashboard/session-notes",
      icon: BrainIcon,
    },
    {
      name: "Tests psicométricos",
      url: "/dashboard/tests",
      icon: ClipboardTextIcon,
    },
  ],
};

/**
 * Returns the icon component for a given health field ID.
 */
export const HEALTH_FIELD_SIDEBAR_ICONS: Record<HealthFieldId, Icon> = {
  "general-medicine": StethoscopeIcon,
  pediatrics: BabyIcon,
  dermatology: DropIcon,
  orthopedics: BoneIcon,
  dentistry: ToothIcon,
  nutrition: LeafIcon,
  psychology: BrainIcon,
};
