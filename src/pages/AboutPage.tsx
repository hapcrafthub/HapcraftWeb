import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import Logo from "../components/Logo";
import foundersImg from "../assets/founders.png";
import SiteFooter from "../components/SiteFooter";

const Spark = ({ style, fill = "currentColor" }: { style?: React.CSSProperties; fill?: string }) => (
  <svg viewBox="0 0 100 100" style={style} aria-hidden="true">
    <path d="M50 0 C54.5 31 31 45.5 0 50 C31 54.5 54.5 69 50 100 C45.5 69 69 54.5 100 50 C69 45.5 45.5 31 50 0 Z" fill={fill} />
  </svg>
);

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useReveal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); setContactOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const openContact = () => { setContactOpen(true); setMenuOpen(false); setSent(false); };
  const closeContact = () => setContactOpen(false);

  return (
    <div className="about-page">

      {/* ── STICKY HEADER ── */}
      <header className="wp-nav">
        <Link to="/" aria-label="Home"><Logo className="wp-nav-logo" /></Link>
        <button
          className={`menu${menuOpen ? " is-open" : ""}`}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* ── NAV OVERLAY ── */}
      <nav
        className="ap-nav-overlay"
        style={{
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="ap-nav-top">
          <Logo className="wp-nav-logo" />
          <button className="ap-nav-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <line x1="6" y1="6" x2="20" y2="20" /><line x1="20" y1="6" x2="6" y2="20" />
            </svg>
          </button>
        </div>
        <div className="ap-nav-links">
          <svg style={{ position: "absolute", right: "6%", top: "12%", width: 72, height: 96, pointerEvents: "none", opacity: 0.9 }} viewBox="0 0 72 96" fill="none" aria-hidden="true">
            <path d="M10 6 L10 90 L68 48 Z" fill="var(--cream)" />
          </svg>
          <Link to="/" className="ap-nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/work" className="ap-nav-link" onClick={() => setMenuOpen(false)}>
            Our Work
          </Link>
          <Link to="/services" className="ap-nav-link" onClick={() => setMenuOpen(false)}>
            Our Services
          </Link>
          <Link to="/about" className="ap-nav-link ap-nav-link--active" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
        </div>
      </nav>

      {/* ── SECTION 1 — WHO WE ARE ── */}
      <section className="ap-hero reveal">

        {/* top meta bar */}
        <div className="ap-meta-bar">
          <span className="ap-meta-left">Who We Are</span>
          <span className="ap-meta-right">Hapcraft</span>
        </div>

        {/* headline */}
        <div className="ap-headline-wrap">
          <div className="ap-we-make-row">
            <div className="ap-we-make-col">
              <span>WE</span>
              <span>MAKE</span>
            </div>
            <span className="ap-brands">BRANDS</span>
          </div>
          <div className="ap-unforgettable">UNFORGETTABLE.</div>
        </div>

        {/* bottom bar */}
        <div className="ap-hero-bottom">
          <p className="ap-sub-copy">
            From Bold Branding To Sharp Marketing — We Build The Systems That Turn Small Businesses Into Names People Remember.
          </p>
          <Link to="/services" className="ap-pill-btn">Explore Our Services</Link>
        </div>
      </section>

      {/* ── SECTION DIVIDER ── */}
      <div className="ab-divider">
        <div className="ab-divider__line" />
        <div className="ab-divider__sparks">
          <Spark fill="#F9F6E7" style={{ width: "clamp(10px,1.2vw,16px)", height: "clamp(10px,1.2vw,16px)", opacity: 0.3 }} />
          <Spark fill="#FF7A23" style={{ width: "clamp(14px,1.6vw,22px)", height: "clamp(14px,1.6vw,22px)" }} />
          <Spark fill="#F9F6E7" style={{ width: "clamp(10px,1.2vw,16px)", height: "clamp(10px,1.2vw,16px)", opacity: 0.3 }} />
        </div>
        <div className="ab-divider__line" />
      </div>

      {/* ── FOUNDERS ── */}
      <section className="ap-founders reveal" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
        <div className="ap-founders-wrap">
          <img
            src={foundersImg}
            alt="Hapcraft Media Founders — Aditi Shori and Avichal Mishra"
            className="ap-founders-img"
          />
          {/* watermark cover */}
          <div className="ap-founders-cover" />
          {/* edge fades */}
          <div className="ap-founders-fade-sides" />
          <div className="ap-founders-fade-tb" />

          {/* Aditi Shori — bottom left */}
          <div className="ap-founder-label ap-founder-left">
            <div className="ap-founder-name">Aditi Shori</div>
            <div className="ap-founder-bar" />
            <div className="ap-founder-role">COO</div>
          </div>

          {/* centre label */}
          <div className="ap-founder-center">The Founders — Hapcraft</div>

          {/* Avichal Mishra — bottom right */}
          <div className="ap-founder-label ap-founder-right">
            <div className="ap-founder-name">Avichal Mishra</div>
            <div className="ap-founder-bar ap-founder-bar--right" />
            <div className="ap-founder-role">CEO</div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — WHAT WE DID ── */}
      <section className="ap-what reveal" style={{ '--reveal-delay': '0.05s' } as React.CSSProperties}>
        <div className="ap-what-inner">
          <p className="ap-what-heading">What We Did.</p>

          {/* top row: 2 info cards */}
          <div className="ap-info-grid">
            {/* HAPCRAFT card */}
            <div className="ap-dark-card">
              <div className="ap-card-head">
                <div>
                  <h3 className="ap-card-title">Hapcraft</h3>
                  <p className="ap-card-subtitle">Brand Strategy &amp; Creative Production Studio</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 54, height: 54, flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <p className="ap-card-body">Based In India. We Exist For One Reason — To Transform Businesses Into Brands That People Remember, Trust, And Choose.</p>
            </div>

            {/* OUR DIVERSE SCOPE card */}
            <div className="ap-dark-card">
              <div className="ap-card-head">
                <h3 className="ap-card-title">Our Diverse<br />Scope</h3>
                <div className="ap-scope-icons">
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
              </div>
              <p className="ap-card-body">From Government Institutions To Food Startups, Vedic Lifestyle Events To Digital Platforms — We've Built Strategies That Drive Real, Measurable Results.</p>
            </div>
          </div>

          {/* bottom row: 3 stat cards */}
          <div className="ap-stat-grid">
            <div className="ap-dark-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="ap-stat-icon">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className="ap-stat-num">4.5L+</div>
              <p className="ap-stat-label">People Reached At A Single Event</p>
            </div>

            <div className="ap-dark-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="ap-stat-icon">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
              </svg>
              <div className="ap-stat-num">600M+</div>
              <p className="ap-stat-label">Organic Outreach For Our Clients</p>
            </div>

            <div className="ap-dark-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="ap-stat-icon">
                <line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" />
              </svg>
              <div className="ap-stat-num">Gov.</div>
              <p className="ap-stat-label">Trusted Strategic Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — CTA ── */}
      <section className="ap-cta reveal">
        <div className="ap-cta-inner">
          <p className="ap-cta-eyebrow">Ready To Be Unforgettable?</p>
          <h2 className="ap-cta-heading">Let's Build Something<br />People Won't Forget.</h2>
          <div className="ap-cta-actions">
            <button className="ap-pill-btn" onClick={openContact}>Get In Touch</button>
            <div className="ap-cta-socials">
              <a href="https://www.instagram.com/hapcraftmedia?utm_source=qr&igsh=cHdmNHExMjQ2aWQ=" target="_blank" rel="noopener noreferrer" className="ap-social-btn" aria-label="Instagram">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://x.com/HapcraftMedia" target="_blank" rel="noopener noreferrer" className="ap-social-btn" aria-label="X (Twitter)">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/hapcraftmedia/" target="_blank" rel="noopener noreferrer" className="ap-social-btn" aria-label="LinkedIn">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="mailto:support@hapcraftmedia.com" className="ap-social-btn" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* ── CONTACT MODAL ── */}
      {contactOpen && (
        <div className="ap-modal-backdrop" onClick={closeContact}>
          <div className="ap-modal" onClick={e => e.stopPropagation()}>
            <button className="ap-modal-close" aria-label="Close" onClick={closeContact}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {!sent ? (
              <>
                <h2 className="ap-modal-title">
                  Connect<br /><span className="ap-modal-orange">With Us.</span>
                </h2>
                <form
                  className="ap-modal-form"
                  onSubmit={e => { e.preventDefault(); setSent(true); }}
                >
                  <label className="ap-field-label">
                    Name
                    <input type="text" placeholder="Your full name" className="ap-field-input" required />
                  </label>
                  <label className="ap-field-label">
                    Email
                    <input type="email" placeholder="you@company.com" className="ap-field-input" required />
                  </label>
                  <label className="ap-field-label">
                    About Your Business
                    <textarea rows={3} placeholder="Tell us what you do and what you need..." className="ap-field-input ap-field-textarea" />
                  </label>
                  <button type="submit" className="ap-pill-btn ap-pill-btn--dark">Get In Touch</button>
                </form>
              </>
            ) : (
              <div className="ap-sent">
                <h2 className="ap-sent-title">
                  You're On The <span className="ap-sent-marker">List.</span>
                </h2>
                <p className="ap-sent-body">We'll Be In Touch Soon. Time To Get Unforgettable.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
