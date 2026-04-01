'use client';

import LogoutButton from '@/presentation/features/auth/logout-button';
import ZustandDemoCard from '@/presentation/features/app/zustand-demo-card';
import { useMe } from '@/presentation/hooks/auth/useMe';

export default function AppDashboard() {
  const { result: profile, isLoading, isError, error } = useMe();
  const displayName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') ||
    profile?.email ||
    'User';

  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <h1 className="text-xl font-semibold">Unable to load your app state</h1>
        <p className="mt-3 text-sm leading-6">
          {error?.message || 'The profile request did not succeed.'}
        </p>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-700">
              Private App
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Welcome back, {displayName}.
            </h1>
            <p className="text-base leading-7 text-slate-600">
              This page is rendered after login and now holds the post-auth
              logic: loading the profile from the mock API and exposing a clean
              logout action.
            </p>
          </div>

          <LogoutButton />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <h2 className="text-lg font-semibold text-slate-950">Email</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {profile?.email || 'No email available'}
          </p>
        </article>
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <h2 className="text-lg font-semibold text-slate-950">Name</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{displayName}</p>
        </article>
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <h2 className="text-lg font-semibold text-slate-950">Provider</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {profile?.provider || 'email'}
          </p>
        </article>
        <ZustandDemoCard />
      </section>
    </div>
  );
}
