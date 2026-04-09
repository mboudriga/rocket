import { Box, Heading, Text } from '@rocket/ui';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/items')({
  component: ItemsLayout,
});

function ItemsLayout() {
  return (
    <Box>
      <Box marginBottom="6">
        <Heading size="xl" marginBottom="2">
          Items
        </Heading>
        <Text color="gray.600">Manage your items collection.</Text>
      </Box>
      <Outlet />
    </Box>
  );
}
