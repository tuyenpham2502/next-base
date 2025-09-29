import { useRepository } from '@/di/RepositoriesProvider';
import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { handleLogout } from '@/shared/helpers';
import { QueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const localStorageService = new LocalStorageServiceImpl();
  const queryClient = new QueryClient();
  const { authRepository } = useRepository();
  const { mutate: logout, ...rest } = authRepository.logout();

  return {
    logout: () => {
      logout(
        {},
        {
          onSettled: () => {
            handleLogout(localStorageService, queryClient);
          },
        }
      );
    },
    ...rest,
  };
};
