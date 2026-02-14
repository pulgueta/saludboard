import type { RunMutationCtx } from "@convex-dev/rate-limiter";
import { MINUTE, RateLimiter } from "@convex-dev/rate-limiter";
import { ConvexError } from "convex/values";

import { components } from "./_generated/api";

export const rateLimiter = new RateLimiter(components.rateLimiter, {
  createPatient: { kind: "fixed window", rate: 5, period: 5 * MINUTE },
});

type RateLimitName = keyof NonNullable<typeof rateLimiter.limits>;

function formatRetryAfter(retryAfter: number) {
  return new Intl.DateTimeFormat("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Bogota",
  }).format(new Date(Date.now() + retryAfter));
}

export async function rateLimitOrThrow(
  ctx: RunMutationCtx,
  name: RateLimitName,
  key: string,
) {
  const { ok, retryAfter } = await rateLimiter.limit(ctx, name, { key });

  if (!ok) {
    throw new ConvexError({
      code: "RATE_LIMIT_EXCEEDED",
      message: `Has excedido el límite de solicitudes. Intenta nuevamente en ${formatRetryAfter(retryAfter)}.`,
    });
  }
}
