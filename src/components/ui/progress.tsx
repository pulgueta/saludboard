import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ProgressProps = ProgressPrimitive.Root.Props & {
  children?: ReactNode;
};

export const Progress: FC<ProgressProps> = ({
  className,
  children,
  value,
  ...props
}) => {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
};

export const ProgressTrack: FC<ProgressPrimitive.Track.Props> = ({
  className,
  ...props
}) => {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
};

export const ProgressIndicator: FC<ProgressPrimitive.Indicator.Props> = ({
  className,
  ...props
}) => {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      {...props}
    />
  );
};

export const ProgressLabel: FC<ProgressPrimitive.Label.Props> = ({
  className,
  ...props
}) => {
  return (
    <ProgressPrimitive.Label
      className={cn("font-medium text-sm", className)}
      data-slot="progress-label"
      {...props}
    />
  );
};

export const ProgressValue: FC<ProgressPrimitive.Value.Props> = ({
  className,
  ...props
}) => {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-muted-foreground text-sm tabular-nums",
        className,
      )}
      data-slot="progress-value"
      {...props}
    />
  );
};
