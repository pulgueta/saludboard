import { Button } from "@ui/button";
import { DrawerClose } from "@ui/drawer";
import { FieldGroup } from "@ui/field";
import { patients } from "convex/schema";
import type { FC } from "react";

import { useAppForm } from "@/hooks/form/use-form";
import { usePatientsActions } from "@/hooks/patients/use-patient-actions";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DOCUMENT_TYPES, EPS_LIST } from "@/lib/colombian-health-data";

interface PatientFormProps {
  onSuccess?: () => void;
}

export const PatientForm: FC<PatientFormProps> = ({ onSuccess }) => {
  const { user } = useCurrentUser();

  const { create } = usePatientsActions();

  const form = useAppForm({
    defaultValues: {
      professionalId: user?._id,
      firstName: "",
      lastName: "",
      documentType: "CC",
      documentNumber: "",
      email: "",
      phone: "",
      birthDate: new Date().toISOString(),
      gender: "male" as const,
      regime: "contributive" as const,
      eps: "",
    },
    validators: {
      onSubmit: patients.insert,
    },
    onSubmit: async ({ value }) => {
      await create(value);
      onSuccess?.();
    },
  });

  console.log(form.state.errorMap);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <FieldGroup className="grid grid-cols-2 gap-4">
        <form.AppField
          name="firstName"
          children={(field) => (
            <field.TextField
              label="Nombres"
              placeholder="Ej: María Fernanda"
              autoComplete="given-name"
            />
          )}
        />

        <form.AppField
          name="lastName"
          children={(field) => (
            <field.TextField
              label="Apellidos"
              placeholder="Ej: López García"
              autoComplete="family-name"
            />
          )}
        />
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <form.AppField
          name="documentType"
          children={(field) => (
            <field.SelectField
              label="Tipo de documento"
              placeholder="Seleccionar"
              options={DOCUMENT_TYPES}
            />
          )}
        />

        <form.AppField
          name="documentNumber"
          children={(field) => (
            <field.TextField
              label="Número de documento"
              placeholder="Ej: 1032456789"
              inputMode="numeric"
              autoComplete="off"
            />
          )}
        />
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField
              label="Correo electrónico"
              placeholder="paciente@correo.com"
              type="email"
              autoComplete="email"
            />
          )}
        />

        <form.AppField
          name="phone"
          children={(field) => (
            <field.TextField
              label="Teléfono"
              placeholder="+57 300 123 4567"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
            />
          )}
        />
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <form.AppField
          name="birthDate"
          children={(field) => (
            <field.TextField label="Fecha de nacimiento" type="date" />
          )}
        />

        <form.AppField
          name="eps"
          children={(field) => (
            <field.SelectField
              label="EPS"
              placeholder="Seleccionar EPS"
              options={EPS_LIST}
            />
          )}
        />
      </FieldGroup>

      <div className="flex justify-end gap-3 pt-4">
        <DrawerClose
          render={
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={form.state.isSubmitting}
            >
              Cancelar
            </Button>
          }
        />

        <form.AppForm>
          <form.SubmitButton label="Guardar paciente" />
        </form.AppForm>
      </div>
    </form>
  );
};
