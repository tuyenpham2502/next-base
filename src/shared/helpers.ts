import type { LocalStorageService } from '@/application/services/LocalStorageService';
import type { QueryClient } from '@tanstack/react-query';
import { Constants } from './constants';

export const getListPermissionToken = () => {
  let storage: any = localStorage.getItem(Constants.API_PERMISSION_STORAGE);
  if (!storage) return [];
  // Parse the JSON string into an array
  try {
    storage = JSON.parse(storage);
    // Ensure the parsed value is an array
    if (!Array.isArray(storage)) {
      // Return empty array if parsed value is not an array
      return [];
    }
  } catch (_error) {
    // Return empty array if parsing fails
    return [];
  }
  return storage;
};

export const handleAccessToken = (
  data: any,
  localStorageService: LocalStorageService
) => {
  localStorageService.setStorage(Constants.API_TOKEN_STORAGE, data.token);
  localStorageService.setStorage(
    Constants.API_REFRESH_TOKEN_STORAGE,
    data.refreshToken
  );
  if (data.user) {
    localStorageService.setStorage(Constants.API_PERMISSION_STORAGE, [
      data.user.role.id,
    ]);
  }
};

export const handleLogout = (
  localStorageService: LocalStorageService,
  queryClient: QueryClient
) => {
  // clear cache react query
  queryClient.clear();
  queryClient.invalidateQueries();
  localStorageService.removeStorage(Constants.API_TOKEN_STORAGE);
  localStorageService.removeStorage(Constants.API_REFRESH_TOKEN_STORAGE);
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
  const storage = localStorage.getItem(Constants.API_TOKEN_STORAGE);
  return !!storage;
};
