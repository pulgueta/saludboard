import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type BrandLogoProps = ComponentProps<"span">;

/**
 * Reusable SaludBoard brand logo text.
 * Bold and 3xl by default; use className to override.
 */
export const BrandLogo = ({ className, ...props }: BrandLogoProps) => (
  <span
    className={cn(
      "font-bold text-3xl text-foreground tracking-tighter",
      className,
    )}
    {...props}
  >
    Salud<span className="text-primary">Board</span>
  </span>
);
