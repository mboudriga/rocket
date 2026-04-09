'use client';

import { Badge, Button, Card, Divider, Flex, Text } from '@rocket/ui';
import Link from 'next/link';
import { LuArrowLeft } from 'react-icons/lu';
import type { Item } from '@/lib/items';

export function ItemDetailClient({ item }: { item: Item }) {
  return (
    <Flex.V gap="6">
      <Flex.H gap="3" align="center">
        <Button asChild variant="ghost" size="sm">
          <Link href="/items">
            <LuArrowLeft /> Back
          </Link>
        </Button>
      </Flex.H>

      <Card title={item.name}>
        <Flex.V gap="4">
          <Flex.H justify="space-between" align="center">
            <Badge colorPalette={item.status === 'active' ? 'green' : 'gray'}>{item.status}</Badge>
          </Flex.H>
          <Divider />
          <Text color="fg.muted">{item.description}</Text>
          <Text color="fg.subtle" fontSize="sm">
            Created: {item.createdAt}
          </Text>
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
