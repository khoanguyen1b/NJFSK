"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

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
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium text-red-600">Something went wrong</p>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Unexpected application error</h1>
      <p className="mt-3 text-sm text-gray-600">
        Try reloading this section. If the issue continues, check server logs.
      </p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </main>
  );
}
