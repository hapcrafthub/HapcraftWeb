"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { useEscape } from "@/hooks/useEscape";
import PageHeader from "./PageHeader";
import NavOverlay from "./NavOverlay";
import SiteFooter from "./SiteFooter";
import crowdAerial from "@/assets/crowd-aerial.webp";
import govtMeeting from "@/assets/govt-meeting.webp";
import mrPotato from "@/assets/mr-potato-photo.webp";
import jobipo from "@/assets/jobipo-new.webp";
import gitaJayanti from "@/assets/gita-jayanti.webp";
import vedicTree from "@/assets/vedic-tree.jpg";
import cafeRiverio from "@/assets/cafe-riverio.webp";
import frillsBrand from "@/assets/frills-brand.webp";
import goeLogo from "@/assets/goe-logo-photo.webp";

interface WorkCard {
  title: string;
  description: string;
  image: StaticImageData;
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
      hoverVideo: "https://res.cloudinary.com/di1udlyci/video/upload/q_auto,f_auto,w_900/iams_vid_flkxaa.mp4",
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
        if (!v.src) v.src = card.hoverVideo!;
        v.play().catch(() => {});
      } else {
        setHovered(false);
        v.pause();
        v.currentTime = 0;
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [card.hoverVideo]);

  return (
    <article
      ref={containerRef}
      className={`wp-card wp-card--${slot} ${isLarge ? "wp-card--col" : "wp-card--row"}${card.contain ? " wp-card--contain" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handleTouch}
    >
      <div className="wp-card__media">
        <Image src={card.image} alt={card.title} sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"} />
        {card.hoverVideo && (
          <video
            ref={videoRef}
            className={`wp-card__hover-video${hovered ? " is-visible" : ""}`}
            src={card.hoverVideo}
            muted
            playsInline
            loop
            preload="none"
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

export default function WorkView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useEscape(closeMenu);
  useReveal();

  return (
    <div className="work-page">
      <PageHeader menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <NavOverlay open={menuOpen} onClose={closeMenu} />

      {/* ===== HERO ===== */}
      <section className="wp-hero">
        <h1 className="wp-hero-title reveal">Our Work</h1>
      </section>

      {/* ===== GRID ===== */}
      <main className="wp-grid-wrap">
        <div className="wp-grid">
          {groups.map((group, i) => (
            <div key={group.large.title} className={`wp-group wp-group--${group.largeSide} reveal`} style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}>
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
