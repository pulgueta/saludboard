import { usePlans, useSubscription } from "@clerk/clerk-react/experimental";
import { useUser } from "@clerk/tanstack-react-start";

/**
 * Normalized user profile for use across the application.
 * Decouples components from Clerk's User object shape.
 */
export type CurrentUser = {
  id: string;
  fullName: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string;
};
/**
 * Returns a normalized current user object with derived fields.
 *
 * Wraps Clerk's `useUser()` and transforms it into a stable, app-specific shape.
 * Components consume `CurrentUser` instead of the raw Clerk `User` object,
 * making it trivial to swap auth providers or extend the user model.
 *
 * @example
 * ```tsx
 * const { user, isLoaded, isSignedIn } = useCurrentUser();
 * if (!isLoaded) return <Skeleton />;
 * if (!isSignedIn) return <SignInPrompt />;
 * return <span>{user.fullName}</span>;
 * ```
 */
export function useCurrentUser() {
  const { user, isLoaded, isSignedIn } = useUser();

  const userHasOrganization = !!user?.organizationMemberships.length;

  const { data: currentSubscription } = useSubscription({
    for: userHasOrganization ? "organization" : "user",
  });
  const { data: plans } = usePlans({
    enabled: !!userHasOrganization,
    for: userHasOrganization ? "organization" : "user",
  });

  const currentPlan = plans.find(
    (p) =>
      p.id ===
      currentSubscription?.subscriptionItems.find((i) => i.plan.id)?.plan.id,
  );

  return {
    user,
    isLoaded,
    isSignedIn,
    subscription: {
      name: currentPlan?.name,
      description: currentPlan?.description,
      ...currentSubscription,
    },
  } as const;
}
