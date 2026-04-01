import { useRepository } from '@/di/RepositoriesProvider';
import { type ChangePasswordRequest } from '@/domain/models/Auth';
import CookieStorageService from '@/infrastructure/services/CookieStorageService';
import { Constants } from '@/shared/constants';
import { useRouter } from 'next/navigation';

export const useChangePassword = () => {
  const storageService = new CookieStorageService();
  const router = useRouter();
  const { authRepository } = useRepository();
  const { mutate: changePassword, ...rest } = authRepository.changePassword();

  return {
    changePassword: (requestData: ChangePasswordRequest) => {
      changePassword(requestData, {
        onSuccess: (_data: any) => {
          storageService.removeStorage(Constants.API_TOKEN_STORAGE);
          router.push('/'); // Redirect sau khi login
        },
        onError: (_error: any) => {},
      });
    },
    ...rest,
  };
};
