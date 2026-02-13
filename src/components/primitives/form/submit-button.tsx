import { Button } from "@ui/button";
import { Spinner } from "@ui/spinner";
import type { FC } from "react";

import { useFormContext } from "@/hooks/form/form-context";

interface SubmitButtonProps {
  label: string;
  className?: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ label, className }) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [
        state.canSubmit,
        state.isSubmitting,
        state.isPristine,
      ]}
      children={([canSubmit, isSubmitting, isPristine]) => (
        <Button
          type="submit"
          disabled={!canSubmit || isPristine}
          className={className}
        >
          {isSubmitting && <Spinner />}
          {label}
        </Button>
      )}
    />
  );
};
