import { Input } from "@ui/input";
import { Label } from "@ui/label";
import type { FC } from "react";
import { useEffect, useRef } from "react";

import { OnboardingHeader } from "@/components/compounds/onboarding/onboarding-header";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useOnboarding } from "@/lib/onboarding-context";

/**
 * Step 6 (professionals only): Basic profile information.
 *
 * Auto-populates name and email from the Clerk session on first render.
 * Only fields that are empty get filled so the user's manual edits are preserved.
 */
export const ProfileStep: FC = () => {
  const { state, updateProfile } = useOnboarding();
  const { user } = useCurrentUser();
  const hasPopulated = useRef(false);

  const isOrganization = state.professionalType === "organization";

  // Auto-populate from Clerk session once
  useEffect(() => {
    if (hasPopulated.current || !user) return;
    hasPopulated.current = true;

    if (!state.profile.fullName && user.fullName) {
      updateProfile("fullName", user.fullName);
    }
    if (!state.profile.email && user.email) {
      updateProfile("email", user.email);
    }
  }, [user, state.profile.fullName, state.profile.email, updateProfile]);

  return (
    <OnboardingStep>
      <OnboardingHeader
        title="Información básica"
        subtitle={
          isOrganization
            ? "Datos de contacto principales de tu organización."
            : "Datos de tu perfil profesional. Algunos campos se completaron automáticamente."
        }
      />

      <div className="flex flex-col gap-5">
        <AnimatedContainer delay={150}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName">
              {isOrganization ? "Nombre de la organización" : "Nombre completo"}
            </Label>
            <Input
              id="fullName"
              placeholder={
                isOrganization ? "Centro Médico Ejemplo" : "Dra. María Pérez"
              }
              value={state.profile.fullName}
              onChange={(e) => updateProfile("fullName", e.target.value)}
              autoComplete="name"
            />
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={220}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="contacto@ejemplo.com"
              value={state.profile.email}
              onChange={(e) => updateProfile("email", e.target.value)}
              autoComplete="email"
            />
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={290}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="documentNumber">
              {isOrganization ? "NIT" : "Documento de identidad"}
            </Label>
            <Input
              id="documentNumber"
              placeholder={isOrganization ? "900123456-7" : "1032456789"}
              value={state.profile.documentNumber}
              onChange={(e) => updateProfile("documentNumber", e.target.value)}
              autoComplete="off"
              inputMode="numeric"
            />
          </div>
        </AnimatedContainer>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AnimatedContainer delay={360}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">
                Teléfono
                <span className="text-muted-foreground"> (opcional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+57 300 123 4567"
                value={state.profile.phone}
                onChange={(e) => updateProfile("phone", e.target.value)}
                autoComplete="tel"
              />
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={430}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="licenseNumber">
                {isOrganization
                  ? "Código de habilitación"
                  : "Registro profesional"}
                <span className="text-muted-foreground"> (opcional)</span>
              </Label>
              <Input
                id="licenseNumber"
                placeholder={isOrganization ? "HAB-12345" : "Rethus 123456"}
                value={state.profile.licenseNumber}
                onChange={(e) => updateProfile("licenseNumber", e.target.value)}
              />
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </OnboardingStep>
  );
};
