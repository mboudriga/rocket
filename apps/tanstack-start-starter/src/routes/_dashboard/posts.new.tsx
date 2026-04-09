import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, Flex, Heading, Input, Select, Textarea } from '@rocket/ui';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { LuArrowLeft, LuSave } from 'react-icons/lu';
import { z } from 'zod';

import { useCreatePost } from '@/features/posts/mutations';
import type { Post } from '@/features/posts/types';

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  body: z.string().min(1, 'Content is required'),
  status: z.enum(['draft', 'published']),
});

type CreatePostForm = z.infer<typeof createPostSchema>;

export const Route = createFileRoute('/_dashboard/posts/new')({
  component: CreatePostPage,
});

function CreatePostPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreatePost();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', body: '', status: 'draft' },
  });

  const onSubmit = (data: CreatePostForm) => {
    mutate(data, {
      onSuccess: (data) => {
        const post = data as Post;
        navigate({ to: '/posts/$postId', params: { postId: post.id } });
      },
    });
  };

  return (
    <Flex.V gap="4">
      <Link to="/posts">
        <Button variant="ghost" size="sm">
          <LuArrowLeft /> Back to Posts
        </Button>
      </Link>

      <Card padding="6">
        <Heading size="lg" marginBottom="6">
          Create New Post
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex.V gap="4">
            <Input
              label="Title"
              required
              invalid={!!errors.title}
              error={errors.title?.message}
              {...register('title')}
            />

            <Textarea
              label="Content"
              required
              rows={6}
              invalid={!!errors.body}
              error={errors.body?.message}
              {...register('body')}
            />

            <Box width={{ base: 'full', tablet: '200px' }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Status"
                    options={[
                      { value: 'draft', label: 'Draft' },
                      { value: 'published', label: 'Published' },
                    ]}
                    value={[field.value]}
                    onChange={(e) => field.onChange(JSON.parse(e.target.value)[0])}
                  />
                )}
              />
            </Box>

            <Flex.H gap="3" justify="flex-end">
              <Link to="/posts">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                type="submit"
                colorPalette="blue"
                loading={isPending}
                loadingText="Creating..."
              >
                <LuSave /> Create Post
              </Button>
            </Flex.H>
          </Flex.V>
        </form>
      </Card>
    </Flex.V>
  );
}
