import { ArrowLeft, CircleHelp } from "lucide-react";
import type { ReactNode } from "react";

interface DeviceFrameProps {
  title: string;
  children: ReactNode;
}

export function DeviceFrame({ title, children }: DeviceFrameProps) {
  return (
    <section className="device-frame">
      <header><ArrowLeft /><strong>{title}</strong><CircleHelp /></header>
      <div className="device-body">{children}</div>
    </section>
  );
}
