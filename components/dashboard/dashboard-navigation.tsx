"use client";

import {
  Gamepad2,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type LanguageCode, useDashboardLanguage } from "./language-provider";
import type { TabId } from "./types";

interface DashboardTab {
  id: TabId;
  label: string;
  detail?: string;
  icon: LucideIcon;
  urgent?: boolean;
}

interface DashboardNavigationProps {
  activeTab: TabId;
  onTabSelect: (tab: TabId) => void;
}

const DASHBOARD_TABS: DashboardTab[] = [
  { id: "awareness", label: "Cyber Scam Awareness", icon: ShieldCheck },
  { id: "simulator", label: "Experience Scam", detail: "(Scam Simulator)", icon: Gamepad2 },
  { id: "analyzer", label: "AI Cyber Scam Analyzer", icon: Search },
  { id: "report", label: "I Have Been Scammed", detail: "(Report a Scam)", icon: ShieldAlert, urgent: true },
];

export function DashboardNavigation({ activeTab, onTabSelect }: DashboardNavigationProps) {
  const { language, setLanguage, t } = useDashboardLanguage();

  return (
    <nav className="sticky top-0 z-20 w-full bg-slate-50 p-1 [font-family:Arial,sans-serif]" aria-label="Cyber safety services">
      <div className="overflow-x-auto rounded-lg bg-gradient-to-r  from-[#073b86] via-[#063478] to-[#052e69] shadow-[0_3px_9px_rgba(4,43,104,.2)]">
        <div
          className="grid min-w-[756px] grid-cols-[196px_repeat(4,140px)] overflow-hidden rounded-lg bg-[#063478] min-[900px]:min-w-0 min-[900px]:grid-cols-[196px_repeat(4,minmax(0,1fr))] min-[1100px]:grid-cols-[196px_1fr_0.93fr_1.2fr_0.95fr_minmax(270px,1fr)]"
        >
          <Button
            variant="ghost"
            data-testid="tab-home"
            className={cn(
              "flex h-[60px] items-center justify-start gap-2.5 rounded-none border-r border-white/10 bg-gradient-to-r from-[#073475] to-[#063b88] px-4 text-white hover:from-[#083c82] hover:to-[#074493] hover:text-white",
              activeTab === "home" && "from-[#06295d] to-[#08417f] shadow-[inset_0_-3px_0_#69aee2]",
            )}
            onClick={() => onTabSelect("home")}
            aria-pressed={activeTab === "home"}
          >
            <span className="grid size-6 place-items-center rounded-full bg-white text-[#174d91] shadow-sm">
              <ShieldCheck className="size-4" strokeWidth={2.4} />
            </span>
            <strong className="whitespace-nowrap text-[13px] font-bold tracking-[-.25px]">Cyber Suraksha</strong>
          </Button>

          {DASHBOARD_TABS.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;

            return (
              <Button
                key={tab.id}
                variant="ghost"
                data-testid={`tab-${tab.id}`}
                className={cn(
                  "h-[60px] justify-start rounded-none border-b border-white/10 px-7 text-left text-white hover:bg-[#07509f] hover:text-white sm:border-r sm:border-b-0 sm:px-5",
                  selected && "relative z-10 bg-gradient-to-r from-[#0b3978] to-[#075aa9] shadow-[inset_0_1px_0_rgba(255,255,255,.28),inset_0_-2px_0_#69aee2] hover:from-[#0b3978] hover:to-[#075aa9]",
                  tab.urgent && "bg-gradient-to-r from-[#ee4c49] to-[#ef5b51] shadow-[inset_0_2px_0_#ff746b] hover:from-[#ee4c49] hover:to-[#ef5b51]",
                  tab.urgent && selected && "from-[#a9222b] to-[#cf353b] shadow-[inset_0_1px_0_rgba(255,255,255,.3),inset_0_-2px_0_#f28c91] hover:from-[#a9222b] hover:to-[#cf353b]",
                )}
                onClick={() => onTabSelect(tab.id)}
                aria-pressed={selected}
              >
                <Icon className={cn("size-[17px] shrink-0", selected && "size-5")} strokeWidth={selected ? 2.4 : 1.8} />
                <span className="min-w-0">
                  <strong className={cn("block whitespace-nowrap text-[9px] font-bold leading-[1.15] transition-all", selected && "text-[13px] tracking-[-.25px]")}>{t(tab.label)}</strong>
                  {tab.detail && <small className="mt-0.5 block whitespace-nowrap text-[8px] font-semibold leading-none text-white">{t(tab.detail)}</small>}
                </span>
              </Button>
            );
          })}

          <div className="hidden h-[60px] items-center justify-end gap-2.5 bg-slate-50 px-3 min-[1100px]:flex">
            <div className="flex h-10 items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm" role="group" aria-label="Language">
              {(["EN", "HI", "BN"] as LanguageCode[]).map((code) => (
                <Button
                  key={code}
                  type="button"
                  variant="ghost"
                  className={cn(
                    "h-8 w-11 rounded-full p-0 text-[11px] font-semibold text-slate-600 hover:bg-slate-100",
                    language === code && "bg-slate-900 font-bold text-white shadow-sm hover:bg-slate-900 hover:text-white",
                  )}
                  aria-pressed={language === code}
                  onClick={() => setLanguage(code)}
                >
                  {code}
                </Button>
              ))}
            </div>
            <Button asChild className="h-10 rounded-full border-2 border-red-200 bg-red-500 px-5 text-xs font-bold text-white shadow-md shadow-red-500/20 hover:bg-red-600">
              <a href="tel:1930" aria-label={t("Call 1930")} title={t("Call 1930")}><Phone className="size-4" />{t("Call 1930")}</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
