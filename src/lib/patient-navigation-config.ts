import type { Icon } from "@phosphor-icons/react";
import {
  CalendarDots,
  ClipboardText,
  House,
  Pill,
  Stethoscope,
} from "@phosphor-icons/react";

export type PatientNavItem = {
  label: string;
  href: string;
  icon: Icon;
};

export const PATIENT_NAV_ITEMS: PatientNavItem[] = [
  { label: "Inicio", href: "/patient", icon: House },
  { label: "Citas", href: "/patient/appointments", icon: CalendarDots },
  { label: "Historial", href: "/patient/records", icon: ClipboardText },
  { label: "Recetas", href: "/patient/prescriptions", icon: Pill },
  { label: "Profesionales", href: "/patient/providers", icon: Stethoscope },
];
