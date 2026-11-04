import Link from "next/link";
import Logo from "./Logo";

/** Sticky header used on the Work, About and Services pages. */
export default function PageHeader({ menuOpen, onToggleMenu }: { menuOpen: boolean; onToggleMenu: () => void }) {
  return (
    <header className="wp-nav">
      <Link href="/" aria-label="Home"><Logo className="wp-nav-logo" /></Link>
      <button
        className={`menu${menuOpen ? " is-open" : ""}`}
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
