import { createServerFn } from '@tanstack/react-start';

import type { CreatePostInput, Post, PostFilters } from './types';

const authors = ['Alice Johnson', 'Bob Smith', 'Carol White', 'Dan Brown', 'Eve Davis'];

const posts: Post[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  title: `${['Getting Started with', 'Advanced', 'Understanding', 'Building', 'Exploring'][i % 5]} ${['React', 'TypeScript', 'TanStack', 'Vite', 'SSR'][i % 5]}${i >= 5 ? ` Part ${Math.ceil((i + 1) / 5)}` : ''}`,
  body: `This is the full content of post ${i + 1}. It covers important topics about modern web development, including best practices, common patterns, and practical examples that help developers build better applications.`,
  status: i % 3 === 0 ? 'draft' : 'published',
  createdAt: new Date(2024, 0, 20 - i).toISOString(),
  authorName: authors[i % authors.length]!,
}));

export const getPosts = createServerFn({ method: 'GET' })
  .inputValidator((filters: PostFilters) => filters)
  .handler(async ({ data: filters }) => {
    let filtered = [...posts];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(query) || p.body.toLowerCase().includes(query)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    return filtered;
  });

export const getPost = createServerFn({ method: 'GET' })
  .inputValidator((postId: string) => postId)
  .handler(async ({ data: postId }) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error('Post not found');
    return post;
  });

export const createPost = createServerFn({ method: 'POST' })
  .inputValidator((input: CreatePostInput) => input)
  .handler(async ({ data: input }) => {
    const newPost: Post = {
      id: String(posts.length + 1),
      title: input.title,
      body: input.body,
      status: input.status,
      createdAt: new Date().toISOString(),
      authorName: 'You',
    };
    posts.unshift(newPost);
    return newPost;
  });
