"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { useEscape } from "@/hooks/useEscape";
import hapMask from "@/assets/hap-mask.webp";
import crowdAerial from "@/assets/crowd-aerial.webp";
import govtMeeting from "@/assets/govt-meeting.webp";
import mrPotato from "@/assets/mr-potato-photo.webp";
import jobipoCard from "@/assets/jobipo-card.webp";
import barImg1 from "@/assets/bar-img-1.webp";
import barImg2 from "@/assets/bar-img-2.webp";
import barImg3 from "@/assets/bar-img-3.webp";
import barImgCamera from "@/assets/bar-img-camera.webp";
import Logo from "./Logo";
import NavOverlay from "./NavOverlay";
import SocialLinks from "./SocialLinks";
import SiteFooter from "./SiteFooter";

const CLOUDINARY = "https://res.cloudinary.com/di1udlyci/video/upload";
// Optimized delivery: automatic format + quality, width-capped, progressive/streaming.
const HERO_TX = "q_auto,f_auto,w_1280";
const CROWD_TX = "q_auto,f_auto,w_900";
const CROWD_POSTER_TX = "so_0,w_900,f_jpg,q_auto";

const HERO_ID = "sux_1_nkr4ij";
const CROWD_ID = "iams_vid_flkxaa"; // Arya Mahasammelan crowd hover video

const hapVideo = `${CLOUDINARY}/${HERO_TX}/${HERO_ID}.mp4`;
const hapPoster = `${CLOUDINARY}/so_0,w_1280,f_jpg,q_auto/${HERO_ID}.jpg`;
const hapPosterMobile = `${CLOUDINARY}/so_0,w_720,f_jpg,q_auto/${HERO_ID}.jpg`;
const crowdVideo = `${CLOUDINARY}/${CROWD_TX}/${CROWD_ID}.mp4`;
const crowdPoster = `${CLOUDINARY}/${CROWD_POSTER_TX}/${CROWD_ID}.jpg`;

// Reads a media query without breaking server rendering: the server (and the first browser
// render, while hydrating) assume "no match", then the real value takes over.
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

const useLowPowerDevice = () => useMediaQuery("(prefers-reduced-motion: reduce)");
const useIsNarrowScreen = () => useMediaQuery("(max-width: 767px)");

type LazyVideoProps = {
  src: string;
  poster: string;
  mobilePoster?: string;
  className?: string;
};
function LazyVideo({ src, poster, mobilePoster, className }: LazyVideoProps) {
  const lowPower = useLowPowerDevice();
  const narrow = useIsNarrowScreen();
  const activePoster = mobilePoster && narrow ? mobilePoster : poster;
  if (lowPower) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- remote video poster, not a site image
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

function BarSlot({ image }: { image: StaticImageData }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        img.classList.add("bar-entered");
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(img);
    const onEnd = () => img.classList.remove("bar-entered");
    img.addEventListener("animationend", onEnd, { once: true });
    return () => { observer.disconnect(); img.removeEventListener("animationend", onEnd); };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Image ref={imgRef} className="bar-img" src={image} alt="" sizes="(max-width: 768px) 90vw, 45vw" fetchPriority="low" />
    </div>
  );
}

const BAR_SLOTS: { cls: string; image: StaticImageData }[] = [
  { cls: "bar-1", image: barImg1 },
  { cls: "bar-2", image: barImg3 },      // swapped: was barImgCamera
  { cls: "bar-3", image: barImgCamera },
  { cls: "bar-4", image: barImg2 },      // girl with phones
];

type Card = { image: StaticImageData; hoverVideo?: string; title: string; summary: string };

const cards: Card[] = [
  {
    image: crowdAerial,
    hoverVideo: crowdVideo,
    title: "co-Organised one of the world's biggest Event",
    summary: "We co-organized the Antarrashtriya Arya Mahasammelan 2025 in Delhi, managing the Vedic lifestyle and ancient education system vertical. The event successfully catered to a gathering of over 4.5 lakh people.",
  },
  {
    image: govtMeeting,
    title: "Honoured to be the strategic partner in the government program",
    summary: "We served as a strategic partner in an official government program, joining a high-level meeting with the Governor of Gujarat, Acharya Devvrat.",
  },
  {
    image: mrPotato,
    title: "Designed & Strategized the fastest scalable food chain",
    summary: "We developed the strategic expansion plan for the Hyderabad-based food chain, Mr. Potato. The scalable model achieved rapid profitability and became a favorite among children.",
  },
  {
    image: jobipoCard,
    title: "Repostioned india's smartest Affiliate Platform: JOBIPO",
    summary: "We served as the brand strategist for Jobipo, designing a content strategy to attract their target audience. This targeted approach successfully generated all organic outreach for the platform.",
  },
];

function HomeCard({ card }: { card: Card }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
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
      ref={articleRef}
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-media">
        <Image src={card.image} alt={card.title} sizes="(max-width: 768px) 100vw, 50vw" />
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
      </div>
      {showSummary && <p className="card-summary">{card.summary}</p>}
      <button
        className={`card-tab${showSummary ? " is-open" : ""}`}
        onClick={(e) => { e.stopPropagation(); setShowSummary(v => !v); }}
        aria-label={showSummary ? "Hide details" : "Show details"}
      >
        <span className="card-tab-label">{showSummary ? "Read less" : "Read more"}</span>
      </button>
    </article>
  );
}

export default function HomeView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useEscape(closeMenu);
  useReveal();
  useLazyVideoLoader();

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
            WebkitMaskImage: `url(${hapMask.src})`,
            maskImage: `url(${hapMask.src})`,
          }}
          aria-label="Hapcraft"
        >
          <LazyVideo className="hero-video" src={hapVideo} poster={hapPoster} mobilePoster={hapPosterMobile} />
        </div>
      </header>

      {/* ===================== NAV OVERLAY ===================== */}
      <NavOverlay open={menuOpen} onClose={closeMenu} />

      {/* ===================== INTRO ===================== */}
      <section className="intro reveal">
        <div className="intro-inner">
          <div className="intro-left">
            <div className="headline-art">
              {BAR_SLOTS.map((b) => (
                <span key={b.cls} className={`bar ${b.cls}`}>
                  <BarSlot image={b.image} />
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
            <Link className="contact-btn" href="/services">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== WORK ===================== */}
      <section className="work">
        <div className="work-inner">
          {/* All 4 cards in a 2-column grid */}
          <div className="work-cards-grid">
            {cards.map((card, i) => (
              <div key={card.title} className="reveal" style={{ '--reveal-delay': `${i * 0.08}s` } as React.CSSProperties}>
                <HomeCard card={card} />
              </div>
            ))}
          </div>

          <div className="work-cta">
            <div className="ap-cta-actions">
              <Link className="view-more" href="/work">
                Explore more
              </Link>
              <SocialLinks />
            </div>
          </div>
        </div>
        <div style={{ padding: "60px 20px", maxWidth: "900px", margin: "0 auto", color: "#fff" }}>
          <p style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center", marginBottom: "50px" }}>
            Hapcraft (Hapcraft Media Private Limited) is a media production company that builds AI-powered ecosystems and executes world-class branding and marketing strategies to help businesses stand out.
          </p>

          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Frequently Asked Questions</h2>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Q: What core technical services does Hapcraft provide?</h3>
            <p style={{ fontSize: "18px" }}>A: We specialize in custom web development, building AI-powered business infrastructure, and implementing advanced AI automation to help your business scale efficiently.</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Q: How do you approach content creation for brands?</h3>
            <p style={{ fontSize: "18px" }}>A: We focus on AI content creation and high-quality cinematographic media. We produce premium branded content designed specifically to make your brand stand out and dominate on social media.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
