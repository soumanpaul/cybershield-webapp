"use client";

import { ArrowRight, BellRing, ChevronRight, Download, ExternalLink, FileText, HeartHandshake, Landmark, Phone, Shield, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "./device-frame";
import { JourneySteps } from "./journey-steps";
import { useDashboardLanguage } from "./language-provider";
import { ScreenTitle } from "./screen-title";

const PAYMENT_METHODS = ["UPI", "Bank transfer", "Debit / credit card", "E-wallet", "Other"];
const primaryButton = "mt-4 w-full bg-gradient-to-r from-red-600 to-red-800 text-[10px] font-extrabold shadow-lg shadow-red-600/20 hover:from-red-700 hover:to-red-900";

export function ReportHelp() {
  const { t } = useDashboardLanguage();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("UPI");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <ScreenTitle number="04" icon={<ShieldAlert />} title="I Have Been Scammed" subtitle="Act quickly, preserve evidence, and report the incident to the right authorities." urgent />
      <div className="my-4 flex flex-wrap items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-red-700 sm:items-center">
        <BellRing className="size-6 shrink-0" />
        <div className="min-w-48 flex-1"><strong className="block text-[11px]">{t("Money just left your account?")}</strong><span className="mt-1 block text-[9px] text-red-800/70">{t("Call 1930 immediately. Fast reporting can improve the chance of blocking a transaction.")}</span></div>
        <Button variant="destructive" size="sm" asChild><a href="tel:1930" aria-label={t("Call 1930")}>{t("Call 1930")} <Phone /></a></Button>
      </div>
      <JourneySteps labels={["What happened?", "Act now", "Report & next steps"]} active={step} tone="red" />
      <div className="grid min-h-[555px] items-center justify-center gap-8 rounded-2xl border border-red-100 bg-[radial-gradient(circle_at_20%_30%,#ffe9e9,transparent_34%),linear-gradient(135deg,#fffafa,#fff5f5)] p-4 md:grid-cols-[minmax(290px,390px)_minmax(280px,510px)] md:gap-12 md:p-9 xl:gap-28">
        <div>
          {step === 0 && <DeviceFrame title="What happened?"><h4 className="mb-4 text-[11px] font-bold text-slate-700">{t("How did you lose money?")}</h4><div className="grid gap-2">{PAYMENT_METHODS.map((item) => <Button key={item} variant="outline" className={cn("h-11 w-full justify-start px-3 text-[10px]", method === item && "border-red-300 bg-red-50 text-red-700")} onClick={() => setMethod(item)}><i className={cn("size-3 rounded-full border border-slate-400", method === item && "border-4 border-red-600")} />{t(item)}</Button>)}</div><Button className={primaryButton} onClick={() => setStep(1)}>{t("Continue")} <ArrowRight /></Button></DeviceFrame>}
          {step === 1 && <DeviceFrame title="Act now"><p className="inline-flex rounded-md bg-red-100 px-2 py-1 text-[8px] font-extrabold uppercase text-red-600">{t("Financial fraud — act now")}</p><div className="my-4 grid gap-2">{[[Phone, "Call cybercrime helpline 1930"], [Landmark, "Contact your bank immediately"], [FileText, "Keep transaction ID, screenshots and phone numbers"]].map(([Icon, text]) => { const ActionIcon = Icon as typeof Phone; return <span key={text as string} className="flex min-h-12 items-center gap-3 rounded-lg border border-red-100 bg-red-50/60 p-3 text-[10px] text-slate-700"><ActionIcon className="size-5 shrink-0 text-red-600" /><b>{t(text as string)}</b></span>; })}</div><Button className={primaryButton} onClick={() => setStep(2)}>{t("Next")} <ArrowRight /></Button></DeviceFrame>}
          {step === 2 && <DeviceFrame title="Report & next steps"><div className="grid gap-2"><Button variant="outline" asChild className="h-auto min-h-12 justify-start whitespace-normal border-red-200 bg-red-50/50 px-3 text-left text-[9px] text-red-800"><a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer"><FileText />{t("National Cyber Crime Reporting Portal")}<ExternalLink className="ml-auto" /></a></Button><Button variant="outline" asChild className="h-12 justify-start border-red-200 bg-red-50/50 px-3 text-[9px] text-red-800"><a href="tel:1930" aria-label={t("Call 1930")}><Phone />{t("Cybercrime helpline 1930")}<ChevronRight className="ml-auto" /></a></Button><Button variant="outline" className="h-12 justify-start border-red-200 bg-red-50/50 px-3 text-[9px] text-red-800"><Download />{t("Save evidence checklist")}<ChevronRight className="ml-auto" /></Button></div><Button asChild className={primaryButton}><Link href="/">{t("Open incident data dashboard")} <ArrowRight /></Link></Button><small className="mt-2 block text-center text-[7px] text-red-900/50">{t("Authorized staff: view collected simulation and incident records.")}</small></DeviceFrame>}
        </div>
        <div className="order-first max-w-lg md:order-none">
          <HeartHandshake className="size-11 rounded-xl bg-red-100 p-2.5 text-red-600" />
          <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-blue-950 lg:text-4xl">{t("You are not alone")}</h3>
          <p className="mt-3 text-xs leading-7 text-slate-500">{t("Take one step at a time. Stop contact, call your bank, save evidence, then report through official channels.")}</p>
          <div className="mt-5 flex gap-3 rounded-xl border border-red-100 bg-white/70 p-4"><Shield className="size-6 shrink-0 text-red-600" /><span className="text-[10px] leading-5 text-red-950/60"><b className="block text-red-800">{t("Your safety comes first")}</b>{t("Never confront a suspected scammer or travel to meet them.")}</span></div>
        </div>
      </div>
    </div>
  );
}
