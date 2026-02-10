import { SpinnerIcon } from "@phosphor-icons/react";
import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

export const Spinner: FC<ComponentProps<"svg">> = ({ className, ...props }) => {
  return (
    <SpinnerIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
};
