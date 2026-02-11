import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    CONVEX_SELF_HOSTED_URL: z.string(),
    CONVEX_SELF_HOSTED_ADMIN_KEY: z.string(),
    CLERK_JWT_ISSUER_DOMAIN: z.string(),
    CLERK_SECRET_KEY: z.string(),
  },
  runtimeEnv: process.env,
});
