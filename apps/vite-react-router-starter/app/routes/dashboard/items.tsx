import type { Route } from './+types/items';
import { Link } from 'react-router';
import { getAll } from '@/lib/items.server';
import { Badge, Box, Flex, Heading, Text } from '@rocket/ui';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status') as 'active' | 'archived' | 'draft' | null;
  const items = getAll(status ?? undefined);
  return { items, currentStatus: status };
}

const statusColors = {
  active: 'green',
  draft: 'yellow',
  archived: 'gray',
} as const;

const filters = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' },
];

export default function Items({ loaderData }: Route.ComponentProps) {
  const { items, currentStatus } = loaderData;

  return (
    <Flex.V gap="6">
      <Flex.H justify="space-between" align="center">
        <Heading size="lg">Items</Heading>
        <Text color="fg.muted" fontSize="sm">
          {items.length} items
        </Text>
      </Flex.H>

      <Flex.H gap="2">
        {filters.map((filter) => {
          const isActive = (currentStatus ?? '') === filter.value;
          return (
            <Link
              key={filter.value}
              to={filter.value ? `?status=${filter.value}` : '/dashboard/items'}
            >
              <Badge
                colorPalette={isActive ? 'blue' : 'gray'}
                variant={isActive ? 'solid' : 'subtle'}
                cursor="pointer"
                px="3"
                py="1"
              >
                {filter.label}
              </Badge>
            </Link>
          );
        })}
      </Flex.H>

      <Flex.V gap="2">
        {items.map((item) => (
          <Link key={item.id} to={`/dashboard/items/${item.id}`}>
            <Box
              p="4"
              borderRadius="md"
              borderWidth="1px"
              borderColor="border"
              bg="bg.surface"
              _hover={{ bg: 'bg.subtle' }}
              transition="background 0.15s"
            >
              <Flex.H justify="space-between" align="center">
                <Flex.V gap="1">
                  <Text fontWeight="medium">{item.name}</Text>
                  <Text fontSize="sm" color="fg.muted" lineClamp={1}>
                    {item.description}
                  </Text>
                </Flex.V>
                <Badge colorPalette={statusColors[item.status]} variant="subtle">
                  {item.status}
                </Badge>
              </Flex.H>
            </Box>
          </Link>
        ))}
        {items.length === 0 && (
          <Text color="fg.muted" textAlign="center" py="8">
            No items found.
          </Text>
        )}
      </Flex.V>
    </Flex.V>
  );
}
