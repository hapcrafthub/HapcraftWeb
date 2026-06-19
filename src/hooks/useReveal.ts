import { useEffect } from "react";

export function useReveal(rootMargin = "0px 0px -60px 0px") {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}
