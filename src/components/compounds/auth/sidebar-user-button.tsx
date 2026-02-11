import { UserButton } from "@clerk/tanstack-react-start";
import { Gear, Sparkle } from "@phosphor-icons/react";
import type { FC } from "react";

export const SidebarUserButton: FC = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Actualizar plan"
          labelIcon={<Sparkle weight="duotone" />}
          onClick={() => {
            // TODO: wire to billing/pricing page
          }}
        />
        <UserButton.Link
          label="Configuración"
          labelIcon={<Gear weight="duotone" />}
          href="/dashboard/settings"
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
};
