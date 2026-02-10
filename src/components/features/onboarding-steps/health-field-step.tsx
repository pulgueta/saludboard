import { Badge } from "@ui/badge";
import type { FC } from "react";

import { OnboardingFooter } from "@/components/compounds/onboarding/onboarding-footer";
import { OnboardingHeader } from "@/components/compounds/onboarding/onboarding-header";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { HealthFieldGrid } from "@/components/features/health-field/health-field-grid";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

/**
 * Step 3: Health field selection.
 * - Individual: single-select (radio behavior)
 * - Organization: multi-select (checkbox behavior)
 */
export const HealthFieldStep: FC = () => {
  const { state, setField, toggleField } = useOnboarding();

  const isOrganization = state.accountType === "organization";

  const handleSelect = isOrganization ? toggleField : setField;

  return (
    <OnboardingStep>
      <div className="flex flex-col gap-2">
        <OnboardingHeader
          title="Campo de salud"
          subtitle={
            isOrganization
              ? "Selecciona las especialidades que ofrece tu organización."
              : "Selecciona tu especialidad principal para habilitar las funciones adecuadas."
          }
        />

        {isOrganization && (
          <AnimatedContainer delay={150} duration={300}>
            <Badge
              variant="secondary"
              className={cn("w-fit tabular-nums", {
                block: state.selectedFields.length > 0,
              })}
            >
              {state.selectedFields.length}{" "}
              {state.selectedFields.length === 1
                ? "especialidad seleccionada"
                : "especialidades seleccionadas"}
            </Badge>
          </AnimatedContainer>
        )}
      </div>

      <HealthFieldGrid
        selectedFields={state.selectedFields}
        onSelect={handleSelect}
      />

      <div className="mt-auto">
        <OnboardingFooter />
      </div>
    </OnboardingStep>
  );
};
