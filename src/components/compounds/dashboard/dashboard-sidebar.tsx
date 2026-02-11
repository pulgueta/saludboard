import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@ui/sidebar";
import type { FC } from "react";

import { OrgSwitcher } from "@/components/compounds/auth/org-switcher";
import { NavMain } from "@/components/compounds/navigation/nav-main";
import { NavProjects } from "@/components/compounds/navigation/nav-projects";
import { NavUser } from "@/components/compounds/navigation/nav-user";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { HealthFieldId } from "@/lib/health-fields";
import { FIELD_SPECIFIC_NAV, MAIN_NAV_ITEMS } from "@/lib/navigation-config";

type DashboardSidebarProps = {
  /** The active health field for the current user/org. */
  healthFieldId?: HealthFieldId;
  healthFieldLabel?: string;
};

/**
 * Full sidebar composing brand, org switcher, main nav, field-specific
 * projects, and user menu.
 * Uses `variant="inset"` with `collapsible="icon"`.
 */
export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  healthFieldId = "general-medicine",
}) => {
  const { isLoaded, isSignedIn } = useCurrentUser();

  const fieldNav = FIELD_SPECIFIC_NAV[healthFieldId] ?? [];

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        {isLoaded && isSignedIn ? (
          <OrgSwitcher />
        ) : (
          <Skeleton className="h-8 w-full" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={MAIN_NAV_ITEMS} />
        {fieldNav.length > 0 && (
          <NavProjects label="Herramientas" projects={fieldNav} />
        )}
      </SidebarContent>

      <SidebarFooter>
        {isLoaded && isSignedIn ? (
          <NavUser />
        ) : (
          <Skeleton className="h-8 w-full" />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
