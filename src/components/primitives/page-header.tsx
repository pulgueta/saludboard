import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

/**
 * Consistent page header with title, description, and action slot.
 * Used at the top of every dashboard page.
 */
export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className,
}) => {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5">
        <h1 className="font-semibold text-foreground text-xl tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
};
