import type { FC } from "react";

import { HealthFieldCard } from "@/components/features/health-field/health-field-card";
import type { HealthFieldId } from "@/lib/health-fields";
import { HEALTH_FIELDS } from "@/lib/health-fields";

type HealthFieldGridProps = {
  selectedFields: HealthFieldId[];
  onSelect: (fieldId: HealthFieldId) => void;
};

/**
 * Grid layout that renders all available health field cards.
 * Handles both single-select and multi-select based on the onSelect callback.
 */
export const HealthFieldGrid: FC<HealthFieldGridProps> = ({
  selectedFields,
  onSelect,
}) => {
  return (
    <fieldset
      data-slot="health-field-grid"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      aria-label="Campos de salud disponibles"
    >
      {HEALTH_FIELDS.map((field, index) => (
        <HealthFieldCard
          key={field.id}
          field={field}
          selected={selectedFields.includes(field.id)}
          onSelect={() => onSelect(field.id)}
          delay={150 + index * 60}
        />
      ))}
    </fieldset>
  );
};
