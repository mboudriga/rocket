import { Button, Flex, Heading, Text } from '@rocket/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found</title>
      </Head>

      <Flex.V align="center" justify="center" minH="100vh" gap="4">
        <Heading size="4xl">404</Heading>
        <Text color="fg.muted">Page not found</Text>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </Flex.V>
    </>
  );
}
