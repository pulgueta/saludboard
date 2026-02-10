import { createFileRoute } from "@tanstack/react-router";

import { OnboardingLayout } from "@/components/compounds/onboarding/onboarding-layout";
import { AccountTypeStep } from "@/components/features/onboarding-steps/account-type-step";
import { ConfirmationStep } from "@/components/features/onboarding-steps/confirmation-step";
import { HealthFieldStep } from "@/components/features/onboarding-steps/health-field-step";
import { ProfileStep } from "@/components/features/onboarding-steps/profile-step";
import { WelcomeStep } from "@/components/features/onboarding-steps/welcome-step";
import { OnboardingProvider, useOnboarding } from "@/lib/onboarding-context";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
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
    case "welcome":
      return <WelcomeStep />;
    case "account-type":
      return <AccountTypeStep />;
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
