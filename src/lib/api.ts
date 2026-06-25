import axios, { AxiosError } from 'axios';
import { env } from './env';

// Api success
export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiPaginated<T> {
  success: true;
  data: T;
  pagination: Pagination;
}

// Api error
export interface ApiErrorEnvelope {
  success: false;
  error: {
    message: string;
    code?: string;
    status?: number;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorEnvelope;

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiError extends Error {
  code?: string;
  status?: number;
  constructor(
    message: string,
    opts: {
      code?: string;
      status?: number;
    },
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = opts.code;
    this.status = opts.status;
  }
}

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorEnvelope>) => {
    const res = error.response?.data;

    if (res && res.success === false) {
      return Promise.reject(
        new ApiError(res.error.message, {
          code: res.error.code,
          status: res.error.status,
        }),
      );
    }

    return Promise.reject(
      new ApiError(error.message || 'Network Error', {
        status: error.response?.status,
      }),
    );
  },
);
