import type { Metadata } from "next";
import { ScamSimulator } from "@/components/scam-simulator";

export const metadata: Metadata = {
  title: "Online Scam Simulator | CyberShield Awareness Lab",
  description: "A consent-based online scam awareness training simulation.",
};

export default function ScamSimulatorPage() {
  return <ScamSimulator />;
}
