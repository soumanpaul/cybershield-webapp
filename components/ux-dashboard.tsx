"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle, ArrowLeft, ArrowRight, BadgeIndianRupee, Banknote, Bot,
  BriefcaseBusiness, Check, CheckCircle2, ChevronDown, ChevronRight, Download,
  ExternalLink, FileText, Gamepad2, HandCoins, ImageIcon, Landmark, Link2,
  LockKeyhole, Mail, MapPin, Megaphone, MessageSquare, Phone, QrCode, Search,
  Shield, ShieldAlert, ShieldCheck, Smartphone, Upload, UserRound, WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import styles from "./ux-dashboard.module.css";

type Tone = "blue" | "purple" | "green" | "red";
type Item = { label: string; icon: LucideIcon };

const scamCategories: Item[] = [
  { label: "Digital Arrest", icon: ShieldAlert }, { label: "UPI Collect Request", icon: WalletCards },
  { label: "QR Code Scam", icon: QrCode }, { label: "OTP Scam", icon: Phone },
  { label: "Fake Investment", icon: BadgeIndianRupee }, { label: "Fake Job", icon: BriefcaseBusiness },
  { label: "Courier / Customs Scam", icon: Mail }, { label: "Sextortion", icon: MapPin },
  { label: "Social Media Impersonation", icon: UserRound }, { label: "Loan App Scam", icon: HandCoins },
  { label: "Matrimonial Scam", icon: UserRound }, { label: "SIM / KYC Scam", icon: Smartphone },
];

const simulations = [
  ["Digital Arrest", "High Risk", "85/100"], ["UPI Collect Request", "High Risk", "75/100"],
  ["QR Code Scam", "Medium Risk", "80/100"], ["OTP Scam", "High Risk", "90/100"],
  ["Fake Investment", "High Risk", "70/100"], ["Fake Job", "Medium Risk", "78/100"],
  ["Courier / Customs Scam", "Medium Risk", "82/100"], ["Sextortion", "High Risk", "83/100"],
];

const analyzerTypes: Item[] = [
  { label: "SMS / Text Message", icon: MessageSquare }, { label: "WhatsApp Message", icon: Phone },
  { label: "Email", icon: Mail }, { label: "URL / Link", icon: Link2 },
  { label: "QR Code Screenshot", icon: QrCode }, { label: "Job Offer", icon: BriefcaseBusiness },
  { label: "Investment Message", icon: BadgeIndianRupee }, { label: "Loan Message", icon: HandCoins },
  { label: "Fake Police Notice", icon: ShieldAlert },
];

const reportActions: Item[] = [
  { label: "Act Immediately (Emergency Steps)", icon: AlertCircle },
  { label: "Report to National Cyber Crime Portal", icon: Landmark },
  { label: "Report to Local Police (If required)", icon: Shield },
  { label: "Save Evidence Guide", icon: FileText },
  { label: "Bank / Payment Provider Contact", icon: Banknote },
];

export function UxDashboard() {
  const [activeSection, setActiveSection] = useState("awareness");
  const [language, setLanguage] = useState("English");
  const jump = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className={styles.page}>
      <header className={styles.banner}>
        <Image src="/assets/cyber-safety/header-banner.png" alt="Cyber Suraksha — safety guidance and financial cyber fraud helpline 1930" fill priority sizes="100vw" />
      </header>

      <nav className={styles.nav} aria-label="Cyber safety services">
        <button className={activeSection === "awareness" ? styles.active : ""} onClick={() => jump("awareness")}><ShieldCheck /><span>Cyber Scam Awareness</span></button>
        <button className={activeSection === "simulator-flow" ? styles.active : ""} onClick={() => jump("simulator-flow")}><Gamepad2 /><span>Experience Scam<small>(Scam Simulator)</small></span></button>
        <button className={activeSection === "analyzer-flow" ? styles.active : ""} onClick={() => jump("analyzer-flow")}><Search /><span>AI Cyber Scam Analyzer</span></button>
        <button className={`${styles.danger} ${activeSection === "report-flow" ? styles.activeDanger : ""}`} onClick={() => jump("report-flow")}><ShieldAlert /><span>I Have Been Scammed<small>(Report a Scam)</small></span></button>
        <label className={styles.language}><select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value)}><option>English</option><option>हिन्दी</option><option>বাংলা</option></select><ChevronDown /></label>
      </nav>

      <section className={styles.featureGrid}>
        <FeatureCard id="awareness" number="1." tone="blue" title="Cyber Scam Awareness" description="Learn about common cyber scams and stay protected." action="Explore Scams" icon={ShieldCheck} onAction={() => jump("awareness")}>
          <AwarenessPanel />
        </FeatureCard>

        <FeatureCard number="2." tone="purple" title={<>Experience Scam<br />(Scam Simulator)</>} description="Practice. Learn. Stay one step ahead." action="Start Simulation" icon={Gamepad2} onAction={() => jump("simulator-flow")}>
          <h3>Simulation Categories <button>View All</button></h3>
          <div className={styles.simList}>{simulations.map(([name, risk, score]) => <button key={name} onClick={() => jump("simulator-flow")}><span><Gamepad2 />{name}</span><em className={risk === "High Risk" ? styles.high : styles.medium}>{risk}</em><small>Score {score}</small></button>)}</div>
        </FeatureCard>

        <FeatureCard number="3." tone="green" title="AI Cyber Scam Analyzer" description="Analyze suspicious messages, links, images and more with AI." action="Analyze Now" icon={Bot} onAction={() => jump("analyzer-flow")}>
          <h3>What can you analyze?</h3>
          <div className={styles.analyzerGrid}>{analyzerTypes.map(({ label, icon: Icon }) => <button key={label} onClick={() => jump("analyzer-flow")}><Icon /><span>{label}</span></button>)}</div>
          <div className={styles.privacy}><LockKeyhole />We do not store your data. Your privacy is our priority.</div>
        </FeatureCard>

        <FeatureCard number="4." tone="red" title={<>I Have Been Scammed<br />(Report a Scam)</>} description="Get immediate help and report the incident to the right authorities." action="Get Help Now" icon={ShieldAlert} onAction={() => jump("report-flow")}>
          <h3>What should you do now?</h3>
          <div className={styles.reportList}>{reportActions.map(({ label, icon: Icon }) => <button key={label} onClick={() => jump("report-flow")}><Icon /><span>{label}</span><ChevronRight /></button>)}</div>
          <a className={styles.emergency} href="tel:1930"><Phone />Emergency? Call 1930 immediately</a>
        </FeatureCard>
      </section>

      <section className={styles.flowGrid}>
        <SimulatorFlow />
        <AnalyzerFlow />
        <ReportFlow />
      </section>

      <footer className={styles.footer}>
        <FooterTip icon={Gamepad2} title="Think Before You Click" text="Don’t click on unknown links or attachments." />
        <FooterTip icon={FileText} title="Verify Before You Trust" text="Always verify through official channels." />
        <FooterTip icon={ShieldCheck} title="Protect Your Information" text="Never share OTP, PIN, passwords or CVV." />
        <FooterTip icon={Search} title="Report to Protect" text="Report suspicious activity and help others stay safe." />
        <a href="tel:1930" className={styles.footerCall}><Phone /><span>Financial Cyber Fraud?<b>Call 1930</b><small>Helpline for financial fraud</small></span></a>
      </footer>
    </main>
  );
}

function AwarenessPanel() {
  const [selected, setSelected] = useState("Digital Arrest");
  return <>
    <h3>Top Scam Categories <button onClick={() => setSelected("Digital Arrest")}>View All</button></h3>
    <div className={styles.categoryGrid}>{scamCategories.map(({ label, icon: Icon }) => <button key={label} className={selected === label ? styles.selectedTile : ""} onClick={() => setSelected(label)} aria-pressed={selected === label}><Icon /><span>{label}</span></button>)}</div>
    <div className={styles.remember}><ShieldCheck /><span><b>{selected}</b>{selected === "Digital Arrest" ? "Real police never demand money or secrecy over a video call." : "Pause before acting. Verify every request through an official channel."}</span></div>
  </>;
}

function SimulatorFlow() {
  const options = ["Digital Arrest", "UPI Collect Request", "QR Code Scam", "OTP Scam", "Fake Investment"];
  const answers = ["Open the link", "Call the number in the message", "Verify through the bank’s official channel"];
  const [scenario, setScenario] = useState("Digital Arrest");
  const [answer, setAnswer] = useState(answers[2]);
  const [completed, setCompleted] = useState(8);
  const correct = answer === answers[2];
  const finish = () => setCompleted((value) => Math.min(13, value + (correct ? 1 : 0)));

  return <FlowGroup id="simulator-flow" tone="purple" title="Flow 1: Scam Simulator Journey">
    <MiniPhone title="Choose Scenario"><MiniChoices items={options} selected={scenario} onSelect={setScenario} /><button className={styles.more} onClick={() => setScenario("Digital Arrest")}>More Categories <ChevronRight /></button></MiniPhone>
    <FlowArrow />
    <MiniPhone title="Scenario"><div className={styles.message}><b>WhatsApp Message</b><p>Dear Customer, your {scenario === "Digital Arrest" ? "account is linked to an illegal parcel" : "SBI account will be suspended today"}. Update KYC immediately.</p></div><p className={styles.question}>What would you do?</p><MiniChoices items={answers} selected={answer} onSelect={setAnswer} compact /><MiniButton tone="purple" onClick={finish}>Next</MiniButton></MiniPhone>
    <FlowArrow />
    <MiniPhone title="Result"><div className={`${styles.result} ${correct ? "" : styles.incorrect}`}><Check /></div><h4>{correct ? "Correct! 👍" : "Not quite — stop and verify"}</h4><p className={styles.question}>Warning Signs</p><ul><li>Creates urgency</li><li>Suspicious domain</li><li>Requests account verification</li></ul><strong className={styles.points}>{correct ? "+20 Points" : "Review the warning signs"}</strong><MiniButton tone="purple" onClick={() => { setScenario("Digital Arrest"); setAnswer(answers[2]); }}>Next Scenario</MiniButton></MiniPhone>
    <FlowArrow />
    <MiniPhone title="Your Progress"><p>Cyber Safety Score</p><div className={styles.score}><b>{820 + Math.max(0, completed - 8) * 20}</b><small>/1000</small></div><h4>Cyber Defender 🛡️</h4><span className={styles.metric}>Scenarios Completed <b>{completed} / 13</b></span><div className={styles.progress}><i style={{ width: `${(completed / 13) * 100}%` }} /></div><Link href="/scam-simulator" className={styles.miniLink}>Keep Going!</Link></MiniPhone>
  </FlowGroup>;
}

function AnalyzerFlow() {
  const sample = "You have a court case registered under your name. Contact the Cyber Crime Department immediately.";
  const [method, setMethod] = useState("Paste Text");
  const [message, setMessage] = useState(sample);
  const [analyzed, setAnalyzed] = useState(true);
  const risky = /arrest|court|police|immediately|money|otp|blocked|suspend/i.test(message);
  const analyze = () => setAnalyzed(Boolean(message.trim()));

  return <FlowGroup id="analyzer-flow" tone="green" title="Flow 2: AI Scam Analyzer Journey">
    <MiniPhone title="Upload / Paste"><p>Paste your message, URL or upload screenshot</p><div className={styles.inputTabs}>{["Paste Text", "Upload File", "URL"].map((item) => <button key={item} className={method === item ? styles.inputActive : ""} onClick={() => setMethod(item)}>{item}</button>)}</div>{method === "Upload File" ? <label className={styles.uploadBox}><Upload />Choose screenshot<input type="file" accept="image/*" onChange={(event) => { setMessage(event.target.files?.[0]?.name || ""); setAnalyzed(false); }} /></label> : <textarea className={styles.textbox} aria-label={method === "URL" ? "Suspicious URL" : "Suspicious message"} value={message} onChange={(event) => { setMessage(event.target.value); setAnalyzed(false); }} placeholder={method === "URL" ? "https://suspicious-link.example" : "Paste message here"} />}<small className={styles.count}>{message.length}/5000</small><MiniButton tone="green" onClick={analyze} disabled={!message.trim()}>Analyze</MiniButton></MiniPhone>
    <FlowArrow />
    <MiniPhone title="Analysis Result"><p>Risk Level</p><b className={risky && analyzed ? styles.risk : styles.safeRisk}>{analyzed ? (risky ? "HIGH" : "LOW") : "READY"}</b><h4>{analyzed ? (risky ? "Likely Scam" : "No strong scam signals") : "Waiting for analysis"}</h4><strong className={risky && analyzed ? styles.redText : styles.greenText}>{analyzed ? (risky ? <>Digital Arrest /<br />Police Impersonation</> : "Continue to verify independently") : "Enter content and select Analyze"}</strong><p>{analyzed ? "This content was checked for common social-engineering patterns." : "Your content remains on this device."}</p><p className={styles.question}>Warning Signs Detected</p><CheckList items={analyzed && risky ? ["Urgency", "Threat of arrest", "Request to act", "Impersonation language"] : ["No urgent payment detected", "Still verify the sender"]} /></MiniPhone>
    <FlowArrow />
    <MiniPhone title="Recommended Actions"><NumberList items={["Stop communicating immediately.", "Do not transfer money or share personal details.", "Save screenshots and preserve evidence.", "Report financial fraud immediately via 1930.", "File a complaint on the National Cyber Crime Reporting Portal."]} /><MiniButton tone="plain" onClick={() => { setMessage(""); setAnalyzed(false); setMethod("Paste Text"); }}>Start Over</MiniButton></MiniPhone>
  </FlowGroup>;
}

function ReportFlow() {
  const [payment, setPayment] = useState("UPI");
  const [stage, setStage] = useState(0);
  const downloadChecklist = () => {
    const checklist = ["Cyber fraud evidence checklist", `Payment method: ${payment}`, "Transaction ID / UTR", "UPI ID or account number", "Amount and date/time", "Screenshots", "Phone number or profile used", "Call 1930 immediately"].join("\n");
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([checklist], { type: "text/plain" }));
    anchor.download = "cyber-fraud-evidence-checklist.txt";
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };

  return <FlowGroup id="report-flow" tone="red" title="Flow 3: I Have Been Scammed Journey">
    <MiniPhone title="What Happened?"><p className={styles.question}>How did you lose money?</p><MiniRadio items={["UPI", "Bank Transfer", "Debit / Credit Card", "E-Wallet", "Other"]} selected={payment} onSelect={setPayment} /><MiniButton tone="red" onClick={() => setStage(1)}>Continue</MiniButton></MiniPhone>
    <FlowArrow />
    <MiniPhone title="Act Now"><strong className={styles.redText}>FINANCIAL FRAUD – ACT NOW</strong><div className={styles.actNow}><a href="tel:1930"><Phone />Call cybercrime helpline <b>1930</b></a><span><Landmark />Contact your bank immediately</span></div><NumberList items={[`Keep ${payment} transaction ID, account details, amount, date/time, screenshots and phone number used.`]} /><MiniButton tone="red" onClick={() => setStage(2)}>Next</MiniButton></MiniPhone>
    <FlowArrow />
    <MiniPhone title="Report & Next Steps"><div className={`${styles.nextLinks} ${stage < 2 ? styles.pending : ""}`}><a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer"><FileText />Report on National Cyber Crime Portal<ExternalLink /></a><a href="tel:112"><ShieldAlert />Inform Local Police<ChevronRight /></a><button onClick={downloadChecklist}><Download />Save Evidence Guide<ChevronRight /></button><a href="tel:1930"><Phone />Helpline Numbers & Resources<ChevronRight /></a></div><Link href="/data-dashboard" className={styles.dataLink}>Open Incident Dashboard <ArrowRight /></Link></MiniPhone>
  </FlowGroup>;
}

function FeatureCard({ id, number, tone, title, description, action, icon: Icon, onAction, children }: { id?: string; number: string; tone: Tone; title: React.ReactNode; description: string; action: string; icon: LucideIcon; onAction?: () => void; children: React.ReactNode }) {
  return <article id={id} className={`${styles.featureCard} ${styles[tone]}`}><div className={styles.featureTop}><div><h2><b>{number}</b>{title}</h2><p>{description}</p><button onClick={onAction}>{action}<ArrowRight /></button></div><div className={styles.featureArt}><span><Icon /></span><i /><i /></div></div><div className={styles.featureBody}>{children}</div></article>;
}

function FlowGroup({ id, tone, title, children }: { id: string; tone: Tone; title: string; children: React.ReactNode }) { return <article id={id} className={`${styles.flowGroup} ${styles[tone]}`}><h2>{title}</h2><div className={styles.flowBody}>{children}</div></article>; }
function MiniPhone({ title, children }: { title: string; children: React.ReactNode }) { return <section className={styles.phone}><header><ArrowLeft /><b>{title}</b></header><div>{children}</div></section>; }
function FlowArrow() { return <ArrowRight className={styles.flowArrow} />; }
function MiniButton({ tone, children, onClick, disabled = false }: { tone: "purple" | "green" | "red" | "plain"; children: React.ReactNode; onClick?: () => void; disabled?: boolean }) { return <button className={`${styles.miniButton} ${styles[tone]}`} onClick={onClick} disabled={disabled}>{children}</button>; }
function MiniChoices({ items, selected, onSelect, compact = false }: { items: string[]; selected?: string; onSelect?: (item: string) => void; compact?: boolean }) { return <div className={`${styles.miniChoices} ${compact ? styles.compactChoices : ""}`}>{items.map((item) => <button key={item} className={selected === item ? styles.selectedChoice : ""} onClick={() => onSelect?.(item)} aria-pressed={selected === item}><span><ShieldAlert />{item}</span><ChevronRight /></button>)}</div>; }
function MiniRadio({ items, selected, onSelect }: { items: string[]; selected: string; onSelect: (item: string) => void }) { return <div className={styles.miniRadio}>{items.map((item) => <button key={item} className={selected === item ? styles.selectedRadio : ""} onClick={() => onSelect(item)} aria-pressed={selected === item}><i />{item}</button>)}</div>; }
function CheckList({ items }: { items: string[] }) { return <ul className={styles.checkList}>{items.map((item) => <li key={item}><Check />{item}</li>)}</ul>; }
function NumberList({ items }: { items: string[] }) { return <ol className={styles.numberList}>{items.map((item, index) => <li key={item}><b>{index + 1}</b>{item}</li>)}</ol>; }
function FooterTip({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) { return <div className={styles.footerTip}><Icon /><span><b>{title}</b><small>{text}</small></span></div>; }
