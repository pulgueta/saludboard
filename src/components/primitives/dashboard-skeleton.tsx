import { Skeleton } from "@ui/skeleton";
import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

/**
 * Creates opacity values that gradually decrease from top to bottom.
 * Top items: 100% opacity
 * Middle items: gradually decreasing
 * Bottom items: fade to transparent
 */
const calculateOpacity = (index: number, total: number): number => {
  const progress = index / (total - 1 || 1);
  const opacity = 1 - progress ** 0.8 * 0.85;
  return Math.max(0.15, opacity);
};

/**
 * Standard dashboard loading skeleton.
 *
 * Uses a consistent layout across all dashboard pages:
 * - Page header
 * - Action button
 * - Content cards that fade toward the bottom
 *
 * The top elements have full opacity and shimmer,
 * while items lower in the stack fade to transparent.
 */
export const DashboardPageSkeleton: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  const cards = Array.from({ length: 6 });

  return (
    <div
      className={cn("flex flex-col gap-6 p-6", className)}
      {...props}
      aria-busy="true"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="gradient-shimmer h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-md opacity-70" />
        </div>
        <Skeleton className="gradient-shimmer h-9 w-28 rounded-md" />
      </div>

      <div className="grid gap-4">
        {cards.map((_, index) => (
          <div
            key={`dashboard-skeleton-${
              // biome-ignore lint/suspicious/noArrayIndexKey: not required for skeletons
              index
            }`}
            className="rounded-xl border bg-card p-5"
            style={{ opacity: calculateOpacity(index, cards.length) }}
          >
            <div className="flex items-center gap-4">
              <Skeleton
                className={cn(
                  "size-10 rounded-lg",
                  index < 2 && "gradient-shimmer",
                )}
              />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton
                  className={cn(
                    "h-4 w-1/3 rounded-md",
                    index < 2 && "gradient-shimmer",
                  )}
                />
                <Skeleton className="h-3 w-2/3 rounded-md" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="mt-4 grid gap-2">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-5/6 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
