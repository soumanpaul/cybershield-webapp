import type { Metadata } from "next";
import { IncidentDashboard } from "@/components/incident-dashboard";

export const metadata: Metadata = {
  title: "Captured Data | Cyber Suraksha",
  description: "View and manage user data received from connected applications.",
};

export default function CapturedDataPage() {
  return <IncidentDashboard />;
}
