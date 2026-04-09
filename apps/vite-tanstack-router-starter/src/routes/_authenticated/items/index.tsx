import { Badge, Box, Button, Card, Flex, Text } from '@rocket/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { LuPlus } from 'react-icons/lu';

export const Route = createFileRoute('/_authenticated/items/')({
  component: ItemsIndexPage,
});

const mockItems = [
  { id: '1', name: 'Widget A', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Widget B', status: 'pending', createdAt: '2024-01-14' },
  { id: '3', name: 'Gadget X', status: 'active', createdAt: '2024-01-13' },
  { id: '4', name: 'Gadget Y', status: 'inactive', createdAt: '2024-01-12' },
];

function ItemsIndexPage() {
  return (
    <Flex.V gap="4">
      <Flex justify="flex-end">
        <Button colorPalette="blue">
          <LuPlus /> Add Item
        </Button>
      </Flex>

      <Flex.V gap="3">
        {mockItems.map((item) => (
          <Link key={item.id} to="/items/$itemId" params={{ itemId: item.id }}>
            <Card
              padding="4"
              _hover={{ borderColor: 'blue.300', shadow: 'sm' }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="semibold">{item.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Created: {item.createdAt}
                  </Text>
                </Box>
                <Badge
                  colorPalette={
                    item.status === 'active'
                      ? 'green'
                      : item.status === 'pending'
                        ? 'yellow'
                        : 'gray'
                  }
                >
                  {item.status}
                </Badge>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex.V>
    </Flex.V>
  );
}
