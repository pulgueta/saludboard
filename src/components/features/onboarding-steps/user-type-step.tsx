import { HeartbeatIcon, StethoscopeIcon } from "@phosphor-icons/react";
import type { FC } from "react";

import { OnboardingHeader } from "@/components/compounds/onboarding/onboarding-header";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { SelectionCard } from "@/components/primitives/selection-card";
import type { UserType } from "@/lib/onboarding-context";
import { useOnboarding } from "@/lib/onboarding-context";

const USER_TYPES: {
  type: UserType;
  title: string;
  description: string;
  icon: typeof StethoscopeIcon;
}[] = [
  {
    type: "professional",
    title: "Profesional de salud",
    description:
      "Gestiona pacientes, citas, historias clínicas y documentos desde tu consultorio o clínica.",
    icon: StethoscopeIcon,
  },
  {
    type: "patient",
    title: "Paciente",
    description:
      "Accede a tus citas, historial médico, recetas y conecta con tus profesionales de confianza.",
    icon: HeartbeatIcon,
  },
];

/**
 * Step 2: User type selection \u2014 Patient vs Professional.
 *
 * If the user picks "patient" the onboarding footer will redirect them
 * to the patient portal instead of advancing through the professional flow.
 */
export const UserTypeStep: FC = () => {
  const { state, setUserType } = useOnboarding();

  return (
    <OnboardingStep>
      <OnboardingHeader
        title="¿Cómo vas a usar SaludBoard?"
        subtitle="Selecciona tu rol para personalizar tu experiencia desde el inicio."
      />

      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        role="radiogroup"
        aria-label="Tipo de usuario"
      >
        {USER_TYPES.map(({ type, title, description, icon: Icon }, index) => (
          <AnimatedContainer
            key={type}
            delay={150 + index * 100}
            duration={450}
          >
            <SelectionCard
              selected={state.userType === type}
              onClick={() => setUserType(type)}
              role="radio"
              aria-checked={state.userType === type}
              className="min-h-full w-full flex-row items-start gap-4 p-4"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted md:size-12">
                <Icon size={24} weight="duotone" className="text-foreground" />
              </div>

              <div className="flex flex-col gap-1 pr-6">
                <span className="font-medium text-foreground">{title}</span>
                <span className="max-w-prose text-pretty text-muted-foreground text-sm">
                  {description}
                </span>
              </div>
            </SelectionCard>
          </AnimatedContainer>
        ))}
      </div>
    </OnboardingStep>
  );
};
