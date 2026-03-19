import type { Author, PaginatedResponse } from '../types/api';
import { fetchJson } from './fetcher';

type AuthorsResponse = PaginatedResponse<Author> | Author[];

function hasDataArray(value: unknown): value is PaginatedResponse<Author> {
  return typeof value === 'object' && value !== null && Array.isArray((value as PaginatedResponse<Author>).data);
}

export async function getAuthors() {
  const response = await fetchJson<AuthorsResponse>('/authors?limit=100&offset=0&order=asc');

  return hasDataArray(response)
    ? response
    : {
        data: response,
        pagination: {
          total: response.length,
          limit: response.length,
          offset: 0,
          count: response.length,
        },
      };
}
