export const HEALTH_FIELD_IDS = [
  "general-medicine",
  "pediatrics",
  "dermatology",
  "orthopedics",
  "dentistry",
  "nutrition",
  "psychology",
] as const;

export type HealthFieldId = (typeof HEALTH_FIELD_IDS)[number];

export type HealthField = {
  id: HealthFieldId;
  name: string;
  description: string;
  icon: HealthFieldId;
  accent: string;
  accentForeground: string;
};

export const HEALTH_FIELDS: HealthField[] = [
  {
    id: "general-medicine",
    name: "Medicina General",
    description: "Atención primaria y diagnóstico integral para adultos.",
    icon: "general-medicine",
    accent: "oklch(0.65 0.15 160)",
    accentForeground: "oklch(0.98 0.01 160)",
  },
  {
    id: "pediatrics",
    name: "Pediatría",
    description: "Cuidado médico especializado para niños y adolescentes.",
    icon: "pediatrics",
    accent: "oklch(0.68 0.14 250)",
    accentForeground: "oklch(0.98 0.01 250)",
  },
  {
    id: "dermatology",
    name: "Dermatología",
    description: "Diagnóstico y tratamiento de condiciones de la piel.",
    icon: "dermatology",
    accent: "oklch(0.70 0.13 50)",
    accentForeground: "oklch(0.98 0.01 50)",
  },
  {
    id: "orthopedics",
    name: "Ortopedia",
    description:
      "Sistema musculoesquelético, huesos, articulaciones y ligamentos.",
    icon: "orthopedics",
    accent: "oklch(0.60 0.16 30)",
    accentForeground: "oklch(0.98 0.01 30)",
  },
  {
    id: "dentistry",
    name: "Odontología",
    description: "Salud oral, prevención y tratamientos dentales.",
    icon: "dentistry",
    accent: "oklch(0.72 0.12 200)",
    accentForeground: "oklch(0.98 0.01 200)",
  },
  {
    id: "nutrition",
    name: "Nutrición",
    description: "Planes alimentarios y hábitos saludables personalizados.",
    icon: "nutrition",
    accent: "oklch(0.68 0.16 140)",
    accentForeground: "oklch(0.98 0.01 140)",
  },
  {
    id: "psychology",
    name: "Psicología",
    description: "Bienestar mental, terapia y acompañamiento emocional.",
    icon: "psychology",
    accent: "oklch(0.65 0.14 300)",
    accentForeground: "oklch(0.98 0.01 300)",
  },
];

export function getHealthFieldById(id: HealthFieldId): HealthField | undefined {
  return HEALTH_FIELDS.find((field) => field.id === id);
}
