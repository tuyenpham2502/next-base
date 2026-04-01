'use client';

import { useAppStore } from '@/presentation/stores/app-store';

export const useAppThemeMode = () => useAppStore(state => state.themeMode);
