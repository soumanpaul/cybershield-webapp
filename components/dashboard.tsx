"use client";

import { useState } from "react";
import { Analyzer } from "./dashboard/analyzer";
import { Awareness } from "./dashboard/awareness";
import { DashboardFooter } from "./dashboard/dashboard-footer";
import { DashboardHeader } from "./dashboard/dashboard-header";
import { DashboardNavigation } from "./dashboard/dashboard-navigation";
import { ReportHelp } from "./dashboard/report-help";
import { Simulator } from "./dashboard/simulator";
import type { TabId } from "./dashboard/types";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("awareness");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const selectTab = (tab: TabId) => {
    setActiveTab(tab);
    setMobileNavOpen(false);
  };

  return (
    <main className="safety-site">
      <DashboardHeader />

      <DashboardNavigation
        activeTab={activeTab}
        mobileNavOpen={mobileNavOpen}
        onMobileNavToggle={() => setMobileNavOpen((isOpen) => !isOpen)}
        onTabSelect={selectTab}
      />

      <section className="safety-content">
        {/* {activeTab === "awareness" && (
          <Awareness onStart={() => selectTab("simulator")} />
        )} */}
        {/* {activeTab === "simulator" && <Simulator />} */}
        {/* {activeTab === "analyzer" && <Analyzer />} */}
        {activeTab === "report" && <ReportHelp />}
      </section>

      <DashboardFooter />
    </main>
  );
}
