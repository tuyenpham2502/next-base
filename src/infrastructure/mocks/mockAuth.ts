import { type ResponseCommon } from '@/application/dto/response/ResponseCommon';
import {
  type LoginRequest,
  type LoginResponse,
  type RefreshTokenResponse,
  type User,
} from '@/domain/models/Auth';

type TokenKind = 'access' | 'refresh';

type TokenPayload = {
  sub: string;
  email: string;
  type: TokenKind;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  jti: string;
};

const ACCESS_TOKEN_LIFETIME_SECONDS = 60 * 60;
const REFRESH_TOKEN_LIFETIME_SECONDS = 60 * 60 * 24 * 30;

const toBase64Url = (value: string) =>
  Buffer.from(value, 'utf8').toString('base64url');

const createFakeJwt = ({
  email,
  expiresInSeconds,
  tokenType,
  userId,
}: {
  email: string;
  expiresInSeconds: number;
  tokenType: TokenKind;
  userId: number;
}) => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const payload: TokenPayload = {
    sub: String(userId),
    email,
    type: tokenType,
    iss: 'next-base.local',
    aud: 'next-base-app',
    iat: nowInSeconds,
    exp: nowInSeconds + expiresInSeconds,
    jti: crypto.randomUUID(),
  };
  const signature = toBase64Url(
    `${tokenType}-signature-${userId}-${nowInSeconds}`
  );

  return [
    toBase64Url(JSON.stringify(header)),
    toBase64Url(JSON.stringify(payload)),
    signature,
  ].join('.');
};

const createMockUser = (email: string): User => ({
  id: 1,
  email,
  socialId: '',
  firstName: 'Demo',
  lastName: 'User',
  provider: 'email',
});

const createAuthResponse = (email: string): LoginResponse => {
  const user = createMockUser(email);

  return {
    userId: user.id,
    token: createFakeJwt({
      email,
      expiresInSeconds: ACCESS_TOKEN_LIFETIME_SECONDS,
      tokenType: 'access',
      userId: user.id,
    }),
    refreshToken: createFakeJwt({
      email,
      expiresInSeconds: REFRESH_TOKEN_LIFETIME_SECONDS,
      tokenType: 'refresh',
      userId: user.id,
    }),
    isPasswordChangeRequired: false,
    tokenExpires: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_LIFETIME_SECONDS,
    user,
  };
};

export const createMockLoginResponse = (
  credentials: LoginRequest
): ResponseCommon<LoginResponse> => ({
  success: true,
  message: 'Mock sign in succeeded.',
  statusCode: 200,
  data: createAuthResponse(credentials.email),
});

export const createMockRefreshResponse = (
  email: string
): ResponseCommon<RefreshTokenResponse> => ({
  success: true,
  message: 'Mock refresh succeeded.',
  statusCode: 200,
  data: createAuthResponse(email),
});

export const createMockMeResponse = (email: string): ResponseCommon<User> => ({
  success: true,
  message: 'Mock profile loaded.',
  statusCode: 200,
  data: createMockUser(email),
});

export const createMockLogoutResponse = (): ResponseCommon<boolean> => ({
  success: true,
  message: 'Mock logout succeeded.',
  statusCode: 200,
  data: true,
});

export const readBearerToken = (authorizationHeader: string | null) => {
  if (!authorizationHeader?.startsWith('Bearer ')) return null;

  return authorizationHeader.slice('Bearer '.length);
};

export const parseMockTokenPayload = (token: string | null) => {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    return JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf8')
    ) as TokenPayload;
  } catch {
    return null;
  }
};

export const isMockTokenExpired = (token: string | null) => {
  const payload = parseMockTokenPayload(token);
  if (!payload?.exp) return true;

  return payload.exp <= Math.floor(Date.now() / 1000);
};
