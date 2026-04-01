import AppDashboard from '@/presentation/features/app/app-dashboard';
import { getServerMe } from '@/infrastructure/server/getServerMe';
import { queryKeys } from '@/shared/queryKeys';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default async function AppPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: getServerMe,
    staleTime: 60_000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_35%,#e2e8f0_100%)] px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <AppDashboard />
        </div>
      </main>
    </HydrationBoundary>
  );
}
