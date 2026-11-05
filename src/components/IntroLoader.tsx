"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import logoSrc from "@/assets/logo.webp";

const LOGO_SIZES = "(max-width: 575px) 300px, 52vw";
const SEEN_KEY = "hap-intro";

const noopSubscribe = () => () => {};
function readSeen(): boolean {
  try { return sessionStorage.getItem(SEEN_KEY) === "1"; } catch { return false; }
}

/**
 * Wordmark intro. It lives in the root layout, which stays mounted across page changes, and it only
 * plays once per browser session: reloads and later visits in the same tab skip straight to the page.
 * (An inline script in the layout hides it before first paint when it has already been seen.)
 */
export default function IntroLoader() {
  const seen = useSyncExternalStore(noopSubscribe, readSeen, () => false);
  const [hiding, setHiding] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (seen) return;
    const fadeTimer = setTimeout(() => setHiding(true), 1000);
    const doneTimer = setTimeout(() => {
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* private mode: the intro just plays again next time */ }
      setDone(true);
    }, 1400);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [seen]);

  if (seen || done) return null;

  return (
    <div className={`il${hiding ? " il--hide" : ""}`}>
      <div className="il-logo-wrap">
        <Image className="il-logo il-logo-ghost" src={logoSrc} alt="Hapcraft" sizes={LOGO_SIZES} loading="eager" />
        <Image className="il-logo il-logo-fill" src={logoSrc} alt="" aria-hidden="true" sizes={LOGO_SIZES} loading="eager" />
      </div>
    </div>
  );
}
