'use client';

import { useAppStore } from '@/presentation/stores/app-store';

export const useAppActions = () => ({
  setThemeMode: useAppStore(state => state.setThemeMode),
  toggleThemeMode: useAppStore(state => state.toggleThemeMode),
  incrementDashboardVisits: useAppStore(
    state => state.incrementDashboardVisits
  ),
  resetDashboardVisits: useAppStore(state => state.resetDashboardVisits),
});
