import { CheckCircle } from "@phosphor-icons/react";
import { Badge } from "@ui/badge";
import { Separator } from "@ui/separator";
import type { FC } from "react";

import { OnboardingFooter } from "@/components/compounds/onboarding/onboarding-footer";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { getHealthFieldById } from "@/lib/health-fields";
import { useOnboarding } from "@/lib/onboarding-context";

/**
 * Step 5: Confirmation summary showing all selections before completing onboarding.
 */
export const ConfirmationStep: FC = () => {
  const { state } = useOnboarding();

  const selectedFieldNames = state.selectedFields
    .map((id) => getHealthFieldById(id)?.name)
    .filter(Boolean);

  const handleComplete = () => {
    // In a real app this would persist to the backend.
    // For now, we log and could navigate to the dashboard.
    console.info("Onboarding complete:", {
      accountType: state.accountType,
      selectedFields: state.selectedFields,
      profile: state.profile,
    });
  };

  return (
    <OnboardingStep>
      <AnimatedContainer delay={50} duration={500}>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle size={32} weight="duotone" className="text-primary" />
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
          {/* Account type */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-muted-foreground text-sm">
              Tipo de cuenta
            </span>
            <span className="font-medium text-foreground text-sm">
              {state.accountType === "organization"
                ? "Organización"
                : "Individual"}
            </span>
          </div>

          <Separator />

          {/* Health fields */}
          <div className="flex flex-col gap-2.5 px-5 py-4">
            <span className="text-muted-foreground text-sm">
              {state.accountType === "organization"
                ? "Especialidades"
                : "Especialidad"}
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
                {state.accountType === "organization" ? "NIT" : "Documento"}
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
                  {state.accountType === "organization"
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

      <div className="mt-auto">
        <OnboardingFooter
          nextLabel="Ir al dashboard"
          onComplete={handleComplete}
        />
      </div>
    </OnboardingStep>
  );
};
