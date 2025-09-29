import { useRepository } from '@/di/RepositoriesProvider';
import { type QueryOptions } from '@tanstack/react-query';

export const useMe = (options?: QueryOptions) => {
  const { authRepository } = useRepository();
  const query = authRepository.me(options);

  return {
    result: ((query.data ?? {}) as any).result || {},
    ...query,
  };
};
