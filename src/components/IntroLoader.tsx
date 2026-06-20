import { useEffect, useState } from "react";
import logoSrc from "../assets/logo.png";

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHiding(true), 1000);
    const doneTimer = setTimeout(onDone, 1400);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div className={`il${hiding ? " il--hide" : ""}`}>
      <div className="il-glow" />
      <div className="il-logo-wrap">
        {/* ghost — barely visible */}
        <img className="il-logo il-logo-ghost" src={logoSrc} alt="Hapcraft" />
        {/* fill — wiped in left to right */}
        <img className="il-logo il-logo-fill" src={logoSrc} alt="" aria-hidden="true" />
      </div>
    </div>
  );
}
