import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Heading, Input, Skeleton, Textarea } from '@rocket/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import type { Item } from '@/lib/items';
import type { NextPageWithLayout } from '@/types/page';

const editItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
});

type EditItemValues = z.infer<typeof editItemSchema>;

const EditItemPage: NextPageWithLayout = () => {
  const router = useRouter();
  const rawId = router.query.itemId;
  const itemId = Array.isArray(rawId) ? rawId[0] : rawId;
  const queryClient = useQueryClient();

  const { data: item, isPending: isLoadingItem } = useQuery<Item>({
    queryKey: ['items', itemId],
    queryFn: () => fetch(`/api/items/${itemId}`).then((r) => r.json()),
    enabled: !!itemId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditItemValues>({
    resolver: zodResolver(editItemSchema),
    values: item ? { name: item.name, description: item.description } : undefined,
    resetOptions: { keepDirtyValues: true },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: EditItemValues) => {
      const res = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Failed to update item');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      router.push('/dashboard/items');
    },
  });

  if (isLoadingItem) {
    return (
      <Flex.V gap="4" maxW="lg">
        <Skeleton height="40px" width="200px" />
        <Skeleton height="40px" />
        <Skeleton height="80px" />
      </Flex.V>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Item | Pages Starter</title>
      </Head>

      <Flex.V gap="6">
        <Heading size="xl">Edit Item</Heading>

        <form onSubmit={handleSubmit((values) => mutate(values))}>
          <Flex.V gap="4" maxW="lg">
            <Input
              label="Name"
              required
              error={errors.name?.message}
              invalid={!!errors.name}
              {...register('name')}
            />
            <Textarea
              label="Description"
              error={errors.description?.message}
              invalid={!!errors.description}
              {...register('description')}
            />
            <Flex.H gap="3">
              <Button type="submit" colorPalette="blue" loading={isPending} loadingText="Saving...">
                Save Changes
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/items">Cancel</Link>
              </Button>
            </Flex.H>
          </Flex.V>
        </form>
      </Flex.V>
    </>
  );
};

EditItemPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default EditItemPage;
