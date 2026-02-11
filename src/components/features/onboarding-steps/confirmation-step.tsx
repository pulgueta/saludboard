import { CheckCircleIcon } from "@phosphor-icons/react";
import { Badge } from "@ui/badge";
import { Separator } from "@ui/separator";
import type { FC } from "react";
import { useCallback, useEffect } from "react";

import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { getHealthFieldById } from "@/lib/health-fields";
import { useOnboarding } from "@/lib/onboarding-context";

/**
 * Step 7 (professionals only): Confirmation summary.
 * Shows all selections before completing onboarding.
 */
export const ConfirmationStep: FC = () => {
  const { state, setFooterConfig } = useOnboarding();

  const selectedFieldNames = state.selectedFields
    .map((id) => getHealthFieldById(id)?.name)
    .filter(Boolean);

  const isOrganization = state.professionalType === "organization";

  const handleComplete = useCallback(() => {
    // In a real app this would persist to the backend.
    console.info("Onboarding complete:", {
      userType: state.userType,
      professionalType: state.professionalType,
      selectedFields: state.selectedFields,
      profile: state.profile,
      planSelected: state.planSelected,
    });
  }, [
    state.userType,
    state.professionalType,
    state.selectedFields,
    state.profile,
    state.planSelected,
  ]);

  useEffect(() => {
    setFooterConfig({
      nextLabel: "Ir al dashboard",
      onComplete: handleComplete,
    });
  }, [setFooterConfig, handleComplete]);

  return (
    <OnboardingStep>
      <AnimatedContainer delay={50} duration={500}>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircleIcon
              size={32}
              weight="duotone"
              className="text-primary"
            />
          </div>

          <h2 className="font-semibold text-2xl text-foreground tracking-tight">
            Todo listo.
          </h2>

          <p className="max-w-sm text-base text-muted-foreground leading-relaxed">
            Revisa que la información sea correcta antes de comenzar a usar
            SaludBoard.
          </p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={200} duration={450}>
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm">
          {/* Professional type */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-muted-foreground text-sm">
              Tipo de cuenta
            </span>
            <span className="font-medium text-foreground text-sm">
              {isOrganization ? "Organización" : "Individual"}
            </span>
          </div>

          <Separator />

          {/* Plan */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-muted-foreground text-sm">Plan</span>
            <Badge variant="secondary">
              {state.planSelected ? "Seleccionado" : "Pendiente"}
            </Badge>
          </div>

          <Separator />

          {/* Health fields */}
          <div className="flex flex-col gap-2.5 px-5 py-4">
            <span className="text-muted-foreground text-sm">
              {isOrganization ? "Especialidades" : "Especialidad"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedFieldNames.map((name) => (
                <Badge key={name} variant="secondary">
                  {name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Profile info */}
          <div className="flex flex-col gap-3 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Nombre</span>
              <span className="font-medium text-foreground text-sm">
                {state.profile.fullName || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {isOrganization ? "NIT" : "Documento"}
              </span>
              <span className="font-medium text-foreground text-sm">
                {state.profile.documentNumber || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Correo electrónico
              </span>
              <span className="font-medium text-foreground text-sm">
                {state.profile.email || "-"}
              </span>
            </div>
            {state.profile.phone ? (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Teléfono</span>
                <span className="font-medium text-foreground text-sm">
                  {state.profile.phone}
                </span>
              </div>
            ) : null}
            {state.profile.licenseNumber ? (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {isOrganization
                    ? "Código de habilitación"
                    : "Registro profesional"}
                </span>
                <span className="font-medium text-foreground text-sm">
                  {state.profile.licenseNumber}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </AnimatedContainer>
    </OnboardingStep>
  );
};
