import type { ComponentProps, FC } from "react";

import { cn } from "@/lib/utils";

export const Table: FC<ComponentProps<"table">> = ({ className, ...props }) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
};

export const TableHeader: FC<ComponentProps<"thead">> = ({
  className,
  ...props
}) => {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
};

export const TableBody: FC<ComponentProps<"tbody">> = ({
  className,
  ...props
}) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
};

export const TableFooter: FC<ComponentProps<"tfoot">> = ({
  className,
  ...props
}) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
};

export const TableRow: FC<ComponentProps<"tr">> = ({ className, ...props }) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

export const TableHead: FC<ComponentProps<"th">> = ({
  className,
  ...props
}) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
};

export const TableCell: FC<ComponentProps<"td">> = ({
  className,
  ...props
}) => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
};

export const TableCaption: FC<ComponentProps<"caption">> = ({
  className,
  ...props
}) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};
