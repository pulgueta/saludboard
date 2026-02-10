import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

export const Skeleton: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};
