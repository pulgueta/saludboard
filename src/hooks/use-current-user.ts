import { useUser } from "@clerk/tanstack-react-start";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

import { usePolarSubscription } from "@/hooks/use-polar";

export type CurrentUser = {
  id: string;
  fullName: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string;
};

export function useCurrentUser() {
  const { user, isLoaded, isSignedIn } = useUser();

  const { data: isEnrolled } = useSuspenseQuery(
    existsQueryOptions(user?.id ?? ""),
  );

  const { data: convexUser } = useSuspenseQuery(getQueryOptions());

  const userHasOrganization = !!user?.organizationMemberships.length;

  const { subscription, hasActiveSubscription, isPaid } =
    usePolarSubscription();

  return {
    user: convexUser,
    isLoaded,
    isSignedIn,
    subscription: {
      name: subscription?.product?.name,
      description: subscription?.product?.description,
      status: subscription?.status,
      isActive: hasActiveSubscription,
      isPaid,
      ...subscription,
    },
    isEnrolled,
    userHasOrganization,
  } as const;
}

export const existsQueryOptions = (clerkUserId: string) => {
  return convexQuery(api.users.exists, {
    clerkUserId,
  });
};

export const getQueryOptions = () => {
  return convexQuery(api.users.get, {});
};
