import { UserButton } from "@clerk/tanstack-react-start";
import { GearIcon, SparkleIcon } from "@phosphor-icons/react";
import type { FC } from "react";

export const SidebarUserButton: FC = () => {
  return (
    <UserButton showName>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Actualizar plan"
          labelIcon={<SparkleIcon weight="duotone" />}
          onClick={() => {
            // TODO: wire to billing/pricing page
          }}
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
