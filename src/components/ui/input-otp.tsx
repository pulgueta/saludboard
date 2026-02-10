"use client";

import { MinusIcon } from "@phosphor-icons/react";
import { OTPInput, OTPInputContext } from "input-otp";
import type { ComponentProps, FC } from "react";
import { useContext } from "react";

import { cn } from "@/lib/utils";

type InputOTPProps = ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
};

export const InputOTP: FC<InputOTPProps> = ({
  className,
  containerClassName,
  ...props
}) => {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName,
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
};

export const InputOTPGroup: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
};

type InputOTPSlotProps = ComponentProps<"div"> & {
  index: number;
};

export const InputOTPSlot: FC<InputOTPSlotProps> = ({
  index,
  className,
  ...props
}) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-8 items-center justify-center border-input border-y border-r text-sm outline-none transition-all first:rounded-l-lg first:border-l last:rounded-r-lg aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
};

export const InputOTPSeparator: FC<ComponentProps<"div">> = ({ ...props }) => {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      aria-hidden="true"
      {...props}
    >
      <MinusIcon />
    </div>
  );
};
