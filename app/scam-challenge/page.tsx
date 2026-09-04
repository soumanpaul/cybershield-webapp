import type { Metadata } from "next";
import { ScamChallenge } from "@/components/scam-challenge";

export const metadata: Metadata = {
  title: "Scam Challenge | Cyber Suraksha",
  description: "Scan, play, and learn how to spot real-world cyber scams safely.",
};

export default function ScamChallengePage() {
  return <ScamChallenge />;
}
