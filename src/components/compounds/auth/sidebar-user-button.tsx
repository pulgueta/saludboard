import { UserButton } from "@clerk/tanstack-react-start";
import { GearIcon, SparkleIcon } from "@phosphor-icons/react";
import type { FC } from "react";

import { useSidebar } from "@/components/ui/sidebar";

export const SidebarUserButton: FC = () => {
  const { state } = useSidebar();

  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier: state === "collapsed" ? "hidden" : "block",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="Actualizar plan"
          labelIcon={<SparkleIcon weight="duotone" />}
          href="/dashboard/billing"
        />
        <UserButton.Link
          label="Configuración"
          labelIcon={<GearIcon weight="duotone" />}
          href="/dashboard/settings"
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
};
