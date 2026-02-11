import { PricingTable } from "@clerk/tanstack-react-start";
import { BuildingsIcon, UserIcon } from "@phosphor-icons/react";
import { type FC, useEffect } from "react";

import { OnboardingHeader } from "@/components/compounds/onboarding/onboarding-header";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { SelectionCard } from "@/components/primitives/selection-card";
import type { ProfessionalType } from "@/lib/onboarding-context";
import { useOnboarding } from "@/lib/onboarding-context";

const PROFESSIONAL_TYPES: {
  type: ProfessionalType;
  title: string;
  description: string;
  icon: typeof UserIcon;
}[] = [
  {
    type: "individual",
    title: "Profesional individual",
    description:
      "Consultorio propio o independiente para gestionar pacientes, citas, historias clínicas y documentos.",
    icon: UserIcon,
  },
  {
    type: "organization",
    title: "Organización",
    description:
      "Consultorio o centro de salud con múltiples especialidades y profesionales en tu equipo.",
    icon: BuildingsIcon,
  },
];

/**
 * Step 3 (professionals only): Choose account type + plan in one screen.
 * Shows different PricingTable plans based on the selected type.
 */
export const ProfessionalTypeStep: FC = () => {
  const { state, setProfessionalType } = useOnboarding();

  useEffect(() => {
    if (state.professionalType === null) {
      setProfessionalType("individual");
    }
  }, [state.professionalType, setProfessionalType]);

  const hasSelection = state.professionalType !== null;
  const isOrganization = state.professionalType === "organization";

  return (
    <OnboardingStep>
      <OnboardingHeader
        title="Tipo de cuenta y plan"
        subtitle="Selecciona el tipo de cuenta y elige un plan para continuar."
      />

      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        role="radiogroup"
        aria-label="Tipo de cuenta profesional"
      >
        {PROFESSIONAL_TYPES.map(
          ({ type, title, description, icon: Icon }, index) => (
            <AnimatedContainer
              key={type}
              delay={150 + index * 100}
              duration={450}
            >
              <SelectionCard
                selected={state.professionalType === type}
                onClick={() => setProfessionalType(type)}
                role="radio"
                aria-checked={state.professionalType === type}
                className="min-h-full w-full flex-row items-start gap-4 p-4"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted md:size-12">
                  <Icon
                    size={24}
                    weight="duotone"
                    className="text-foreground"
                  />
                </div>

                <div className="flex flex-col gap-1 pr-6">
                  <span className="font-medium text-foreground">{title}</span>
                  <span className="max-w-prose text-pretty text-muted-foreground text-sm">
                    {description}
                  </span>
                </div>
              </SelectionCard>
            </AnimatedContainer>
          ),
        )}
      </div>

      <AnimatedContainer delay={250} duration={450} className="space-y-4">
        {isOrganization && (
          <p className="text-pretty text-center text-muted-foreground text-sm">
            Necesitas crear una organización para poder seleccionar un plan.
            Selecciona el plan personal para continuar.
          </p>
        )}

        {hasSelection ? (
          <PricingTable for={isOrganization ? "organization" : "user"} />
        ) : (
          <div className="rounded-xl border border-border/70 border-dashed bg-card/40 p-6 text-center text-muted-foreground text-sm">
            Selecciona un tipo de cuenta para ver los planes disponibles.
          </div>
        )}
      </AnimatedContainer>
    </OnboardingStep>
  );
};
