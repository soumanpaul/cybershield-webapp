"use client";

import { AlertCircle, ArrowRight, Check, ChevronRight, ExternalLink, Gamepad2, Link2, Phone, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "./device-frame";
import { JourneySteps } from "./journey-steps";
import { useDashboardLanguage } from "./language-provider";
import { ScreenTitle } from "./screen-title";

const SCENARIOS = ["Digital Arrest", "UPI Collect Request", "QR Code Scam", "OTP Scam", "Fake Investment"];
const RESPONSE_OPTIONS = ["Open the link", "Call the number in the message", "Verify through an official government website"];
const primaryButton = "mt-4 w-full bg-gradient-to-r from-violet-600 to-violet-800 text-[10px] font-extrabold shadow-lg shadow-violet-600/20";

export function Simulator() {
  const { t } = useDashboardLanguage();
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState("Digital Arrest");
  const [choice, setChoice] = useState("");
  const next = () => setStep((currentStep) => Math.min(currentStep + 1, 3));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <ScreenTitle number="02" icon={<Gamepad2 />} title="Experience Scam" subtitle="Practise safely. Learn what a scam feels like before it happens." />
      <JourneySteps labels={["Choose scenario", "Spot the signs", "See your result", "Track progress"]} active={step} />
      <div className="grid min-h-[555px] items-center justify-center gap-8 rounded-2xl border border-violet-100 bg-[radial-gradient(circle_at_20%_30%,#eeebff,transparent_34%),linear-gradient(135deg,#faf9ff,#f5f7ff)] p-4 md:grid-cols-[minmax(290px,390px)_minmax(280px,510px)] md:gap-12 md:p-9 xl:gap-28">
        <div>
          {step === 0 && <DeviceFrame title="Choose a scenario"><div className="grid gap-2">{SCENARIOS.map((name) => <Button key={name} variant="outline" className={cn("h-11 w-full justify-start px-3 text-[10px]", scenario === name && "border-violet-400 bg-violet-50 text-violet-700")} onClick={() => setScenario(name)}><ShieldAlert className="text-violet-600" />{t(name)}<ChevronRight className="ml-auto size-3" /></Button>)}</div><Button className={primaryButton} onClick={next}>{t("Start scenario")} <ArrowRight /></Button></DeviceFrame>}
          {step === 1 && <DeviceFrame title={scenario}><div className="rounded-lg border border-green-200 bg-green-50 p-3 text-[10px] leading-6 text-green-950"><span className="text-[8px] font-extrabold text-green-700">{t("WhatsApp message")}</span><p className="mt-1"><b>{t("Cyber Crime Department:")}</b> {t("Your Aadhaar is linked to an illegal parcel. Verify immediately to avoid arrest.")}</p></div><h4 className="my-4 text-[11px] font-bold text-slate-700">{t("What would you do?")}</h4><div className="grid gap-2">{RESPONSE_OPTIONS.map((item) => <Button key={item} variant="outline" className={cn("h-auto min-h-11 w-full justify-start whitespace-normal px-3 py-2 text-left text-[10px]", choice === item && "border-violet-400 bg-violet-50 text-violet-700")} onClick={() => setChoice(item)}>{t(item)}</Button>)}</div><Button className={primaryButton} disabled={!choice} onClick={next}>{t("Check my answer")} <ArrowRight /></Button></DeviceFrame>}
          {step === 2 && <DeviceFrame title="Your result"><div className="mx-auto mt-1 grid size-16 place-items-center rounded-full bg-green-500 text-white shadow-lg shadow-green-600/20"><Check className="size-8" /></div><h3 className="mt-3 text-center text-base font-bold text-slate-800">{t("Good catch!")}</h3><p className="mt-2 text-center text-[10px] leading-5 text-slate-500">{t("Never act on threats from an unknown caller. Verify independently.")}</p><div className="my-4 grid gap-2 text-[10px] text-slate-600"><span className="flex items-center gap-2"><AlertCircle className="size-4 text-red-500" />{t("Urgency and fear")}</span><span className="flex items-center gap-2"><Link2 className="size-4 text-red-500" />{t("Unknown link")}</span><span className="flex items-center gap-2"><Phone className="size-4 text-red-500" />{t("Unverified authority")}</span></div><Button className={primaryButton} onClick={next}>{t("View my progress")} <ArrowRight /></Button></DeviceFrame>}
          {step === 3 && <DeviceFrame title="Your progress"><div className="mx-auto grid size-28 content-center rounded-full border-8 border-green-600 border-l-slate-200 text-center"><strong className="text-2xl text-slate-800">820</strong><small className="text-[8px] text-slate-500">/1000</small></div><h3 className="mt-3 text-center text-base font-bold text-slate-800">{t("Cyber Defender")}</h3><div className="mt-7 flex justify-between text-[9px] text-slate-500"><span>{t("Scenarios completed")}</span><b>8 / 13</b></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><i className="block h-full w-[62%] bg-green-600" /></div><Button className={primaryButton} onClick={() => setStep(0)}>{t("Try another scenario")}</Button><Button variant="ghost" size="sm" asChild className="mt-2 w-full text-[9px] text-violet-700"><Link href="/scam-simulator">{t("Open full simulator")} <ExternalLink /></Link></Button></DeviceFrame>}
        </div>
        <div className="order-first max-w-lg md:order-none">
          <Sparkles className="size-11 rounded-xl bg-violet-100 p-2.5 text-violet-700" />
          <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-blue-950 lg:text-4xl">{t("A safe place to make mistakes")}</h3>
          <p className="mt-3 text-xs leading-7 text-slate-500">{t("This interactive journey uses realistic messages but never asks for passwords, OTPs, PINs or payment details.")}</p>
          <ul className="mt-5 grid gap-3 text-[11px] font-semibold text-slate-600">{["Recognise pressure tactics", "Practise safe verification", "Build confidence one scenario at a time"].map((text) => <li key={text} className="flex items-center gap-2"><Check className="size-4 rounded-full bg-violet-600 p-0.5 text-white" />{t(text)}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
