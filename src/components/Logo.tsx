import logoSrc from "../assets/hap-logo-new.webp";

export default function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="Hapcraft Media"
      className={className}
      draggable={false}
    />
  );
}
