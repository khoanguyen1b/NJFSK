import Link from "next/link";

export default function Custom404Page() {
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
        <p style={{ color: "#6b7280", fontWeight: 600 }}>404</p>
        <h1 style={{ marginTop: 8, fontSize: 28, color: "#111827" }}>Page not found</h1>
        <p style={{ marginTop: 12, color: "#4b5563" }}>
          The page you requested does not exist or has been moved.
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
