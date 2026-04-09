import type { Route } from './+types/items.$itemId';
import { Form, Link, redirect, useNavigation } from 'react-router';
import { data } from 'react-router';
import { getById, remove, update } from '@/lib/items.server';
import { Badge, Box, Button, Flex, Heading, Input, Text, Textarea } from '@rocket/ui';
import { LuArrowLeft, LuSave, LuTrash } from 'react-icons/lu';

export async function loader({ params }: Route.LoaderArgs) {
  const item = getById(params.itemId);
  if (!item) {
    throw data('Item not found', { status: 404 });
  }
  return { item };
}

export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'delete') {
    remove(params.itemId);
    return redirect('/dashboard/items');
  }

  if (intent === 'update') {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as 'active' | 'archived' | 'draft';
    const updated = update(params.itemId, { name, description, status });
    if (!updated) {
      throw data('Item not found', { status: 404 });
    }
    return { success: true };
  }

  throw data('Invalid intent', { status: 400 });
}

const statusColors = {
  active: 'green',
  draft: 'yellow',
  archived: 'gray',
} as const;

export default function ItemDetail({ loaderData, actionData }: Route.ComponentProps) {
  const { item } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Flex.V gap="6">
      <Flex.H align="center" gap="3">
        <Link to="/dashboard/items">
          <Button variant="ghost" size="sm">
            <LuArrowLeft /> Back
          </Button>
        </Link>
        <Heading size="lg">{item.name}</Heading>
        <Badge colorPalette={statusColors[item.status]} variant="subtle">
          {item.status}
        </Badge>
      </Flex.H>

      {actionData && 'success' in actionData && (
        <Box p="3" borderRadius="md" bg="green.subtle" color="green.fg">
          <Text fontSize="sm">Item updated successfully.</Text>
        </Box>
      )}

      <Box
        p="6"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="border"
        bg="bg.surface"
      >
        <Form method="post">
          <input type="hidden" name="intent" value="update" />
          <Flex.V gap="4">
            <Input label="Name" name="name" defaultValue={item.name} required />
            <Textarea
              label="Description"
              name="description"
              defaultValue={item.description}
              rows={3}
            />
            <Flex.H gap="2">
              {(['active', 'draft', 'archived'] as const).map((status) => (
                <label key={status}>
                  <Flex.H align="center" gap="1" cursor="pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      defaultChecked={item.status === status}
                    />
                    <Text fontSize="sm" textTransform="capitalize">
                      {status}
                    </Text>
                  </Flex.H>
                </label>
              ))}
            </Flex.H>
            <Flex.H gap="3" justify="space-between" pt="2">
              <Button type="submit" colorPalette="blue" loading={isSubmitting}>
                <LuSave /> Save Changes
              </Button>
            </Flex.H>
          </Flex.V>
        </Form>

        <Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <Button
            type="submit"
            variant="outline"
            colorPalette="red"
            size="sm"
            mt="4"
            loading={isSubmitting}
          >
            <LuTrash /> Delete Item
          </Button>
        </Form>
      </Box>

      <Flex.H gap="6" color="fg.subtle" fontSize="xs">
        <Text>Created: {new Date(item.createdAt).toLocaleDateString()}</Text>
        <Text>Updated: {new Date(item.updatedAt).toLocaleDateString()}</Text>
      </Flex.H>
    </Flex.V>
  );
}

export function ErrorBoundary() {
  return (
    <Flex.V align="center" justify="center" py="12" gap="4">
      <Heading size="lg">Item Not Found</Heading>
      <Text color="fg.muted">The item you're looking for doesn't exist.</Text>
      <Link to="/dashboard/items">
        <Button variant="outline">
          <LuArrowLeft /> Back to Items
        </Button>
      </Link>
    </Flex.V>
  );
}
