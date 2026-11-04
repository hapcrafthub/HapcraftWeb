"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { useEscape } from "@/hooks/useEscape";
import PageHeader from "./PageHeader";
import ApNavOverlay from "./ApNavOverlay";
import ContactModal from "./ContactModal";
import SocialLinks from "./SocialLinks";
import SiteFooter from "./SiteFooter";
import foundersImg from "@/assets/founders.webp";

const Spark = ({ style, fill = "currentColor" }: { style?: React.CSSProperties; fill?: string }) => (
  <svg viewBox="0 0 100 100" style={style} aria-hidden="true">
    <path d="M50 0 C54.5 31 31 45.5 0 50 C31 54.5 54.5 69 50 100 C45.5 69 69 54.5 100 50 C69 45.5 45.5 31 50 0 Z" fill={fill} />
  </svg>
);

export default function AboutView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  useReveal();

  const closeAll = useCallback(() => { setMenuOpen(false); setContactOpen(false); }, []);
  useEscape(closeAll);

  const openContact = () => { setContactOpen(true); setMenuOpen(false); };
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <div className="about-page">

      <PageHeader menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <ApNavOverlay open={menuOpen} onClose={closeMenu} active="/about" />

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
          <Link href="/services" className="ap-pill-btn">Explore Our Services</Link>
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
          <Image
            src={foundersImg}
            alt="Hapcraft Media Founders — Aditi Shori and Avichal Mishra"
            className="ap-founders-img"
            sizes="100vw"
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
              <p className="ap-card-body">From Government Institutions To Food Startups, Vedic Lifestyle Events To Digital Platforms — We&apos;ve Built Strategies That Drive Real, Measurable Results.</p>
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
          <h2 className="ap-cta-heading">Let&apos;s Build Something<br />People Won&apos;t Forget.</h2>
          <div className="ap-cta-actions">
            <button className="ap-pill-btn" onClick={openContact}>Get In Touch</button>
            <SocialLinks />
          </div>
        </div>
      </section>

      <SiteFooter />

      {contactOpen && <ContactModal onClose={closeContact} />}
    </div>
  );
}
