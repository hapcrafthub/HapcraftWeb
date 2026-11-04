import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS } from "./NavOverlay";

/** Full-screen menu used on the About and Services pages; `active` marks the current page. */
export default function ApNavOverlay({ open, onClose, active }: { open: boolean; onClose: () => void; active: string }) {
  return (
    <nav
      className="ap-nav-overlay"
      style={{
        transform: open ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: open ? "all" : "none",
      }}
      aria-hidden={!open}
    >
      <div className="ap-nav-top">
        <Logo className="wp-nav-logo" />
        <button className="ap-nav-close" aria-label="Close menu" onClick={onClose}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <line x1="6" y1="6" x2="20" y2="20" /><line x1="20" y1="6" x2="6" y2="20" />
          </svg>
        </button>
      </div>
      <div className="ap-nav-links">
        <svg style={{ position: "absolute", right: "6%", top: "12%", width: 80, height: 67, pointerEvents: "none", opacity: 0.9 }} viewBox="0 0 120 100" fill="none" aria-hidden="true">
          <path d="M12 10 L108 50 L12 90 L32 52 L12 10Z" fill="var(--orange)" />
        </svg>
        {NAV_LINKS.map(({ label, to }) => (
          <Link key={label} href={to} className={`ap-nav-link${to === active ? " ap-nav-link--active" : ""}`} onClick={onClose}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
