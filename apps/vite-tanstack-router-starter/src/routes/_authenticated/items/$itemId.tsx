import { Badge, Box, Button, Card, Flex, Heading, Text } from '@rocket/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { LuArrowLeft, LuPencil, LuTrash } from 'react-icons/lu';

export const Route = createFileRoute('/_authenticated/items/$itemId')({
  component: ItemDetailPage,
});

const mockItems: Record<
  string,
  { id: string; name: string; status: string; description: string; createdAt: string }
> = {
  '1': {
    id: '1',
    name: 'Widget A',
    status: 'active',
    description: 'A high-quality widget for all your needs.',
    createdAt: '2024-01-15',
  },
  '2': {
    id: '2',
    name: 'Widget B',
    status: 'pending',
    description: 'An innovative widget currently in review.',
    createdAt: '2024-01-14',
  },
  '3': {
    id: '3',
    name: 'Gadget X',
    status: 'active',
    description: 'The ultimate gadget for power users.',
    createdAt: '2024-01-13',
  },
  '4': {
    id: '4',
    name: 'Gadget Y',
    status: 'inactive',
    description: 'A legacy gadget that is no longer maintained.',
    createdAt: '2024-01-12',
  },
};

function ItemDetailPage() {
  const { itemId } = Route.useParams();
  const item = mockItems[itemId];

  if (!item) {
    return (
      <Card padding="6">
        <Text>Item not found.</Text>
        <Link to="/items">
          <Button variant="ghost" marginTop="4">
            <LuArrowLeft /> Back to Items
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Flex.V gap="4">
      <Link to="/items">
        <Button variant="ghost" size="sm">
          <LuArrowLeft /> Back to Items
        </Button>
      </Link>

      <Card padding="6">
        <Flex justify="space-between" align="flex-start" marginBottom="4">
          <Box>
            <Heading size="lg">{item.name}</Heading>
            <Badge
              colorPalette={
                item.status === 'active' ? 'green' : item.status === 'pending' ? 'yellow' : 'gray'
              }
              marginTop="2"
            >
              {item.status}
            </Badge>
          </Box>
          <Flex gap="2">
            <Button variant="outline" size="sm">
              <LuPencil /> Edit
            </Button>
            <Button variant="outline" colorPalette="red" size="sm">
              <LuTrash /> Delete
            </Button>
          </Flex>
        </Flex>

        <Flex.V gap="4">
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              Description
            </Text>
            <Text>{item.description}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              Created At
            </Text>
            <Text>{item.createdAt}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              Item ID
            </Text>
            <Text fontFamily="mono" fontSize="sm">
              {item.id}
            </Text>
          </Box>
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
