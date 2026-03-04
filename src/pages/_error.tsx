import type { NextPageContext } from "next";
import Link from "next/link";

type ErrorProps = {
  statusCode?: number;
};

function ErrorPage({ statusCode }: ErrorProps) {
  const code = statusCode ?? 500;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, Helvetica, sans-serif",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ color: "#dc2626", fontWeight: 600 }}>Error {code}</p>
        <h1 style={{ marginTop: 8, fontSize: 28, color: "#111827" }}>Something went wrong</h1>
        <p style={{ marginTop: 12, color: "#4b5563" }}>
          The app hit an unexpected issue. Please reload and try again.
        </p>
        <Link
          href="/dashboard"
          style={{
            marginTop: 24,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "10px 16px",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};

export default ErrorPage;
