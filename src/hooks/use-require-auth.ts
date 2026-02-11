import { useAuth } from "@clerk/tanstack-react-start";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

type UseRequireAuthOptions = {
  /** Where to redirect if the user is not signed in. Defaults to "/login/$". */
  redirectTo?: string;
};

/**
 * Client-side auth guard hook.
 *
 * Redirects to the sign-in page if the user is not authenticated.
 * Use this in components that should be strictly protected beyond
 * the route-level `beforeLoad` check.
 *
 * Note: Primary route protection is handled in `_authed/route.tsx`
 * via `beforeLoad`. This hook is a secondary guard for components
 * that may be rendered outside of the `_authed` layout or
 * for extra safety.
 *
 * @example
 * ```tsx
 * function SettingsPage() {
 *   const { isReady } = useRequireAuth();
 *   if (!isReady) return <Spinner />;
 *   return <Settings />;
 * }
 * ```
 */
export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { redirectTo = "/login/$" } = options;
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.navigate({ to: redirectTo });
    }
  }, [isLoaded, isSignedIn, router, redirectTo]);

  return {
    /** True when Clerk is loaded AND the user is signed in. */
    isReady: isLoaded && isSignedIn === true,
    isLoaded,
    isSignedIn: isSignedIn ?? false,
  } as const;
}
