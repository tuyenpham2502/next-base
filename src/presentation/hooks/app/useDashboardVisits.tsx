'use client';

import { useAppStore } from '@/presentation/stores/app-store';

export const useDashboardVisits = () =>
  useAppStore(state => state.dashboardVisits);
