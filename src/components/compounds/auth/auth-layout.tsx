import { Stethoscope } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Shared layout wrapper for sign-in / sign-up pages.
 *
 * Renders a centered card with brand header and decorative background,
 * consistent with the onboarding layout aesthetic.
 * Clerk's `<SignIn />` / `<SignUp />` components are rendered as children.
 */
export const AuthLayout: FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <div
      data-slot="auth-layout"
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background p-4",
        className,
      )}
    >
      {/* Decorative background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
        {/* Brand */}
        <Link
          to="/"
          className="flex flex-col items-center gap-2.5 text-center transition-opacity hover:opacity-80"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Stethoscope size={22} weight="bold" />
          </div>
          <h1 className="font-semibold text-foreground text-xl tracking-tighter md:text-3xl">
            Salud
            <span className="text-primary">Board</span>
          </h1>
        </Link>

        {/* Clerk form slot */}
        <div className="mx-auto w-max">{children}</div>
      </div>

      {/* Subtle bottom border decoration */}
      <div className="fixed right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
    </div>
  );
};
