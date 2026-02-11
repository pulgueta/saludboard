import {
  useOrganization,
  useOrganizationCreationDefaults,
  useOrganizationList,
} from "@clerk/tanstack-react-start";
import { useMemo } from "react";

/**
 * Normalized organization shape for use across the application.
 */
export type OrganizationInfo = {
  id: string;
  name: string;
  slug: string | null;
  imageUrl: string;
  membersCount: number | undefined;
  role: string | undefined;
};

/**
 * Returns normalized data about the current organization and the user's
 * organization list.
 *
 * Wraps Clerk's `useOrganization()` and `useOrganizationList()` into
 * a single stable interface. Components consume `OrganizationInfo`
 * instead of raw Clerk objects.
 *
 * @example
 * ```tsx
 * const { currentOrg, organizations, isLoaded } = useOrganizationData();
 * if (currentOrg) {
 *   console.log(`Active org: ${currentOrg.name}`);
 * }
 * ```
 */
export function useOrganizationData() {
  const { organization, membership, isLoaded: orgLoaded } = useOrganization();
  const {
    userMemberships,
    isLoaded: listLoaded,
    setActive,
    createOrganization,
  } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const { isLoading } = useOrganizationCreationDefaults();

  const currentOrg: OrganizationInfo | null = useMemo(() => {
    if (!organization) return null;

    return {
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      imageUrl: organization.imageUrl,
      membersCount: organization.membersCount,
      role: membership?.role,
    };
  }, [organization, membership]);

  const organizations = userMemberships?.data?.map((entry) => ({
    id: entry.organization.id,
    name: entry.organization.name,
    slug: entry.organization.slug,
    imageUrl: entry.organization.imageUrl,
    membersCount: entry.organization.membersCount,
    role: entry.role,
  }));

  return {
    currentOrg,
    organizations,
    isLoaded: orgLoaded && listLoaded,
    setActiveOrganization: setActive,
    createOrganization,
    isCreatingOrganization: isLoading,
  } as const;
}
