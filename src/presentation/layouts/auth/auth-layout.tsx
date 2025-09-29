type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="text-xl font-medium">Shadcn Admin</h1>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
