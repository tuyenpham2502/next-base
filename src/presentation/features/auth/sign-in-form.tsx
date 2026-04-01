'use client';

import { useSignIn } from '@/presentation/hooks/auth/useSignIn';
import { useState } from 'react';

type SignInFormProps = {
  callbackUrl?: string;
};

export default function SignInForm({ callbackUrl }: SignInFormProps) {
  const { login, isPending, error } = useSignIn(callbackUrl);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const apiErrorMessage =
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response &&
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    'message' in error.response.data
      ? String(error.response.data.message)
      : null;

  const errorMessage =
    error?.message || apiErrorMessage || 'Unable to sign in.';

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center sm:text-left">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-700">
          Authentication
        </p>
        <h2 className="text-3xl font-semibold text-slate-950">Sign in</h2>
        <p className="text-sm leading-6 text-slate-600">
          Use your account to access the dashboard and protected APIs.
        </p>
      </div>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
        Mock auth API is running inside Next.js. You can sign in with any email
        and password while the backend is not ready.
      </div>

      <form
        className="space-y-4"
        onSubmit={event => {
          event.preventDefault();
          login(formData);
        }}
      >
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            autoComplete="email"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            onChange={event => {
              setFormData(current => ({
                ...current,
                email: event.target.value,
              }));
            }}
            placeholder="you@example.com"
            required
            type="email"
            value={formData.email}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            autoComplete="current-password"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            onChange={event => {
              setFormData(current => ({
                ...current,
                password: event.target.value,
              }));
            }}
            placeholder="Enter your password"
            required
            type="password"
            value={formData.password}
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        <button
          className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isPending}
          type="submit"
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
