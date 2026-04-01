import { createMockLoginResponse } from '@/infrastructure/mocks/mockAuth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json(createMockLoginResponse(body), { status: 200 });
}
