import type { ReactNode } from "react";

interface ScreenTitleProps {
  number: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  urgent?: boolean;
}

export function ScreenTitle({ number, icon, title, subtitle, urgent = false }: ScreenTitleProps) {
  return (
    <div className={`screen-title ${urgent ? "urgent" : ""}`}>
      <div className="section-index">{number}</div>
      <span>{icon}</span>
      <div><h2>{title}</h2><p>{subtitle}</p></div>
    </div>
  );
}
