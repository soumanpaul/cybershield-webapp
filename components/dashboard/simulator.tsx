"use client";

import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  Link2,
  Phone,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeviceFrame } from "./device-frame";
import { JourneySteps } from "./journey-steps";
import { ScreenTitle } from "./screen-title";

const SCENARIOS = ["Digital Arrest", "UPI Collect Request", "QR Code Scam", "OTP Scam", "Fake Investment"];
const RESPONSE_OPTIONS = [
  "Open the link",
  "Call the number in the message",
  "Verify through an official government website",
];

export function Simulator() {
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState("Digital Arrest");
  const [choice, setChoice] = useState("");
  const next = () => setStep((currentStep) => Math.min(currentStep + 1, 3));

  return (
    <div className="tab-screen">
      <ScreenTitle number="02" icon={<Gamepad2 />} title="Experience Scam" subtitle="Practise safely. Learn what a scam feels like before it happens." />
      <JourneySteps labels={["Choose scenario", "Spot the signs", "See your result", "Track progress"]} active={step} />
      <div className="phone-stage purple-stage">
        {step === 0 && (
          <DeviceFrame title="Choose a scenario">
            <div className="scenario-list">
              {SCENARIOS.map((name) => (
                <button key={name} className={scenario === name ? "selected" : ""} onClick={() => setScenario(name)}>
                  <ShieldAlert />{name}<ChevronRight />
                </button>
              ))}
            </div>
            <button className="device-action" onClick={next}>Start scenario <ArrowRight /></button>
          </DeviceFrame>
        )}
        {step === 1 && (
          <DeviceFrame title={scenario}>
            <div className="fake-message">
              <span>WhatsApp message</span>
              <p><b>Cyber Crime Department:</b> Your Aadhaar is linked to an illegal parcel. Verify immediately to avoid arrest.</p>
            </div>
            <h4>What would you do?</h4>
            {RESPONSE_OPTIONS.map((item) => (
              <button key={item} className={`answer ${choice === item ? "selected" : ""}`} onClick={() => setChoice(item)}>{item}</button>
            ))}
            <button className="device-action" disabled={!choice} onClick={next}>Check my answer <ArrowRight /></button>
          </DeviceFrame>
        )}
        {step === 2 && (
          <DeviceFrame title="Your result">
            <div className="result-badge"><Check /></div>
            <h3 className="centered">Good catch!</h3>
            <p className="centered muted">Never act on threats from an unknown caller. Verify independently.</p>
            <div className="warning-list">
              <span><AlertCircle />Urgency and fear</span>
              <span><Link2 />Unknown link</span>
              <span><Phone />Unverified authority</span>
            </div>
            <button className="device-action" onClick={next}>View my progress <ArrowRight /></button>
          </DeviceFrame>
        )}
        {step === 3 && (
          <DeviceFrame title="Your progress">
            <div className="score-ring"><strong>820</strong><small>/1000</small></div>
            <h3 className="centered">Cyber Defender</h3>
            <div className="progress-row"><span>Scenarios completed</span><b>8 / 13</b></div>
            <div className="progress-bar"><i /></div>
            <button className="device-action" onClick={() => setStep(0)}>Try another scenario</button>
            <Link className="text-link" href="/scam-simulator">Open full simulator <ExternalLink /></Link>
          </DeviceFrame>
        )}
        <div className="stage-copy">
          <Sparkles />
          <h3>A safe place to make mistakes</h3>
          <p>This interactive journey uses realistic messages but never asks for passwords, OTPs, PINs or payment details.</p>
          <ul>
            <li><Check />Recognise pressure tactics</li>
            <li><Check />Practise safe verification</li>
            <li><Check />Build confidence one scenario at a time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
