import { CaretRight } from "@phosphor-icons/react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";
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
 * Main sidebar navigation with collapsible sub-items.
 * Each top-level item can optionally expand to show child links.
 */
export const NavMain: FC<NavMainProps> = ({ items }) => {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navegación</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            location.pathname === item.url ||
            item.items?.some((sub) => location.pathname === sub.url);

          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={location.pathname === item.url}
                  render={<Link to={item.url} />}
                >
                  <item.icon weight="duotone" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon weight="duotone" />
                      <span>{item.title}</span>
                      <CaretRight
                        weight="bold"
                        className="ml-auto size-3 transition-transform duration-200 group-data-[panel-open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  }
                />
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton
                          isActive={location.pathname === sub.url}
                          render={<Link to={sub.url} />}
                        >
                          <span>{sub.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
