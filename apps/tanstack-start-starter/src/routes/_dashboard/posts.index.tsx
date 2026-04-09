import { Badge, Box, Button, Card, Flex, Heading, Input, Select, Text } from '@rocket/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { LuPlus, LuSearch } from 'react-icons/lu';
import { z } from 'zod';

import { postQueries } from '@/features/posts/queries';
import type { Post } from '@/features/posts/types';
import { useDebounce } from '@/hooks/use-debounce';

const postsSearchSchema = z.object({
  search: z.string().catch(''),
  status: z.enum(['all', 'draft', 'published']).catch('all'),
  page: z.number().catch(1),
});

export const Route = createFileRoute('/_dashboard/posts/')({
  validateSearch: postsSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(postQueries.list(deps)),
  component: PostsIndexPage,
});

function PostsIndexPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [searchInput, setSearchInput] = useState(search.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync local input with URL when browser navigates (back/forward)
  useEffect(() => {
    setSearchInput(search.search);
  }, [search.search]);

  // Push debounced value to URL (replace to avoid history pollution)
  useEffect(() => {
    if (debouncedSearch !== search.search) {
      navigate({
        search: (prev) => ({ ...prev, search: debouncedSearch, page: 1 }),
        replace: true,
      });
    }
  }, [debouncedSearch, search.search, navigate]);

  const { data: posts } = useSuspenseQuery(postQueries.list(search));

  return (
    <Flex.V gap="6">
      <Flex justify="space-between" align="center">
        <Box>
          <Heading size="xl" marginBottom="1">
            Posts
          </Heading>
          <Text color="fg.muted">{posts.length} posts found</Text>
        </Box>
        <Link to="/posts/new">
          <Button colorPalette="blue">
            <LuPlus /> New Post
          </Button>
        </Link>
      </Flex>

      <Flex.H gap="4" flexWrap="wrap">
        <Box flex="1" minWidth="200px">
          <Input
            placeholder="Search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Box>
        <Box width={{ base: 'full', tablet: '200px' }}>
          <Select
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
            ]}
            value={[search.status]}
            onChange={(e) => {
              const value = JSON.parse(e.target.value)[0];
              navigate({ search: (prev) => ({ ...prev, status: value, page: 1 }) });
            }}
          />
        </Box>
      </Flex.H>

      <Flex.V gap="3">
        {posts.map((post: Post) => (
          <Link key={post.id} to="/posts/$postId" params={{ postId: post.id }}>
            <Card
              padding="4"
              _hover={{ borderColor: 'blue.fg', shadow: 'sm' }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="semibold">{post.title}</Text>
                  <Flex.H gap="2" align="center" marginTop="1">
                    <Text fontSize="sm" color="fg.muted">
                      by {post.authorName}
                    </Text>
                    <Text fontSize="sm" color="fg.subtle">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Text>
                  </Flex.H>
                </Box>
                <Badge
                  colorPalette={post.status === 'published' ? 'green' : 'yellow'}
                  variant="subtle"
                >
                  {post.status}
                </Badge>
              </Flex>
            </Card>
          </Link>
        ))}

        {posts.length === 0 && (
          <Card padding="8">
            <Flex.V align="center" gap="2">
              <LuSearch size={32} />
              <Text color="fg.muted">No posts found matching your criteria.</Text>
            </Flex.V>
          </Card>
        )}
      </Flex.V>
    </Flex.V>
  );
}
