"use client";

import { ArrowRight, Bot, Check, ImageIcon, Link2, LockKeyhole, Mail, MessageSquare, QrCode, Sparkles, Upload } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { DeviceFrame } from "./device-frame";
import { JourneySteps } from "./journey-steps";
import { useDashboardLanguage } from "./language-provider";
import { ScreenTitle } from "./screen-title";

const RECOMMENDED_ACTIONS = ["Stop communicating immediately", "Do not transfer money or share details", "Save screenshots and preserve evidence", "Report financial fraud on 1930", "File a complaint on the official portal"];
const primaryButton = "mt-4 w-full bg-gradient-to-r from-green-600 to-green-800 text-[10px] font-extrabold shadow-lg shadow-green-600/20";

export function Analyzer() {
  const { t } = useDashboardLanguage();
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");

  const analyze = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim()) setStep(1);
  };

  const reset = () => { setStep(0); setMessage(""); };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <ScreenTitle number="03" icon={<Bot />} title="AI Cyber Scam Analyzer" subtitle="Paste a suspicious message or link and understand the risk in seconds." />
      <JourneySteps labels={["Upload or paste", "Analysis result", "Recommended actions"]} active={step} tone="green" />
      <div className="grid min-h-[555px] items-center justify-center gap-8 rounded-2xl border border-green-100 bg-[radial-gradient(circle_at_20%_30%,#e4f7eb,transparent_34%),linear-gradient(135deg,#fbfffc,#f4faf6)] p-4 md:grid-cols-[minmax(290px,390px)_minmax(280px,510px)] md:gap-12 md:p-9 xl:gap-28">
        <div>
          {step === 0 && <DeviceFrame title="Check suspicious content"><form onSubmit={analyze}><div className="grid grid-cols-3 gap-2"><Button type="button" variant="outline" className="h-10 border-green-300 bg-green-50 px-2 text-[8px] text-green-700"><MessageSquare />{t("Text")}</Button><Button type="button" variant="outline" className="h-10 px-2 text-[8px]"><Upload />{t("Upload")}</Button><Button type="button" variant="outline" className="h-10 px-2 text-[8px]"><Link2 />URL</Button></div><textarea className="mt-3 min-h-40 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 p-3 text-[10px] leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100" value={message} onChange={(event) => setMessage(event.target.value)} placeholder={t("Paste the suspicious message, email or URL here…")} /><div className="mt-2 flex items-center gap-1.5 text-[8px] text-slate-500"><LockKeyhole className="size-3" />{t("We do not store what you paste here.")}</div><Button className={primaryButton} disabled={!message.trim()}>{t("Analyze now")} <Sparkles /></Button></form></DeviceFrame>}
          {step === 1 && <DeviceFrame title="Analysis result"><span className="inline-flex rounded-md bg-red-100 px-2 py-1 text-[8px] font-extrabold uppercase text-red-600">{t("High risk")}</span><h3 className="mt-4 text-base font-bold text-slate-800">{t("Likely impersonation scam")}</h3><p className="mt-2 text-[10px] leading-5 text-slate-500">{t("The message uses urgency, authority and a request to act outside official channels.")}</p><h4 className="my-4 text-[11px] font-bold text-slate-700">{t("Warning signs detected")}</h4><div className="grid gap-2 text-[10px] text-slate-600">{["Threat of arrest or loss", "Urgent payment request", "Unknown phone number", "Suspicious external link"].map((text) => <span key={text} className="flex items-center gap-2"><Check className="size-4 text-green-600" />{t(text)}</span>)}</div><Button className={primaryButton} onClick={() => setStep(2)}>{t("What should I do?")} <ArrowRight /></Button></DeviceFrame>}
          {step === 2 && <DeviceFrame title="Recommended actions"><div className="grid gap-3">{RECOMMENDED_ACTIONS.map((text, index) => <span key={text} className="flex items-center gap-2 text-[10px] leading-5 text-slate-600"><b className="grid size-6 shrink-0 place-items-center rounded-full bg-green-600 text-white">{index + 1}</b>{t(text)}</span>)}</div><Button className={primaryButton} onClick={reset}>{t("Analyze another message")}</Button></DeviceFrame>}
        </div>
        <div className="order-first max-w-lg md:order-none">
          <Bot className="size-11 rounded-xl bg-green-100 p-2.5 text-green-700" />
          <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-blue-950 lg:text-4xl">{t("Understand before you act")}</h3>
          <p className="mt-3 text-xs leading-7 text-slate-500">{t("The analyzer explains suspicious patterns in plain language so you can make a calmer, informed decision.")}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">{[[MessageSquare, "SMS"], [ImageIcon, "Screenshot"], [Mail, "Email"], [QrCode, "QR code"]].map(([Icon, label]) => { const TypeIcon = Icon as typeof MessageSquare; return <span key={label as string} className="flex items-center gap-2 rounded-lg border border-green-100 bg-white/70 p-3 text-[10px] text-slate-600"><TypeIcon className="size-4 text-green-600" />{t(label as string)}</span>; })}</div>
        </div>
      </div>
    </div>
  );
}
