import { Box, Button, Flex, Heading, RocketProvider, Text } from '@rocket/ui';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import type { AuthContextValue } from '@/features/auth';
import { AuthProvider } from '@/features/auth';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContextValue;
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Rocket App' },
    ],
    links: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  }),
  component: RootDocument,
  notFoundComponent: NotFoundPage,
  errorComponent: ({ error, reset }) => <ErrorPage error={error} reset={reset} />,
});

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <RocketProvider>
          <AuthProvider>
            <Box minHeight="100vh" bg={{ base: 'gray.50', _dark: 'gray.900' }}>
              <AppHeader />
              <Flex>
                <AppSidebar />
                <Box
                  as="main"
                  flex="1"
                  ml={{ base: '0', md: '240px' }}
                  pt="60px"
                  minHeight="calc(100vh - 60px)"
                >
                  <Box maxWidth="1200px" mx="auto" px={{ base: '4', md: '8' }} py="6">
                    <Outlet />
                  </Box>
                </Box>
              </Flex>
            </Box>
            {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </AuthProvider>
        </RocketProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundPage() {
  const router = useRouter();
  return (
    <Flex.V align="center" justify="center" minHeight="60vh" gap="4">
      <Heading size="2xl">404</Heading>
      <Text color="gray.500">Page not found</Text>
      <Button onClick={() => router.history.back()}>Go Back</Button>
    </Flex.V>
  );
}

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Flex.V align="center" justify="center" minHeight="60vh" gap="4">
      <Heading size="xl" color="red.500">
        Something went wrong
      </Heading>
      <Text color="gray.500">{error.message}</Text>
      <Button onClick={reset}>Try Again</Button>
    </Flex.V>
  );
}
