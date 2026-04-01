import { createMockLogoutResponse } from '@/infrastructure/mocks/mockAuth';
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(createMockLogoutResponse(), { status: 200 });
}
