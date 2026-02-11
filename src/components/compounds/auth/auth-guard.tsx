import { SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import type { FC, ReactNode } from "react";

type AuthShowProps = {
  children: ReactNode;
};

/**
 * Renders children only when the user is signed in.
 *
 * Thin wrapper around Clerk's `<SignedIn>` that keeps Clerk-specific
 * imports out of feature components. If the auth provider changes,
 * only this file needs updating.
 *
 * @example
 * ```tsx
 * <WhenSignedIn>
 *   <DashboardLink />
 * </WhenSignedIn>
 * ```
 */
export const WhenSignedIn: FC<AuthShowProps> = ({ children }) => {
  return <SignedIn>{children}</SignedIn>;
};

/**
 * Renders children only when the user is signed out.
 *
 * @example
 * ```tsx
 * <WhenSignedOut>
 *   <SignInButton />
 * </WhenSignedOut>
 * ```
 */
export const WhenSignedOut: FC<AuthShowProps> = ({ children }) => {
  return <SignedOut>{children}</SignedOut>;
};
