import { Endpoints } from '@/shared/endpoints';

export const queryKeys = {
  auth: {
    me: () => [Endpoints.Auth.ME, {}, {}] as const,
  },
};
