import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium text-gray-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Page not found</h1>
      <p className="mt-3 text-sm text-gray-600">The page you requested does not exist.</p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
