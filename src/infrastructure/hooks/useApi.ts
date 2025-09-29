import { buildUrl } from '@/shared/url';
import {
  type MutationFunctionContext,
  type MutationOptions,
  type UseQueryOptions,
  useMutation,
  useQueries,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosRequestConfig } from 'axios';
import useAxios from './useAxios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface ApiConfig<TResponse, TRequest> {
  showErrorToast?: boolean;
  successMessage?: string;
  silentError?: boolean;
  onError?: (error: ApiError, variables?: TRequest, context?: unknown) => void;
  onSuccess?: (data: TResponse, variables: TRequest, context: unknown) => void;
}

const handleApiError = <TRequest>(
  error: ApiError,
  onError?: (error: ApiError, variables?: TRequest, context?: unknown) => void,
  _silentError?: boolean,
  variables?: TRequest | undefined,
  context?: unknown
) => {
  if (onError) onError(error, variables, context);
};

export const useGetApi = <TResponse>({
  endpoint,
  urlParams = {},
  queryParams = {},
  options = {},
}: {
  endpoint: string;
  urlParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: Omit<UseQueryOptions<TResponse, ApiError>, 'queryKey' | 'queryFn'>;
}) => {
  const { axiosInstance, newAbortSignal } = useAxios();

  return useQuery<TResponse, ApiError>({
    queryKey: [endpoint, urlParams, queryParams],
    queryFn: async () => {
      const response = await axiosInstance.get<TResponse>(
        buildUrl(endpoint, urlParams, queryParams),
        { signal: newAbortSignal() }
      );
      return response.data;
    },
    ...options,
  });
};

export const useQueriesApi = <TResponse>({
  requests,
}: {
  requests: Array<{
    endpoint: string;
    urlParams?: Record<string, string | number>;
    queryParams?: Record<string, string | number | boolean | undefined>;
    options?: Omit<
      UseQueryOptions<TResponse, ApiError>,
      'queryKey' | 'queryFn'
    >;
  }>;
}) => {
  const { axiosInstance, newAbortSignal } = useAxios();

  return useQueries({
    queries: requests.map(
      ({ endpoint, urlParams = {}, queryParams = {}, options = {} }) => ({
        queryKey: [endpoint, urlParams, queryParams],
        queryFn: async () => {
          const response = await axiosInstance.get<TResponse>(
            buildUrl(endpoint, urlParams, queryParams),
            { signal: newAbortSignal() }
          );
          return response.data;
        },
        ...options,
      })
    ),
  });
};

const useMutationApi = <TRequest = void, TResponse = unknown>(
  method: 'post' | 'put' | 'delete' | 'patch' | 'patch',
  {
    endpoint,
    urlParams = {},
    queryParams = {},
    options = {},
  }: {
    endpoint: string;
    urlParams?: Record<string, string | number>;
    queryParams?: Record<string, string | number | boolean | undefined>;
    options?: MutationOptions<
      TResponse,
      ApiError,
      TRequest,
      ApiConfig<TResponse, TRequest>
    >;
  }
) => {
  const { axiosInstance, newAbortSignal } = useAxios();
  return useMutation<
    TResponse,
    ApiError,
    TRequest,
    ApiConfig<TResponse, TRequest>
  >({
    mutationFn: async (payload: TRequest): Promise<TResponse> => {
      const config: AxiosRequestConfig = {
        signal: newAbortSignal(),
        headers: options?.meta?.headers as Record<string, string>,
      };

      const response = await axiosInstance[method]<TResponse>(
        buildUrl(endpoint, urlParams, queryParams),
        method !== 'delete' ? payload : undefined,
        config
      );
      return response.data;
    },
    ...options,
    retry: false,
    onError: (
      error: ApiError,
      variables: TRequest,
      context: ApiConfig<TResponse, TRequest> | undefined
    ) => {
      const config = context || {};
      handleApiError(
        error,
        options.onError as
          | ((error: ApiError, variables?: TRequest, context?: unknown) => void)
          | undefined,
        config.silentError,
        variables,
        context
      );
    },
    onSuccess: (
      data: TResponse,
      variables: TRequest,
      onMutateResult: ApiConfig<TResponse, TRequest>,
      context: MutationFunctionContext
    ) => {
      if (options.onSuccess) {
        options.onSuccess(
          data,
          variables,
          onMutateResult,
          context || ({} as ApiConfig<TResponse, TRequest>)
        );
      }
    },
  });
};
export const usePostApi = <TRequest = void, TResponse = unknown>(props: {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: MutationOptions<
    TResponse,
    ApiError,
    TRequest,
    ApiConfig<TResponse, TRequest>
  >;
}) => useMutationApi<TRequest, TResponse>('post', props);

export const usePutApi = <TRequest = void, TResponse = unknown>(props: {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: MutationOptions<
    TResponse,
    ApiError,
    TRequest,
    ApiConfig<TResponse, TRequest>
  >;
}) => useMutationApi<TRequest, TResponse>('put', props);

export const usePatchApi = <TRequest = void, TResponse = unknown>(props: {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: MutationOptions<
    TResponse,
    ApiError,
    TRequest,
    ApiConfig<TResponse, TRequest>
  >;
}) => useMutationApi<TRequest, TResponse>('patch', props);

export const useDeleteApi = <TRequest = void, TResponse = unknown>(props: {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: MutationOptions<
    TResponse,
    ApiError,
    TRequest,
    ApiConfig<TResponse, TRequest>
  >;
}) => useMutationApi<TRequest, TResponse>('delete', props);

export const usePostFormApi = <TResponse = unknown>(props: {
  endpoint: string;
  urlParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean | undefined>;
  options?: MutationOptions<
    TResponse,
    ApiError,
    FormData,
    ApiConfig<TResponse, FormData>
  >;
}) => {
  const defaultHeaders = {
    'Content-Type': 'multipart/form-data',
  };
  return useMutationApi<FormData, TResponse>('post', {
    ...props,
    options: {
      ...props.options,
      meta: {
        ...props.options?.meta,
        headers: {
          ...defaultHeaders,
          ...(props.options?.meta?.headers || {}),
        },
      },
    },
  });
};
