import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { Button } from "@ui/button";
import type { FC } from "react";

import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

type OnboardingFooterProps = {
  className?: string;
  nextLabel?: string;
  onComplete?: () => void;
};

/**
 * Navigation footer for onboarding steps.
 * Renders Back/Next buttons with contextual labels and disabled states.
 */
export const OnboardingFooter: FC<OnboardingFooterProps> = ({
  className,
  nextLabel,
  onComplete,
}) => {
  const { canGoNext, canGoPrev, isLastStep, nextStep, prevStep } =
    useOnboarding();

  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete();
      return;
    }
    nextStep();
  };

  return (
    <div
      data-slot="onboarding-footer"
      className={cn("flex items-center justify-between pt-6", className)}
    >
      {canGoPrev ? (
        <Button
          variant="ghost"
          size="lg"
          onClick={prevStep}
          className="gap-2 text-muted-foreground"
        >
          <ArrowLeft weight="bold" className="size-4" />
          Volver
        </Button>
      ) : (
        <div />
      )}

      <Button
        size="lg"
        onClick={handleNext}
        disabled={!canGoNext}
        className="gap-2 px-6"
      >
        {isLastStep ? (
          <>
            {nextLabel ?? "Comenzar"}
            <Check weight="bold" className="size-4" />
          </>
        ) : (
          <>
            {nextLabel ?? "Continuar"}
            <ArrowRight weight="bold" className="size-4" />
          </>
        )}
      </Button>
    </div>
  );
};
