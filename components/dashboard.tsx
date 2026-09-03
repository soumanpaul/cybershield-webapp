"use client";

import { useState } from "react";
import { Analyzer } from "./dashboard/analyzer";
import { Awareness } from "./dashboard/awareness";
import { DashboardFooter } from "./dashboard/dashboard-footer";
import { DashboardHeader } from "./dashboard/dashboard-header";
import { DashboardNavigation } from "./dashboard/dashboard-navigation";
import { DashboardLanguageProvider } from "./dashboard/language-provider";
import { DashboardOverview } from "./dashboard/dashboard-overview";
import { ReportHelp } from "./dashboard/report-help";
import { Simulator } from "./dashboard/simulator";
import type { TabId } from "./dashboard/types";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const selectTab = (tab: TabId) => {
    setActiveTab(tab);
  };

  return (
    <DashboardLanguageProvider>
      <main className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
        <DashboardHeader />
        <DashboardNavigation activeTab={activeTab} onTabSelect={selectTab} />
        <section className="mx-auto w-[calc(100%-28px)] max-w-[1440px] flex-1 py-5 sm:w-[calc(100%-48px)] sm:py-8">
          {activeTab === "home" && <DashboardOverview onNavigate={selectTab} />}
          {activeTab === "awareness" && <Awareness />}
          {activeTab === "simulator" && <Simulator />}
          {activeTab === "analyzer" && <Analyzer />}
          {activeTab === "report" && <ReportHelp />}
        </section>
        <DashboardFooter />
      </main>
    </DashboardLanguageProvider>
  );
}
