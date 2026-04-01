import {
  createMockMeResponse,
  isMockTokenExpired,
  parseMockTokenPayload,
  readBearerToken,
} from '@/infrastructure/mocks/mockAuth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const token = readBearerToken(request.headers.get('authorization'));

  if (!token || isMockTokenExpired(token)) {
    return NextResponse.json(
      {
        error: {
          message: 'Unauthorized',
        },
        status: 401,
      },
      { status: 401 }
    );
  }

  const payload = parseMockTokenPayload(token);

  return NextResponse.json(createMockMeResponse(payload?.email || ''), {
    status: 200,
  });
}
