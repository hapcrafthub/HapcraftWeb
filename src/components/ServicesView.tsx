"use client";

import { useState, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { useEscape } from "@/hooks/useEscape";
import PageHeader from "./PageHeader";
import ApNavOverlay from "./ApNavOverlay";
import ContactModal from "./ContactModal";
import SocialLinks from "./SocialLinks";
import SiteFooter from "./SiteFooter";
import imgAiCreative   from "@/assets/service-ai-creative.webp";
import imgWebsite      from "@/assets/service-website.webp";
import imgAiInfra      from "@/assets/service-ai-infra.webp";
import imgContent      from "@/assets/service-content.webp";
import imgProduct      from "@/assets/service-product.webp";
import imgPerformance  from "@/assets/service-performance.webp";

interface ServiceCard {
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: StaticImageData;
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

export default function ServicesView() {
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
      <ApNavOverlay open={menuOpen} onClose={closeMenu} active="/services" />

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
                  <Image src={s.image} alt={s.title.replace("\n", " ")} sizes="(max-width: 900px) 100vw, 50vw" />
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
