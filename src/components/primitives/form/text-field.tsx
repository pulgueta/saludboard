import { useStore } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import type { ComponentProps, FC } from "react";

import { useFieldContext } from "@/hooks/form/form-context";

interface TextFieldProps extends ComponentProps<typeof Input> {
  label: string;
}

export const TextField: FC<TextFieldProps> = ({ label, ...props }) => {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && errors.length > 0;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...props}
      />

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
};

interface TextAreaFieldProps extends ComponentProps<typeof Textarea> {
  label: string;
}

export const TextAreaField: FC<TextAreaFieldProps> = ({ label, ...props }) => {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && errors.length > 0;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...props}
      />

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
};
