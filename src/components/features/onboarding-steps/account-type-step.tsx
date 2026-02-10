import type { FC } from "react";

import { OnboardingHeader } from "@/components/compounds/onboarding/onboarding-header";
import { OnboardingStep } from "@/components/compounds/onboarding/onboarding-step";
import { AccountTypeSelector } from "@/components/features/health-field/account-type-selector";
import { useOnboarding } from "@/lib/onboarding-context";

/**
 * Step 2: Account type selection (Individual vs Organization).
 */
export const AccountTypeStep: FC = () => {
  const { state, setAccountType } = useOnboarding();

  return (
    <OnboardingStep>
      <OnboardingHeader
        title="Tipo de cuenta"
        subtitle="Selecciona cómo vas a usar SaludBoard para personalizar tu experiencia."
      />

      <AccountTypeSelector
        selected={state.accountType}
        onSelect={setAccountType}
      />
    </OnboardingStep>
  );
};
