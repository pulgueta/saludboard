import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { Button } from "@ui/button";
import type { FC } from "react";

import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

type OnboardingFooterProps = {
  className?: string;
};

/**
 * Navigation footer for onboarding steps.
 * Renders Back/Next buttons with contextual labels and disabled states.
 * This component is persistent and doesn't flash between steps.
 */
export const OnboardingFooter: FC<OnboardingFooterProps> = ({ className }) => {
  const {
    canGoNext,
    canGoPrev,
    isLastStep,
    nextStep,
    prevStep,
    state: { footerConfig },
  } = useOnboarding();

  const { nextLabel, onComplete } = footerConfig;

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
      <Button variant="outline" onClick={prevStep} disabled={!canGoPrev}>
        <ArrowLeft weight="bold" className="size-4" />
        Volver
      </Button>

      <Button onClick={handleNext} disabled={!canGoNext}>
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
