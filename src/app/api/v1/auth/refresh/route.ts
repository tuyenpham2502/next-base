import {
  createMockRefreshResponse,
  isMockTokenExpired,
  parseMockTokenPayload,
  readBearerToken,
} from '@/infrastructure/mocks/mockAuth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const token = readBearerToken(request.headers.get('authorization'));

  if (!token || isMockTokenExpired(token)) {
    return NextResponse.json(
      {
        error: {
          message: 'Refresh token expired',
        },
        status: 401,
      },
      { status: 401 }
    );
  }

  const payload = parseMockTokenPayload(token);

  return NextResponse.json(
    createMockRefreshResponse(payload?.email || 'demo@example.com'),
    { status: 200 }
  );
}
