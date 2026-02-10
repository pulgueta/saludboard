import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

export const Empty: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 text-balance rounded-xl border-dashed p-6 text-center",
        className,
      )}
      {...props}
    />
  );
};

export const EmptyHeader: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  );
};

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type EmptyMediaProps = ComponentProps<"div"> &
  VariantProps<typeof emptyMediaVariants>;

export const EmptyMedia: FC<EmptyMediaProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  );
};

export const EmptyTitle: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="empty-title"
      className={cn("font-medium text-sm tracking-tight", className)}
      {...props}
    />
  );
};

export const EmptyDescription: FC<ComponentProps<"p">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground text-sm/relaxed [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
};

export const EmptyContent: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full min-w-0 max-w-sm flex-col items-center gap-2.5 text-balance text-sm",
        className,
      )}
      {...props}
    />
  );
};
