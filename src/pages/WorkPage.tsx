import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import SiteFooter from "../components/SiteFooter";
import Logo from "../components/Logo";
import crowdAerial from "../assets/Screenshot 2026-06-14 021330.png";
import govtMeeting from "../assets/govt-meeting.jpg";
import mrPotato from "../assets/mr-potato.png";
import jobipo from "../assets/jobipo-new.png";
import gitaJayanti from "../assets/gita-jayanti.jpg";
import vedicTree from "../assets/vedic-tree.jpg";
import cafeRiverio from "../assets/cafe-riverio.webp";
import frillsBrand from "../assets/frills-brand.webp";
import goeLogo from "../assets/1781850285355.png";

interface WorkCard {
  title: string;
  description: string;
  image?: string;
  hoverVideo?: string;
  contain?: boolean;
}

interface WorkGroup {
  largeSide: "left" | "right";
  large: WorkCard;
  small1: WorkCard;
  small2: WorkCard;
}

const groups: WorkGroup[] = [
  {
    largeSide: "left",
    large: {
      title: "co-Organised one of the world's biggest Event",
      description: "We co-organized the Antarrashtriya Arya Mahasammelan 2025 in Delhi, managing the Vedic lifestyle and ancient education system vertical. The event successfully catered to a gathering of over 4.5 lakh people.",
      image: crowdAerial,
      hoverVideo: "https://res.cloudinary.com/di1udlyci/video/upload/q_auto,f_auto/Crowd_enjoying_at_function_202606132324_dt4bwe.mp4",
    },
    small1: {
      title: "Honoured to be the strategic partner in the government program",
      description: "We served as a strategic partner in an official government program, joining a high-level meeting with the Governor of Gujarat, Acharya Devvrat.",
      image: govtMeeting,
    },
    small2: {
      title: "Designed & Strategized the fastest scalable food chain",
      description: "We developed the strategic expansion plan for the Hyderabad-based food chain, Mr. Potato. The scalable model achieved rapid profitability and became a favourite among children.",
      image: mrPotato,
    },
  },
  {
    largeSide: "right",
    large: {
      title: "Organised one of the world's biggest Event",
      description: "We co-organized the largest exhibition at the International Gita Jayanti, developing the Vedic lifestyle and education vertical. The project successfully engaged and inspired the youth of India.",
      image: gitaJayanti,
    },
    small1: {
      title: "Repostioned india's smartest Affiliate Platform: JOBIPO",
      description: "We served as brand strategist for Jobipo, designing a content strategy to attract their target audience. This targeted approach successfully generated all organic outreach for the platform.",
      image: jobipo,
    },
    small2: {
      title: "Crafted the finest personal brand building momento.",
      description: "We crafted a detailed Vedic tree illustrating the evolution and interconnectedness of global education systems. The visual maps the origins of world learning back to ancient India.",
      image: vedicTree,
    },
  },
  {
    largeSide: "left",
    large: {
      title: "Rebranded one of the coziest cafes of Andhra Pradesh.",
      description: "We redesigned the entire logo and color identity for Cafe Riverio to enhance its cozy aesthetic. This rebranding created a highly scalable model tailored specifically to their target consumers.",
      image: cafeRiverio,
      contain: true,
    },
    small1: {
      title: "Redesigned the finest boutique brand in Telangana.",
      description: "We designed the new branding and visual identity for the boutique, Frills by Madhuri Reddy. The updated theme was structured to directly engage their target female demographic.",
      image: frillsBrand,
    },
    small2: {
      title: "Rebranded one of the most prominent Educational institution of Haryana.",
      description: "We repositioned Saraswati Vidya Bharti High School in Kaithal as \"Gurukul of Excellence.\" Our team designed a completely new theme and color identity to establish a highly scalable and trusted brand for the institution.",
      image: goeLogo,
      contain: true,
    },
  },
];

function WorkCardItem({ card, slot }: { card: WorkCard; slot: "large" | "s1" | "s2" }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  const playVideo = () => { videoRef.current?.play().catch(() => {}); };
  const stopVideo = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  const handleMouseEnter = () => { if (!card.hoverVideo) return; setHovered(true); playVideo(); };
  const handleMouseLeave = () => { if (!card.hoverVideo) return; setHovered(false); stopVideo(); };
  const handleTouch = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch" || !card.hoverVideo) return;
    e.preventDefault();
    if (hovered) { setHovered(false); stopVideo(); }
    else { setHovered(true); playVideo(); }
  };

  const isLarge = slot === "large";

  useEffect(() => {
    if (!card.hoverVideo) return;
    if (!window.matchMedia("(max-width: 768px)").matches) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      const v = videoRef.current;
      if (!v) return;
      if (entry.isIntersecting) {
        setHovered(true);
        if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }
        v.play().catch(() => {});
      } else {
        setHovered(false);
        v.pause();
        v.currentTime = 0;
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [card.hoverVideo]);

  return (
    <article
      ref={containerRef as React.Ref<HTMLElement>}
      className={`wp-card wp-card--${slot} ${isLarge ? "wp-card--col" : "wp-card--row"}${card.contain ? " wp-card--contain" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handleTouch}
    >
      <div className="wp-card__media">
        <img src={card.image ?? crowdAerial} alt={card.title} loading="lazy" />
        {card.hoverVideo && (
          <video
            ref={videoRef}
            className={`wp-card__hover-video${hovered ? " is-visible" : ""}`}
            src={card.hoverVideo}
            muted
            playsInline
            loop
          />
        )}
      </div>
      <div className="wp-card__body">
        <h2 className="wp-card__title">{card.title}</h2>
        <p className="wp-card__desc">{card.description}</p>
      </div>
    </article>
  );
}

export default function WorkPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useReveal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="work-page">
      {/* ===== NAV ===== */}
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

      {/* ===== NAV OVERLAY ===== */}
      <nav className={`nav-overlay${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="nav-overlay__top">
          <Logo className="nav-logo" />
          <button className="overlay-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <line x1="6" y1="6" x2="22" y2="22" /><line x1="22" y1="6" x2="6" y2="22" />
            </svg>
          </button>
        </div>
        <div className="nav-overlay__links">
          <svg className="nav-overlay__arrow" width="80" height="67" viewBox="0 0 120 100" fill="none" aria-hidden="true">
            <path d="M12 10 L108 50 L12 90 L32 52 L12 10Z" fill="var(--orange)" opacity="0.9" />
          </svg>
          {([
            { label: "Home",         to: "/" },
            { label: "Our Work",     to: "/work" },
            { label: "Our Services", to: "/services" },
            { label: "About Us",     to: "/about" },
          ] as const).map(({ label, to }) => (
            <Link key={label} to={to} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="wp-hero">
        <h1 className="wp-hero-title reveal">Our Work</h1>
      </section>

      {/* ===== GRID ===== */}
      <main className="wp-grid-wrap">
        <div className="wp-grid">
          {groups.map((group, i) => (
            <div key={i} className={`wp-group wp-group--${group.largeSide} reveal`} style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}>
              <WorkCardItem card={group.large}  slot="large" />
              <WorkCardItem card={group.small1} slot="s1" />
              <WorkCardItem card={group.small2} slot="s2" />
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
