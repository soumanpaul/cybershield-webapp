import type { Metadata } from "next";
import { IncidentDashboard } from "@/components/incident-dashboard";

export const metadata: Metadata = {
  title: "Incident Data Dashboard | Cyber Suraksha",
  description: "Secure view of scam awareness and incident records.",
};

export default function DataDashboardPage() {
  return <IncidentDashboard />;
}
