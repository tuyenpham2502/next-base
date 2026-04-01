import { useRepository } from '@/di/RepositoriesProvider';
import { type User } from '@/domain/models/Auth';
import { type ResponseCommon } from '@/application/dto/response/ResponseCommon';
import { type QueryOptions } from '@/shared/types/react-query';

export const useMe = (options?: QueryOptions<ResponseCommon<User>>) => {
  const { authRepository } = useRepository();
  const query = authRepository.me({
    staleTime: 60_000,
    ...options,
  });

  return {
    result: (query.data?.data as User | undefined) || null,
    ...query,
  };
};
