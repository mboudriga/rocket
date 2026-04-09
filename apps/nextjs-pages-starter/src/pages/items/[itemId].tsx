import { Badge, Button, Card, Divider, Flex, IconButton, Text } from '@rocket/ui';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { LuArrowLeft, LuPencil } from 'react-icons/lu';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import type { Item } from '@/lib/items';
import { getItemById, getItems } from '@/lib/items';
import type { NextPageWithLayout } from '@/types/page';

export const getStaticPaths: GetStaticPaths = async () => {
  const items = getItems();
  return {
    paths: items.map((item) => ({ params: { itemId: item.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{ item: Item }> = async ({ params }) => {
  const item = getItemById(params?.itemId as string);

  if (!item) {
    return { notFound: true };
  }

  return {
    props: { item },
    revalidate: 60,
  };
};

const ItemDetailPage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
  item,
}) => {
  return (
    <>
      <Head>
        <title>{item.name} | Pages Starter</title>
      </Head>

      <Flex.V gap="6">
        <Flex.H justify="space-between" align="center">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/items">
              <LuArrowLeft /> Back
            </Link>
          </Button>
          <IconButton asChild variant="outline" size="sm" aria-label="Edit">
            <Link href={`/items/edit?itemId=${item.id}`}>
              <LuPencil />
            </Link>
          </IconButton>
        </Flex.H>

        <Card title={item.name}>
          <Flex.V gap="4">
            <Flex.H justify="space-between" align="center">
              <Badge colorPalette={item.status === 'active' ? 'green' : 'gray'}>
                {item.status}
              </Badge>
            </Flex.H>
            <Divider />
            <Text color="fg.muted">{item.description}</Text>
            <Text color="fg.subtle" fontSize="sm">
              Created: {item.createdAt}
            </Text>
          </Flex.V>
        </Card>
      </Flex.V>
    </>
  );
};

ItemDetailPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default ItemDetailPage;
