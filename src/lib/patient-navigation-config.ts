import type { Icon } from "@phosphor-icons/react";
import {
  CalendarDotsIcon,
  ClipboardTextIcon,
  HouseIcon,
  PillIcon,
  StethoscopeIcon,
} from "@phosphor-icons/react";

export type PatientNavItem = {
  label: string;
  href: string;
  icon: Icon;
};

export const PATIENT_NAV_ITEMS: PatientNavItem[] = [
  { label: "Inicio", href: "/patient", icon: HouseIcon },
  { label: "Citas", href: "/patient/appointments", icon: CalendarDotsIcon },
  { label: "Historial", href: "/patient/records", icon: ClipboardTextIcon },
  { label: "Recetas", href: "/patient/prescriptions", icon: PillIcon },
  { label: "Profesionales", href: "/patient/providers", icon: StethoscopeIcon },
];
