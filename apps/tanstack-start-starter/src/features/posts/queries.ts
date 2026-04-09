import { queryOptions } from '@tanstack/react-query';

import { getPost, getPosts } from './posts.api';
import type { PostFilters } from './types';

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

export const postQueries = {
  list: (filters: PostFilters = {}) =>
    queryOptions({
      queryKey: postKeys.list(filters),
      queryFn: () => getPosts({ data: filters }),
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: postKeys.detail(id),
      queryFn: () => getPost({ data: id }),
    }),
};
