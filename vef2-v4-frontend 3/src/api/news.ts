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

type NewsListResponse = PaginatedResponse<News> | News[];

type NewsItemResponse = News | { data: News };

function hasPaginatedNews(value: unknown): value is PaginatedResponse<News> {
  return typeof value === 'object' && value !== null && Array.isArray((value as PaginatedResponse<News>).data);
}

function hasWrappedNews(value: unknown): value is { data: News } {
  return typeof value === 'object' && value !== null && 'data' in value && !Array.isArray((value as { data: News }).data);
}

export async function getNews(query: NewsQuery) {
  const searchParams = new URLSearchParams({
    limit: String(query.limit),
    offset: String(query.offset),
    order: 'desc',
  });

  const response = await fetchJson<NewsListResponse>(`/news?${searchParams.toString()}`);

  return hasPaginatedNews(response)
    ? response
    : {
        data: response,
        pagination: {
          total: response.length,
          limit: query.limit,
          offset: query.offset,
          count: response.length,
        },
      };
}

export async function getNewsBySlug(slug: string) {
  const response = await fetchJson<NewsItemResponse>(`/news/${slug}`);
  return hasWrappedNews(response) ? response.data : response;
}

export async function createNews(input: CreateNewsInput) {
  const response = await fetchJson<NewsItemResponse>('/news', {
    method: 'POST',
    body: JSON.stringify(input),
  });

  return hasWrappedNews(response) ? response.data : response;
}
