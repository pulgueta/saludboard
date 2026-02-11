/**
 * Colombian healthcare-specific data constants.
 * Used across patient forms, documents, and configuration.
 */

/** Tipos de documento de identidad colombianos */
export const DOCUMENT_TYPES = [
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "PA", label: "Pasaporte" },
  { value: "RC", label: "Registro civil" },
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "NIT", label: "NIT" },
  { value: "PEP", label: "Permiso especial de permanencia" },
  { value: "PPT", label: "Permiso de protección temporal" },
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number]["value"];

/** Régimen de afiliación al sistema de salud */
export const HEALTH_REGIMES = [
  { value: "contributivo", label: "Contributivo" },
  { value: "subsidiado", label: "Subsidiado" },
  { value: "vinculado", label: "Vinculado" },
  { value: "particular", label: "Particular" },
] as const;

export type HealthRegime = (typeof HEALTH_REGIMES)[number]["value"];

/** Principales EPS en Colombia (activas a 2025) */
export const EPS_LIST = [
  { value: "sura", label: "EPS Sura" },
  { value: "sanitas", label: "EPS Sanitas" },
  { value: "compensar", label: "Compensar EPS" },
  { value: "famisanar", label: "Famisanar EPS" },
  { value: "salud-total", label: "Salud Total EPS" },
  { value: "nueva-eps", label: "Nueva EPS" },
  { value: "colsubsidio", label: "Colsubsidio" },
  { value: "coosalud", label: "Coosalud EPS" },
  { value: "mutual-ser", label: "Mutual Ser EPS" },
  { value: "aliansalud", label: "Aliansalud EPS" },
  { value: "capital-salud", label: "Capital Salud EPS" },
  { value: "comfenalco", label: "Comfenalco Valle EPS" },
  { value: "emssanar", label: "Emssanar EPS" },
  { value: "savia-salud", label: "Savia Salud EPS" },
  { value: "asmet-salud", label: "Asmet Salud EPS" },
  { value: "otra", label: "Otra" },
  { value: "ninguna", label: "Ninguna" },
] as const;

export type EpsValue = (typeof EPS_LIST)[number]["value"];

/** Niveles de SISBÉN */
export const SISBEN_LEVELS = [
  { value: "A", label: "Grupo A" },
  { value: "B", label: "Grupo B" },
  { value: "C", label: "Grupo C" },
  { value: "D", label: "Grupo D" },
  { value: "NA", label: "No aplica" },
] as const;

/** Géneros */
export const GENDERS = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "otro", label: "Otro" },
] as const;

/** Estados civiles */
export const MARITAL_STATUS = [
  { value: "soltero", label: "Soltero/a" },
  { value: "casado", label: "Casado/a" },
  { value: "union-libre", label: "Unión libre" },
  { value: "divorciado", label: "Divorciado/a" },
  { value: "viudo", label: "Viudo/a" },
] as const;

/** Parentescos para contacto de emergencia */
export const RELATIONSHIP_TYPES = [
  { value: "padre", label: "Padre" },
  { value: "madre", label: "Madre" },
  { value: "hijo", label: "Hijo/a" },
  { value: "conyuge", label: "Cónyuge" },
  { value: "hermano", label: "Hermano/a" },
  { value: "otro", label: "Otro" },
] as const;

/** Tipos de cita */
export const APPOINTMENT_TYPES = [
  { value: "consulta", label: "Consulta general" },
  { value: "control", label: "Control" },
  { value: "urgencia", label: "Urgencia" },
  { value: "procedimiento", label: "Procedimiento" },
  { value: "valoracion", label: "Valoración inicial" },
] as const;

/** Estados de cita */
export const APPOINTMENT_STATUS = [
  { value: "programada", label: "Programada", color: "primary" },
  { value: "completada", label: "Completada", color: "success" },
  { value: "cancelada", label: "Cancelada", color: "destructive" },
  { value: "no-asistio", label: "No asistió", color: "warning" },
] as const;

/** Departamentos de Colombia (principales) */
export const DEPARTMENTS = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bogotá D.C.",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Guainía",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés y Providencia",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada",
] as const;

/**
 * Formats a date using Colombian locale via Intl.DateTimeFormat.
 */
export function formatDateCO(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).format(d);
}

/**
 * Formats a short date like "12 ene." for chart tooltips.
 */
export function formatShortDateCO(date: Date | string | number): string {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
  }).format(d);
}

/**
 * Formats time in Colombian locale (24-hour format).
 */
export function formatTimeCO(date: Date | string | number): string {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

/**
 * Formats relative time like "hace 2 horas" using Intl.RelativeTimeFormat.
 */
export function formatRelativeTimeCO(date: Date | string | number): string {
  const d = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / 60_000);
  const diffHours = Math.round(diffMs / 3_600_000);
  const diffDays = Math.round(diffMs / 86_400_000);

  const rtf = new Intl.RelativeTimeFormat("es-CO", { numeric: "auto" });

  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minute");
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hour");
  return rtf.format(diffDays, "day");
}
