import {
  CaretLeftIcon,
  CaretRightIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";
import { Button } from "@ui/button";
import type { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils";

export const Pagination: FC<ComponentProps<"nav">> = ({
  className,
  ...props
}) => {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
};

export const PaginationContent: FC<ComponentProps<"ul">> = ({
  className,
  ...props
}) => {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
};

export const PaginationItem: FC<ComponentProps<"li">> = ({ ...props }) => {
  return <li data-slot="pagination-item" {...props} />;
};

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ComponentProps<typeof Button>, "size"> &
  ComponentProps<"a">;

export const PaginationLink: FC<PaginationLinkProps> = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
};

type PaginationPreviousProps = ComponentProps<typeof PaginationLink> & {
  text?: string;
};

export const PaginationPrevious: FC<PaginationPreviousProps> = ({
  className,
  text = "Previous",
  ...props
}) => {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <CaretLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
};

type PaginationNextProps = ComponentProps<typeof PaginationLink> & {
  text?: string;
};

export const PaginationNext: FC<PaginationNextProps> = ({
  className,
  text = "Next",
  ...props
}) => {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <CaretRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
};

export const PaginationEllipsis: FC<ComponentProps<"span">> = ({
  className,
  ...props
}) => {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <DotsThreeIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
};
