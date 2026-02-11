import { clientEnv } from "@config/env/client";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { notifyManager, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  if (typeof document !== "undefined") {
    notifyManager.setScheduler(window.requestAnimationFrame);
  }

  const convexQueryClient = new ConvexQueryClient(clientEnv.VITE_CONVEX_URL);
  const convexClient = new ConvexReactClient(clientEnv.VITE_CONVEX_URL);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });

  convexQueryClient.connect(queryClient);

  const router = createRouter({
    routeTree,
    context: {
      convexQueryClient,
      queryClient,
      convexClient,
    },
    defaultErrorComponent: ({ error }) => <p>{JSON.stringify(error)}</p>,
    defaultNotFoundComponent: () => <p>not found</p>,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultViewTransition: true,
    Wrap: ({ children }) => (
      <ConvexProvider client={convexQueryClient.convexClient}>
        {children}
      </ConvexProvider>
    ),
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};
