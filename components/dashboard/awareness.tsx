"use client";

import { ChevronRight, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDashboardLanguage } from "./language-provider";
import { SCAM_CATEGORIES, type ScamDetail, type ScamTone } from "./scam-data";
import { ScamDetailsDialog } from "./scam-details-dialog";

const CATEGORY_TONES: Record<ScamTone, string> = {
  blue: "bg-gradient-to-br from-blue-100 to-cyan-50 text-blue-700 ring-1 ring-blue-200",
  green: "bg-gradient-to-br from-emerald-100 to-green-50 text-emerald-700 ring-1 ring-emerald-200",
  violet: "bg-gradient-to-br from-violet-100 to-fuchsia-50 text-violet-700 ring-1 ring-violet-200",
  orange: "bg-gradient-to-br from-amber-100 to-orange-50 text-orange-600 ring-1 ring-orange-200",
  pink: "bg-gradient-to-br from-pink-100 to-rose-50 text-pink-700 ring-1 ring-pink-200",
};

export function Awareness() {
  const { t } = useDashboardLanguage();
  const [selectedScam, setSelectedScam] = useState<ScamDetail | null>(null);

  const showCategories = () => {
    document.getElementById("awareness-categories")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Card className="mx-auto max-w-6xl overflow-hidden rounded-xl border-blue-100 shadow-lg shadow-blue-950/5">
        <CardContent className="p-0">
          <section className="grid min-h-52 overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white to-blue-50 px-6 py-7 sm:grid-cols-[1fr_.72fr] sm:px-9">
            <div className="relative z-10">
              <h1 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-tight text-blue-700 sm:text-base">
                <span className="text-blue-600">1.</span> {t("Cyber Scam Awareness")}
              </h1>
              <p className="mt-4 max-w-md text-[11px] font-medium leading-6 text-slate-600">
                {t("Learn about common cyber scams and stay protected.")}
              </p>
              <Button onClick={showCategories} className="mt-5 h-10 bg-gradient-to-r from-blue-500 to-blue-600 px-4 text-[10px] font-bold hover:from-blue-600 hover:to-blue-700">
                {t("Explore Scams")} <ChevronRight className="ml-3 size-3" />
              </Button>
            </div>

            <div className="relative hidden min-h-40 items-center justify-center sm:flex" aria-hidden="true">
              <Image
                src="/assets/cyber-safety/awareness-people.png"
                alt=""
                width={420}
                height={280}
                className="max-h-52 w-full object-contain"
              />
            </div>
          </section>

          <section id="awareness-categories" className="px-4 py-5 sm:px-7">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 sm:text-sm">{t("Top scam categories")}</h2>
              <Button variant="ghost" size="sm" onClick={showCategories} className="h-7 px-2 text-[9px] font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-700">{t("View All")}</Button>
            </div>

            <div className="grid grid-cols-2 justify-center justify-items-center gap-2 sm:grid-cols-[repeat(3,155px)] md:grid-cols-[repeat(4,170px)]">
              {SCAM_CATEGORIES.map((scam) => {
                const { name, icon: Icon, tone } = scam;
                return (
                <button key={name} type="button" aria-haspopup="dialog" onClick={() => setSelectedScam(scam)} className="group flex min-h-16 w-full max-w-[170px] flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                  <span className={cn("grid size-9 place-items-center rounded-lg shadow-sm", CATEGORY_TONES[tone])}><Icon className="size-5" strokeWidth={2.2} /></span>
                  <strong className="text-[10px] font-bold leading-tight text-slate-800 sm:text-[11px]">{t(name)}</strong>
                </button>
                );
              })}
            </div>
          </section>

          <section className="mx-4 mb-5 flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 sm:mx-7">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-700"><ShieldCheck className="size-5" /></span>
            <div className="flex-1"><strong className="block text-[9px] text-blue-900">{t("Remember")}</strong><p className="mt-1 text-[8px] leading-4 text-slate-600">{t("Think before you click. Verify before you trust. Report suspicious activity to protect yourself and others.")}</p></div>
            <ShieldAlert className="hidden size-8 text-blue-800 sm:block" />
          </section>
        </CardContent>
      </Card>
      <ScamDetailsDialog scam={selectedScam} onOpenChange={(open) => { if (!open) setSelectedScam(null); }} />
    </div>
  );
}
