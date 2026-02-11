import type { FC } from "react";

import { AnimatedContainer } from "@/components/primitives/animated-container";
import { cn } from "@/lib/utils";

type OnboardingHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

/**
 * Step header with animated title and subtitle.
 * Renders at the top of each onboarding step for consistent hierarchy.
 */
export const OnboardingHeader: FC<OnboardingHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <div data-slot="onboarding-header" className={cn("space-y-2", className)}>
      <AnimatedContainer delay={100}>
        <h2 className="text-balance font-semibold text-3xl text-foreground tracking-tighter">
          {title}
        </h2>
      </AnimatedContainer>

      {subtitle ? (
        <AnimatedContainer delay={150}>
          <p className="max-w-prose text-pretty text-muted-foreground">
            {subtitle}
          </p>
        </AnimatedContainer>
      ) : null}
    </div>
  );
};
