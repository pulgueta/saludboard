import type { FC } from "react";

import { HealthFieldIcon } from "@/components/features/health-field/health-field-icon";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { SelectionCard } from "@/components/primitives/selection-card";
import type { HealthField } from "@/lib/health-fields";

type HealthFieldCardProps = {
  field: HealthField;
  selected: boolean;
  onSelect: () => void;
  delay?: number;
};

/**
 * A selectable card for an individual health field.
 * Composes the primitive SelectionCard with the HealthFieldIcon and field metadata.
 */
export const HealthFieldCard: FC<HealthFieldCardProps> = ({
  field,
  selected,
  onSelect,
  delay = 0,
}) => {
  return (
    <AnimatedContainer delay={delay} duration={300}>
      <SelectionCard
        selected={selected}
        onClick={onSelect}
        className="w-full gap-4"
      >
        <HealthFieldIcon
          fieldId={field.id}
          accent={field.accent}
          accentForeground={field.accentForeground}
        />

        <div className="flex flex-col gap-0.5 pr-6">
          <span className="font-medium text-foreground">{field.name}</span>
          <span className="max-w-prose text-pretty text-muted-foreground text-sm">
            {field.description}
          </span>
        </div>
      </SelectionCard>
    </AnimatedContainer>
  );
};
