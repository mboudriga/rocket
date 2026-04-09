'use client';

import { Button, Flex, Heading, Text } from '@rocket/ui';
import Link from 'next/link';

export function HomeClient() {
  return (
    <Flex.V align="center" justify="center" minH="100vh" gap="6">
      <Heading size="4xl">Next.js App Starter</Heading>
      <Text color="fg.muted" fontSize="lg">
        Next.js 16 App Router with RSC, Server Actions, and @rocket/ui
      </Text>
      <Flex.H gap="4">
        <Button asChild colorPalette="blue">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/about">About</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/features">Features</Link>
        </Button>
      </Flex.H>
    </Flex.V>
  );
}
