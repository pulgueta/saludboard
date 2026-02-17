import { esMX } from "@clerk/localizations";
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { clerkAppearance } from "@config/clerk-appearance";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouteContext,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { TooltipProvider } from "@ui/tooltip";
import type { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import appCss from "../styles.css?url";

const fetchClerkAuth = createServerFn().handler(async () => {
  const { getToken, userId, isAuthenticated } = await auth();

  const token = await getToken({ template: "convex" });

  return {
    userId,
    token,
    isAuthenticated,
  };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
  convexClient: ConvexReactClient;
  isAuthenticated: boolean;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "SaludBoard — Gestión de salud",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  beforeLoad: async (ctx) => {
    const { userId, token, isAuthenticated } = await fetchClerkAuth();

    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return {
      userId,
      token,
      isAuthenticated,
    };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const ctx = useRouteContext({ from: Route.id });

  return (
    <ClerkProvider
      localization={esMX}
      appearance={clerkAppearance}
      afterSignOutUrl="/"
      newSubscriptionRedirectUrl={null}
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/onboarding"
    >
      <ConvexProviderWithClerk client={ctx.convexClient} useAuth={useAuth}>
        <html lang="es" suppressHydrationWarning className="">
          <head>
            <HeadContent />
          </head>
          <body>
            <TooltipProvider>{children}</TooltipProvider>

            {/* <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            /> */}
            <Scripts />
          </body>
        </html>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
