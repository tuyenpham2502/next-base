'use client';

import { useEffect } from 'react';
import { useAppActions } from '@/presentation/hooks/app/useAppActions';
import { useAppThemeMode } from '@/presentation/hooks/app/useAppThemeMode';
import { useDashboardVisits } from '@/presentation/hooks/app/useDashboardVisits';

export default function ZustandDemoCard() {
  const themeMode = useAppThemeMode();
  const dashboardVisits = useDashboardVisits();
  const { toggleThemeMode, incrementDashboardVisits, resetDashboardVisits } =
    useAppActions();

  useEffect(() => {
    incrementDashboardVisits();
  }, [incrementDashboardVisits]);

  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Zustand</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A shared client store is now available with persistence enabled.
          </p>
        </div>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Ready
        </span>
      </div>

      <dl className="mt-6 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between gap-4">
          <dt>Theme mode</dt>
          <dd className="font-medium capitalize text-slate-950">{themeMode}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>Dashboard visits</dt>
          <dd className="font-medium text-slate-950">{dashboardVisits}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          onClick={toggleThemeMode}
          type="button"
        >
          Toggle theme
        </button>
        <button
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
          onClick={resetDashboardVisits}
          type="button"
        >
          Reset visits
        </button>
      </div>
    </article>
  );
}
