import { useRepository } from '@/di/RepositoriesProvider';
import { type ForgotPasswordRequest } from '@/domain/models/Auth';
import { useRouter } from 'next/navigation';
export const useForgotPassword = () => {
  const { authRepository } = useRepository();
  const router = useRouter();
  const { mutate: forgotPasswordMutate, ...rest } =
    authRepository.forgotPassword();

  return {
    forgotPassword: (request: ForgotPasswordRequest) => {
      forgotPasswordMutate(request, {
        onSuccess: () => {
          router.push('/');
        },
        onError: (_error: any) => {},
      });
    },
    ...rest,
  };
};
