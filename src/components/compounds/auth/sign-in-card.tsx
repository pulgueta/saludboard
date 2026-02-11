import { SignIn } from "@clerk/tanstack-react-start";
import { clerkAppearance } from "@config/clerk-appearance";
import type { FC } from "react";

type SignInCardProps = {
  /**
   * URL to redirect to after a successful sign-in.
   * @default "/dashboard"
   */
  redirectUrl?: string;
  /**
   * URL or path to the sign-up page.
   * @default "/register"
   */
  signUpUrl?: string;
};

/**
 * Custom sign-in component that wraps Clerk's `<SignIn />` with the
 * SaludBoard design system appearance tokens.
 *
 * Encapsulates all Clerk-specific configuration so routes only need
 * to render `<SignInCard />` without knowing about appearance props.
 */
export const SignInCard: FC<SignInCardProps> = ({
  redirectUrl = "/dashboard",
  signUpUrl = "/register",
}) => {
  return (
    <SignIn
      appearance={clerkAppearance}
      signUpUrl={signUpUrl}
      fallbackRedirectUrl={redirectUrl}
    />
  );
};
