import { SidebarInset, SidebarProvider } from "@ui/sidebar";
import type { FC, ReactNode } from "react";

import { DashboardHeader } from "@/components/compounds/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/compounds/dashboard/dashboard-sidebar";

import type { HealthFieldId } from "@/lib/health-fields";

type DashboardShellProps = {
  children: ReactNode;
  healthFieldId?: HealthFieldId;
  healthFieldLabel?: string;
};

/**
 * Top-level dashboard layout.
 * Wraps everything in `SidebarProvider` with `SidebarInset` for the inset variant.
 */
export const DashboardShell: FC<DashboardShellProps> = ({
  children,
  healthFieldId,
  healthFieldLabel,
}) => {
  return (
    <SidebarProvider>
      <DashboardSidebar
        healthFieldId={healthFieldId}
        healthFieldLabel={healthFieldLabel}
      />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
