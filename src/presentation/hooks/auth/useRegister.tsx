import { useRepository } from '@/di/RepositoriesProvider';
import { type RegisterRequest } from '@/domain/models/Auth';
import { useRouter } from 'next/navigation';
export const useRegister = () => {
  const router = useRouter();
  const { authRepository } = useRepository();
  const { mutate: register, ...rest } = authRepository.register();

  return {
    register: (credentials: RegisterRequest) => {
      register(credentials, {
        onSuccess: () => {
          router.push('/');
        },
        onError: (_error: any) => {},
      });
    },
    ...rest,
  };
};
