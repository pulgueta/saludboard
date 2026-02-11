import { Sparkle } from "@phosphor-icons/react";
import type { FC } from "react";

import { cn } from "@/lib/utils";

type AiGenerateButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

/**
 * Eye-catching gradient button for AI-powered generation.
 * Non-functional in MVP -- purely for sales conversion.
 *
 * Features:
 * - Violet → fuchsia → pink gradient
 * - Shimmer sweep animation
 * - Subtle glow pulse
 */
export const AiGenerateButton: FC<AiGenerateButtonProps> = ({
  label = "Generar con IA",
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-5 py-2.5 font-medium text-sm text-white shadow-lg transition-all duration-300",
        "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500",
        "hover:shadow-violet-500/25 hover:shadow-xl",
        "active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {/* Glow pulse behind */}
      <span
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500"
        style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
      />

      {/* Shimmer sweep */}
      <span className="pointer-events-none absolute inset-0 -z-0">
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ animation: "shimmer 2.5s ease-in-out infinite" }}
        />
      </span>

      <Sparkle
        size={18}
        weight="fill"
        className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
      />
      <span className="relative z-10">{label}</span>
    </button>
  );
};
