import { Link, useLocation } from "@tanstack/react-router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@ui/sidebar";
import type { FC } from "react";

import type { NavProject } from "@/lib/navigation-config";

type NavProjectsProps = {
  label: string;
  projects: NavProject[];
};

/**
 * Field-specific navigation section in the sidebar.
 * Shows specialty tools relevant to the user's health field.
 */
export const NavProjects: FC<NavProjectsProps> = ({ label, projects }) => {
  const location = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((project) => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton
              tooltip={project.name}
              isActive={location.pathname === project.url}
              render={<Link to={project.url} />}
            >
              <project.icon weight="duotone" />
              <span>{project.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
