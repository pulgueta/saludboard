import { Button } from "@ui/button";
import type { FC } from "react";

import { useFormContext } from "@/hooks/form/form-context";

interface ResetButtonProps {
  label: string;
}

export const ResetButton: FC<ResetButtonProps> = ({ label }) => {
  const form = useFormContext();

  return (
    <Button
      type="button"
      onClick={() => form.reset()}
      disabled={form.state.isSubmitting}
    >
      {label}
    </Button>
  );
};
