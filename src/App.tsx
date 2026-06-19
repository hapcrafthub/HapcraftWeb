import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useReveal } from "./hooks/useReveal";
import hapMask from "./assets/hap-mask.png";
import eventPhoto from "./assets/event.png";
import crowdAerial from "./assets/Screenshot 2026-06-14 021330.png";
import govtMeeting from "./assets/govt-meeting.jpg";
import mrPotato from "./assets/mr-potato.png";
import jobipo from "./assets/jobipo.png";
import Logo from "./components/Logo";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import SiteFooter from "./components/SiteFooter";
import IntroLoader from "./components/IntroLoader";

const CLOUDINARY = "https://res.cloudinary.com/di1udlyci/video/upload/q_auto,f_auto";
const hapVideo = `${CLOUDINARY}/Hap_vp_hxkmwn.mp4`;
const crowdVideo = `${CLOUDINARY}/Crowd_enjoying_at_function_202606132324_dt4bwe.mp4`;
const barVideo1 = `${CLOUDINARY}/km_20260614_1080p_30f_20260614_015516_zqyyp3.mp4`;
const barVideo2 = `${CLOUDINARY}/Indian_couple_posing_professionally_202606140158_tn9k9u.mp4`;
const barVideo3 = `${CLOUDINARY}/Indian_guy_doing_act_202606140159_z0iqja.mp4`;
const barVideo4 = `${CLOUDINARY}/km_20260614-1_1080p_30f_20260614_015641_gquod9.mp4`;

type Card = { imageSide: "left" | "right"; image?: string; hoverVideo?: string; title: string; summary: string };

const cards: Card[] = [
  {
    imageSide: "left",
    image: crowdAerial,
    hoverVideo: crowdVideo,
    title: "co-Organised one of the world's biggest Event",
    summary: "We co-organized the Antarrashtriya Arya Mahasammelan 2025 in Delhi, managing the Vedic lifestyle and ancient education system vertical. The event successfully catered to a gathering of over 4.5 lakh people.",
  },
  {
    imageSide: "right",
    image: govtMeeting,
    title: "Honoured to be the strategic partner in the government program",
    summary: "We served as a strategic partner in an official government program, joining a high-level meeting with the Governor of Gujarat, Acharya Devvrat.",
  },
  {
    imageSide: "left",
    image: mrPotato,
    title: "Designed & Strategized the fastest scalable food chain",
    summary: "We developed the strategic expansion plan for the Hyderabad-based food chain, Mr. Potato. The scalable model achieved rapid profitability and became a favorite among children.",
  },
  {
    imageSide: "right",
    image: jobipo,
    title: "Repostioned india's smartest Affiliate Platform: JOBIPO",
    summary: "We served as the brand strategist for Jobipo, designing a content strategy to attract their target audience. This targeted approach successfully generated all organic outreach for the platform.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIntroDone(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}
      <Routes>
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<HomePage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
      </Routes>
    </>
  );
}

function HomeCard({ card }: { card: Card }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!card.hoverVideo) return;
    setHovered(true);
    videoRef.current?.play();
  };
  const handleMouseLeave = () => {
    if (!card.hoverVideo) return;
    setHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <article
      className={`card img-${card.imageSide}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-media">
        <img src={card.image ?? eventPhoto} alt="Event" />
        {card.hoverVideo && (
          <video
            ref={videoRef}
            className={`card-hover-video${hovered ? " is-visible" : ""}`}
            src={card.hoverVideo}
            muted
            playsInline
            loop
          />
        )}
      </div>
      <div className="card-body">
        <h3>{card.title}</h3>
        <p>{card.summary}</p>
      </div>
    </article>
  );
}

function HomePage({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean | ((p: boolean) => boolean)) => void }) {
  useReveal();
  return (
    <div className="page">
      {/* ===================== HERO ===================== */}
      <header className="hero">
        <nav className="nav">
          <Logo className="nav-logo" />
          <button
            className={`menu ${menuOpen ? "is-open" : ""}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        <div
          className="hero-graphic"
          style={{
            WebkitMaskImage: `url(${hapMask})`,
            maskImage: `url(${hapMask})`,
          }}
          aria-label="Hapcraft"
        >
          <video
            className="hero-video"
            src={hapVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </header>

      {/* ===================== NAV OVERLAY ===================== */}
      <nav
        className={`nav-overlay${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        aria-label="Site navigation"
      >
        <div className="nav-overlay__top">
          <Logo className="nav-logo" />
          <button className="overlay-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
              <line x1="6" y1="6" x2="22" y2="22" />
              <line x1="22" y1="6" x2="6" y2="22" />
            </svg>
          </button>
        </div>
        <div className="nav-overlay__links">
          <svg className="nav-overlay__spark" width="130" height="130" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M50 0 C54.5 31 31 45.5 0 50 C31 54.5 54.5 69 50 100 C45.5 69 69 54.5 100 50 C69 45.5 45.5 31 50 0 Z" fill="var(--orange)" />
          </svg>
          {(
            [
              { label: "Home",         to: "/" },
              { label: "Our Work",     to: "/work" },
              { label: "Our Services", to: "/services" },
              { label: "About Us",     to: "/about" },
            ] as const
          ).map(({ label, to }) => (
            <Link key={label} to={to} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ===================== INTRO ===================== */}
      <section className="intro reveal">
        <div className="intro-inner">
          <div className="intro-left">
            <div className="headline-art">
              <span className="bar bar-1">
                <video src={barVideo1} autoPlay loop muted playsInline />
              </span>
              <span className="bar bar-2">
                <video src={barVideo2} autoPlay loop muted playsInline />
              </span>
              <span className="bar bar-3">
                <video src={barVideo3} autoPlay loop muted playsInline />
              </span>
              <span className="bar bar-4">
                <video src={barVideo4} autoPlay loop muted playsInline />
              </span>
              <h1 className="headline">
                <span>We are</span>
                <span className="indent">Hapcraft</span>
                <span className="spread">
                  We<i className="gap" />make
                </span>
                <span>you</span>
                <span>unforgettable</span>
              </h1>
            </div>
          </div>

          <div className="intro-right">
            <div className="intro-copy">
              <p>We are Hapcraft Media — a brand strategy and creative production studio that turns businesses into brands people remember.</p>
              <p>Because in a market full of noise, being forgotten is the real loss.</p>
              <p>Ready to be unforgettable?</p>
            </div>
            <Link className="contact-btn" to="/services">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== WORK ===================== */}
      <section className="work">
        <div className="work-inner">
          {cards.map((card, i) => (
            <div key={i} className="reveal" style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}>
              <HomeCard card={card} />
            </div>
          ))}

          <div className="work-cta">
            <div className="ap-cta-actions">
            <Link className="view-more" to="/work">
              Explore more
            </Link>
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
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
