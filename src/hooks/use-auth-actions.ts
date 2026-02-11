import { useClerk } from "@clerk/tanstack-react-start";
import { useRouter } from "@tanstack/react-router";

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

  const signOut = async () => {
    await clerk.signOut();
    router.navigate({ to: "/login/$" });
  };

  const openUserProfile = () => {
    clerk.openUserProfile();
  };

  const openOrganizationProfile = () => {
    clerk.openOrganizationProfile();
  };

  const redirectToSignIn = () => {
    router.navigate({ to: "/login/$" });
  };

  const redirectToSignUp = () => {
    router.navigate({ to: "/register/$" });
  };

  return {
    signOut,
    openUserProfile,
    openOrganizationProfile,
    redirectToSignIn,
    redirectToSignUp,
  } as const;
}
