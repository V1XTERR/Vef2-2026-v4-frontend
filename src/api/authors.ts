import type { Author, PaginatedResponse } from '../types/api';
import { fetchJson } from './fetcher';

export async function getAuthors() {
  return fetchJson<PaginatedResponse<Author>>('/authors?limit=100&offset=0&order=asc');
}