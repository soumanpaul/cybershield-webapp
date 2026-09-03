"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle, ArrowLeft, ArrowRight, BadgeIndianRupee, BellRing, Bot,
  BriefcaseBusiness, Check, ChevronRight, CircleHelp, Download, ExternalLink,
  FileText, Gamepad2, HandCoins, HeartHandshake, ImageIcon, Landmark, Link2,
  LockKeyhole, Mail, MapPin, Menu, MessageSquare, Phone, QrCode, Search,
  Shield, ShieldAlert, ShieldCheck, Smartphone, Sparkles, Upload,
  WalletCards, X,
} from "lucide-react";
import { FormEvent, useState } from "react";

type TabId = "awareness" | "simulator" | "analyzer" | "report";

const tabs = [
  { id: "awareness" as const, label: "Cyber Scam Awareness", detail: "Learn & protect", icon: ShieldCheck },
  { id: "simulator" as const, label: "Experience Scam", detail: "Scam simulator", icon: Gamepad2 },
  { id: "analyzer" as const, label: "AI Scam Analyzer", detail: "Check suspicious content", icon: Search },
  { id: "report" as const, label: "I Have Been Scammed", detail: "Get help & report", icon: ShieldAlert },
];

const scams = [
  { name: "Digital Arrest", note: "Fake police pressure", icon: ShieldAlert, tone: "blue" },
  { name: "UPI Collect Request", note: "Unexpected payment", icon: WalletCards, tone: "green" },
  { name: "QR Code Scam", note: "Scan-to-receive trick", icon: QrCode, tone: "violet" },
  { name: "OTP Scam", note: "Code theft", icon: Smartphone, tone: "orange" },
  { name: "Fake Investment", note: "Guaranteed returns", icon: BadgeIndianRupee, tone: "pink" },
  { name: "Fake Job", note: "Pay before joining", icon: BriefcaseBusiness, tone: "violet" },
  { name: "Courier Scam", note: "Parcel threat", icon: MapPin, tone: "pink" },
  { name: "Loan App Scam", note: "Predatory lending", icon: HandCoins, tone: "blue" },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("awareness");
  const [mobileNav, setMobileNav] = useState(false);
  const selectTab = (tab: TabId) => { setActiveTab(tab); setMobileNav(false); };

  return (
    <main className="safety-site">
      <header className="safety-hero">
        <Image src="/assets/cyber-safety/header-banner.png" alt="Cyber Suraksha safety guidance and financial cyber fraud helpline 1930" fill priority sizes="100vw" />
      </header>

      <nav className={`safety-tabs ${mobileNav ? "open" : ""}`} aria-label="Cyber safety services">
        <button className="mobile-nav-toggle" onClick={() => setMobileNav((value) => !value)} aria-expanded={mobileNav}>{mobileNav ? <X /> : <Menu />}<span>{tabs.find((tab) => tab.id === activeTab)?.label}</span></button>
        <div className="tab-list">
          {tabs.map((tab, index) => { const Icon = tab.icon; return <button key={tab.id} data-testid={`tab-${tab.id}`} className={`${activeTab === tab.id ? "active" : ""} ${tab.id === "report" ? "urgent" : ""}`} onClick={() => selectTab(tab.id)} aria-pressed={activeTab === tab.id}><span className="tab-number">{index + 1}</span><Icon /><span><strong>{tab.label}</strong><small>{tab.detail}</small></span></button>; })}
        </div>
      </nav>

      <section className="safety-content">
        {activeTab === "awareness" && <Awareness onStart={() => selectTab("simulator")} />}
        {activeTab === "simulator" && <Simulator />}
        {activeTab === "analyzer" && <Analyzer />}
        {activeTab === "report" && <ReportHelp />}
      </section>

      <footer className="safety-footer">
        <span><ShieldCheck /><b>Think before you click</b><small>Don’t open unknown links.</small></span>
        <span><Search /><b>Verify before you trust</b><small>Use official channels.</small></span>
        <span><LockKeyhole /><b>Protect your information</b><small>Never share OTP, PIN or CVV.</small></span>
        <span className="footer-call"><Phone /><b>Financial cyber fraud?</b><strong>Call 1930</strong></span>
      </footer>
    </main>
  );
}

function Awareness({ onStart }: { onStart: () => void }) {
  return <div className="tab-screen awareness-screen">
    <section className="screen-intro"><div className="intro-copy"><div className="section-index">01</div><p className="kicker">Know the signs. Stop the scam.</p><h2>Cyber Scam Awareness</h2><p>Learn how common scams work, recognise warning signs, and build everyday habits that protect you and your family.</p><button className="primary-action" onClick={onStart}>Try a safe simulation <ArrowRight /></button></div><div className="awareness-visual"><div className="shield-orbit"><ShieldCheck /><i /><i /><i /></div><div><strong>Pause. Check. Protect.</strong><span>A few seconds of verification can prevent financial loss.</span></div></div></section>
    <div className="content-heading"><div><span>Explore common threats</span><h3>Top scam categories</h3></div><small>Tap a category to learn its warning signs</small></div>
    <div className="scam-grid">{scams.map(({ name, note, icon: Icon, tone }) => <article key={name} className={`scam-card ${tone}`}><span><Icon /></span><div><strong>{name}</strong><small>{note}</small></div><ChevronRight /></article>)}</div>
    <section className="remember-card"><ShieldCheck /><div><strong>Remember</strong><p>Think before you click. Verify before you trust. Report suspicious activity to protect yourself and others.</p></div><span>SAFE DIGITAL INDIA</span></section>
  </div>;
}

const scenarios = ["Digital Arrest", "UPI Collect Request", "QR Code Scam", "OTP Scam", "Fake Investment"];

function Simulator() {
  const [step, setStep] = useState(0); const [scenario, setScenario] = useState("Digital Arrest"); const [choice, setChoice] = useState("");
  const next = () => setStep((value) => Math.min(value + 1, 3));
  return <div className="tab-screen">
    <ScreenTitle number="02" icon={<Gamepad2 />} title="Experience Scam" subtitle="Practise safely. Learn what a scam feels like before it happens." />
    <JourneySteps labels={["Choose scenario", "Spot the signs", "See your result", "Track progress"]} active={step} />
    <div className="phone-stage purple-stage">
      {step === 0 && <DeviceFrame title="Choose a scenario"><div className="scenario-list">{scenarios.map((name) => <button key={name} className={scenario === name ? "selected" : ""} onClick={() => setScenario(name)}><ShieldAlert />{name}<ChevronRight /></button>)}</div><button className="device-action" onClick={next}>Start scenario <ArrowRight /></button></DeviceFrame>}
      {step === 1 && <DeviceFrame title={scenario}><div className="fake-message"><span>WhatsApp message</span><p><b>Cyber Crime Department:</b> Your Aadhaar is linked to an illegal parcel. Verify immediately to avoid arrest.</p></div><h4>What would you do?</h4>{["Open the link", "Call the number in the message", "Verify through an official government website"].map((item) => <button key={item} className={`answer ${choice === item ? "selected" : ""}`} onClick={() => setChoice(item)}>{item}</button>)}<button className="device-action" disabled={!choice} onClick={next}>Check my answer <ArrowRight /></button></DeviceFrame>}
      {step === 2 && <DeviceFrame title="Your result"><div className="result-badge"><Check /></div><h3 className="centered">Good catch!</h3><p className="centered muted">Never act on threats from an unknown caller. Verify independently.</p><div className="warning-list"><span><AlertCircle />Urgency and fear</span><span><Link2 />Unknown link</span><span><Phone />Unverified authority</span></div><button className="device-action" onClick={next}>View my progress <ArrowRight /></button></DeviceFrame>}
      {step === 3 && <DeviceFrame title="Your progress"><div className="score-ring"><strong>820</strong><small>/1000</small></div><h3 className="centered">Cyber Defender</h3><div className="progress-row"><span>Scenarios completed</span><b>8 / 13</b></div><div className="progress-bar"><i /></div><button className="device-action" onClick={() => setStep(0)}>Try another scenario</button><Link className="text-link" href="/scam-simulator">Open full simulator <ExternalLink /></Link></DeviceFrame>}
      <div className="stage-copy"><Sparkles /><h3>A safe place to make mistakes</h3><p>This interactive journey uses realistic messages but never asks for passwords, OTPs, PINs or payment details.</p><ul><li><Check />Recognise pressure tactics</li><li><Check />Practise safe verification</li><li><Check />Build confidence one scenario at a time</li></ul></div>
    </div>
  </div>;
}

function Analyzer() {
  const [step, setStep] = useState(0); const [message, setMessage] = useState("");
  const analyze = (event: FormEvent) => { event.preventDefault(); if (message.trim()) setStep(1); };
  return <div className="tab-screen">
    <ScreenTitle number="03" icon={<Bot />} title="AI Cyber Scam Analyzer" subtitle="Paste a suspicious message or link and understand the risk in seconds." />
    <JourneySteps labels={["Upload or paste", "Analysis result", "Recommended actions"]} active={step} />
    <div className="phone-stage green-stage">
      {step === 0 && <DeviceFrame title="Check suspicious content"><form onSubmit={analyze}><div className="input-types"><button type="button" className="selected"><MessageSquare />Text</button><button type="button"><Upload />Upload</button><button type="button"><Link2 />URL</button></div><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Paste the suspicious message, email or URL here…" /><div className="privacy-note"><LockKeyhole />We do not store what you paste here.</div><button className="device-action green" disabled={!message.trim()}>Analyze now <Sparkles /></button></form></DeviceFrame>}
      {step === 1 && <DeviceFrame title="Analysis result"><span className="risk-high">High risk</span><h3>Likely impersonation scam</h3><p className="muted">The message uses urgency, authority and a request to act outside official channels.</p><h4>Warning signs detected</h4><div className="warning-list green-checks"><span><Check />Threat of arrest or loss</span><span><Check />Urgent payment request</span><span><Check />Unknown phone number</span><span><Check />Suspicious external link</span></div><button className="device-action green" onClick={() => setStep(2)}>What should I do? <ArrowRight /></button></DeviceFrame>}
      {step === 2 && <DeviceFrame title="Recommended actions"><div className="action-list">{["Stop communicating immediately", "Do not transfer money or share details", "Save screenshots and preserve evidence", "Report financial fraud on 1930", "File a complaint on the official portal"].map((text, index) => <span key={text}><b>{index + 1}</b>{text}</span>)}</div><button className="device-action green" onClick={() => { setStep(0); setMessage(""); }}>Analyze another message</button></DeviceFrame>}
      <div className="stage-copy"><Bot /><h3>Understand before you act</h3><p>The analyzer explains suspicious patterns in plain language so you can make a calmer, informed decision.</p><div className="analyze-types"><span><MessageSquare />SMS</span><span><ImageIcon />Screenshot</span><span><Mail />Email</span><span><QrCode />QR code</span></div></div>
    </div>
  </div>;
}

function ReportHelp() {
  const [step, setStep] = useState(0); const [method, setMethod] = useState("UPI");
  return <div className="tab-screen">
    <ScreenTitle number="04" icon={<ShieldAlert />} title="I Have Been Scammed" subtitle="Act quickly, preserve evidence, and report the incident to the right authorities." urgent />
    <div className="emergency-strip"><BellRing /><div><strong>Money just left your account?</strong><span>Call 1930 immediately. Fast reporting can improve the chance of blocking a transaction.</span></div><a href="tel:1930">Call 1930 <Phone /></a></div>
    <JourneySteps labels={["What happened?", "Act now", "Report & next steps"]} active={step} />
    <div className="phone-stage red-stage">
      {step === 0 && <DeviceFrame title="What happened?"><h4>How did you lose money?</h4>{["UPI", "Bank transfer", "Debit / credit card", "E-wallet", "Other"].map((item) => <button key={item} className={`answer radio-answer ${method === item ? "selected" : ""}`} onClick={() => setMethod(item)}><i />{item}</button>)}<button className="device-action red" onClick={() => setStep(1)}>Continue <ArrowRight /></button></DeviceFrame>}
      {step === 1 && <DeviceFrame title="Act now"><p className="red-label">Financial fraud — act now</p><div className="urgent-actions"><span><Phone /><b>Call cybercrime helpline 1930</b></span><span><Landmark /><b>Contact your bank immediately</b></span><span><FileText /><b>Keep transaction ID, screenshots and phone numbers</b></span></div><button className="device-action red" onClick={() => setStep(2)}>Next <ArrowRight /></button></DeviceFrame>}
      {step === 2 && <DeviceFrame title="Report & next steps"><div className="report-links"><a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer"><FileText />National Cyber Crime Reporting Portal<ExternalLink /></a><a href="tel:1930"><Phone />Cybercrime helpline 1930<ChevronRight /></a><button><Download />Save evidence checklist<ChevronRight /></button></div><Link className="device-action red" href="/data-dashboard">Open incident data dashboard <ArrowRight /></Link><small className="admin-note">Authorized staff: view collected simulation and incident records.</small></DeviceFrame>}
      <div className="stage-copy"><HeartHandshake /><h3>You are not alone</h3><p>Take one step at a time. Stop contact, call your bank, save evidence, then report through official channels.</p><div className="help-card"><Shield /><span><b>Your safety comes first</b>Never confront a suspected scammer or travel to meet them.</span></div></div>
    </div>
  </div>;
}

function ScreenTitle({ number, icon, title, subtitle, urgent = false }: { number: string; icon: React.ReactNode; title: string; subtitle: string; urgent?: boolean }) { return <div className={`screen-title ${urgent ? "urgent" : ""}`}><div className="section-index">{number}</div><span>{icon}</span><div><h2>{title}</h2><p>{subtitle}</p></div></div>; }
function JourneySteps({ labels, active }: { labels: string[]; active: number }) { return <div className="journey-steps">{labels.map((label, index) => <div key={label} className={index <= active ? "active" : ""}><span>{index < active ? <Check /> : index + 1}</span><small>{label}</small>{index < labels.length - 1 && <i />}</div>)}</div>; }
function DeviceFrame({ title, children }: { title: string; children: React.ReactNode }) { return <section className="device-frame"><header><ArrowLeft /><strong>{title}</strong><CircleHelp /></header><div className="device-body">{children}</div></section>; }
