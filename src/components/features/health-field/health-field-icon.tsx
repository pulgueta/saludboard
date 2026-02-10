import {
  Baby,
  Bone,
  Brain,
  Drop,
  Leaf,
  Stethoscope,
  Tooth,
} from "@phosphor-icons/react";
import type { CSSProperties, FC } from "react";

import type { HealthFieldId } from "@/lib/health-fields";
import { cn } from "@/lib/utils";

type HealthFieldIconProps = {
  fieldId: HealthFieldId;
  accent: string;
  accentForeground: string;
  className?: string;
  size?: number;
};

const ICON_MAP: Record<HealthFieldId, typeof Stethoscope> = {
  "general-medicine": Stethoscope,
  pediatrics: Baby,
  dermatology: Drop,
  orthopedics: Bone,
  dentistry: Tooth,
  nutrition: Leaf,
  psychology: Brain,
};

/**
 * Renders the themed icon for a health field.
 * Each field gets a distinct Phosphor icon with the field's accent color as background.
 */
export const HealthFieldIcon: FC<HealthFieldIconProps> = ({
  fieldId,
  accent,
  accentForeground,
  className,
  size = 22,
}) => {
  const Icon = ICON_MAP[fieldId];

  return (
    <div
      data-slot="health-field-icon"
      className={cn(
        "flex items-center justify-center rounded-xl transition-transform duration-300 group-data-selected/selection:scale-105",
        className,
      )}
      style={
        {
          width: size + 18,
          height: size + 18,
          backgroundColor: accent,
          color: accentForeground,
        } as CSSProperties
      }
    >
      <Icon size={size} weight="duotone" />
    </div>
  );
};
