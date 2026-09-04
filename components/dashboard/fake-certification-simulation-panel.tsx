"use client";

import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Database,
  Flag,
  GraduationCap,
  Mail,
  MessageCircle,
  LoaderCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  XCircle,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useDashboardLanguage } from "./language-provider";

interface FakeCertificationSimulationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STEPS = ["See the Offer", "Provide Details", "Make Payment", "WhatsApp Follow-up", "Realization"] as const;
type PaymentCaptureStatus = "idle" | "saving" | "saved" | "failed";

const DEMO_ACCOUNT = {
  name: "Demo Learner",
  email: "demo@example.com",
  phone: "9000000000",
  course: "Data Science Professional",
  accountType: "Student",
};

function LearningNote({ children, redFlag }: { children: ReactNode; redFlag: string }) {
  const { t } = useDashboardLanguage();

  return (
    <div className="space-y-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
      <div><strong className="text-xs text-violet-800">{t("What’s happening?")}</strong><p className="mt-1 text-[10px] leading-5 text-slate-600">{children}</p></div>
      <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3"><Flag className="mt-0.5 size-5 shrink-0 fill-red-500 text-red-500" /><div><strong className="text-[10px] text-red-700">{t("Red Flag")}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{redFlag}</p></div></div>
    </div>
  );
}

export function FakeCertificationSimulationPanel({ open, onOpenChange }: FakeCertificationSimulationPanelProps) {
  const { t } = useDashboardLanguage();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentCaptureStatus, setPaymentCaptureStatus] = useState<PaymentCaptureStatus>("idle");

  useEffect(() => {
    if (open) {
      setStep(0);
      setPaymentMethod("UPI");
      setPaymentCaptureStatus("idle");
    }
  }, [open]);

  const next = () => setStep((current) => Math.min(current + 1, STEPS.length - 1));

  const submitSimulatedPayment = async () => {
    setPaymentCaptureStatus("saving");
    const timestamp = Date.now();
    const device = [
      `language=${navigator.language}`,
      `platform=${navigator.platform || "unknown"}`,
      `screen=${window.screen.width}x${window.screen.height}`,
      `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      `ua=${navigator.userAgent}`,
    ].join(" | ").slice(0, 255);

    try {
      const response = await fetch("/api/mobile/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          externalId: `CERT-SIM-${timestamp}`,
          name: DEMO_ACCOUNT.name,
          email: DEMO_ACCOUNT.email,
          phone: DEMO_ACCOUNT.phone,
          course: DEMO_ACCOUNT.course,
          accountType: DEMO_ACCOUNT.accountType,
          paymentMode: paymentMethod,
          amount: 2999,
          device,
          status: "CERT_PAYMENT_SUBMITTED",
          threatLevel: "high",
        }),
      });
      if (!response.ok) throw new Error("Unable to record simulated payment");
      setPaymentCaptureStatus("saved");
    } catch {
      setPaymentCaptureStatus("failed");
    } finally {
      next();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="max-w-xl bg-slate-50">
        <header className="relative overflow-hidden bg-gradient-to-r from-violet-700 to-indigo-700 px-6 pb-6 pt-7 text-white">
          <div className="absolute -right-10 -top-12 size-40 rounded-full border-[26px] border-white/10" />
          <div className="flex items-start gap-3 pr-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/95 text-violet-700 shadow"><GraduationCap className="size-6" /></span>
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-violet-100">{t("Scam Simulator Journey")}</p>
              <SheetTitle className="mt-1 text-xl leading-tight text-white">{t("Fake Certification Scam Simulation")}</SheetTitle>
              <SheetDescription className="mt-2 text-[10px] leading-5 text-violet-100">{t("Experience a realistic scam and learn to identify the red flags.")}</SheetDescription>
            </div>
          </div>
        </header>

        <div className="border-b border-violet-100 bg-white px-5 py-4">
          <div className="flex items-start justify-between gap-1">
            {STEPS.map((label, index) => (
              <div key={label} className="flex flex-1 items-start last:flex-none">
                <div className="flex w-12 flex-col items-center gap-1 text-center sm:w-16">
                  <span className={cn("grid size-7 place-items-center rounded-full text-[9px] font-extrabold transition", index < step ? "bg-emerald-500 text-white" : index === step ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" : "bg-violet-100 text-violet-400")}>{index < step ? <Check className="size-3.5" /> : index + 1}</span>
                  <span className={cn("text-[7px] font-bold leading-3", index === step ? "text-violet-700" : "text-slate-400")}>{t(label)}</span>
                </div>
                {index < STEPS.length - 1 && <span className={cn("mt-3 h-0.5 min-w-2 flex-1 rounded", index < step ? "bg-emerald-400" : "bg-violet-100")} />}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          {step === 0 && (
            <>
              <section className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-violet-700 to-indigo-600 px-4 py-3 text-sm font-extrabold text-white">1. {t("Attractive Advertisement")}</div>
                <div className="p-4">
                  <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-blue-100 text-blue-700"><GraduationCap className="size-5" /></span><div><strong className="block text-xs text-blue-950">Global Skill Academy</strong><span className="text-[9px] text-slate-400">Sponsored</span></div><span className="ml-auto text-lg font-bold text-slate-400">•••</span></div>
                  <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 p-4">
                    <h2 className="text-xl font-extrabold leading-tight text-blue-950">Get a Government-Approved Data Science Certificate <span className="text-red-600">in 30 Days!</span></h2>
                    <GraduationCap className="mx-auto mb-2 mt-4 size-16 text-blue-900" strokeWidth={1.4} />
                    <div className="mx-auto mb-4 max-w-[230px] rotate-[-1deg] border-[5px] border-double border-amber-400 bg-white px-3 py-3 text-center shadow-md">
                      <BadgeCheck className="mx-auto size-6 text-amber-600" />
                      <p className="mt-1 text-[7px] font-extrabold uppercase tracking-[.12em] text-blue-900">Global Skill Academy</p>
                      <strong className="mt-1 block font-serif text-sm text-blue-950">Certificate of Completion</strong>
                      <p className="mt-1 text-[7px] text-slate-500">30-Day Data Science Professional Course</p>
                    </div>
                    <ul className="grid gap-2 text-[10px] font-semibold text-slate-700">{["30-Day Online Course", "Valid for Govt. Jobs", "Lifetime Recognition", "Job Assistance", "Limited Time Offer!"].map((item) => <li key={item} className="flex items-center gap-2"><CheckCircle2 className="size-4 fill-emerald-500 text-white" />{t(item)}</li>)}</ul>
                    <Button onClick={next} className="mt-5 w-full bg-gradient-to-r from-violet-600 to-violet-700 font-bold hover:from-violet-700 hover:to-violet-800">{t("Enroll Now")}<ChevronRight /></Button>
                  </div>
                </div>
              </section>
              <LearningNote redFlag={t("Government approval and guaranteed job validity are claimed without verifiable accreditation.")}>{t("You see an advertisement promising a government-approved certificate after a 30-day online course with big benefits.")}</LearningNote>
            </>
          )}

          {step === 1 && (
            <>
              <section className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-violet-700 to-indigo-600 px-4 py-3 text-sm font-extrabold text-white">2. {t("Provide Your Details")}</div>
                <div className="p-4"><h2 className="text-lg font-extrabold text-blue-950">{t("Create Your Account")}</h2><p className="text-[10px] text-slate-500">{t("Demo information only—never enter real personal details.")}</p>
                  <div className="mt-4 grid gap-3">{[
                    [CircleUserRound, "Full Name", DEMO_ACCOUNT.name],
                    [Mail, "Email Address", DEMO_ACCOUNT.email],
                    [Phone, "Mobile Number", DEMO_ACCOUNT.phone],
                    [GraduationCap, "Select Course", DEMO_ACCOUNT.course],
                    [Building2, "I am a", DEMO_ACCOUNT.accountType],
                  ].map(([Icon, label, value]) => {
                    const FieldIcon = Icon as typeof CircleUserRound;
                    return <div key={String(label)} className="grid grid-cols-[24px_1fr] items-end gap-2"><FieldIcon className="mb-2 size-4 text-blue-700" /><label className="text-[9px] font-semibold text-slate-500">{t(String(label))}<span className="mt-1 block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[10px] font-medium text-slate-700">{t(String(value))}</span></label></div>;
                  })}</div>
                  <Button onClick={next} className="mt-5 w-full bg-gradient-to-r from-violet-600 to-violet-700 font-bold hover:from-violet-700 hover:to-violet-800">{t("Continue")}<ChevronRight /></Button>
                </div>
              </section>
              <LearningNote redFlag={t("Fraudsters collect personal data that can be misused later.")}>{t("The fake provider asks for personal details before proving that the institution is genuine.")}</LearningNote>
            </>
          )}

          {step === 2 && (
            <>
              <section className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-violet-700 to-indigo-600 px-4 py-3 text-sm font-extrabold text-white">3. {t("Make the Payment")}</div>
                <div className="p-4"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-violet-50 text-violet-700"><ShieldCheck className="size-6" /></span><div><h2 className="text-lg font-extrabold text-blue-950">{t("Secure Payment")}</h2><p className="text-[9px] text-slate-500">{t("Simulation only—no payment will be processed.")}</p></div></div>
                  <div className="my-4 rounded-xl border border-slate-200 p-4"><span className="text-[10px] font-bold text-slate-700">{t("Course Fee")}</span><div className="mt-1 flex items-center justify-between"><div><del className="text-xs text-slate-400">₹9,999</del><strong className="block text-3xl text-blue-950">₹2,999</strong></div><span className="rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-extrabold text-emerald-700">70% OFF</span></div></div>
                  <div className="grid gap-2">{[[Smartphone, "UPI"], [CreditCard, "Credit / Debit Card"], [Banknote, "Net Banking"]].map(([Icon, method]) => { const MethodIcon = Icon as typeof Smartphone; const selected = paymentMethod === method; return <button key={String(method)} type="button" onClick={() => setPaymentMethod(String(method))} className={cn("flex h-12 items-center gap-3 rounded-xl border px-3 text-left text-[10px] font-bold", selected ? "border-violet-400 bg-violet-50 text-violet-800" : "border-slate-200 text-slate-600")}><span className={cn("grid size-5 place-items-center rounded-full border", selected && "border-violet-600 bg-violet-600 text-white")}>{selected && <Check className="size-3" />}</span><MethodIcon className="size-5 text-blue-700" />{t(String(method))}</button>; })}</div>
                  <Button disabled={paymentCaptureStatus === "saving"} onClick={submitSimulatedPayment} className="mt-5 w-full bg-gradient-to-r from-violet-600 to-violet-700 font-bold hover:from-violet-700 hover:to-violet-800">{paymentCaptureStatus === "saving" ? <LoaderCircle className="animate-spin" /> : <ChevronRight />}{t(paymentCaptureStatus === "saving" ? "Recording payment…" : "Pay ₹2,999")}</Button>
                </div>
              </section>
              <LearningNote redFlag={t("Heavy discounts and urgency pressure you to pay before checking the issuer.")}>{t("You are asked to pay for instant access before the institution or certificate can be verified.")}</LearningNote>
            </>
          )}

          {step === 3 && (
            <>
              <section className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-violet-700 to-indigo-600 px-4 py-3 text-sm font-extrabold text-white">4. {t("WhatsApp Follow-up")}</div>
                <div className="p-5 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"><Check className="size-7" /></span><h2 className="mt-3 text-lg font-extrabold text-blue-950">{t("Payment Successful!")}</h2><p className="text-[10px] text-slate-500">{t("Your enrollment request has been received.")}</p>
                  <div className="my-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-500 text-white"><MessageCircle className="size-6" /></span>
                    <h3 className="mt-3 text-base font-extrabold text-emerald-900">{t("We will contact you via WhatsApp")}</h3>
                    <p className="mt-2 text-[10px] leading-5 text-slate-600">{t("Our course advisor will message you with the class schedule and certificate details within 24 hours.")}</p>
                    <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-[9px] font-bold text-emerald-700 shadow-sm">{t("Status: Waiting for contact")}</span>
                  </div>
                  <div className={cn("mb-4 flex items-start gap-3 rounded-xl border p-3 text-left text-[10px] leading-5", paymentCaptureStatus === "saved" ? "border-blue-100 bg-blue-50 text-blue-900" : "border-amber-200 bg-amber-50 text-amber-900")}>
                    {paymentCaptureStatus === "saved" ? <Database className="mt-0.5 size-4 shrink-0" /> : <AlertTriangle className="mt-0.5 size-4 shrink-0" />}
                    <span>{t(paymentCaptureStatus === "saved" ? "Account and simulated payment details were recorded in the Cyber Suraksha dashboard." : "The simulation continues, but the payment event could not be recorded. Please try again later.")}</span>
                  </div>
                  <Button onClick={next} className="w-full bg-gradient-to-r from-violet-600 to-violet-700 font-bold hover:from-violet-700 hover:to-violet-800">{t("Continue")}<ChevronRight /></Button>
                </div>
              </section>
              <LearningNote redFlag={t("After taking payment, the provider moves everything to WhatsApp and gives no enrollment record or student portal.")}>{t("Instead of immediate course access or a verified enrollment record, you only receive a promise of future WhatsApp contact.")}</LearningNote>
            </>
          )}

          {step === 4 && (
            <section className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-red-600 to-rose-500 px-4 py-3 text-sm font-extrabold text-white">5. {t("The Truth")}</div>
              <div className="p-5">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20"><AlertTriangle className="size-8" /></span><h2 className="mt-4 text-xl font-extrabold text-red-800">{t("This was a Certification Scam!")}</h2><p className="mt-2 text-[11px] leading-5 text-slate-600">{t("The provider took payment but gave no verified enrollment, course access, or recognized certification process.")}</p></div>
                <div className="mt-4 rounded-xl border border-red-100 p-4"><h3 className="text-xs font-extrabold text-red-700">{t("Warning Signs")}</h3><ul className="mt-3 grid gap-2 text-[10px] leading-5 text-slate-600">{["Issuer is not a recognized institution", "No official certificate verification link", "Communication moved only to WhatsApp", "No enrollment record or student portal", "No real training or assessment"].map((item) => <li key={item} className="flex items-start gap-2"><XCircle className="mt-0.5 size-4 shrink-0 fill-red-500 text-white" />{t(item)}</li>)}</ul></div>
                <div className="mt-4 rounded-xl bg-red-50 p-4 text-center text-xs font-extrabold leading-5 text-red-700">{t("Fraudsters may stop responding after payment, leaving you without a course or certificate.")}</div>
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3 text-[10px] font-bold text-blue-900"><ShieldCheck className="size-5 shrink-0" />{t("Stay alert. Verify the institution before you enroll or pay.")}</div>
                <Button onClick={() => onOpenChange(false)} className="mt-4 w-full bg-gradient-to-r from-violet-600 to-violet-700 font-bold hover:from-violet-700 hover:to-violet-800"><RotateCcw />{t("Try Another Scenario")}</Button>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
