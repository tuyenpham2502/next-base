import { useRepository } from '@/di/RepositoriesProvider';
import { type LoginRequest } from '@/domain/models/Auth';
import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { handleAccessToken } from '@/shared/helpers';
import { useRouter } from 'next/navigation';
export const useLogin = () => {
  const router = useRouter();
  const localStorageService = new LocalStorageServiceImpl();
  const { authRepository } = useRepository();
  const { mutate: login, ...rest } = authRepository.login();

  return {
    login: (credentials: LoginRequest) => {
      login(credentials, {
        onSuccess: data => {
          handleAccessToken(data, localStorageService);
          router.push('/');
        },
        onError: (_error: any) => {},
      });
    },
    ...rest,
  };
};
