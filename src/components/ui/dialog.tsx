import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "@phosphor-icons/react";
import type { ComponentProps, FC, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Dialog: FC<DialogPrimitive.Root.Props> = ({ ...props }) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

export const DialogTrigger: FC<DialogPrimitive.Trigger.Props> = ({
  ...props
}) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

export const DialogPortal: FC<DialogPrimitive.Portal.Props> = ({
  ...props
}) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
};

export const DialogClose: FC<DialogPrimitive.Close.Props> = ({ ...props }) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
};

export const DialogOverlay: FC<DialogPrimitive.Backdrop.Props> = ({
  className,
  ...props
}) => {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 data-closed:animate-out data-open:animate-in supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  );
};

type DialogContentProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  children?: ReactNode;
};

export const DialogContent: FC<DialogContentProps> = ({
  className,
  children,
  showCloseButton = true,
  ...props
}) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 text-sm outline-none ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
};

export const DialogHeader: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
};

type DialogFooterProps = ComponentProps<"div"> & {
  showCloseButton?: boolean;
  children?: ReactNode;
};

export const DialogFooter: FC<DialogFooterProps> = ({
  className,
  showCloseButton = false,
  children,
  ...props
}) => {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
};

export const DialogTitle: FC<DialogPrimitive.Title.Props> = ({
  className,
  ...props
}) => {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-medium text-base leading-none", className)}
      {...props}
    />
  );
};

export const DialogDescription: FC<DialogPrimitive.Description.Props> = ({
  className,
  ...props
}) => {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground text-sm *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
};
