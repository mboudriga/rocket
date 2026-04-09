export interface Post {
  id: string;
  title: string;
  body: string;
  status: 'draft' | 'published';
  createdAt: string;
  authorName: string;
}

export interface CreatePostInput {
  title: string;
  body: string;
  status: 'draft' | 'published';
}

export interface PostFilters {
  search?: string;
  status?: 'all' | 'draft' | 'published';
  page?: number;
}
