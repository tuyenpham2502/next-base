import type { LocalStorageService } from '@/application/services/LocalStorageService';

export default class LocalStorageServiceImpl implements LocalStorageService {
  readStorage(key: string): any {
    if (typeof window != 'undefined') {
      const storage = localStorage.getItem(key);
      if (storage && storage.length) {
        return JSON.parse(storage);
      }
    }

    return null;
  }

  setStorage(key: string, storage: any) {
    if (storage) {
      localStorage.setItem(key, JSON.stringify(storage));
    }
  }

  removeStorage(key: string) {
    localStorage.removeItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }
}
