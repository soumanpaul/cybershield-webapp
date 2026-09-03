import {
  Gamepad2,
  Menu,
  Search,
  ShieldAlert,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import type { TabId } from "./types";

interface DashboardTab {
  id: TabId;
  label: string;
  detail: string;
  icon: LucideIcon;
  urgent?: boolean;
}

interface DashboardNavigationProps {
  activeTab: TabId;
  mobileNavOpen: boolean;
  onMobileNavToggle: () => void;
  onTabSelect: (tab: TabId) => void;
}

const DASHBOARD_TABS: DashboardTab[] = [
  { id: "awareness", label: "Cyber Scam Awareness", detail: "Learn & protect", icon: ShieldCheck },
  { id: "simulator", label: "Experience Scam", detail: "Scam simulator", icon: Gamepad2 },
  { id: "analyzer", label: "AI Scam Analyzer", detail: "Check suspicious content", icon: Search },
  { id: "report", label: "I Have Been Scammed", detail: "Get help & report", icon: ShieldAlert, urgent: true },
];

export function DashboardNavigation({ activeTab, mobileNavOpen, onMobileNavToggle, onTabSelect }: DashboardNavigationProps) {
  const activeTabLabel = DASHBOARD_TABS.find((tab) => tab.id === activeTab)?.label;

  return (
    <nav className={`safety-tabs ${mobileNavOpen ? "open" : ""}`} aria-label="Cyber safety services">
      <button className="mobile-nav-toggle" onClick={onMobileNavToggle} aria-expanded={mobileNavOpen}>
        {mobileNavOpen ? <X /> : <Menu />}
        <span>{activeTabLabel}</span>
      </button>
      <div className="tab-list">
        {DASHBOARD_TABS.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              data-testid={`tab-${tab.id}`}
              className={`${activeTab === tab.id ? "active" : ""} ${tab.urgent ? "urgent" : ""}`}
              onClick={() => onTabSelect(tab.id)}
              aria-pressed={activeTab === tab.id}
            >
              <span className="tab-number">{index + 1}</span>
              <Icon />
              <span><strong>{tab.label}</strong><small>{tab.detail}</small></span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
