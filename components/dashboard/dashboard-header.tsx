import Image from "next/image";

export function DashboardHeader() {
  return (
    <header className="safety-hero">
      <Image
        src="/assets/cyber-safety/header-banner.png"
        alt="Cyber Suraksha safety guidance and financial cyber fraud helpline 1930"
        fill
        priority
        sizes="100vw"
      />
    </header>
  );
}
