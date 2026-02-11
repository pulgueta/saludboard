import { Link, useLocation } from "@tanstack/react-router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@ui/sidebar";
import type { FC } from "react";

import type { NavItem } from "@/lib/navigation-config";

type NavMainProps = {
  items: NavItem[];
};

/**
 * Main sidebar navigation with always-expanded sub-items.
 * Each top-level item shows its children directly without collapsing.
 */
export const NavMain: FC<NavMainProps> = ({ items }) => {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navegación</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={location.pathname === item.url}
                  className="transition-colors ease-in hover:bg-primary/10 hover:text-primary active:bg-primary/20 active:text-primary"
                  render={
                    <Link to={item.url}>
                      <item.icon weight="duotone" />
                      <span>{item.title}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            );
          }

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className="pointer-events-none"
              >
                <item.icon weight="duotone" />
                <span>{item.title}</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {item.items.map((sub) => (
                  <SidebarMenuSubItem key={sub.title}>
                    <SidebarMenuSubButton
                      className="transition-colors ease-in hover:bg-primary/10 hover:text-primary active:bg-primary/20 active:text-primary"
                      isActive={location.pathname === sub.url}
                      render={
                        <Link to={sub.url}>
                          <span>{sub.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
