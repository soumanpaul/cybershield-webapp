"use client";

import {
  AlertTriangle, ArrowRight, CheckCircle2, Clock3, Gift, LockKeyhole,
  Mail, MapPin, Phone, ShieldCheck, Sparkles, UserRound, XCircle,
} from "lucide-react";
import { FormEvent, useState } from "react";

type FormFields = { name: string; email: string; phone: string; location: string };
const initialFields: FormFields = { name: "", email: "", phone: "", location: "" };

export function ScamSimulator() {
  const [fields, setFields] = useState(initialFields);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);

  const update = (field: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/mobile/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          externalId: `SIM-${Date.now()}`,
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          location: fields.location,
          device: navigator.userAgent.slice(0, 255),
          status: "SIMULATION",
          threatLevel: "medium",
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "The training result could not be saved.");
      setRevealed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The training result could not be saved.");
    } finally {
      setSubmitting(false);
    }
  }

  if (revealed) {
    return (
      <main className="sim-page revealed-page">
        <div className="training-ribbon"><ShieldCheck /> CYBERSHIELD AWARENESS TRAINING</div>
        <section className="lesson-card">
          <div className="lesson-icon"><AlertTriangle /></div>
          <p className="lesson-kicker">SIMULATION COMPLETE</p>
          <h1>This could have been a scam.</h1>
          <p className="lesson-lead">You shared contact information after seeing an unexpected reward and a short deadline. In a real attack, that data could be used for targeted calls, phishing messages, or identity fraud.</p>
          <div className="lesson-score"><span>Awareness moment</span><strong>Your training event was sent to the live dashboard.</strong></div>
          <div className="warning-grid">
            <article><Clock3 /><div><strong>Artificial urgency</strong><p>The countdown pushed you to act before checking the offer.</p></div></article>
            <article><Gift /><div><strong>Unexpected reward</strong><p>Prizes you did not enter are a common social-engineering lure.</p></div></article>
            <article><Mail /><div><strong>Information request</strong><p>The page asked for personal details before proving who was behind it.</p></div></article>
            <article><LockKeyhole /><div><strong>Trust signals</strong><p>A polished page and a lock icon do not prove an offer is legitimate.</p></div></article>
          </div>
          <div className="safe-checklist">
            <h2>Stop. Check. Protect.</h2>
            <p><CheckCircle2 /> Pause when a message creates urgency or fear.</p>
            <p><CheckCircle2 /> Visit the organization through its official app or typed address.</p>
            <p><CheckCircle2 /> Never share passwords, OTPs, PINs, or card details from a link.</p>
            <p><CheckCircle2 /> Report suspicious messages to your organization or service provider.</p>
          </div>
          <button className="try-again" onClick={() => { setFields(initialFields); setRevealed(false); }}>Run the simulation again</button>
        </section>
      </main>
    );
  }

  return (
    <main className="sim-page">
      <div className="training-ribbon"><ShieldCheck /> CYBERSHIELD AWARENESS TRAINING · USE DEMO INFORMATION ONLY</div>
      <header className="offer-header">
        <div className="offer-brand"><span><Sparkles /></span><strong>BrightBox Rewards</strong></div>
        <div className="secure-note"><LockKeyhole /> Secure reward center</div>
      </header>
      <section className="offer-shell">
        <div className="offer-copy">
          <div className="selected-pill"><CheckCircle2 /> You have been selected</div>
          <p className="offer-eyebrow">LOYALTY MEMBER EXCLUSIVE</p>
          <h1>Your complimentary smartphone is waiting.</h1>
          <p className="offer-intro">Complete the delivery form before your reservation expires. Only a limited number of rewards remain in your area.</p>
          <div className="countdown"><Clock3 /><div><small>RESERVATION EXPIRES IN</small><strong>04 : 59</strong></div></div>
          <div className="phone-art"><div className="phone-screen"><Sparkles /><span>PRO</span></div><i /><i /></div>
          <div className="trust-row"><span><ShieldCheck /> Verified reward</span><span><Gift /> Free delivery</span><span><CheckCircle2 /> 2,410 claimed</span></div>
        </div>
        <div className="claim-card">
          <div className="claim-step"><span>1</span><i /><span className="active">2</span><i /><span>3</span></div>
          <p className="claim-kicker">FINAL STEP</p>
          <h2>Where should we send it?</h2>
          <p>Enter contact details to reserve your reward.</p>
          <form onSubmit={submit}>
            <label><span>Full name</span><div><UserRound /><input required autoComplete="name" value={fields.name} onChange={(event) => update("name", event.target.value)} placeholder="Alex Morgan" /></div></label>
            <label><span>Email address</span><div><Mail /><input required type="email" autoComplete="email" value={fields.email} onChange={(event) => update("email", event.target.value)} placeholder="alex@example.com" /></div></label>
            <label><span>Phone number</span><div><Phone /><input required type="tel" autoComplete="tel" value={fields.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+1 555 0100" /></div></label>
            <label><span>City / region</span><div><MapPin /><input required autoComplete="address-level2" value={fields.location} onChange={(event) => update("location", event.target.value)} placeholder="Your city" /></div></label>
            {error && <div className="claim-error"><XCircle />{error}</div>}
            <button className="claim-button" disabled={submitting}>{submitting ? "Reserving…" : "Reserve my reward"}<ArrowRight /></button>
            <small className="form-safety"><ShieldCheck /> Training environment: never enter passwords, OTPs, card numbers, or other sensitive information.</small>
          </form>
        </div>
      </section>
      <footer className="sim-footer">This is a consent-based CyberShield social-awareness demonstration. No prize is offered.</footer>
    </main>
  );
}
