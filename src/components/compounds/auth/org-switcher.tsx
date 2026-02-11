import {
  ClerkLoaded,
  ClerkLoading,
  OrganizationSwitcher,
} from "@clerk/tanstack-react-start";
import { clerkAppearance } from "@config/clerk-appearance";
import type { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";

type OrgSwitcherProps = {
  /**
   * Whether to hide the user's personal account from the list.
   * @default false
   */
  hidePersonal?: boolean;
  /**
   * URL to navigate to after selecting an organization.
   * @default "/dashboard"
   */
  afterSelectOrganizationUrl?: string;
  /**
   * URL to navigate to after creating a new organization.
   * @default "/dashboard"
   */
  afterCreateOrganizationUrl?: string;
};

/**
 * Custom organization switcher for the dashboard sidebar.
 *
 * Wraps Clerk's `<OrganizationSwitcher />` with the SaludBoard design
 * system appearance tokens. Renders inline in the sidebar header and
 * adapts to the collapsed/expanded sidebar state.
 *
 * Used by practitioners who belong to multiple clinics or health
 * organizations.
 */
export const OrgSwitcher: FC<OrgSwitcherProps> = ({
  hidePersonal = false,
  afterSelectOrganizationUrl = "/dashboard",
  afterCreateOrganizationUrl = "/dashboard",
}) => {
  return (
    <>
      <ClerkLoading>
        <Skeleton className="h-8 w-full" />
      </ClerkLoading>
      <ClerkLoaded>
        <OrganizationSwitcher
          hidePersonal={hidePersonal}
          afterSelectOrganizationUrl={afterSelectOrganizationUrl}
          afterCreateOrganizationUrl={afterCreateOrganizationUrl}
          appearance={{
            ...clerkAppearance,
            elements: {
              ...clerkAppearance.elements,
              // rootBox: "w-full",
              // organizationSwitcherTrigger:
              //   "w-full justify-between rounded-md px-2 py-1.5 hover:bg-sidebar-accent focus-visible:ring-sidebar-ring border-0",
              // organizationSwitcherTriggerIcon: "text-sidebar-foreground",
              // organizationPreviewMainIdentifier:
              //   "text-sm font-semibold text-sidebar-foreground truncate",
              // organizationPreviewSecondaryIdentifier:
              //   "text-xs text-muted-foreground",
              // organizationSwitcherPopoverCard: "border-border shadow-md bg-popover",
              // organizationPreviewAvatarBox: "size-8 rounded-lg",
            },
          }}
        />
      </ClerkLoaded>
    </>
  );
};
