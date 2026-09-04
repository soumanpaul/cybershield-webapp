"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronRight,
  HeartCrack,
  IdCard,
  KeyRound,
  PackageSearch,
  QrCode,
  ShieldAlert,
  Trophy,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { KycSimulationPanel } from "./kyc-simulation-panel";
import { useDashboardLanguage } from "./language-provider";

type RiskLevel = "High Risk" | "Medium Risk";

interface SimulationCategory {
  name: string;
  risk: RiskLevel;
  score: number;
  icon: LucideIcon;
  iconStyle: string;
}

const SIMULATION_CATEGORIES: SimulationCategory[] = [
  { name: "Digital Arrest", risk: "High Risk", score: 85, icon: ShieldAlert, iconStyle: "bg-violet-50 text-violet-600" },
  { name: "UPI Collect Request", risk: "High Risk", score: 75, icon: WalletCards, iconStyle: "bg-blue-50 text-blue-600" },
  { name: "QR Code Scam", risk: "Medium Risk", score: 80, icon: QrCode, iconStyle: "bg-emerald-50 text-emerald-600" },
  { name: "OTP Scam", risk: "High Risk", score: 90, icon: KeyRound, iconStyle: "bg-pink-50 text-pink-600" },
  { name: "Fake Online Certification Scam", risk: "Medium Risk", score: 76, icon: BadgeCheck, iconStyle: "bg-amber-50 text-amber-600" },
  { name: "KYC Scam", risk: "High Risk", score: 88, icon: IdCard, iconStyle: "bg-blue-50 text-blue-600" },
  { name: "Sextortion", risk: "High Risk", score: 83, icon: HeartCrack, iconStyle: "bg-pink-50 text-pink-600" },
  { name: "Fake Investment", risk: "High Risk", score: 70, icon: ChartNoAxesCombined, iconStyle: "bg-rose-50 text-rose-600" },
  { name: "Fake Job", risk: "Medium Risk", score: 78, icon: BriefcaseBusiness, iconStyle: "bg-violet-50 text-violet-600" },
  { name: "Courier / Customs Scam", risk: "Medium Risk", score: 82, icon: PackageSearch, iconStyle: "bg-indigo-50 text-indigo-600" },
];

export function Simulator() {
  const { t } = useDashboardLanguage();
  const [kycSimulationOpen, setKycSimulationOpen] = useState(false);
  const showSimulationCategories = () => {
    document.getElementById("simulation-categories")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Card className="mx-auto max-w-6xl overflow-hidden rounded-xl border-violet-100 shadow-lg shadow-violet-950/5">
        <CardContent className="p-0">
          <section className="grid min-h-56 overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-white to-violet-50 px-6 py-7 sm:grid-cols-[1fr_.78fr] sm:px-9">
            <div className="relative z-10 flex flex-col items-start justify-center">
              <h1 className="flex items-start gap-2 text-xs font-extrabold uppercase leading-tight text-violet-700 sm:text-base">
                <span className="text-violet-600">2.</span>
                <span>{t("Experience Scam")}<br /><span className="text-[10px] sm:text-xs">{t("(Scam Simulator)")}</span></span>
              </h1>
              <p className="mt-4 max-w-md text-[11px] font-medium leading-6 text-slate-600">{t("Practice. Learn. Stay one step ahead.")}</p>
              <Button onClick={showSimulationCategories} className="mt-5 h-10 bg-gradient-to-r from-violet-600 to-violet-700 px-4 text-[10px] font-bold shadow-md shadow-violet-600/20 hover:from-violet-700 hover:to-violet-800">
                {t("Start Simulation")} <ChevronRight className="ml-3 size-3" />
              </Button>
            </div>

            <div className="relative hidden min-h-44 items-center justify-center sm:flex" aria-hidden="true">
              <div className="absolute right-1 top-2 z-10 flex items-center gap-2 rounded-xl border border-violet-100 bg-white/90 px-3 py-2 text-violet-700 shadow-sm backdrop-blur">
                <Trophy className="size-4" />
                <span className="text-[9px] font-bold leading-tight">{t("Score")}<strong className="block text-xs text-blue-950">820</strong></span>
              </div>
              <Image src="/assets/cyber-safety/scam-simulator-hero.png" alt="" width={1481} height={1062} className="max-h-56 w-full object-contain" priority />
            </div>
          </section>

          <section id="simulation-categories" className="scroll-mt-20 px-4 py-5 sm:px-7 sm:py-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-extrabold text-slate-900 sm:text-sm">{t("Simulation Categories")}</h2>
              <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-[9px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-700"><Link href="/scam-simulator">{t("View All")}</Link></Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              {SIMULATION_CATEGORIES.map(({ name, risk, score, icon: Icon, iconStyle }) => {
                const categoryContent = (
                  <>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg", iconStyle)}><Icon className="size-4" strokeWidth={2.1} /></span>
                    <strong className="truncate text-[9px] font-bold text-slate-700 sm:text-[11px]">{t(name)}</strong>
                  </span>
                  <span className={cn("text-center text-[8px] font-bold sm:text-[10px]", risk === "High Risk" ? "text-red-500" : "text-emerald-600")}>{t(risk)}</span>
                  <span className="text-right text-[8px] font-semibold text-slate-500 sm:text-[10px]">{t("Score")} <strong className="text-slate-800">{score}/100</strong></span>
                  </>
                );
                const categoryClassName = "group grid min-h-11 w-full grid-cols-[minmax(0,1fr)_72px_72px] items-center gap-2 border-b border-slate-100 px-3 text-left transition last:border-b-0 hover:bg-violet-50/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500/40 sm:grid-cols-[minmax(0,1fr)_110px_90px] sm:px-4";

                if (name === "KYC Scam") {
                  return <button key={name} type="button" onClick={() => setKycSimulationOpen(true)} className={categoryClassName} aria-haspopup="dialog">{categoryContent}</button>;
                }

                return <Link key={name} href="/scam-simulator" className={categoryClassName}>{categoryContent}</Link>;
              })}
            </div>
          </section>
        </CardContent>
      </Card>
      <KycSimulationPanel open={kycSimulationOpen} onOpenChange={setKycSimulationOpen} />
    </div>
  );
}
