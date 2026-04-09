import { toast } from '@rocket/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from './posts.api';
import { postKeys } from './queries';
import type { CreatePostInput } from './types';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost({ data: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      toast.success('Post created');
    },
    onError: (error) => toast.error(error.message),
  });
}
