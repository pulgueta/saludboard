import type { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // biome-ignore lint/style/noNonNullAssertion: will always be set
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
