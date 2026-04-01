import type { BrowserStorageService } from '@/application/services/BrowserStorageService';
import type { LoginResponse } from '@/domain/models/Auth';
import CookieStorageService from '@/infrastructure/services/CookieStorageService';
import type { QueryClient } from '@tanstack/react-query';
import { Constants } from './constants';

export const getListPermissionToken = () => {
  const storageService = new CookieStorageService();
  const storage = storageService.readStorage(Constants.API_PERMISSION_STORAGE);
  if (!Array.isArray(storage)) {
    return [];
  }

  return storage;
};

export const extractAuthPayload = (data: unknown): LoginResponse | null => {
  if (typeof data !== 'object' || data === null) return null;

  if ('data' in data && (data as { data?: LoginResponse }).data?.token) {
    return (data as { data: LoginResponse }).data;
  }

  if ('token' in data && (data as LoginResponse).token) {
    return data as LoginResponse;
  }

  return null;
};

export const handleAccessToken = (
  data: any,
  storageService: BrowserStorageService
) => {
  const authPayload = extractAuthPayload(data);
  if (!authPayload) return;

  storageService.setStorage(Constants.API_TOKEN_STORAGE, authPayload.token);
  storageService.setStorage(
    Constants.API_REFRESH_TOKEN_STORAGE,
    authPayload.refreshToken
  );
  if (authPayload.user) {
    storageService.setStorage(Constants.API_PERMISSION_STORAGE, [
      authPayload.user.id,
    ]);
    storageService.setStorage(Constants.API_USER_STORAGE, authPayload.user);
  }
};

export const handleLogout = (
  storageService: BrowserStorageService,
  queryClient: QueryClient
) => {
  // clear cache react query
  queryClient.clear();
  queryClient.invalidateQueries();
  storageService.removeStorage(Constants.API_TOKEN_STORAGE);
  storageService.removeStorage(Constants.API_REFRESH_TOKEN_STORAGE);
};

export const convertListForInputSelect = (
  list: Array<any>,
  key: string,
  label: string
) => {
  const result: Array<any> = [];
  if (!list) return result;
  (list || []).map(it => {
    result.push({
      ...it,
      label: it[label],
      value: it[key],
    });
  });
  return result;
};

export const isAuthenticated = () => {
  const storageService = new CookieStorageService();
  const storage = storageService.readStorage(Constants.API_TOKEN_STORAGE);
  return !!storage;
};
