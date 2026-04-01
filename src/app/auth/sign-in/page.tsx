import SignInForm from '@/presentation/features/auth/sign-in-form';
import { AuthLayout } from '@/presentation/layouts/auth/auth-layout';

type SignInPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = Array.isArray(resolvedSearchParams.callbackUrl)
    ? resolvedSearchParams.callbackUrl[0]
    : resolvedSearchParams.callbackUrl;

  return (
    <AuthLayout>
      <SignInForm callbackUrl={callbackUrl} />
    </AuthLayout>
  );
}
