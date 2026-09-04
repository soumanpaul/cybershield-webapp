import type { Metadata } from "next";
import { PoliceAwarenessDashboard } from "@/components/police-awareness-dashboard";

export const metadata: Metadata = {
  title: "CyberRakshak Police Dashboard",
  description: "Cyber safety awareness insights for authorized police personnel.",
};

export default function DataDashboardPage() {
  return <PoliceAwarenessDashboard />;
}
