"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

/** "Get in touch" dialog. Rendered only while open, so it starts on the form every time. */
export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="ap-modal-backdrop" onClick={onClose}>
      <div className="ap-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ap-modal-close" aria-label="Close" onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        {status !== "sent" ? (
          <>
            <h2 className="ap-modal-title">
              Connect<br /><span className="ap-modal-orange">With Us.</span>
            </h2>
            <form className="ap-modal-form" onSubmit={onSubmit}>
              <label className="ap-field-label">
                Name
                <input name="name" type="text" placeholder="Your full name" className="ap-field-input" maxLength={100} required />
              </label>
              <label className="ap-field-label">
                Email
                <input name="email" type="email" placeholder="you@company.com" className="ap-field-input" maxLength={200} required />
              </label>
              <label className="ap-field-label">
                About Your Business
                <textarea name="message" rows={3} placeholder="Tell us what you do and what you need..." className="ap-field-input ap-field-textarea" maxLength={3000} />
              </label>
              {/* Honeypot: invisible to people, filled in by bots. */}
              <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              {status === "error" && (
                <p className="ap-form-error" role="alert">
                  Sorry, that didn&apos;t go through. Please try again, or email us at{" "}
                  <a href="mailto:support@hapcraftmedia.com">support@hapcraftmedia.com</a>.
                </p>
              )}
              <button type="submit" className="ap-pill-btn ap-pill-btn--dark" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Get In Touch"}
              </button>
            </form>
          </>
        ) : (
          <div className="ap-sent">
            <h2 className="ap-sent-title">
              You&apos;re On The <span className="ap-sent-marker">List.</span>
            </h2>
            <p className="ap-sent-body">We&apos;ll Be In Touch Soon. Time To Get Unforgettable.</p>
          </div>
        )}
      </div>
    </div>
  );
}
