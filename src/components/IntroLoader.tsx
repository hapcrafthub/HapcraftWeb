import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHiding(true), 1000);
    const doneTimer = setTimeout(onDone, 1400);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div className={`il${hiding ? " il--hide" : ""}`}>
      <Logo className="il-wordmark" />
    </div>
  );
}
