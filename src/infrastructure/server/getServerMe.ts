import { type ResponseCommon } from '@/application/dto/response/ResponseCommon';
import { type User } from '@/domain/models/Auth';
import { env } from '@/env';
import { Constants } from '@/shared/constants';
import { Endpoints } from '@/shared/endpoints';
import { cookies } from 'next/headers';

const normalizeStoredValue = (value: string | undefined) => {
  if (!value) return null;

  try {
    return JSON.parse(value) as string;
  } catch {
    return value;
  }
};

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const token = normalizeStoredValue(
    cookieStore.get(Constants.API_TOKEN_STORAGE)?.value
  );

  if (!token) {
    throw new Error('Missing auth token');
  }

  const response = await fetch(
    `${env.NEXT_PUBLIC_APP_API_URL}/${Endpoints.Auth.ME}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load profile on server');
  }

  return (await response.json()) as ResponseCommon<User>;
};
