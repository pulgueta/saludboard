import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

type OnboardingStepProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wrapper for each onboarding step content.
 * Provides consistent padding, max-width, and a fade-in animation key.
 */
export const OnboardingStep: FC<OnboardingStepProps> = ({
  children,
  className,
}) => {
  return (
    <div
      data-slot="onboarding-step"
      className={cn(
        "fade-in flex w-full flex-1 animate-in flex-col gap-8 duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
};
