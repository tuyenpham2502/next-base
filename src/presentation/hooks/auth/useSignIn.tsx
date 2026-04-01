import { useRepository } from '@/di/RepositoriesProvider';
import { type LoginRequest } from '@/domain/models/Auth';
import CookieStorageService from '@/infrastructure/services/CookieStorageService';
import { handleAccessToken } from '@/shared/helpers';
import { useRouter } from 'next/navigation';

export const useSignIn = (callbackUrl = '/app') => {
  const router = useRouter();
  const storageService = new CookieStorageService();
  const { authRepository } = useRepository();
  const { mutate: login, ...rest } = authRepository.login();

  const completeSignIn = (data: unknown) => {
    handleAccessToken(data, storageService);
    router.push(callbackUrl);
  };

  return {
    login: (credentials: LoginRequest) => {
      login(credentials, {
        onSuccess: data => {
          completeSignIn(data);
        },
      });
    },
    ...rest,
  };
};
