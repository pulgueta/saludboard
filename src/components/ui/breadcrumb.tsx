import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react";
import type { ComponentProps, FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const Breadcrumb: FC<ComponentProps<"nav">> = ({
  className,
  ...props
}) => {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
};

export const BreadcrumbList: FC<ComponentProps<"ol">> = ({
  className,
  ...props
}) => {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm",
        className,
      )}
      {...props}
    />
  );
};

export const BreadcrumbItem: FC<ComponentProps<"li">> = ({
  className,
  ...props
}) => {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
};

export const BreadcrumbLink: FC<useRender.ComponentProps<"a">> = ({
  className,
  render,
  ...props
}) => {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn("transition-colors hover:text-foreground", className),
      },
      props,
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  });
};

export const BreadcrumbPage: FC<ComponentProps<"span">> = ({
  className,
  ...props
}) => {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
};

type BreadcrumbSeparatorProps = ComponentProps<"li"> & {
  children?: ReactNode;
};

export const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <CaretRightIcon />}
    </li>
  );
};

export const BreadcrumbEllipsis: FC<ComponentProps<"span">> = ({
  className,
  ...props
}) => {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      <DotsThreeIcon />
      <span className="sr-only">More</span>
    </span>
  );
};
