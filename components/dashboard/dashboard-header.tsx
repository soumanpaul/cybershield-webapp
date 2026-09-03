import Image from "next/image";
import headerBanner from "../../ux/banner.png";

export function DashboardHeader() {
  return (
    <header className="relative aspect-[1941/250] w-full overflow-hidden bg-blue-100">
      <Image
        src={headerBanner}
        alt="Cyber Suraksha safety guidance and financial cyber fraud helpline 1930"
        fill
        priority
        sizes="80vw"
        className="h-full w-full object-fill"
      />
    </header>
  );
}
