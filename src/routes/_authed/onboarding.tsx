import { createFileRoute } from "@tanstack/react-router";

import { OnboardingLayout } from "@/components/compounds/onboarding/onboarding-layout";
import { ConfirmationStep } from "@/components/features/onboarding-steps/confirmation-step";
import { HealthFieldStep } from "@/components/features/onboarding-steps/health-field-step";
import { ProfessionalTypeStep } from "@/components/features/onboarding-steps/professional-type-step";
import { ProfileStep } from "@/components/features/onboarding-steps/profile-step";
import { UserTypeStep } from "@/components/features/onboarding-steps/user-type-step";
import { WelcomeStep } from "@/components/features/onboarding-steps/welcome-step";
import { OnboardingProvider, useOnboarding } from "@/lib/onboarding-context";

export const Route = createFileRoute("/_authed/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingLayout>
        <OnboardingStepRouter />
      </OnboardingLayout>
    </OnboardingProvider>
  );
}

function OnboardingStepRouter() {
  const { state } = useOnboarding();

  switch (state.currentStep) {
    case "user-type":
      return <UserTypeStep />;
    case "professional-type":
      return <ProfessionalTypeStep />;
    case "health-field":
      return <HealthFieldStep />;
    case "profile":
      return <ProfileStep />;
    case "confirmation":
      return <ConfirmationStep />;
    default:
      return <WelcomeStep />;
  }
}
