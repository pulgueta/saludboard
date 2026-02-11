import type { Icon } from "@phosphor-icons/react";
import { TrendUp } from "@phosphor-icons/react";
import { Card, CardContent } from "@ui/card";
import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: ReactNode;
  subtitle?: string;
  icon: Icon;
  trend?: { value: number; label: string };
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
};

const variantStyles = {
  default: "text-primary bg-primary/10",
  success: "text-success bg-success-bg",
  warning: "text-warning bg-warning-bg",
  destructive: "text-destructive bg-destructive/10",
} as const;

/**
 * Simple stat card for dashboard overview.
 * Displays a label, large value, optional trend, and icon.
 */
export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: IconComp,
  trend,
  variant = "default",
  className,
}) => {
  return (
    <Card className={cn("gap-0 p-5", className)}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">{title}</span>
            <span className="font-semibold text-2xl text-foreground tabular-nums tracking-tight">
              {value}
            </span>
            {subtitle ? (
              <span className="text-muted-foreground text-xs">{subtitle}</span>
            ) : null}
            {trend ? (
              <div className="mt-1 flex items-center gap-1">
                <TrendUp
                  weight="bold"
                  className={cn(
                    "size-3",
                    trend.value >= 0 ? "text-success" : "text-destructive",
                  )}
                />
                <span
                  className={cn(
                    "font-medium text-xs tabular-nums",
                    trend.value >= 0 ? "text-success" : "text-destructive",
                  )}
                >
                  +{trend.value}
                </span>
                <span className="text-muted-foreground text-xs">
                  {trend.label}
                </span>
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl",
              variantStyles[variant],
            )}
          >
            <IconComp size={20} weight="duotone" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
