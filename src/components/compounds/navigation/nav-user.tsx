import { SignInButton } from "@clerk/tanstack-react-start";
import { SidebarMenu, SidebarMenuItem } from "@ui/sidebar";
import type { FC } from "react";

import { SidebarUserButton } from "@/components/compounds/auth/sidebar-user-button";
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
