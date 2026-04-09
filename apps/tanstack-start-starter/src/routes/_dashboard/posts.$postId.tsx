import { Badge, Box, Button, Card, Flex, Heading, Text } from '@rocket/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { LuArrowLeft } from 'react-icons/lu';

import { postQueries } from '@/features/posts/queries';

export const Route = createFileRoute('/_dashboard/posts/$postId')({
  loader: async ({ context, params }) => {
    try {
      return await context.queryClient.ensureQueryData(postQueries.detail(params.postId));
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.title ? `${loaderData.title} | Posts` : 'Post' }],
  }),
  component: PostDetailPage,
  notFoundComponent: () => (
    <Card padding="6">
      <Flex.V gap="4" align="center">
        <Text color="fg.muted">Post not found.</Text>
        <Link to="/posts">
          <Button variant="ghost">
            <LuArrowLeft /> Back to Posts
          </Button>
        </Link>
      </Flex.V>
    </Card>
  ),
});

function PostDetailPage() {
  const { postId } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQueries.detail(postId));

  return (
    <Flex.V gap="4">
      <Link to="/posts">
        <Button variant="ghost" size="sm">
          <LuArrowLeft /> Back to Posts
        </Button>
      </Link>

      <Card padding="6">
        <Flex justify="space-between" align="flex-start" marginBottom="4">
          <Box>
            <Heading size="lg">{post.title}</Heading>
            <Badge
              colorPalette={post.status === 'published' ? 'green' : 'yellow'}
              variant="subtle"
              marginTop="2"
            >
              {post.status}
            </Badge>
          </Box>
        </Flex>

        <Flex.V gap="4">
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="fg.muted">
              Content
            </Text>
            <Text>{post.body}</Text>
          </Box>
          <Flex.H gap="6">
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="fg.muted">
                Author
              </Text>
              <Text>{post.authorName}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="fg.muted">
                Created
              </Text>
              <Text>{new Date(post.createdAt).toLocaleDateString()}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="fg.muted">
                Post ID
              </Text>
              <Text fontFamily="mono" fontSize="sm">
                {post.id}
              </Text>
            </Box>
          </Flex.H>
        </Flex.V>
      </Card>
    </Flex.V>
  );
}
