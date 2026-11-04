import Link from "next/link";
import Logo from "./Logo";

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Our Work", to: "/work" },
  { label: "Our Services", to: "/services" },
  { label: "About Us", to: "/about" },
] as const;

/** Full-screen menu used on the Home and Work pages. */
export default function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <nav className={`nav-overlay${open ? " is-open" : ""}`} aria-hidden={!open} aria-label="Site navigation">
      <div className="nav-overlay__top">
        <Logo className="nav-logo" />
        <button className="overlay-close" aria-label="Close menu" onClick={onClose}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
            <line x1="6" y1="6" x2="22" y2="22" />
            <line x1="22" y1="6" x2="6" y2="22" />
          </svg>
        </button>
      </div>
      <div className="nav-overlay__links">
        <svg className="nav-overlay__arrow" width="80" height="67" viewBox="0 0 120 100" fill="none" aria-hidden="true">
          <path d="M12 10 L108 50 L12 90 L32 52 L12 10Z" fill="var(--orange)" opacity="0.9" />
        </svg>
        {NAV_LINKS.map(({ label, to }) => (
          <Link key={label} href={to} onClick={onClose}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
