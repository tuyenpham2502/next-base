import { useRepository } from '@/di/RepositoriesProvider';
import { type ChangePasswordRequest } from '@/domain/models/Auth';
import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { Constants } from '@/shared/constants';
import { useRouter } from 'next/navigation';

export const useChangePassword = () => {
  const localStorageService = new LocalStorageServiceImpl();
  const router = useRouter();
  const { authRepository } = useRepository();
  const { mutate: changePassword, ...rest } = authRepository.changePassword();

  return {
    changePassword: (requestData: ChangePasswordRequest) => {
      changePassword(requestData, {
        onSuccess: (_data: any) => {
          localStorageService.removeStorage(Constants.API_TOKEN_STORAGE);
          router.push('/'); // Redirect sau khi login
        },
        onError: (_error: any) => {},
      });
    },
    ...rest,
  };
};
