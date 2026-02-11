import { SignUp } from "@clerk/tanstack-react-start";
import { clerkAppearance } from "@config/clerk-appearance";
import type { FC } from "react";

type SignUpCardProps = {
  /**
   * URL to redirect to after a successful sign-up.
   * @default "/onboarding"
   */
  redirectUrl?: string;
  /**
   * URL or path to the sign-in page.
   * @default "/login"
   */
  signInUrl?: string;
};

/**
 * Custom sign-up component that wraps Clerk's `<SignUp />` with the
 * SaludBoard design system appearance tokens.
 *
 * Encapsulates all Clerk-specific configuration so routes only need
 * to render `<SignUpCard />` without knowing about appearance props.
 */
export const SignUpCard: FC<SignUpCardProps> = ({
  redirectUrl = "/onboarding",
  signInUrl = "/login",
}) => {
  return (
    <SignUp
      appearance={clerkAppearance}
      signInUrl={signInUrl}
      fallbackRedirectUrl={redirectUrl}
    />
  );
};
