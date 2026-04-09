import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

import type { AuthContextValue } from '@/features/auth';
import { routeTree } from '@/routeTree.gen';

/** Router context providing query client and auth to all routes */
export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthContextValue;
}

const defaultAuth: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
};

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        retry: 1,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient, auth: defaultAuth },
    scrollRestoration: true,
    defaultPreload: 'intent',
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
