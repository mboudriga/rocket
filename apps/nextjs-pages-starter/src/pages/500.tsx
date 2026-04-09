import { Button, Flex, Heading, Text } from '@rocket/ui';
import Head from 'next/head';
import Link from 'next/link';

export default function ServerErrorPage() {
  return (
    <>
      <Head>
        <title>500 — Internal Server Error</title>
      </Head>

      <Flex.V align="center" justify="center" minH="100vh" gap="4">
        <Heading size="4xl">500</Heading>
        <Text color="fg.muted">Internal server error</Text>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </Flex.V>
    </>
  );
}
