"use client";

import {
  ArrowRight,
  Bot,
  Check,
  ImageIcon,
  Link2,
  LockKeyhole,
  Mail,
  MessageSquare,
  QrCode,
  Sparkles,
  Upload,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { DeviceFrame } from "./device-frame";
import { JourneySteps } from "./journey-steps";
import { ScreenTitle } from "./screen-title";

const RECOMMENDED_ACTIONS = [
  "Stop communicating immediately",
  "Do not transfer money or share details",
  "Save screenshots and preserve evidence",
  "Report financial fraud on 1930",
  "File a complaint on the official portal",
];

export function Analyzer() {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");

  const analyze = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim()) setStep(1);
  };

  const reset = () => {
    setStep(0);
    setMessage("");
  };

  return (
    <div className="tab-screen">
      <ScreenTitle number="03" icon={<Bot />} title="AI Cyber Scam Analyzer" subtitle="Paste a suspicious message or link and understand the risk in seconds." />
      <JourneySteps labels={["Upload or paste", "Analysis result", "Recommended actions"]} active={step} />
      <div className="phone-stage green-stage">
        {step === 0 && (
          <DeviceFrame title="Check suspicious content">
            <form onSubmit={analyze}>
              <div className="input-types">
                <button type="button" className="selected"><MessageSquare />Text</button>
                <button type="button"><Upload />Upload</button>
                <button type="button"><Link2 />URL</button>
              </div>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Paste the suspicious message, email or URL here…" />
              <div className="privacy-note"><LockKeyhole />We do not store what you paste here.</div>
              <button className="device-action green" disabled={!message.trim()}>Analyze now <Sparkles /></button>
            </form>
          </DeviceFrame>
        )}
        {step === 1 && (
          <DeviceFrame title="Analysis result">
            <span className="risk-high">High risk</span>
            <h3>Likely impersonation scam</h3>
            <p className="muted">The message uses urgency, authority and a request to act outside official channels.</p>
            <h4>Warning signs detected</h4>
            <div className="warning-list green-checks">
              <span><Check />Threat of arrest or loss</span>
              <span><Check />Urgent payment request</span>
              <span><Check />Unknown phone number</span>
              <span><Check />Suspicious external link</span>
            </div>
            <button className="device-action green" onClick={() => setStep(2)}>What should I do? <ArrowRight /></button>
          </DeviceFrame>
        )}
        {step === 2 && (
          <DeviceFrame title="Recommended actions">
            <div className="action-list">
              {RECOMMENDED_ACTIONS.map((text, index) => <span key={text}><b>{index + 1}</b>{text}</span>)}
            </div>
            <button className="device-action green" onClick={reset}>Analyze another message</button>
          </DeviceFrame>
        )}
        <div className="stage-copy">
          <Bot />
          <h3>Understand before you act</h3>
          <p>The analyzer explains suspicious patterns in plain language so you can make a calmer, informed decision.</p>
          <div className="analyze-types">
            <span><MessageSquare />SMS</span>
            <span><ImageIcon />Screenshot</span>
            <span><Mail />Email</span>
            <span><QrCode />QR code</span>
          </div>
        </div>
      </div>
    </div>
  );
}
