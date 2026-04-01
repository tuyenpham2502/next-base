'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';

export interface AppStoreState {
  themeMode: ThemeMode;
  dashboardVisits: number;
}

interface AppStoreActions {
  setThemeMode: (themeMode: ThemeMode) => void;
  toggleThemeMode: () => void;
  incrementDashboardVisits: () => void;
  resetDashboardVisits: () => void;
}

export type AppStore = AppStoreState & AppStoreActions;

const initialState: AppStoreState = {
  themeMode: 'light',
  dashboardVisits: 0,
};

export const useAppStore = create<AppStore>()(
  persist(
    set => ({
      ...initialState,
      setThemeMode: themeMode => set({ themeMode }),
      toggleThemeMode: () =>
        set(state => ({
          themeMode: state.themeMode === 'light' ? 'dark' : 'light',
        })),
      incrementDashboardVisits: () =>
        set(state => ({
          dashboardVisits: state.dashboardVisits + 1,
        })),
      resetDashboardVisits: () => set({ dashboardVisits: 0 }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        themeMode: state.themeMode,
        dashboardVisits: state.dashboardVisits,
      }),
    }
  )
);
