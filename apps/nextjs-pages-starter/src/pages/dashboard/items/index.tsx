import { Badge, Button, Card, Flex, Skeleton, Text } from '@rocket/ui';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { LuPlus } from 'react-icons/lu';
import { PageHeader } from '@/components/PageHeader';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import type { Item } from '@/lib/items';
import type { NextPageWithLayout } from '@/types/page';

const ItemsPage: NextPageWithLayout = () => {
  const { data: items = [], isPending } = useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: () => fetch('/api/items').then((r) => r.json()),
  });

  return (
    <>
      <Head>
        <title>Items | Pages Starter</title>
      </Head>

      <Flex.V gap="6">
        <PageHeader
          title="Items"
          action={
            <Button asChild colorPalette="blue">
              <Link href="/items/new">
                <LuPlus /> New Item
              </Link>
            </Button>
          }
        />

        {isPending ? (
          <Flex.V gap="3">
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
          </Flex.V>
        ) : (
          <Flex.V gap="3">
            {items.map((item) => (
              <Card key={item.id} asChild>
                <Link href={`/items/${item.id}`}>
                  <Flex.H justify="space-between" align="center">
                    <Flex.V gap="1">
                      <Text fontWeight="semibold">{item.name}</Text>
                      <Text color="fg.muted" fontSize="sm">
                        {item.description}
                      </Text>
                    </Flex.V>
                    <Flex.H gap="3" align="center">
                      <Badge colorPalette={item.status === 'active' ? 'green' : 'gray'}>
                        {item.status}
                      </Badge>
                      <Text color="fg.subtle" fontSize="sm">
                        {item.createdAt}
                      </Text>
                    </Flex.H>
                  </Flex.H>
                </Link>
              </Card>
            ))}
          </Flex.V>
        )}
      </Flex.V>
    </>
  );
};

ItemsPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default ItemsPage;
