"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-medium text-red-600">Critical error</p>
          <h1 className="mt-2 text-2xl font-semibold">Application failed to render</h1>
          <p className="mt-3 text-sm text-gray-600">
            Please retry. If this repeats, inspect server and browser console logs.
          </p>
          <Button onClick={reset} className="mt-6">
            Reload app
          </Button>
        </main>
      </body>
    </html>
  );
}
