"use client";

import { AlertTriangle, Check, CheckCircle2, ChevronRight, LockKeyhole, PhoneCall, RotateCcw, ShieldCheck, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useDashboardLanguage } from "./language-provider";

interface OtpSimulationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STEPS = ["Receive Call", "Get OTP", "Share OTP", "Scam Success", "Learn & Stay Safe"] as const;
const IMAGES = [
  "/assets/cyber-safety/otp-simulation/01-incoming-call.png",
  "/assets/cyber-safety/otp-simulation/02-demo-otp.png",
  "/assets/cyber-safety/otp-simulation/03-share-otp.png",
  "/assets/cyber-safety/otp-simulation/04-account-accessed.png",
  "/assets/cyber-safety/otp-simulation/05-safety-result.png",
] as const;

const SCREEN_COPY = [
  { title: "Receive a Call", description: "Someone claiming to be from your bank says there is suspicious activity on your account." },
  { title: "You Receive a DEMO OTP", description: "Shortly after the call, a clearly marked training OTP appears on your phone." },
  { title: "Scammer Asks for OTP", description: "The caller asks you to read the six-digit demo OTP to “verify” your account." },
  { title: "Account Accessed", description: "Sharing an OTP can let a scammer sign in, approve payments, or change account details." },
  { title: "Learn & Stay Safe", description: "The simulation is complete. Remember that banks never ask you to share an OTP." },
] as const;

export function OtpSimulationPanel({ open, onOpenChange }: OtpSimulationPanelProps) {
  const { t } = useDashboardLanguage();
  const [step, setStep] = useState(0);
  const [stoppedSafely, setStoppedSafely] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(0);
      setStoppedSafely(false);
    }
  }, [open]);

  const next = () => setStep((current) => Math.min(current + 1, STEPS.length - 1));
  const stopSafely = () => {
    setStoppedSafely(true);
    setStep(4);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-xl bg-slate-50">
        <header className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-violet-700 px-6 pb-6 pt-7 text-white">
          <div className="absolute -right-10 -top-12 size-40 rounded-full border-[26px] border-white/10" />
          <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-blue-100">{t("Scam Simulator Journey")}</p>
          <SheetTitle className="mt-1 text-xl text-white">{t("OTP Scam Simulation")}</SheetTitle>
          <SheetDescription className="mt-2 max-w-md text-[10px] leading-5 text-blue-100">{t("Can you spot the scam? Learn how OTP theft can approve a login or transaction.")}</SheetDescription>
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-300/30 bg-red-500/20 p-3 text-[9px] font-bold leading-4 text-white"><AlertTriangle className="mt-0.5 size-4 shrink-0" />{t("This is a simulation. Never share a real OTP with anyone. Only the fixed demo code 483920 is shown.")}</div>
        </header>

        <div className="border-b border-blue-100 bg-white px-4 py-4">
          <div className="flex items-start justify-between gap-1">
            {STEPS.map((label, index) => (
              <div key={label} className="flex flex-1 items-start last:flex-none">
                <div className="flex w-12 flex-col items-center gap-1 text-center sm:w-16">
                  <span className={cn("grid size-7 place-items-center rounded-full text-[9px] font-extrabold", index < step ? "bg-emerald-500 text-white" : index === step ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-blue-100 text-blue-400")}>{index < step ? <Check className="size-3.5" /> : index + 1}</span>
                  <span className={cn("text-[7px] font-bold leading-3", index === step ? "text-blue-700" : "text-slate-400")}>{t(label)}</span>
                </div>
                {index < STEPS.length - 1 && <span className={cn("mt-3 h-0.5 min-w-2 flex-1 rounded", index < step ? "bg-emerald-400" : "bg-blue-100")} />}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <section className={cn("overflow-hidden rounded-2xl border bg-white shadow-sm", step === 3 ? "border-red-200" : step === 4 ? "border-emerald-200" : "border-blue-200")}>
            <div className={cn("px-4 py-3 text-sm font-extrabold text-white", step === 3 ? "bg-gradient-to-r from-red-600 to-rose-500" : step === 4 ? "bg-gradient-to-r from-emerald-600 to-green-500" : "bg-gradient-to-r from-blue-700 to-violet-600")}>{step + 1}. {t(SCREEN_COPY[step].title)}</div>
            <div className="p-4">
              <p className="mb-3 text-[10px] leading-5 text-slate-600">{t(SCREEN_COPY[step].description)}</p>
              <div className="flex max-h-[480px] justify-center overflow-hidden rounded-xl bg-gradient-to-b from-blue-50 to-white p-2">
                <Image src={IMAGES[step]} alt={t(`${SCREEN_COPY[step].title} phone-screen illustration`)} width={866} height={1821} className="h-auto max-h-[460px] w-auto object-contain" priority={step === 0} />
              </div>

              {step === 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={stopSafely} className="border-emerald-200 text-[10px] font-bold text-emerald-700 hover:bg-emerald-50"><ShieldCheck />{t("Decline & Verify")}</Button>
                  <Button onClick={next} className="bg-gradient-to-r from-blue-600 to-violet-600 text-[10px] font-bold hover:from-blue-700 hover:to-violet-700"><PhoneCall />{t("Accept Demo Call")}</Button>
                </div>
              )}

              {step === 1 && <Button onClick={next} className="mt-4 w-full bg-gradient-to-r from-blue-600 to-violet-600 text-[10px] font-bold hover:from-blue-700 hover:to-violet-700">{t("Continue Simulation")}<ChevronRight /></Button>}

              {step === 2 && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <Button variant="outline" onClick={stopSafely} className="border-emerald-200 text-[10px] font-bold text-emerald-700 hover:bg-emerald-50"><ShieldCheck />{t("End Call Safely")}</Button>
                  <Button variant="destructive" onClick={next} className="text-[10px] font-bold"><LockKeyhole />{t("Share DEMO OTP")}</Button>
                </div>
              )}

              {step === 3 && (
                <>
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900"><XCircle className="mt-0.5 size-5 shrink-0" /><div><strong className="text-xs">{t("Your account may be compromised")}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{t("The OTP could authorize a new login or payment. In real life, contact your bank immediately and call 1930 if money was lost.")}</p></div></div>
                  <Button onClick={next} className="mt-4 w-full bg-gradient-to-r from-blue-600 to-violet-600 text-[10px] font-bold hover:from-blue-700 hover:to-violet-700">{t("Learn How to Stay Safe")}<ChevronRight /></Button>
                </>
              )}

              {step === 4 && (
                <>
                  <div className={cn("mt-4 flex items-start gap-3 rounded-xl border p-4", stoppedSafely ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-blue-200 bg-blue-50 text-blue-900")}><CheckCircle2 className="mt-0.5 size-5 shrink-0" /><div><strong className="text-xs">{t(stoppedSafely ? "Great — you identified the scam early" : "Simulation complete")}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{t(stoppedSafely ? "You refused to share the OTP and chose independent verification." : "You saw how one shared OTP can give a scammer account access.")}</p></div></div>
                  <div className="mt-3 rounded-xl border border-slate-200 p-4"><h3 className="text-[10px] font-extrabold text-blue-950">{t("Key Takeaways")}</h3><ul className="mt-3 grid gap-2 text-[9px] leading-4 text-slate-600">{["Never share an OTP with anyone", "Banks and government agencies never ask for your OTP", "Verify unexpected calls through official channels", "Report financial cyber fraud immediately at 1930"].map((item) => <li key={item} className="flex items-start gap-2"><ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-blue-600" />{t(item)}</li>)}</ul></div>
                  <Button onClick={() => onOpenChange(false)} className="mt-4 w-full bg-gradient-to-r from-blue-600 to-violet-600 text-[10px] font-bold hover:from-blue-700 hover:to-violet-700"><RotateCcw />{t("Try Another Scenario")}</Button>
                </>
              )}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
