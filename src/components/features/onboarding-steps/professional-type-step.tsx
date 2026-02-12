import {
  PricingTable,
  useOrganizationCreationDefaults,
} from "@clerk/tanstack-react-start";
import { Buildings, User, WarningIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { Button } from "@ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@ui/field";
import { Input } from "@ui/input";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { OnboardingHeader } from "@/components/compounds/onboarding/onboarding-header";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AnimatedContainer } from "@/components/primitives/animated-container";
import { SelectionCard } from "@/components/primitives/selection-card";
import { Spinner } from "@/components/ui/spinner";
import { useOrganizationActions } from "@/hooks/use-organization-actions";
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
      "Consultorio propio o independiente. Selecciona un campo de salud para habilitar las funciones de tu cuenta.",
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
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(80, "El nombre no puede superar los 80 caracteres."),
  slug: z
    .string()
    .min(3, "El slug debe tener al menos 3 caracteres.")
    .max(80, "El slug no puede superar los 80 caracteres.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "El slug solo puede contener letras minúsculas, números y guiones.",
    ),
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
  const { data: defaults, isLoading: isLoadingDefaults } =
    useOrganizationCreationDefaults();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasSelection = state.professionalType !== null;
  const isOrganization = state.professionalType === "organization";

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    validators: {
      onSubmit: organizationSchema,
    },
    onSubmit: async ({ value }) => {
      const name = value.name.trim();
      const slug = value.slug.trim();
      setSubmitError(null);

      if (!createOrganization) return;

      try {
        const organization = await createOrganization({ name, slug });

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

  useEffect(() => {
    if (!defaults?.form?.name) return;
    if (form.getFieldValue("name")) return;
    const name = defaults.form.name;
    form.setFieldValue("name", name);
    form.setFieldValue("slug", createSlug(name));
  }, [defaults?.form?.name, form]);

  const advisory = defaults?.advisory;
  const showWarning = advisory?.code === "organization_already_exists";
  const existingOrgName = advisory?.meta?.organization_name;
  const existingOrgDomain = advisory?.meta?.organization_domain;

  const loading = form.state.isSubmitting || isLoadingDefaults;

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

      {isOrganization ? (
        <AnimatedContainer delay={220} duration={450}>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-base text-foreground">
                Crea tu organización
              </h3>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor="org-name">Nombre</FieldLabel>
                        <Input
                          id="org-name"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => {
                            const nextValue = event.target.value;
                            field.handleChange(nextValue);
                            form.setFieldValue("slug", createSlug(nextValue));
                          }}
                          aria-invalid={isInvalid}
                          placeholder="Centro Médico Nueva Vida"
                          autoComplete="organization"
                        />
                        <FieldDescription>
                          Usa el nombre legal o comercial de tu organización.
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="slug">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor="org-slug">
                        Identificador único
                      </FieldLabel>
                      <Input
                        id="org-slug"
                        name={field.name}
                        value={field.state.value}
                        readOnly
                        disabled
                        aria-readonly="true"
                        aria-disabled="true"
                        className="cursor-not-allowed bg-muted/50"
                      />
                      <FieldDescription>
                        Identificador único generado automáticamente a partir
                        del nombre.
                      </FieldDescription>
                    </Field>
                  )}
                </form.Field>
              </FieldGroup>

              {showWarning ? (
                <Alert variant="warning">
                  <WarningIcon className="size-4" />
                  <AlertTitle>Atención</AlertTitle>
                  <AlertDescription>
                    Ya existe una organización con el nombre "{existingOrgName}”
                    {existingOrgDomain
                      ? ` para el dominio “${existingOrgDomain}”.`
                      : "."}
                  </AlertDescription>
                </Alert>
              ) : null}

              {submitError ? (
                <Alert variant="warning">
                  <WarningIcon className="size-4" />
                  <AlertTitle>Error al crear la organización</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              ) : null}

              <Button
                type="submit"
                disabled={loading || !createOrganization}
                className="ml-auto w-max"
              >
                {loading && <Spinner />}
                Crear organización
              </Button>
            </form>
          </div>
        </AnimatedContainer>
      ) : null}

      <AnimatedContainer delay={260} duration={450}>
        {hasSelection ? (
          <PricingTable for={isOrganization ? "organization" : "user"} />
        ) : (
          <div className="rounded-xl border border-border/70 border-dashed bg-card/40 p-4 text-center text-muted-foreground text-sm">
            Selecciona un tipo de cuenta para ver los planes disponibles.
          </div>
        )}
      </AnimatedContainer>
    </OnboardingStep>
  );
};
