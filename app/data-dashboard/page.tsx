import type { Metadata } from "next";
import { IncidentDashboard } from "@/components/incident-dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Cyber Suraksha",
  description: "Open Cyber Scam Awareness or view captured data.",
};

export default function DataDashboardPage() {
  return <IncidentDashboard landing />;
}
