import type { FC, ReactNode } from "react";

import { OnboardingFooter } from "@/components/compounds/onboarding/onboarding-footer";
import { StepIndicator } from "@/components/primitives/step-indicator";
import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

type OnboardingLayoutProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The main shell layout for the onboarding flow.
 * Renders the SaludBoard brand, step indicator, content area, and decorative background.
 */
export const OnboardingLayout: FC<OnboardingLayoutProps> = ({
  children,
  className,
}) => {
  const { stepIndex, totalSteps } = useOnboarding();

  return (
    <div
      data-slot="onboarding-layout"
      className={cn(
        "relative flex min-h-dvh flex-col items-center overflow-hidden bg-background",
        className,
      )}
    >
      {/* Decorative background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex w-full max-w-4xl flex-1 flex-col px-4 py-8 md:py-10">
        {/* Brand + Step indicator */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="font-semibold text-foreground text-xl tracking-tight">
              Salud
              <span className="font-semibold text-primary tracking-tight">
                Board
              </span>
            </h1>
          </div>

          <StepIndicator totalSteps={totalSteps} currentStep={stepIndex} />
        </div>

        {/* Step content */}
        <div className="flex flex-1 flex-col">{children}</div>

        {/* Persistent footer - outside step content to prevent flash */}
        <OnboardingFooter className="mt-auto" />
      </div>

      {/* Subtle bottom border decoration */}
      <div className="fixed right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </div>
  );
};
