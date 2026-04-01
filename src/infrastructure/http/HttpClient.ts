import NetworkException from '@/application/exceptions/NetworkException';
import type { RefreshTokenResponse } from '@/domain/models/Auth';
// import { RefreshTokenResponse } from '@/domain/models/Auth';
import CookieStorageService from '@/infrastructure/services/CookieStorageService';
import LoggerService from '@/infrastructure/services/LoggerServiceImpl';
import { Constants } from '@/shared/constants';
import { Endpoints } from '@/shared/endpoints';
import {
  extractAuthPayload,
  handleAccessToken,
  handleLogout,
} from '@/shared/helpers';
import { QueryClient } from '@tanstack/react-query';
import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { env } from '@/env';

interface FormattedError {
  error: {
    message: string;
    status?: number;
    timestamp: string;
    path?: string;
  };
}

class HttpClient {
  private instance: AxiosInstance;
  private isRefreshing: boolean = false;
  private refreshQueue: Array<(token: string) => void> = [];
  private abortController: AbortController | null = null;
  private readonly loggerService: LoggerService = new LoggerService();
  private readonly storageService: CookieStorageService =
    new CookieStorageService();
  private readonly TIMEOUT: number;
  private readonly queryClient: QueryClient = new QueryClient();
  constructor(timeout: number = Number(env.NEXT_PUBLIC_APP_TIMEOUT)) {
    this.TIMEOUT = timeout;

    this.instance = axios.create({
      baseURL: env.NEXT_PUBLIC_APP_API_URL,
      timeout: this.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'x-custom-lang': 'en',
      },
    });

    this.addInterceptors();
    this.abortController = new AbortController();
  }

  private addInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => this.handleRequest(config),
      (error: AxiosError) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => this.handleResponse(response),
      (error: AxiosError) => this.handleResponseError(error)
    );
  }

  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const token = this.storageService.readStorage(Constants.API_TOKEN_STORAGE);
    const refreshToken = this.storageService.readStorage(
      Constants.API_REFRESH_TOKEN_STORAGE
    );
    if (token && config.url !== Endpoints.Auth.REFRESH_TOKEN) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (refreshToken && config.url === Endpoints.Auth.REFRESH_TOKEN) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }

    return config;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    this.loggerService.info(
      `✅ [API] ${response.config.method?.toUpperCase()} ${response.config.url} | Success`
    );
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
    };
  }

  private async handleResponseError(
    error: AxiosError,
    _: number = 0
  ): Promise<any> {
    if (!error.response) {
      this.loggerService.error('Network Error:', error.message);
      throw new NetworkException('Network error occurred');
    }
    const { status } = error.response;
    if (status === 401) return this.handle401Error(error);
    // if ([500, 502, 503, 504, 429].includes(status) && retryCount < this.MAX_RETRIES) {
    //   return this.retryRequest(config!, retryCount);
    // }
    // return this.handle401Error(error);
    throw this.formatError(error.response.data as AxiosError);
  }

  private async handle401Error(error: AxiosError): Promise<any> {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // if request is refresh token, do not retry
    if (originalRequest.url === Endpoints.Auth.REFRESH_TOKEN) {
      this.loggerService.error('Refresh token request failed:', error.message);
      return this.handleLogout();
    }

    if (this.isRefreshing) {
      return new Promise(resolve => {
        this.refreshQueue.push(newToken => {
          originalRequest.headers!.Authorization = `Bearer ${newToken}`;
          resolve(this.instance(originalRequest));
        });
      }).catch(err => {
        return Promise.reject(err);
      });
    }

    this.isRefreshing = true;
    const refreshToken = this.storageService.readStorage(
      Constants.API_REFRESH_TOKEN_STORAGE
    ) as string | null;
    if (!refreshToken) return this.handleLogout();
    try {
      const { data } = await this.instance.post<RefreshTokenResponse>(
        Endpoints.Auth.REFRESH_TOKEN,
        {}
      );
      const accessToken = extractAuthPayload(data)?.token;
      if (!accessToken) {
        return this.handleLogout();
      }
      handleAccessToken(data, this.storageService);

      this.refreshQueue.forEach(callback => callback(accessToken));
      this.refreshQueue = [];
      originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
      return this.instance(originalRequest);
    } catch {
      return this.handleLogout();
    } finally {
      this.isRefreshing = false;
    }
  }

  private handleLogout(): void {
    handleLogout(this.storageService, this.queryClient);
    window.location.assign('/auth/sign-in');
  }

  private formatError(error: any): FormattedError {
    return {
      error: {
        message:
          Object.values(error.errors || {}).join(', ') ||
          error.error?.message ||
          'An error occurred',
        status: error.status,
        timestamp: new Date().toISOString(),
      },
    };
  }

  public createAbortSignal(): AbortSignal {
    this.abortController = new AbortController();
    return this.abortController?.signal;
  }

  public cancelRequests(): void {
    if (!this.abortController) {
      this.loggerService.warn(
        'AbortController is not initialized. Initializing now.'
      );
      this.abortController = new AbortController(); // Initialize if undefined
    }
    this.abortController.abort();
    this.abortController = new AbortController(); // Reinitialize after aborting
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

export default new HttpClient();
