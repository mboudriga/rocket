import type { Route } from './+types/overview';
import { getAll } from '@/lib/items.server';
import { Box, Flex, Heading, Text } from '@rocket/ui';
import { LuArchive, LuCircleCheck, LuPencil } from 'react-icons/lu';

export async function loader(_args: Route.LoaderArgs) {
  const items = getAll();
  const active = items.filter((i) => i.status === 'active').length;
  const draft = items.filter((i) => i.status === 'draft').length;
  const archived = items.filter((i) => i.status === 'archived').length;
  return { total: items.length, active, draft, archived };
}

const stats = [
  { key: 'active', label: 'Active', icon: LuCircleCheck, color: 'green' as const },
  { key: 'draft', label: 'Draft', icon: LuPencil, color: 'yellow' as const },
  { key: 'archived', label: 'Archived', icon: LuArchive, color: 'gray' as const },
] as const;

export default function Overview({ loaderData }: Route.ComponentProps) {
  return (
    <Flex.V gap="6">
      <Heading size="lg">Overview</Heading>
      <Text color="fg.muted">
        {loaderData.total} total items across all statuses.
      </Text>
      <Flex.H gap="4" flexWrap="wrap">
        {stats.map((stat) => (
          <Box
            key={stat.key}
            p="5"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="border"
            bg="bg.surface"
            minW="180px"
            flex="1"
          >
            <Flex.H align="center" gap="3" mb="2" colorPalette={stat.color}>
              <stat.icon />
              <Text fontSize="sm" color="fg.muted">
                {stat.label}
              </Text>
            </Flex.H>
            <Text fontSize="2xl" fontWeight="bold">
              {loaderData[stat.key]}
            </Text>
          </Box>
        ))}
      </Flex.H>
    </Flex.V>
  );
}
