import Link from 'next/link';

export function ForbiddenError() {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">403</h1>
        <span className="font-medium">Access Forbidden</span>
        <p className="text-muted-foreground text-center">
          You don't have necessary permission <br />
          to view this resource.
        </p>
        <div className="mt-6 flex gap-4">
          <button onClick={() => window.history.back()}>Go Back</button>
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
