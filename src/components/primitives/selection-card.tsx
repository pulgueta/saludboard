import type { ComponentProps, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SelectionCardProps = Omit<ComponentProps<"button">, "children"> & {
  selected?: boolean;
  children: ReactNode;
};

/**
 * A generic pressable card for selection UIs (account type, health fields, etc.).
 * Handles selected/unselected visual states with border and background transitions.
 */
export const SelectionCard: FC<SelectionCardProps> = ({
  className,
  selected = false,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      data-slot="selection-card"
      data-selected={selected || undefined}
      aria-pressed={selected}
      className={cn(
        "group/selection relative flex cursor-pointer flex-col items-start gap-3 rounded-2xl border p-5 text-left outline-none transition-all duration-300",
        "hover:border-primary/30 hover:bg-primary/[0.02] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        selected
          ? "border-primary/40 bg-primary/[0.04] ring-1 ring-primary/10"
          : "border-border bg-card",
        className,
      )}
      {...props}
    >
      {children}

      {/* Selection indicator */}
      <div
        className={cn(
          "absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border-2 transition-all duration-300",
          selected
            ? "scale-100 border-primary bg-primary"
            : "scale-90 border-border bg-transparent",
        )}
      >
        <svg
          viewBox="0 0 12 12"
          fill="none"
          className={cn(
            "size-3 transition-all duration-200",
            selected ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        >
          <title>Selección</title>
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};
