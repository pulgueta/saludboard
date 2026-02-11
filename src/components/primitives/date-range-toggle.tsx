import type { FC } from "react";

import { cn } from "@/lib/utils";

type DateRangeToggleProps = {
  value: number;
  onChange: (days: number) => void;
  options?: number[];
  className?: string;
};

const DEFAULT_OPTIONS = [7, 14, 30];

/**
 * Pill-style toggle for selecting a date range in days.
 */
export const DateRangeToggle: FC<DateRangeToggleProps> = ({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  className,
}) => {
  return (
    <div
      data-slot="date-range-toggle"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg bg-muted p-0.5",
        className,
      )}
      role="radiogroup"
      aria-label="Rango de fechas"
    >
      {options.map((days) => (
        <button
          key={days}
          type="button"
          role="radio"
          aria-checked={value === days}
          onClick={() => onChange(days)}
          className={cn(
            "rounded-md px-3 py-1 font-medium text-xs transition-all",
            value === days
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {days}d
        </button>
      ))}
    </div>
  );
};
