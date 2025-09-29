import Link from 'next/link';
type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
  minimal?: boolean;
};

export function GeneralError({ minimal = false }: GeneralErrorProps) {
  return (
    <div className={'h-svh w-full'}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        {!minimal && (
          <h1 className="text-[7rem] leading-tight font-bold">500</h1>
        )}
        <span className="font-medium">Oops! Something went wrong {`:')`}</span>
        <p className="text-muted-foreground text-center">
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (
          <div className="mt-6 flex gap-4">
            <button onClick={() => window.history.back()}>Go Back</button>
            <Link href="/">Back to Home</Link>
          </div>
        )}
      </div>
    </div>
  );
}
