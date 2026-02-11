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
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
