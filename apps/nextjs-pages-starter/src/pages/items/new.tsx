import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Heading, Input, Textarea } from '@rocket/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import type { NextPageWithLayout } from '@/types/page';

const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
});

type CreateItemValues = z.infer<typeof createItemSchema>;

const NewItemPage: NextPageWithLayout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemValues>({
    resolver: zodResolver(createItemSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CreateItemValues) => {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Failed to create item');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      router.push('/dashboard/items');
    },
  });

  return (
    <>
      <Head>
        <title>New Item | Pages Starter</title>
      </Head>

      <Flex.V gap="6">
        <Heading size="xl">New Item</Heading>

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
              <Button
                type="submit"
                colorPalette="blue"
                loading={isPending}
                loadingText="Creating..."
              >
                Create Item
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

NewItemPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default NewItemPage;
