/**
 * Gradient skeleton loader component with animated shimmer effect.
 *
 * Top skeletons have full opacity with constant shimmer animation,
 * gradually fading to transparent toward the bottom.
 */

import { Skeleton } from "@ui/skeleton";
import type { ComponentProps, FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SkeletonItem = {
  /** Width of the skeleton (e.g., "100%", "200px", "w-3/4") */
  width?: string;
  /** Height of the skeleton */
  height?: string;
  /** Whether this is a circle/avatar skeleton */
  circle?: boolean;
  /** Custom className */
  className?: string;
};

type GradientSkeletonLoaderProps = {
  /** Array of skeleton items to render */
  items: SkeletonItem[];
  /** Gap between items */
  gap?: string;
  /** Container className */
  className?: string;
  /** Whether to show the shimmer animation on top items */
  animate?: boolean;
  /** Number of top items to animate (default: 3) */
  animateCount?: number;
  /** Optional content to render above skeletons (e.g., header) */
  header?: ReactNode;
  /** Optional content to render below skeletons (e.g., footer) */
  footer?: ReactNode;
};

/**
 * Creates opacity values that gradually decrease from top to bottom.
 * Top items: 100% opacity
 * Middle items: gradually decreasing
 * Bottom items: fade to transparent
 */
const calculateOpacity = (index: number, total: number): number => {
  // Create a smooth gradient from 1.0 to 0.15
  const progress = index / (total - 1 || 1);
  // Use ease-out curve for more natural fade
  const opacity = 1 - progress ** 0.8 * 0.85;
  return Math.max(0.15, opacity);
};

/**
 * Gradient skeleton loader with shimmer animation.
 *
 * Top skeletons pulse with full opacity while bottom ones fade to transparent,
 * creating a visual depth effect that indicates loading progress.
 */
export const GradientSkeletonLoader: FC<GradientSkeletonLoaderProps> = ({
  items,
  gap = "gap-4",
  className,
  animate = true,
  animateCount = 3,
  header,
  footer,
}) => {
  return (
    <div
      className={cn("flex flex-col", gap, className)}
      aria-busy="true"
      aria-label="Cargando contenido..."
    >
      {header && <div className="mb-2">{header}</div>}

      {items.map((item, index) => {
        const opacity = calculateOpacity(index, items.length);
        const shouldAnimate = animate && index < animateCount;

        return (
          <div
            key={`skeleton-${index}`}
            className="flex items-center gap-3"
            style={{ opacity }}
          >
            {item.circle && (
              <Skeleton
                className={cn(
                  "size-10 shrink-0 rounded-full",
                  shouldAnimate && "gradient-shimmer",
                  item.className,
                )}
              />
            )}
            <Skeleton
              className={cn(
                item.circle ? "flex-1" : "w-full",
                item.height || "h-4",
                item.width && !item.circle ? item.width : "",
                shouldAnimate && "gradient-shimmer",
                item.circle ? "" : "rounded-md",
                item.className,
              )}
              style={
                item.width && !item.circle ? { width: item.width } : undefined
              }
            />
          </div>
        );
      })}

      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
};

/**
 * Dashboard page skeleton loader preset.
 *
 * Layout: Stats cards row + Chart section + Side panels
 */
export const DashboardSkeleton: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex flex-col gap-6 p-6", className)}
      {...props}
      aria-busy="true"
      aria-label="Cargando dashboard..."
    >
      {/* Page header */}
      <div className="flex flex-col gap-2">
        <Skeleton className="gradient-shimmer h-8 w-64 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded-md opacity-70" />
      </div>

      {/* Stats cards row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-6"
            style={{ opacity: calculateOpacity(i, 4) }}
          >
            <div className="flex items-center gap-4">
              <Skeleton
                className={cn(
                  "size-12 rounded-lg",
                  i < 2 && "gradient-shimmer",
                )}
              />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton
                  className={cn(
                    "h-6 w-20 rounded-md",
                    i < 2 && "gradient-shimmer",
                  )}
                />
                <Skeleton className="h-4 w-16 rounded-md opacity-60" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content: Chart + Side panels */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Chart area */}
        <div className="rounded-xl border bg-card p-6" style={{ opacity: 0.9 }}>
          <div className="mb-6 flex items-center justify-between">
            <Skeleton className="gradient-shimmer h-6 w-48 rounded-md" />
            <Skeleton className="h-8 w-32 rounded-md opacity-70" />
          </div>
          <Skeleton className="gradient-shimmer h-[300px] w-full rounded-lg" />
        </div>

        {/* Side panels */}
        <div className="flex flex-col gap-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-6"
              style={{ opacity: calculateOpacity(i + 2, 5) }}
            >
              <Skeleton
                className={cn(
                  "mb-4 h-6 w-40 rounded-md",
                  i === 0 && "gradient-shimmer",
                )}
              />
              <div className="flex flex-col gap-3">
                {[0, 1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3"
                    style={{
                      opacity: calculateOpacity(j, 4) * 0.8,
                    }}
                  >
                    <Skeleton className="size-10 rounded-full" />
                    <div className="flex flex-1 flex-col gap-2">
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                      <Skeleton className="h-3 w-1/2 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * List/Table page skeleton loader preset.
 *
 * Layout: Header + Filter row + Table rows with gradient fade
 */
export const ListSkeleton: FC<
  ComponentProps<"div"> & { rows?: number; showFilters?: boolean }
> = ({ className, rows = 8, showFilters = true, ...props }) => {
  return (
    <div
      className={cn("flex flex-col gap-6 p-6", className)}
      {...props}
      aria-busy="true"
      aria-label="Cargando lista..."
    >
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="gradient-shimmer h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-md opacity-70" />
        </div>
        <Skeleton className="gradient-shimmer h-10 w-32 rounded-md" />
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex items-center gap-4">
          <Skeleton className="gradient-shimmer h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md opacity-70" />
          <Skeleton className="h-10 w-24 rounded-md opacity-50" />
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border">
        {/* Table header */}
        <div className="flex items-center gap-4 border-b bg-muted/50 p-4">
          <Skeleton className="gradient-shimmer h-4 w-12 rounded-md" />
          <Skeleton className="gradient-shimmer h-4 w-32 rounded-md" />
          <Skeleton className="gradient-shimmer h-4 w-24 rounded-md" />
          <Skeleton className="gradient-shimmer h-4 w-20 rounded-md" />
          <Skeleton className="gradient-shimmer h-4 w-28 rounded-md" />
        </div>

        {/* Table rows */}
        <div className="flex flex-col">
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b p-4 last:border-0"
              style={{ opacity: calculateOpacity(i, rows) }}
            >
              <Skeleton
                className={cn("size-4 rounded", i < 3 && "gradient-shimmer")}
              />
              <div className="flex items-center gap-3">
                <Skeleton
                  className={cn(
                    "size-10 rounded-full",
                    i < 3 && "gradient-shimmer",
                  )}
                />
                <Skeleton
                  className={cn(
                    "h-4 w-32 rounded-md",
                    i < 3 && "gradient-shimmer",
                  )}
                />
              </div>
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48 rounded-md opacity-50" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md opacity-70" />
          <Skeleton className="h-8 w-8 rounded-md opacity-60" />
          <Skeleton className="h-8 w-8 rounded-md opacity-50" />
          <Skeleton className="h-8 w-8 rounded-md opacity-40" />
        </div>
      </div>
    </div>
  );
};

/**
 * Form page skeleton loader preset.
 *
 * Layout: Header + Form sections with fields
 */
export const FormSkeleton: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("mx-auto max-w-2xl p-6", className)}
      {...props}
      aria-busy="true"
      aria-label="Cargando formulario..."
    >
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-2">
        <Skeleton className="gradient-shimmer h-8 w-64 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded-md opacity-70" />
      </div>

      {/* Form card */}
      <div className="rounded-xl border bg-card p-6">
        {/* Section 1 - Full opacity with shimmer */}
        <div className="mb-8 flex flex-col gap-4">
          <Skeleton className="gradient-shimmer mb-2 h-6 w-48 rounded-md" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="gradient-shimmer h-4 w-24 rounded-md" />
              <Skeleton className="gradient-shimmer h-10 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="gradient-shimmer h-4 w-24 rounded-md" />
              <Skeleton className="gradient-shimmer h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Section 2 - Medium opacity */}
        <div className="mb-8 flex flex-col gap-4" style={{ opacity: 0.75 }}>
          <Skeleton className="mb-2 h-6 w-40 rounded-md" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Section 3 - Lower opacity */}
        <div className="mb-8 flex flex-col gap-4" style={{ opacity: 0.5 }}>
          <Skeleton className="mb-2 h-6 w-56 rounded-md" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Submit buttons - Fade to transparent */}
        <div className="flex justify-end gap-3 pt-4" style={{ opacity: 0.35 }}>
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
};

/**
 * Card grid skeleton loader preset.
 *
 * Layout: Header + Grid of cards
 */
export const CardGridSkeleton: FC<
  ComponentProps<"div"> & { cards?: number; columns?: number }
> = ({ className, cards = 6, columns = 3, ...props }) => {
  return (
    <div
      className={cn("flex flex-col gap-6 p-6", className)}
      {...props}
      aria-busy="true"
      aria-label="Cargando tarjetas..."
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="gradient-shimmer h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-md opacity-70" />
        </div>
        <Skeleton className="gradient-shimmer h-10 w-32 rounded-md" />
      </div>

      {/* Grid */}
      <div
        className={cn(
          "grid gap-4",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {Array.from({ length: cards }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-xl border bg-card p-6"
            style={{ opacity: calculateOpacity(i, cards) }}
          >
            <div className="flex items-start justify-between">
              <Skeleton
                className={cn(
                  "size-12 rounded-lg",
                  i < 3 && "gradient-shimmer",
                )}
              />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton
                className={cn(
                  "h-5 w-3/4 rounded-md",
                  i < 3 && "gradient-shimmer",
                )}
              />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Simple content skeleton for inline loading states.
 *
 * A single block with gradient fade effect.
 */
export const ContentSkeleton: FC<
  ComponentProps<"div"> & { lines?: number; showAvatar?: boolean }
> = ({ className, lines = 4, showAvatar = false, ...props }) => {
  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      {...props}
      aria-busy="true"
    >
      {showAvatar && (
        <div className="mb-2 flex items-center gap-3">
          <Skeleton className="gradient-shimmer size-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="gradient-shimmer h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md opacity-70" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 rounded-md",
            i === 0 && "gradient-shimmer w-full",
            i === 1 && "w-5/6",
            i === 2 && "w-4/5",
            i >= 3 && "w-3/4",
          )}
          style={{ opacity: calculateOpacity(i, lines) }}
        />
      ))}
    </div>
  );
};
