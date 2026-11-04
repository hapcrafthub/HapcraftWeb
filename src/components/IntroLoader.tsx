"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logoSrc from "@/assets/logo.webp";

const LOGO_SIZES = "(max-width: 575px) 300px, 52vw";

/**
 * Wordmark intro. It lives in the root layout, which stays mounted across page changes,
 * so it plays once per visit and not on every navigation.
 */
export default function IntroLoader() {
  const [hiding, setHiding] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHiding(true), 1000);
    const doneTimer = setTimeout(() => setDone(true), 1400);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, []);

  if (done) return null;

  return (
    <div className={`il${hiding ? " il--hide" : ""}`}>
      <div className="il-logo-wrap">
        <Image className="il-logo il-logo-ghost" src={logoSrc} alt="Hapcraft" sizes={LOGO_SIZES} priority />
        <Image className="il-logo il-logo-fill" src={logoSrc} alt="" aria-hidden="true" sizes={LOGO_SIZES} priority />
      </div>
    </div>
  );
}
