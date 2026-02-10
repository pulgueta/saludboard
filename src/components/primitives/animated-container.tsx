import type { ComponentProps, CSSProperties, FC } from "react";
import { cn } from "@/lib/utils";

type AnimatedContainerProps = ComponentProps<"div"> & {
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
};

/**
 * A CSS-only animated container that fades in with a directional slide.
 * Uses CSS @keyframes and animation-delay for staggered reveals.
 */
export const AnimatedContainer: FC<AnimatedContainerProps> = ({
  className,
  direction = "up",
  delay = 0,
  duration = 500,
  style,
  ...props
}) => {
  const translateMap = {
    left: "translateX(16px)",
    right: "translateX(-16px)",
    up: "translateY(12px)",
    down: "translateY(-12px)",
  };

  return (
    <div
      data-slot="animated-container"
      className={cn("animate-[fadeSlideIn] fill-mode-both", className)}
      style={
        {
          animationDuration: `${duration}ms`,
          animationDelay: `${delay}ms`,
          animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          "--slide-from": translateMap[direction],
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
};
