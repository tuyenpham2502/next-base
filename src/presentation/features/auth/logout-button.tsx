'use client';

import { useLogout } from '@/presentation/hooks/auth/useLogout';

export default function LogoutButton() {
  const { logout, isPending } = useLogout();

  return (
    <button
      className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={isPending}
      onClick={() => {
        logout();
      }}
      type="button"
    >
      {isPending ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
