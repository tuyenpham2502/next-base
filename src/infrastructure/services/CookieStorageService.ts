import type { BrowserStorageService } from '@/application/services/BrowserStorageService';

export default class CookieStorageService implements BrowserStorageService {
  private readonly DEFAULT_MAX_AGE = 60 * 60 * 24 * 7;

  private readCookie(key: string): string | null {
    if (typeof document === 'undefined') return null;

    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${escapedKey}=([^;]*)`)
    );

    return match ? decodeURIComponent(match[1]) : null;
  }

  private writeCookie(key: string, storage: string): void {
    if (typeof document === 'undefined') return;

    document.cookie = [
      `${key}=${encodeURIComponent(storage)}`,
      'path=/',
      `max-age=${this.DEFAULT_MAX_AGE}`,
      'SameSite=Lax',
    ].join('; ');
  }

  readStorage(key: string): any {
    if (typeof window !== 'undefined') {
      const storage = this.readCookie(key);
      if (storage && storage.length) {
        return JSON.parse(storage);
      }
    }

    return null;
  }

  setStorage(key: string, storage: any) {
    if (!storage) return;

    this.writeCookie(key, JSON.stringify(storage));
  }

  removeStorage(key: string) {
    if (typeof document === 'undefined') return;

    document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax`;
  }

  clearStorage() {
    if (typeof document === 'undefined') return;

    document.cookie
      .split(';')
      .map(cookie => cookie.trim().split('=')[0])
      .filter(Boolean)
      .forEach(cookieKey => {
        document.cookie = `${cookieKey}=; path=/; max-age=0; SameSite=Lax`;
      });
  }
}
