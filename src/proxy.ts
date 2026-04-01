import { Constants } from '@/shared/constants';
import { NextResponse, type NextRequest } from 'next/server';

const AUTH_PATH_PREFIX = '/auth';
const SIGN_IN_PATH = '/auth/sign-in';

const normalizeStoredValue = (value: string | undefined) => {
  if (!value) return null;

  try {
    return JSON.parse(value) as string;
  } catch {
    return value;
  }
};

const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    '='
  );

  return atob(padded);
};

const isTokenExpired = (token: string | null) => {
  if (!token) return true;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1])) as { exp?: number };

    if (!payload.exp) return false;

    return payload.exp <= Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname, search } = nextUrl;
  const rawToken = request.cookies.get(Constants.API_TOKEN_STORAGE)?.value;
  const token = normalizeStoredValue(rawToken);
  const isAuthenticated = Boolean(token) && !isTokenExpired(token);
  const isAuthRoute = pathname.startsWith(AUTH_PATH_PREFIX);

  if (!isAuthenticated && !isAuthRoute) {
    const signInUrl = new URL(SIGN_IN_PATH, request.url);
    signInUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && pathname === SIGN_IN_PATH) {
    const redirectTo = nextUrl.searchParams.get('callbackUrl') || '/app';
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
