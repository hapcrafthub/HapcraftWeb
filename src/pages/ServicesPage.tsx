import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import Logo from "../components/Logo";
import SiteFooter from "../components/SiteFooter";
import imgAiCreative   from "../assets/make_him_look_like_indian_202606180408.jpeg";
import imgWebsite      from "../assets/remove_all_typography_,_just_202606180410 - Copy.jpeg";
import imgAiInfra      from "../assets/make_him_look_like_indian_202606180419.jpeg";
import imgContent      from "../assets/make_him_look_little_fair_202606180425.jpeg";
import imgProduct      from "../assets/make_bacground_orange_2K_202606180403.jpeg";
import imgPerformance  from "../assets/just_write_big_bold_word_202606180403 - Copy.jpeg";

const Spark = ({ style, fill = "currentColor" }: { style?: React.CSSProperties; fill?: string }) => (
  <svg viewBox="0 0 100 100" style={style} aria-hidden="true">
    <path d="M50 0 C54.5 31 31 45.5 0 50 C31 54.5 54.5 69 50 100 C45.5 69 69 54.5 100 50 C69 45.5 45.5 31 50 0 Z" fill={fill} />
  </svg>
);

interface ServiceCard {
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const services: ServiceCard[] = [
  {
    num: "01",
    title: "AI Creative\nProduction",
    image: imgAiCreative,
    description: "Traditional creative shoots drain budgets fast — studios, crews, logistics, and retakes add up before a single asset is usable. AI production eliminates that overhead entirely and delivers visuals at a quality level most brands can't achieve even when they spend big.",
    tags: ["Content At Scale", "AI Visuals", "Campaign Strategy"],
  },
  {
    num: "02",
    title: "Custom Website\nDevelopment",
    image: imgWebsite,
    description: "A weak website costs you clients before you ever speak to them. The right one builds trust in the first three seconds, holds attention, and turns interest into a decision — without you lifting a finger.",
    tags: ["Web Design", "Development", "Conversion Optimisation"],
  },
  {
    num: "03",
    title: "AI-Powered Business\nInfrastructure",
    image: imgAiInfra,
    description: "Growth shouldn't mean burning out your team. The right infrastructure handles the repetitive, frees your people for what actually matters, and lets the business scale — without the chaos that usually comes with it.",
    tags: ["Automation", "AI Systems", "Workflow Design"],
  },
  {
    num: "04",
    title: "Content Strategic\nBlueprint",
    image: imgContent,
    description: "Without a clear distribution plan, even strong content disappears. A content blueprint maps every channel, every audience moment, and every growth lever — so nothing you create goes to waste, and every move compounds.",
    tags: ["Distribution Strategy", "Channel Mapping", "Scalability"],
  },
  {
    num: "05",
    title: "Product\nDesign",
    image: imgProduct,
    description: "Most founders launch on instinct and pay for the gaps later. Strategic clarity before you build means you enter the market positioned correctly, priced right, and structured to last — not retrofitted after the fact.",
    tags: ["SKU Development", "Brand Strategy", "Category Creation"],
  },
  {
    num: "06",
    title: "Performance\nMarketing",
    image: imgPerformance,
    description: "Ad spend without strategy is money disappearing. When campaigns are built on real data and optimised relentlessly, your cost per acquisition drops, your returns compound, and paid growth finally becomes predictable.",
    tags: ["Paid Ads", "ROI Optimisation", "Lead Generation"],
  },
];

export default function ServicesPage() {
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
        style={{ transform: menuOpen ? "translateY(0)" : "translateY(-100%)", pointerEvents: menuOpen ? "all" : "none" }}
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
          <svg style={{ position: "absolute", right: "6%", top: "12%", width: 80, height: 67, pointerEvents: "none", opacity: 0.9 }} viewBox="0 0 120 100" fill="none" aria-hidden="true">
            <path d="M12 10 L108 50 L12 90 L32 52 L12 10Z" fill="#FF7A23" />
          </svg>
          <Link to="/" className="ap-nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/work" className="ap-nav-link" onClick={() => setMenuOpen(false)}>Our Work</Link>
          <Link to="/services" className="ap-nav-link ap-nav-link--active" onClick={() => setMenuOpen(false)}>Our Services</Link>
          <Link to="/about" className="ap-nav-link" onClick={() => setMenuOpen(false)}>About Us</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sp2-hero">
        <div className="sp2-hero-inner">
          <div className="sp2-meta-bar reveal">
            <span className="sp2-meta-left">
              What We Do
            </span>
            <span className="sp2-meta-right">Hapcraft</span>
          </div>

          <div className="sp2-headline-row reveal">
            <h1 className="sp2-headline">
              How We<br />
              <span className="sp2-headline-orange">Can Help.</span>
            </h1>
            <p className="sp2-subcopy">
              From AI-Powered Infrastructure To Custom Digital Experiences — We Build The Systems That Make Brands Impossible To Ignore.
            </p>
          </div>

          <div className="sp2-stats reveal">
            <div className="sp2-stat-col">
              <p className="sp2-stat-label">Team Experience</p>
              <p className="sp2-stat-num">7 Yrs+</p>
            </div>
            <div className="sp2-stat-col sp2-stat-col--bordered">
              <p className="sp2-stat-label">Audience Reached</p>
              <p className="sp2-stat-num">600M+</p>
            </div>
            <div className="sp2-stat-col sp2-stat-col--bordered">
              <p className="sp2-stat-label">Campaigns</p>
              <p className="sp2-stat-num">500+</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="sp2-cards-section">
        <div className="sp2-cards-inner">
          {services.map((s, i) => (
            <div
              key={s.num}
              className="sp2-card reveal"
              style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              {/* Left: image area + title below */}
              <div className="sp2-card-left">
                <div className="sp2-card-img-area">
                  <img src={s.image} alt={s.title.replace("\n", " ")} loading="lazy" />
                </div>
                <div className="sp2-card-title-wrap">
                  <h2 className="sp2-card-title">
                    {s.title.split("\n").map((line, j) => (
                      <span key={j}>{line}{j < s.title.split("\n").length - 1 && <br />}</span>
                    ))}
                  </h2>
                </div>
              </div>
              {/* Right: number + desc + tags */}
              <div className="sp2-card-right">
                <div>
                  <span className="sp2-card-num">{s.num}</span>
                  <p className="sp2-card-desc">{s.description}</p>
                </div>
                <div className="sp2-card-tags">
                  {s.tags.map(tag => (
                    <span key={tag} className="sp2-card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ap-cta">
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
                <h2 className="ap-modal-title">Connect<br /><span className="ap-modal-orange">With Us.</span></h2>
                <form className="ap-modal-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
                  <label className="ap-field-label">Name<input type="text" placeholder="Your full name" className="ap-field-input" required /></label>
                  <label className="ap-field-label">Email<input type="email" placeholder="you@company.com" className="ap-field-input" required /></label>
                  <label className="ap-field-label">About Your Business<textarea rows={3} placeholder="Tell us what you do and what you need..." className="ap-field-input ap-field-textarea" /></label>
                  <button type="submit" className="ap-pill-btn ap-pill-btn--dark">Get In Touch</button>
                </form>
              </>
            ) : (
              <div className="ap-sent">
                <h2 className="ap-sent-title">You're On The <span className="ap-sent-marker">List.</span></h2>
                <p className="ap-sent-body">We'll Be In Touch Soon. Time To Get Unforgettable.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
