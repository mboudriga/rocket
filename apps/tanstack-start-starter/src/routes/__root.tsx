import { Button, Flex, Heading, RocketProvider, Text } from '@rocket/ui';
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

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' },
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
          <Outlet />
          {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
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
      <Text color="fg.muted">Page not found</Text>
      <Button onClick={() => router.history.back()}>Go Back</Button>
    </Flex.V>
  );
}

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Flex.V align="center" justify="center" minHeight="60vh" gap="4">
      <Heading size="xl" color="red.fg">
        Something went wrong
      </Heading>
      <Text color="fg.muted">{error.message}</Text>
      <Button onClick={reset}>Try Again</Button>
    </Flex.V>
  );
}
