import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useReveal } from "./hooks/useReveal";
import hapMask from "./assets/hap-mask.png";
import eventPhoto from "./assets/event.png";
import crowdAerial from "./assets/Screenshot 2026-06-14 021330.png";
import govtMeeting from "./assets/govt-meeting.jpg";
import mrPotato from "./assets/mr-potato-photo.jpg";
import jobipo from "./assets/jobipo.png";
import barImg1 from "./assets/bar-img-1.jpg";
import barImg2 from "./assets/bar-img-2.jpg";
import barImg3 from "./assets/bar-img-3.jpg";
import barImgCamera from "./assets/bar-img-camera.jpg";
import Logo from "./components/Logo";
const WorkPage     = lazy(() => import("./pages/WorkPage"));
const AboutPage    = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
import SiteFooter from "./components/SiteFooter";
import IntroLoader from "./components/IntroLoader";

const CLOUDINARY = "https://res.cloudinary.com/di1udlyci/video/upload";
// Optimized delivery: automatic format + quality, width-capped, progressive/streaming.
const BAR_TX = "q_auto:eco,f_auto,w_400,fps_15";
const HERO_TX = "q_auto,f_auto,w_1280";
const CROWD_TX = "q_auto,f_auto,w_900";
const CROWD_POSTER_TX = "so_0,w_900,f_jpg,q_auto";

const HERO_ID = "sux_1_nkr4ij";
const CROWD_ID = "iams_vid_flkxaa"; // Arya Mahasammelan crowd hover video
const BAR1_ID = "Indian_couple_posing_professionally_202606140158_tn9k9u";
const BAR2_ID = "km_20260614-1_1080p_30f_20260614_015641_gquod9";
const BAR3_ID = "km_20260614_1080p_30f_20260614_015516_zqyyp3";
const BAR4_ID = "Indian_guy_doing_act_202606140159_z0iqja";

const hapVideo = `${CLOUDINARY}/${HERO_TX}/${HERO_ID}.mp4`;
const hapPoster = `${CLOUDINARY}/so_0,w_1280,f_jpg,q_auto/${HERO_ID}.jpg`;
const hapPosterMobile = `${CLOUDINARY}/so_0,w_720,f_jpg,q_auto/${HERO_ID}.jpg`;
const crowdVideo = `${CLOUDINARY}/${CROWD_TX}/${CROWD_ID}.mp4`;
const crowdPoster = `${CLOUDINARY}/${CROWD_POSTER_TX}/${CROWD_ID}.jpg`;
const barVideo1 = `${CLOUDINARY}/${BAR_TX}/${BAR1_ID}.mp4`;
const barVideo2 = `${CLOUDINARY}/${BAR_TX}/${BAR2_ID}.mp4`;
const barVideo3 = `${CLOUDINARY}/${BAR_TX}/${BAR3_ID}.mp4`;
const barVideo4 = `${CLOUDINARY}/${BAR_TX}/${BAR4_ID}.mp4`;

function useLowPowerDevice() {
  const get = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [low, setLow] = useState<boolean>(get);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLow(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return low;
}

type LazyVideoProps = {
  src: string;
  poster: string;
  mobilePoster?: string;
  className?: string;
  videoRef?: React.Ref<HTMLVideoElement>;
};
function LazyVideo({ src, poster, mobilePoster, className, videoRef }: LazyVideoProps) {
  const lowPower = useLowPowerDevice();
  const activePoster =
    mobilePoster && typeof window !== "undefined" && window.innerWidth < 768
      ? mobilePoster
      : poster;
  if (lowPower) {
    return (
      <img
        src={activePoster}
        alt=""
        className={className}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
    );
  }
  return (
    <video
      ref={videoRef}
      className={className}
      data-src={src}
      poster={activePoster}
      muted
      loop
      playsInline
      preload="none"
      data-lazy
    />
  );
}

function useLazyVideoLoader() {
  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>("video[data-lazy]");
    if (!videos.length) return;

    const isMobileMQ = window.matchMedia("(max-width: 768px)");
    let currentMobileVideo: HTMLVideoElement | null = null;
    const pauseTimers = new Map<HTMLVideoElement, number>();
    const PAUSE_DELAY = 180;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;

          const t = pauseTimers.get(v);
          if (t !== undefined) {
            clearTimeout(t);
            pauseTimers.delete(v);
          }

          if (e.isIntersecting) {
            if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }

            if (isMobileMQ.matches && currentMobileVideo && currentMobileVideo !== v) {
              currentMobileVideo.pause();
            }
            if (isMobileMQ.matches) currentMobileVideo = v;
            v.play().catch(() => {
              if (currentMobileVideo === v) currentMobileVideo = null;
            });
          } else {
            const id = window.setTimeout(() => {
              if (!v.paused) v.pause();
              if (currentMobileVideo === v) currentMobileVideo = null;
              pauseTimers.delete(v);
            }, PAUSE_DELAY);
            pauseTimers.set(v, id);
          }
        });
      },
      { threshold: 0, rootMargin: "200px 0px" }
    );

    videos.forEach((v) => obs.observe(v));
    return () => {
      obs.disconnect();
      pauseTimers.forEach((id) => clearTimeout(id));
    };
  }, []);
}

function BarSlot({ image, videoSrc }: { image: string; videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const lowPower = useLowPowerDevice();

  return (
    <div
      style={{ position: "absolute", inset: 0 }}
      onMouseEnter={() => {
        if (lowPower) return;
        setHovered(true);
        const v = videoRef.current;
        if (v) { if (!v.src) v.src = videoSrc; v.play().catch(() => {}); }
      }}
      onMouseLeave={() => {
        if (lowPower) return;
        setHovered(false);
        const v = videoRef.current;
        if (v) { v.pause(); v.currentTime = 0; }
      }}
    >
      <img className="bar-img" src={image} alt="" fetchPriority="low" />
      {!lowPower && (
        <video
          ref={videoRef}
          className={`bar-video-hover${hovered ? " visible" : ""}`}
          muted loop playsInline preload="none"
        />
      )}
    </div>
  );
}

const BAR_SLOTS: { cls: string; image: string; video: string }[] = [
  { cls: "bar-1", image: barImg1,      video: barVideo1 },
  { cls: "bar-2", image: barImgCamera, video: barVideo4 },
  { cls: "bar-3", image: barImg2,      video: barVideo2 },
  { cls: "bar-4", image: barImg3,      video: barVideo3 },
];

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
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="*" element={<HomePage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
        </Routes>
      </Suspense>
    </>
  );
}

function HomeCard({ card }: { card: Card }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const lowPower = useLowPowerDevice();

  const playVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!v.src && v.dataset.src) v.src = v.dataset.src;
    v.play().catch(() => {});
  };
  const stopVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const handleMouseEnter = () => {
    if (!card.hoverVideo || lowPower) return;
    setHovered(true);
    playVideo();
  };
  const handleMouseLeave = () => {
    if (!card.hoverVideo || lowPower) return;
    setHovered(false);
    stopVideo();
  };
  const handleTouch = (_e: React.PointerEvent) => { /* observer handles mobile */ };

  // Mobile: auto-play card video when scrolled into view instead of waiting for tap
  useEffect(() => {
    if (!card.hoverVideo || lowPower) return;
    if (!window.matchMedia("(max-width: 768px)").matches) return;
    const el = articleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      const v = videoRef.current;
      if (!v) return;
      if (entry.isIntersecting) {
        setHovered(true);
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else {
        setHovered(false);
        v.pause();
        v.currentTime = 0;
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [card.hoverVideo, lowPower]);

  return (
    <article
      ref={articleRef as React.Ref<HTMLElement>}
      className={`card img-${card.imageSide}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handleTouch}
    >
      <div className="card-media">
        <img src={card.image ?? eventPhoto} alt="Event" />
        {card.hoverVideo && !lowPower && (
          <video
            ref={videoRef}
            className={`card-hover-video${hovered ? " is-visible" : ""}`}
            data-src={card.hoverVideo}
            poster={crowdPoster}
            muted
            playsInline
            loop
            preload="none"
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
  const [cardsExpanded, setCardsExpanded] = useState(false);
  useReveal();
  useLazyVideoLoader();

  useEffect(() => {
    if (!cardsExpanded) return;
    const t = setTimeout(() => {
      document.querySelectorAll(".work-cards-expand .reveal:not(.is-visible)")
        .forEach(el => el.classList.add("is-visible"));
    }, 80);
    return () => clearTimeout(t);
  }, [cardsExpanded]);
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
          <LazyVideo className="hero-video" src={hapVideo} poster={hapPoster} mobilePoster={hapPosterMobile} />
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
          <svg className="nav-overlay__arrow" width="80" height="67" viewBox="0 0 120 100" fill="none" aria-hidden="true">
            <path d="M12 10 L108 50 L12 90 L32 52 L12 10Z" fill="var(--orange)" opacity="0.9" />
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
              {BAR_SLOTS.map((b) => (
                <span key={b.cls} className={`bar ${b.cls}`}>
                  <BarSlot image={b.image} videoSrc={b.video} />
                </span>
              ))}
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
          {/* First card — always visible */}
          <div className="reveal" style={{ '--reveal-delay': '0s' } as React.CSSProperties}>
            <HomeCard card={cards[0]} />
          </div>

          {/* Expand toggle + remaining 3 cards */}
          <div className="work-expand-wrap">
            <div
              role="button"
              tabIndex={0}
              className={`work-expand-btn${cardsExpanded ? " is-open" : ""}`}
              onClick={() => setCardsExpanded(v => !v)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setCardsExpanded(v => !v); } }}
              aria-expanded={cardsExpanded}
              aria-label={cardsExpanded ? "Collapse" : "Explore More"}
            >
              <span className="work-expand-line" />
              <span className="work-expand-inner">
                {cardsExpanded ? "Collapse" : "Explore More"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="work-expand-line" />
            </div>

            <div className={`work-cards-expand${cardsExpanded ? " is-open" : ""}`} aria-hidden={!cardsExpanded}>
              <div className="work-cards-expand-inner">
                {cards.slice(1).map((card, i) => (
                  <div key={i + 1} className="reveal" style={{ '--reveal-delay': `${(i + 1) * 0.1}s` } as React.CSSProperties}>
                    <HomeCard card={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>

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
