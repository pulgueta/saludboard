import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@ui/button";
import type { FC } from "react";

import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

type OnboardingFooterProps = {
  className?: string;
};

/**
 * Navigation footer for onboarding steps.
 *
 * - On the user-type step, if "patient" is selected the Next button reads
 *   "Ir a mi portal" and navigates to /patient instead of advancing.
 * - On the last professional step, the button reads "Ir al dashboard"
 *   and calls the onComplete callback.
 */
export const OnboardingFooter: FC<OnboardingFooterProps> = ({ className }) => {
  const {
    canGoNext,
    canGoPrev,
    isLastStep,
    nextStep,
    prevStep,
    state: { footerConfig, currentStep, userType },
  } = useOnboarding();

  const navigate = useNavigate();

  const { nextLabel, onComplete } = footerConfig;

  const isPatientRedirect =
    currentStep === "user-type" && userType === "patient";

  const handleNext = () => {
    if (isPatientRedirect) {
      navigate({ to: "/patient" });
      return;
    }

    if (isLastStep && onComplete) {
      onComplete();
      navigate({ to: "/dashboard" });
      return;
    }

    nextStep();
  };

  const resolvedLabel = (() => {
    if (isPatientRedirect) return "Ir a mi portal";
    if (nextLabel) return nextLabel;
    if (isLastStep) return "Comenzar";
    return "Continuar";
  })();

  return (
    <div
      data-slot="onboarding-footer"
      className={cn("flex items-center justify-between pt-6", className)}
    >
      <Button variant="outline" onClick={prevStep} disabled={!canGoPrev}>
        <ArrowLeftIcon weight="bold" className="size-4" />
        Volver
      </Button>

      <Button onClick={handleNext} disabled={!canGoNext}>
        {resolvedLabel}
        {isLastStep || isPatientRedirect ? (
          <CheckIcon weight="bold" className="size-4" />
        ) : (
          <ArrowRightIcon weight="bold" className="size-4" />
        )}
      </Button>
    </div>
  );
};
