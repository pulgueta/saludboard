import type { FC } from "react";

import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  totalSteps: number;
  currentStep: number;
  className?: string;
};

/**
 * Minimal step progress indicator with animated dot transitions.
 * Each dot represents a step; filled dots indicate completed/current steps.
 */
export const StepIndicator: FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
  className,
}) => {
  return (
    <div
      data-slot="step-indicator"
      className={cn("flex items-center gap-2", className)}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Paso ${currentStep + 1} de ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: step indicator
            key={i}
            data-active={isActive || undefined}
            data-completed={isCompleted || undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500 ease-out",
              isActive
                ? "w-8 bg-primary"
                : isCompleted
                  ? "w-1.5 bg-primary/40"
                  : "w-1.5 bg-border",
            )}
          />
        );
      })}
    </div>
  );
};
