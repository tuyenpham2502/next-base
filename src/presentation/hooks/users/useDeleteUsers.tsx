import { type ResponseCommon } from '@/application/dto/response/ResponseCommon';
import { useRepository } from '@/di/RepositoriesProvider';
import { type DeleteCommonParams } from '@/domain/models/common/CommonParams';

export const useDeleteUsers = () => {
  const { usersRepository } = useRepository();
  return {
    remove: (params: DeleteCommonParams, onSuccess?: () => void) => {
      const { mutate } = usersRepository.delete(params);
      mutate(undefined as any, {
        onSuccess: (_data: ResponseCommon<boolean>) => {
          onSuccess?.();
        },
        onError: (_error: any) => {},
      });
    },
  };
};
