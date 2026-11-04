import Image from "next/image";
import logoSrc from "@/assets/hap-logo-new.webp";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logoSrc}
      alt="Hapcraft Media"
      className={className}
      sizes="140px"
      loading="eager"
      draggable={false}
    />
  );
}
