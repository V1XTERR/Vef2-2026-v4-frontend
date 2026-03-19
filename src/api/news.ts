import type { News, PaginatedResponse } from '../types/api';
import { fetchJson } from './fetcher';

type NewsQuery = {
  limit: number;
  offset: number;
};

type CreateNewsInput = {
  title: string;
  intro: string;
  content: string;
  authorId: number;
};

export async function getNews(query: NewsQuery) {
  const searchParams = new URLSearchParams({
    limit: String(query.limit),
    offset: String(query.offset),
    order: 'desc',
  });

  return fetchJson<PaginatedResponse<News>>(`/news?${searchParams.toString()}`);
}

export async function getNewsBySlug(slug: string) {
  return fetchJson<News>(`/news/${slug}`);
}

export async function createNews(input: CreateNewsInput) {
  return fetchJson<News>('/news', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
