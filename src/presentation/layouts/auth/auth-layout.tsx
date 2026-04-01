type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#e0f2fe_0%,#f8fafc_35%,#fff7ed_100%)] px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
              Next Base
            </p>
            <div className="space-y-4">
              <h1 className="max-w-md text-5xl font-semibold leading-tight">
                Clean architecture for fast product delivery.
              </h1>
              <p className="max-w-lg text-base leading-7 text-slate-300">
                Auth, repositories, React Query and infrastructure concerns are
                separated clearly so teams can ship features without tangling
                business logic into UI code.
              </p>
            </div>
          </div>

          <div className="grid gap-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Repository contracts stay in the application layer.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              API calls and token refresh stay in infrastructure.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
