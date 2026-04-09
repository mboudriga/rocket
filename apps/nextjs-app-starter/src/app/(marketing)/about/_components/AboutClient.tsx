'use client';

import { Button, Divider, Flex, Heading, Text } from '@rocket/ui';
import Link from 'next/link';

export function AboutClient() {
  return (
    <Flex.V maxW="800px" mx="auto" py="16" px="6" gap="8">
      <Heading size="3xl">About</Heading>
      <Divider />
      <Flex.V gap="4">
        <Text color="fg.muted" fontSize="lg">
          This is a Next.js 16 App Router starter template demonstrating React Server Components,
          Server Actions, streaming, and the @rocket/ui component library.
        </Text>
        <Text color="fg.muted">
          It showcases route groups, dynamic routes, metadata generation, and the
          RSC-to-client-props pattern used throughout this monorepo.
        </Text>
      </Flex.V>
      <Button asChild variant="outline" alignSelf="flex-start">
        <Link href="/">Back to home</Link>
      </Button>
    </Flex.V>
  );
}
