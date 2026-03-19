export type Author = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type News = {
  id: number;
  title: string;
  slug: string;
  intro: string;
  content: string;
  published: boolean;
  authorId: number;
  author: Author;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  total: number;
  limit: number;
  offset: number;
  count: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};

export type ApiError = {
  message?: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
};
