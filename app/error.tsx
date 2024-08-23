"use client";

import { Link } from "next-view-transitions";
import { useEffect } from "react";
import { BiError } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen p-4">
      <div className="h-full w-full rounded-2xl bg-dark-background-dark p-2">
        <div className="flex h-full animate-fadeIn flex-col items-center justify-center gap-2 rounded-xl bg-light-error-background p-8 text-light-error-color dark:bg-dark-error-background dark:text-dark-error-color">
          <BiError className="mb-3 text-4xl" />
          <h1 className="text-2xl font-medium text-light-error-color dark:text-dark-error-color">
            Error.
          </h1>
          <p className="text-md max-w-[500px] text-center italic text-light-error-color opacity-90 dark:text-dark-error-color">
            *intense crash sound*
          </p>

            <pre className="lg:text-md mx-2 mt-4 max-h-[500px] w-[80vw] overflow-auto rounded-2xl border-2 border-dashed border-light-error-color p-3 text-xs text-light-error-color opacity-90 md:text-sm dark:border-dark-error-color dark:text-dark-error-color">
              <code>Dspace is not available at the moment, try again some time.</code>
            </pre>

          <button
            onClick={reset}
            className="mt-8 rounded-full border-2 border-light-error-color px-5 py-1 text-light-error-color dark:border-dark-error-color dark:text-dark-error-color"
          >
            Try again?
          </button>
        </div>
      </div>
    </div>
  );
}