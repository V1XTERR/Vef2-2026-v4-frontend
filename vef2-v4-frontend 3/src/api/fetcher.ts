import { API_URL } from '../utils/constants';
import type { ApiError } from '../types/api';

export class HttpError extends Error {
  status: number;
  details?: ApiError;

  constructor(message: string, status: number, details?: ApiError) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

export async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  let data: T | ApiError | null = null;

  try {
    data = (await response.json()) as T | ApiError;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const errorData = data as ApiError | null;
    const message =
      errorData?.message ??
      errorData?.errors?.map((error) => `${error.path}: ${error.message}`).join(', ') ??
      'Villa kom upp við að sækja gögn.';

    throw new HttpError(message, response.status, errorData ?? undefined);
  }

  return data as T;
}
