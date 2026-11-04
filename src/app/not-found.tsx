import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Hapcraft Media" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: "0 20px",
        textAlign: "center",
        color: "#f9f6e7",
      }}
    >
      <Logo className="nav-logo" />
      <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700 }}>This page doesn&apos;t exist.</h1>
      <Link className="contact-btn" href="/">
        Back to Home
      </Link>
    </main>
  );
}
