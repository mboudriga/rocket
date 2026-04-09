import { Button, Flex, Heading, Text } from '@rocket/ui';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface HomeProps {
  builtAt: string;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      builtAt: new Date().toISOString(),
    },
  };
};

export default function HomePage({ builtAt }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Next.js Pages Starter</title>
      </Head>

      <Flex.V align="center" justify="center" minH="100vh" gap="6">
        <Heading size="4xl">Next.js Pages Starter</Heading>
        <Text color="fg.muted" fontSize="lg">
          Next.js 16 Pages Router with getStaticProps, API Routes, and @rocket/ui
        </Text>
        <Text color="fg.subtle" fontSize="sm">
          Built at: {builtAt}
        </Text>
        <Flex.H gap="4">
          <Button asChild colorPalette="blue">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/items">Items</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/dashboard/settings">Settings</Link>
          </Button>
        </Flex.H>
      </Flex.V>
    </>
  );
}
