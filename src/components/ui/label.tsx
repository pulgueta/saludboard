import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

export const Label: FC<ComponentProps<"label">> = ({ className, ...props }) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: This is a reusable component that will be associated with controls by consumers
    <label
      data-slot="label"
      className={cn(
        "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
