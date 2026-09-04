"use client";

import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useDashboardLanguage } from "./language-provider";
import type { ScamDetail, ScamTone } from "./scam-data";

interface ScamDetailsDialogProps {
  scam: ScamDetail | null;
  onOpenChange: (open: boolean) => void;
}

const TONE_STYLES: Record<ScamTone, { hero: string; icon: string; step: string }> = {
  blue: { hero: "from-blue-700 to-cyan-600", icon: "bg-blue-100 text-blue-700", step: "bg-blue-600" },
  green: { hero: "from-emerald-700 to-green-500", icon: "bg-emerald-100 text-emerald-700", step: "bg-emerald-600" },
  violet: { hero: "from-violet-700 to-fuchsia-600", icon: "bg-violet-100 text-violet-700", step: "bg-violet-600" },
  orange: { hero: "from-orange-600 to-amber-500", icon: "bg-orange-100 text-orange-700", step: "bg-orange-500" },
  pink: { hero: "from-pink-700 to-rose-500", icon: "bg-pink-100 text-pink-700", step: "bg-pink-600" },
};

export function ScamDetailsDialog({ scam, onOpenChange }: ScamDetailsDialogProps) {
  const { t } = useDashboardLanguage();

  if (!scam) return null;

  const Icon = scam.icon;
  const tone = TONE_STYLES[scam.tone];

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[94vh] max-w-6xl">
        <header className={cn("relative overflow-hidden bg-gradient-to-r px-7 py-8 text-white sm:px-10 sm:py-9", tone.hero)}>
          <div className="absolute -right-10 -top-14 size-44 rounded-full border-[28px] border-white/10" />
          <div className="relative flex items-start gap-4 pr-8">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/95 text-slate-900 shadow-lg"><Icon className="size-7" /></span>
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-white/75">{t("Scam awareness guide")}</p>
              <DialogTitle className="mt-1 text-2xl text-white sm:text-3xl">{t(scam.name)}</DialogTitle>
              <DialogDescription className="mt-2 max-w-3xl text-xs leading-5 text-white/85 sm:text-sm sm:leading-6">{t(scam.summary)}</DialogDescription>
            </div>
          </div>
        </header>

        <div className="space-y-7 p-6 sm:p-10">
          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-blue-900"><AlertTriangle className="size-5 text-amber-500" />{t("A common example")}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{t(scam.example)}</p>
          </section>

          <section>
            <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">{t("How this scam happens")}</h3>
            {scam.visual && (
              <figure className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 to-white p-2 shadow-sm sm:p-3">
                <Image
                  src={scam.visual.src}
                  alt={t(scam.visual.alt)}
                  className="h-auto w-full rounded-xl object-contain"
                  sizes="(max-width: 768px) calc(100vw - 48px), 1080px"
                  priority
                />
                <figcaption className="sr-only">{t(scam.visual.alt)}</figcaption>
              </figure>
            )}
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              {scam.flow.map((step, index) => (
                <div key={step} className="contents">
                  <div className="flex min-h-32 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <span className={cn("grid size-9 place-items-center rounded-full text-xs font-extrabold text-white", tone.step)}>{index + 1}</span>
                    <p className="mt-3 text-xs font-bold leading-5 text-slate-700 sm:text-sm">{t(step)}</p>
                  </div>
                  {index < scam.flow.length - 1 && <ArrowRight className="mx-auto size-4 rotate-90 text-slate-300 sm:rotate-0" />}
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-2xl border border-red-100 bg-red-50/70 p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-red-800"><AlertTriangle className="size-5" />{t("Warning signs")}</h3>
              <ul className="mt-4 grid gap-3">{scam.warningSigns.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-600 sm:text-sm"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-500" />{t(item)}</li>)}</ul>
            </section>
            <section className="rounded-2xl border border-green-100 bg-green-50/70 p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-green-800"><ShieldCheck className="size-5" />{t("Protect yourself")}</h3>
              <ul className="mt-4 grid gap-3">{scam.safetySteps.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-600 sm:text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />{t(item)}</li>)}</ul>
            </section>
          </div>

          <section className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:p-6">
            <div className="flex-1"><strong className="text-sm">{t("Lost money or shared sensitive information?")}</strong><p className="mt-1 text-xs text-slate-300">{t("Act quickly. Contact your bank, save the evidence, and report the incident.")}</p></div>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="destructive" className="rounded-lg text-[9px] font-bold"><a href="tel:1930"><Phone />{t("Call 1930")}</a></Button>
              <Button asChild size="sm" variant="outline" className="rounded-lg border-white/20 bg-white/10 text-[9px] font-bold text-white hover:bg-white/20 hover:text-white"><a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer">{t("Report online")}<ExternalLink /></a></Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
