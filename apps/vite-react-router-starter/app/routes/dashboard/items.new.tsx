import type { Route } from './+types/items.new';
import { Form, Link, redirect, useNavigation } from 'react-router';
import { create } from '@/lib/items.server';
import { Button, Flex, Heading, Input, Text, Textarea } from '@rocket/ui';
import { LuArrowLeft, LuPlus } from 'react-icons/lu';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const status = (formData.get('status') as 'active' | 'draft') || 'draft';

  const item = create({ name, description, status });
  return redirect(`/dashboard/items/${item.id}`);
}

export default function NewItem() {
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
        <Heading size="lg">New Item</Heading>
      </Flex.H>

      <Form method="post">
        <Flex.V
          gap="4"
          p="6"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="border"
          bg="bg.surface"
        >
          <Input label="Name" name="name" required placeholder="Enter item name" />
          <Textarea
            label="Description"
            name="description"
            placeholder="Describe this item"
            rows={3}
          />
          <Flex.H gap="2">
            {(['draft', 'active'] as const).map((status) => (
              <label key={status}>
                <Flex.H align="center" gap="1" cursor="pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    defaultChecked={status === 'draft'}
                  />
                  <Text fontSize="sm" textTransform="capitalize">
                    {status}
                  </Text>
                </Flex.H>
              </label>
            ))}
          </Flex.H>
          <Flex.H pt="2">
            <Button type="submit" colorPalette="blue" loading={isSubmitting}>
              <LuPlus /> Create Item
            </Button>
          </Flex.H>
        </Flex.V>
      </Form>
    </Flex.V>
  );
}
