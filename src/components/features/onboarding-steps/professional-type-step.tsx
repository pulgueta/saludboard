import { useSubscription } from "@clerk/clerk-react/experimental";
import {
  PricingTable,
  useOrganization,
  useOrganizationCreationDefaults,
} from "@clerk/tanstack-react-start";
import { Buildings, User, WarningIcon } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { FieldGroup } from "@ui/field";
import type { FC } from "react";
import { useState } from "react";
import { z } from "zod";

import { OnboardingHeader } from "@/components/compounds/onboarding/onboarding-header";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { SelectionCard } from "@/components/primitives/selection-card";
import { useAppForm } from "@/hooks/form/use-form";
import { useOrganizationActions } from "@/hooks/use-organization";
import type { ProfessionalType } from "@/lib/onboarding-context";
import { useOnboarding } from "@/lib/onboarding-context";

const PROFESSIONAL_TYPES: {
  type: ProfessionalType;
  title: string;
  description: string;
  icon: typeof User;
}[] = [
  {
    type: "individual",
    title: "Profesional individual",
    description:
      "Consultorio propio o independiente. Selecciona un campo de salud para habilitar tu cuenta.",
    icon: User,
  },
  {
    type: "organization",
    title: "Organización",
    description:
      "Consultorio o centro de salud con múltiples especialidades y profesionales en tu equipo.",
    icon: Buildings,
  },
];

function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
}

const organizationSchema = z.object({
  name: z
    .string("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(80, "El nombre no puede superar los 80 caracteres.")
    .trim(),
  slug: z.string(),
});

/**
 * Step 3 (professionals only): Choose account type + plan in one screen.
 * Shows different PricingTable plans based on the selected type.
 *
 * When "Organización" is selected, a simple TanStack Form creates the org.
 */
export const ProfessionalTypeStep: FC = () => {
  const { state, setProfessionalType } = useOnboarding();
  const { createOrganization, setActiveOrganization } =
    useOrganizationActions();
  const { organization } = useOrganization();
  const { data: defaults, isLoading: isLoadingDefaults } =
    useOrganizationCreationDefaults();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasSelection = state.professionalType !== null;
  const isOrganization = state.professionalType === "organization";
  const { data: organizationSubscription } = useSubscription({
    for: "organization",
    enabled: !!organization?.id,
  });

  const hasActiveOrganizationSubscription =
    organizationSubscription?.status === "active" ||
    organizationSubscription?.status === "past_due";

  const shouldWarnAboutIndividualPlan =
    !isOrganization && hasActiveOrganizationSubscription;

  const form = useAppForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    validators: {
      onChange: organizationSchema,
      onSubmit: organizationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const organization = await createOrganization?.({
          name: value.name,
          slug: value.slug,
        });

        if (organization?.id && setActiveOrganization) {
          await setActiveOrganization({ organization: organization.id });
        }
      } catch (error) {
        const fallback =
          "No pudimos crear la organización. Verifica el nombre e inténtalo de nuevo.";

        const clerkError =
          typeof error === "object" &&
          error &&
          "errors" in error &&
          Array.isArray(
            (error as { errors?: Array<{ message?: string }> }).errors,
          )
            ? (error as { errors?: Array<{ message?: string }> }).errors
                ?.map((err) => err?.message)
                .filter(Boolean)
                .join("\n")
            : null;

        setSubmitError(clerkError || fallback);
      }
    },
  });

  const advisory = defaults?.advisory;
  const showWarning = advisory?.code === "organization_already_exists";
  const existingOrgName = advisory?.meta?.organization_name;
  const existingOrgDomain = advisory?.meta?.organization_domain;

  console.log(form);

  const _loading = form.state.isSubmitting || isLoadingDefaults;

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

      {isOrganization && !organization?.id && (
        <AnimatedContainer delay={220} duration={450}>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-base text-foreground">
                Crea tu organización
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <form.AppField
                  name="name"
                  children={(field) => (
                    <field.TextField
                      label="Nombre"
                      onChange={(e) => {
                        field.handleChange(e.target.value);

                        form.setFieldValue("slug", createSlug(e.target.value));
                        field.validate("change");
                      }}
                    />
                  )}
                />

                <form.AppField
                  name="slug"
                  children={(field) => (
                    <field.TextField
                      label="Identificador único"
                      disabled
                      className="pointer-events-none"
                      value={createSlug(form.getFieldValue("name"))}
                    />
                  )}
                />
              </FieldGroup>

              {showWarning && (
                <Alert variant="warning">
                  <WarningIcon className="size-4" />
                  <AlertTitle>Atención</AlertTitle>
                  <AlertDescription>
                    Ya existe una organización con el nombre "{existingOrgName}"
                    {existingOrgDomain
                      ? ` para el dominio "${existingOrgDomain}".`
                      : "."}
                  </AlertDescription>
                </Alert>
              )}

              {submitError && (
                <Alert variant="warning">
                  <WarningIcon className="size-4" />
                  <AlertTitle>Error al crear la organización</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <form.AppForm>
                <form.SubmitButton
                  label="Crear organización"
                  className="mt-4 mr-auto"
                />
              </form.AppForm>
            </form>
          </div>
        </AnimatedContainer>
      )}

      <AnimatedContainer delay={300} duration={450}>
        {hasSelection ? (
          <div className="space-y-8">
            {shouldWarnAboutIndividualPlan && (
              <Alert variant="warning">
                <WarningIcon className="size-4" />
                <AlertTitle>Suscripción activa</AlertTitle>
                <AlertDescription>
                  Tienes una suscripción activa de organización. Si deseas
                  suscribirte a un plan individual, te recomendamos cancelar la
                  suscripción actual o continuar usando ese plan para evitar
                  cobros duplicados.
                </AlertDescription>
              </Alert>
            )}

            <PricingTable for={isOrganization ? "organization" : "user"} />
          </div>
        ) : (
          <div className="rounded-xl border border-border/70 border-dashed bg-card/40 p-4 text-center text-muted-foreground text-sm">
            Selecciona un tipo de cuenta para ver los planes disponibles.
          </div>
        )}
      </AnimatedContainer>
    </OnboardingStep>
  );
};
