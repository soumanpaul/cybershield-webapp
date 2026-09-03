"use client";

import {
  ArrowRight,
  BellRing,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  HeartHandshake,
  Landmark,
  Phone,
  Shield,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeviceFrame } from "./device-frame";
import { JourneySteps } from "./journey-steps";
import { ScreenTitle } from "./screen-title";

const PAYMENT_METHODS = ["UPI", "Bank transfer", "Debit / credit card", "E-wallet", "Other"];

export function ReportHelp() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("UPI");

  return (
    <div className="tab-screen">
      <ScreenTitle
        number="04"
        icon={<ShieldAlert />}
        title="I Have Been Scammed"
        subtitle="Act quickly, preserve evidence, and report the incident to the right authorities."
        urgent
      />
      <div className="emergency-strip">
        <BellRing />
        <div>
          <strong>Money just left your account?</strong>
          <span>Call 1930 immediately. Fast reporting can improve the chance of blocking a transaction.</span>
        </div>
        <a href="tel:1930">Call 1930 <Phone /></a>
      </div>
      <JourneySteps labels={["What happened?", "Act now", "Report & next steps"]} active={step} />
      <div className="phone-stage red-stage">
        {step === 0 && (
          <DeviceFrame title="What happened?">
            <h4>How did you lose money?</h4>
            {PAYMENT_METHODS.map((item) => (
              <button key={item} className={`answer radio-answer ${method === item ? "selected" : ""}`} onClick={() => setMethod(item)}>
                <i />{item}
              </button>
            ))}
            <button className="device-action red" onClick={() => setStep(1)}>Continue <ArrowRight /></button>
          </DeviceFrame>
        )}
        {step === 1 && (
          <DeviceFrame title="Act now">
            <p className="red-label">Financial fraud — act now</p>
            <div className="urgent-actions">
              <span><Phone /><b>Call cybercrime helpline 1930</b></span>
              <span><Landmark /><b>Contact your bank immediately</b></span>
              <span><FileText /><b>Keep transaction ID, screenshots and phone numbers</b></span>
            </div>
            <button className="device-action red" onClick={() => setStep(2)}>Next <ArrowRight /></button>
          </DeviceFrame>
        )}
        {step === 2 && (
          <DeviceFrame title="Report & next steps">
            <div className="report-links">
              <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer"><FileText />National Cyber Crime Reporting Portal<ExternalLink /></a>
              <a href="tel:1930"><Phone />Cybercrime helpline 1930<ChevronRight /></a>
              <button><Download />Save evidence checklist<ChevronRight /></button>
            </div>
            <Link className="device-action red" href="/data-dashboard">Open incident data dashboard <ArrowRight /></Link>
            <small className="admin-note">Authorized staff: view collected simulation and incident records.</small>
          </DeviceFrame>
        )}
        <div className="stage-copy">
          <HeartHandshake />
          <h3>You are not alone</h3>
          <p>Take one step at a time. Stop contact, call your bank, save evidence, then report through official channels.</p>
          <div className="help-card"><Shield /><span><b>Your safety comes first</b>Never confront a suspected scammer or travel to meet them.</span></div>
        </div>
      </div>
    </div>
  );
}
