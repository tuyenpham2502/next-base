import { useRepository } from '@/di/RepositoriesProvider';
import CookieStorageService from '@/infrastructure/services/CookieStorageService';
import { handleLogout } from '@/shared/helpers';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();
  const storageService = new CookieStorageService();
  const queryClient = new QueryClient();
  const { authRepository } = useRepository();
  const { mutate: logout, ...rest } = authRepository.logout();

  return {
    logout: () => {
      logout(
        {},
        {
          onSettled: () => {
            handleLogout(storageService, queryClient);
            router.replace('/auth/sign-in');
          },
        }
      );
    },
    ...rest,
  };
};
