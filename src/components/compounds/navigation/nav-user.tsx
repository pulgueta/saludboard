import { ClerkLoading, SignInButton } from "@clerk/tanstack-react-start";
import { SidebarMenu, SidebarMenuItem } from "@ui/sidebar";
import type { FC } from "react";

import { SidebarUserButton } from "@/components/compounds/auth/sidebar-user-button";
import { Skeleton } from "@/components/ui/skeleton";
import { WhenSignedIn, WhenSignedOut } from "../auth/auth-guard";

/**
 * User section in the sidebar footer.
 *
 * Delegates entirely to the `<SidebarUserButton />` which encapsulates
 * Clerk's `<UserButton />` with custom menu items and SaludBoard
 * appearance theming.
 */
export const NavUser: FC = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <ClerkLoading>
          <Skeleton className="h-8 w-full" />
        </ClerkLoading>
        <WhenSignedIn>
          <SidebarUserButton />
        </WhenSignedIn>
        <WhenSignedOut>
          <SignInButton />
        </WhenSignedOut>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
