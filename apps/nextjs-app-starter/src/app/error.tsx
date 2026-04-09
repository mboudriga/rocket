'use client';

import { Button, Flex, Heading, Text } from '@rocket/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Flex.V align="center" justify="center" minH="100vh" gap="4">
      <Heading size="2xl">Something went wrong</Heading>
      <Text color="fg.muted">{error.message}</Text>
      <Button onClick={reset}>Try again</Button>
    </Flex.V>
  );
}
