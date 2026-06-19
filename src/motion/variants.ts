import type { Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;
export const easeIn = [0.4, 0, 1, 1] as const;

/** Viewport default — fires once, slight bottom margin so it triggers early */
export const vp = { once: true, margin: "0px 0px -70px 0px" } as const;

/** Fade + slide up — primary scroll reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 42 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease } },
};

/** Smaller lift — cards, chips, smaller items */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

/** Pure opacity fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Scale + fade — founders photo, hero imagery */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
};

/** Stagger container — slower, for section introductions */
export const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

/** Stagger container — faster, for card grids */
export const staggerFast: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

/** Full-screen nav overlay — slides from top */
export const overlayVariants: Variants = {
  hidden: { y: "-100%" },
  show:   { y: 0,       transition: { duration: 0.52, ease } },
  exit:   { y: "-100%", transition: { duration: 0.42, ease: easeIn } },
};

/** Individual nav link inside overlay */
export const navLinkItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease } },
};

/** Spark / decorative icon in overlay */
export const sparkReveal: Variants = {
  hidden: { opacity: 0, scale: 0.55, rotate: -18 },
  show:   { opacity: 0.9, scale: 1, rotate: 0, transition: { duration: 0.65, ease, delay: 0.18 } },
};
