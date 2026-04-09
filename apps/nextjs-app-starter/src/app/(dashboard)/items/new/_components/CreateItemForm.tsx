'use client';

import { Button, Flex, Input, Textarea } from '@rocket/ui';
import Link from 'next/link';
import { useActionState } from 'react';
import { type CreateItemState, createItem } from '../_actions/create';

export function CreateItemForm() {
  const [state, formAction, isPending] = useActionState<CreateItemState, FormData>(createItem, {});

  return (
    <form action={formAction}>
      <Flex.V gap="4" maxW="lg">
        <Input
          label="Name"
          name="name"
          required
          error={state.errors?.name?.[0]}
          invalid={!!state.errors?.name}
        />
        <Textarea
          label="Description"
          name="description"
          error={state.errors?.description?.[0]}
          invalid={!!state.errors?.description}
        />
        {state.message && (
          <Flex.H color="red.fg" fontSize="sm">
            {state.message}
          </Flex.H>
        )}
        <Flex.H gap="3">
          <Button type="submit" colorPalette="blue" loading={isPending} loadingText="Creating...">
            Create Item
          </Button>
          <Button asChild variant="outline">
            <Link href="/items">Cancel</Link>
          </Button>
        </Flex.H>
      </Flex.V>
    </form>
  );
}
