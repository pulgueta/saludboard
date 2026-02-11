import { useClerk } from "@clerk/tanstack-react-start";
import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

/**
 * Provides pre-wired authentication actions (sign out, open profile, etc.)
 * that integrate with TanStack Router for navigation.
 *
 * Decouples sign-out/profile/settings logic from individual components,
 * so any component in the app can trigger auth flows without
 * knowing about Clerk internals.
 *
 * @example
 * ```tsx
 * const { signOut, openUserProfile } = useAuthActions();
 * <button onClick={signOut}>Cerrar sesión</button>
 * <button onClick={openUserProfile}>Mi perfil</button>
 * ```
 */
export function useAuthActions() {
  const clerk = useClerk();
  const router = useRouter();

  const signOut = useCallback(async () => {
    await clerk.signOut();
    router.navigate({ to: "/login/$" });
  }, [clerk, router]);

  const openUserProfile = useCallback(() => {
    clerk.openUserProfile();
  }, [clerk]);

  const openOrganizationProfile = useCallback(() => {
    clerk.openOrganizationProfile();
  }, [clerk]);

  const redirectToSignIn = useCallback(() => {
    router.navigate({ to: "/login/$" });
  }, [router]);

  const redirectToSignUp = useCallback(() => {
    router.navigate({ to: "/register/$" });
  }, [router]);

  return {
    signOut,
    openUserProfile,
    openOrganizationProfile,
    redirectToSignIn,
    redirectToSignUp,
  } as const;
}
