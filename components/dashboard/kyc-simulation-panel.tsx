"use client";

import { AlertTriangle, ArrowLeft, CheckCircle2, Database, ExternalLink, Globe2, LoaderCircle, LockKeyhole, MessageCircle, Phone, RotateCcw, SearchCheck, ShieldCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useDashboardLanguage } from "./language-provider";

interface KycSimulationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ResultKind = "link" | "call" | "safe";
type CaptureStatus = "idle" | "saving" | "saved" | "failed";

const RESULTS: Record<ResultKind, { safe: boolean; title: string; message: string }> = {
  link: {
    safe: false,
    title: "Your information may be compromised",
    message: "The link was a fake KYC page. It could steal your login, card details, identity documents, or install harmful software.",
  },
  call: {
    safe: false,
    title: "You contacted an unverified scammer",
    message: "Calling a number from a suspicious message can connect you directly to a fraudster who may pressure you to share private information.",
  },
  safe: {
    safe: true,
    title: "Correct — you protected your account",
    message: "You ignored the suspicious request and chose to verify through the bank’s official app, website, or customer-care number.",
  },
};

export function KycSimulationPanel({ open, onOpenChange }: KycSimulationPanelProps) {
  const { t } = useDashboardLanguage();
  const [resultKind, setResultKind] = useState<ResultKind | null>(null);
  const [captureStatus, setCaptureStatus] = useState<CaptureStatus>("idle");

  useEffect(() => {
    if (open) {
      setResultKind(null);
      setCaptureStatus("idle");
    }
  }, [open]);

  const collectLocation = () => new Promise<string>((resolve) => {
    if (!("geolocation" in navigator)) {
      resolve("Location unavailable: browser geolocation is unsupported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(`lat=${coords.latitude.toFixed(6)}, lon=${coords.longitude.toFixed(6)}, accuracy=${Math.round(coords.accuracy)}m`),
      (error) => resolve(`Location unavailable: ${error.message}`.slice(0, 255)),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
    );
  });

  const captureUnsafeLinkChoice = async () => {
    setCaptureStatus("saving");
    const timestamp = Date.now();
    const location = await collectLocation();
    const device = [
      `language=${navigator.language}`,
      `platform=${navigator.platform || "unknown"}`,
      `screen=${window.screen.width}x${window.screen.height}`,
      `viewport=${window.innerWidth}x${window.innerHeight}`,
      `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      `cookies=${navigator.cookieEnabled}`,
      `online=${navigator.onLine}`,
      `touch=${navigator.maxTouchPoints}`,
      `ua=${navigator.userAgent}`,
    ].join(" | ").slice(0, 255);

    try {
      const response = await fetch("/api/mobile/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          externalId: `KYC-SIM-${timestamp}`,
          name: "KYC Simulation Visitor",
          email: `kyc-simulation-${timestamp}@cybersuraksha.local`,
          device,
          location,
          status: "KYC_LINK_CLICKED",
          threatLevel: "high",
        }),
      });
      if (!response.ok) throw new Error("Unable to record simulation event");
      setCaptureStatus("saved");
    } catch {
      setCaptureStatus("failed");
    } finally {
      setResultKind("link");
    }
  };

  const result = resultKind ? RESULTS[resultKind] : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-lg">
        <header className="relative overflow-hidden bg-gradient-to-r from-violet-700 to-indigo-700 px-6 pb-6 pt-7 text-white">
          <div className="absolute -right-10 -top-12 size-40 rounded-full border-[26px] border-white/10" />
          <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-violet-100">{t("Scam Simulator Journey")}</p>
          <SheetTitle className="mt-1 text-xl text-white">{t("KYC Scam Simulation")}</SheetTitle>
          <SheetDescription className="mt-2 max-w-sm text-[11px] leading-5 text-violet-100">{t("Practise safely. No real link, call, or personal information is used.")}</SheetDescription>

          <div className="mt-5 flex items-center gap-2" aria-label="Simulation progress">
            <span className={cn("grid size-7 place-items-center rounded-full text-[10px] font-extrabold", !result ? "bg-white text-violet-700" : "bg-white/20 text-white")}>1</span>
            <span className="h-0.5 flex-1 rounded bg-white/30"><i className={cn("block h-full rounded bg-white transition-all", result ? "w-full" : "w-0")} /></span>
            <span className={cn("grid size-7 place-items-center rounded-full text-[10px] font-extrabold", result ? "bg-white text-violet-700" : "bg-white/20 text-white")}>2</span>
          </div>
          <div className="mt-1 flex justify-between text-[8px] font-bold text-violet-100"><span>{t("Scenario")}</span><span>{t("Result")}</span></div>
        </header>

        {!result ? (
          <div className="space-y-5 p-6">
            <section>
              <div className="flex items-center gap-2 text-[10px] font-extrabold text-emerald-700"><MessageCircle className="size-4" />{t("WhatsApp Message")}</div>
              <div className="mt-3 rounded-2xl rounded-tl-sm border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
                <p className="text-[11px] leading-5 text-slate-700">{t("Dear Customer, your SBI account will be suspended today. Update KYC immediately:")}</p>
                <span className="mt-2 flex items-center gap-1.5 break-all text-[10px] font-bold text-blue-600"><ExternalLink className="size-3.5" />sbikyc-secure-update.xyz</span>
                <span className="mt-2 block text-right text-[8px] text-slate-400">10:30 AM</span>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-extrabold text-slate-900">{t("What would you do?")}</h3>
              <div className="mt-3 grid gap-2.5">
                <Button variant="outline" disabled={captureStatus === "saving"} onClick={captureUnsafeLinkChoice} className="h-12 justify-start border-red-200 px-4 text-xs font-bold text-red-700 hover:bg-red-50">
                  {captureStatus === "saving" ? <LoaderCircle className="animate-spin" /> : <ExternalLink />}A. {captureStatus === "saving" ? t("Recording training event…") : t("Open the link")}
                </Button>
                <Button variant="outline" onClick={() => setResultKind("call")} className="h-12 justify-start px-4 text-xs font-bold"><Phone />B. {t("Call the number in the message")}</Button>
                <Button variant="outline" onClick={() => setResultKind("safe")} className="h-auto min-h-12 justify-start whitespace-normal border-emerald-200 px-4 py-3 text-left text-xs font-bold text-emerald-700 hover:bg-emerald-50"><ShieldCheck />C. {t("Ignore it and verify through the bank’s official channel")}</Button>
              </div>
            </section>

            <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-[10px] leading-5 text-amber-900"><AlertTriangle className="mr-2 inline size-4" />{t("This is a safe simulation. The displayed link is never opened. Choosing it records browser/device details, server-detected IP, and location only if you allow browser permission.")}</div>
          </div>
        ) : (
          <div className="space-y-5 p-6">
            <Button variant="ghost" size="sm" onClick={() => setResultKind(null)} className="-ml-2 text-[10px] text-slate-600"><ArrowLeft />{t("Back to scenario")}</Button>

            <section className={cn("rounded-2xl border p-5 text-center", result.safe ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50")}>
              <span className={cn("mx-auto grid size-16 place-items-center rounded-full text-white shadow-lg", result.safe ? "bg-emerald-500 shadow-emerald-600/20" : "bg-red-500 shadow-red-600/20")}>
                {result.safe ? <CheckCircle2 className="size-8" /> : <XCircle className="size-8" />}
              </span>
              <p className={cn("mt-4 text-[9px] font-extrabold uppercase tracking-wider", result.safe ? "text-emerald-700" : "text-red-700")}>{result.safe ? t("Safe choice") : t("Warning")}</p>
              <h2 className={cn("mt-1 text-xl font-extrabold", result.safe ? "text-emerald-950" : "text-red-950")}>{t(result.title)}</h2>
              <p className="mt-3 text-[11px] leading-5 text-slate-600">{t(result.message)}</p>
            </section>

            {resultKind === "link" && (
              <>
                <div className={cn("flex items-start gap-3 rounded-xl border p-3 text-[10px] leading-5", captureStatus === "saved" ? "border-blue-100 bg-blue-50 text-blue-900" : "border-amber-200 bg-amber-50 text-amber-900")}>
                  {captureStatus === "saved" ? <Database className="mt-0.5 size-4 shrink-0" /> : <AlertTriangle className="mt-0.5 size-4 shrink-0" />}
                  <span>{t(captureStatus === "saved" ? "Training event recorded in the Cyber Suraksha dashboard." : "The warning is shown, but the training event could not be recorded. Please try again.")}</span>
                </div>

                <section className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
                  <div className="bg-gradient-to-r from-red-600 to-rose-500 px-5 py-4 text-white">
                    <h3 className="flex items-center gap-2 text-sm font-extrabold"><SearchCheck className="size-5" />{t("Why this URL is dangerous")}</h3>
                    <p className="mt-1 text-[10px] text-red-50">{t("Look at the website name before entering any personal information.")}</p>
                  </div>

                  <div className="space-y-4 p-4 sm:p-5">
                    <div>
                      <span className="text-[8px] font-extrabold uppercase tracking-wider text-red-600">{t("Suspicious URL")}</span>
                      <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-inner">
                        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-3 py-2"><i className="size-2 rounded-full bg-red-400" /><i className="size-2 rounded-full bg-amber-400" /><i className="size-2 rounded-full bg-emerald-400" /></div>
                        <div className="flex flex-wrap items-center gap-0.5 px-3 py-3 font-mono text-[10px] font-bold sm:text-xs">
                          <LockKeyhole className="mr-1 size-3.5 text-slate-400" />
                          <span className="text-slate-400">https://</span>
                          <span className="rounded bg-amber-100 px-0.5 text-amber-800">sbi</span>
                          <span className="rounded bg-red-100 px-0.5 text-red-700">kyc-secure-update</span>
                          <span className="rounded bg-violet-100 px-0.5 text-violet-700">.xyz</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-3">
                      <div className="rounded-xl border border-amber-100 bg-amber-50 p-3"><span className="grid size-7 place-items-center rounded-lg bg-amber-100 text-amber-700"><SearchCheck className="size-4" /></span><strong className="mt-2 block text-[10px] text-amber-900">{t("Look-alike name")}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{t("The letters “sbi” are only placed inside a longer fake name.")}</p></div>
                      <div className="rounded-xl border border-red-100 bg-red-50 p-3"><span className="grid size-7 place-items-center rounded-lg bg-red-100 text-red-700"><AlertTriangle className="size-4" /></span><strong className="mt-2 block text-[10px] text-red-900">{t("Pressure words")}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{t("Words like “KYC”, “secure”, and “update” are used to create trust and urgency.")}</p></div>
                      <div className="rounded-xl border border-violet-100 bg-violet-50 p-3"><span className="grid size-7 place-items-center rounded-lg bg-violet-100 text-violet-700"><Globe2 className="size-4" /></span><strong className="mt-2 block text-[10px] text-violet-900">{t("Unusual ending")}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{t("The domain ends in .xyz, not SBI’s verified bank domain.")}</p></div>
                    </div>

                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                      <div className="flex items-center justify-between gap-2"><span className="text-[8px] font-extrabold uppercase tracking-wider text-emerald-700">{t("Verified SBI domain")}</span><ShieldCheck className="size-4 text-emerald-600" /></div>
                      <div className="mt-2 font-mono text-xs font-extrabold"><span className="text-slate-400">https://</span><span className="rounded bg-emerald-100 px-1 text-emerald-800">sbi.bank.in</span></div>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-4 text-white">
                      <strong className="text-[10px]">{t("Quick URL check")}</strong>
                      <p className="mt-1 text-[9px] leading-4 text-slate-300">{t("First find the domain between https:// and the first slash, then read it from right to left. A padlock only means the connection is encrypted—it does not prove the website is genuine.")}</p>
                    </div>
                  </div>
                </section>
              </>
            )}

            {!result.safe && (
              <section className="rounded-2xl border border-red-100 p-5">
                <h3 className="text-xs font-extrabold text-red-800">{t("What could be exposed")}</h3>
                <ul className="mt-3 grid gap-2 text-[10px] leading-5 text-slate-600">
                  {["Bank login and passwords", "Aadhaar, PAN, or identity documents", "Card information and OTPs"].map((item) => <li key={item} className="flex items-start gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-red-500" />{t(item)}</li>)}
                </ul>
              </section>
            )}

            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="flex items-center gap-2 text-xs font-extrabold text-blue-900"><ShieldCheck className="size-4" />{result.safe ? t("Why this was right") : t("What to do now")}</h3>
              <p className="mt-2 text-[10px] leading-5 text-slate-600">{result.safe ? t("Banks do not ask you to update KYC through an unknown link. Always open the official app or type the bank website yourself.") : t("Close the page, do not enter any details, change exposed passwords, contact your bank officially, and call 1930 if money was lost.")}</p>
            </section>

            <Button onClick={() => setResultKind(null)} className="w-full bg-gradient-to-r from-violet-600 to-violet-700 text-xs font-bold hover:from-violet-700 hover:to-violet-800"><RotateCcw />{t("Try Again")}</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
