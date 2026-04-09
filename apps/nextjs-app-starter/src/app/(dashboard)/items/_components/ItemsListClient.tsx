'use client';

import { Badge, Button, Card, Flex, Text } from '@rocket/ui';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';
import { PageHeader } from '@/components/PageHeader';
import type { Item } from '@/lib/items';

export function ItemsListClient({ items }: { items: Item[] }) {
  return (
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
    </Flex.V>
  );
}
