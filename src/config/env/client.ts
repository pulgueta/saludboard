import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const clientEnv = createEnv({
  client: {
    VITE_CONVEX_URL: z.url(),
    VITE_CONVEX_SITE_URL: z.url(),
    VITE_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  clientPrefix: "VITE_",
  runtimeEnv: import.meta.env,
});
