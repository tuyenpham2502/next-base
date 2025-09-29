import { useRepository } from '@/di/RepositoriesProvider';
import { type ResetPasswordRequest } from '@/domain/models/Auth';
import { useRouter } from 'next/navigation';
export const useResetPassword = () => {
  const { authRepository } = useRepository();
  const router = useRouter();
  const { mutate: resetPasswordMutate, ...rest } =
    authRepository.resetPassword();

  return {
    resetPassword: (credentials: ResetPasswordRequest) => {
      resetPasswordMutate(credentials, {
        onSuccess: _data => {
          router.push('/auth/login');
        },
        onError: (_error: any) => {},
      });
    },
    ...rest,
  };
};
