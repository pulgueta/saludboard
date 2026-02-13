import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./form-context";

const TextField = lazy(() =>
  import("@/components/primitives/form/text-field").then((module) => ({
    default: module.TextField,
  })),
);
const TextAreaField = lazy(() =>
  import("@/components/primitives/form/text-field").then((module) => ({
    default: module.TextAreaField,
  })),
);
const SelectField = lazy(() =>
  import("@/components/primitives/form/select-field").then((module) => ({
    default: module.SelectField,
  })),
);
const ResetButton = lazy(() =>
  import("@/components/primitives/form/reset-button").then((module) => ({
    default: module.ResetButton,
  })),
);
const SubmitButton = lazy(() =>
  import("@/components/primitives/form/submit-button").then((module) => ({
    default: module.SubmitButton,
  })),
);

export const { useAppForm } = createFormHook({
  fieldComponents: { TextField, TextAreaField, SelectField },
  formComponents: { SubmitButton, ResetButton },
  fieldContext,
  formContext,
});
