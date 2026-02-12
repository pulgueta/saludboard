import {
  useOrganizationCreationDefaults,
  useOrganizationList,
} from "@clerk/tanstack-react-start";

/**
 * Returns organization actions for creating and switching organizations.
 * Suitable for use when you need to mutate organization state without
 * subscribing to organization data.
 *
 * @example
 * ```tsx
 * const { createOrganization, setActiveOrganization } = useOrganizationActions();
 * await createOrganization({ name: "My Org", slug: "my-org" });
 * ```
 */
export function useOrganizationActions() {
  const { setActive: setActiveOrganization, createOrganization } =
    useOrganizationList({
      userMemberships: { infinite: true },
    });
  const { isLoading: isCreatingOrganization } =
    useOrganizationCreationDefaults();

  return {
    setActiveOrganization,
    createOrganization,
    isCreatingOrganization,
  } as const;
}
