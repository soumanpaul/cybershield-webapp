import {
  ArrowRight,
  BadgeIndianRupee,
  BriefcaseBusiness,
  ChevronRight,
  HandCoins,
  MapPin,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

interface AwarenessProps {
  onStart: () => void;
}

interface ScamCategory {
  name: string;
  note: string;
  icon: LucideIcon;
  tone: "blue" | "green" | "violet" | "orange" | "pink";
}

const SCAM_CATEGORIES: ScamCategory[] = [
  { name: "Digital Arrest", note: "Fake police pressure", icon: ShieldAlert, tone: "blue" },
  { name: "UPI Collect Request", note: "Unexpected payment", icon: WalletCards, tone: "green" },
  { name: "QR Code Scam", note: "Scan-to-receive trick", icon: QrCode, tone: "violet" },
  { name: "OTP Scam", note: "Code theft", icon: Smartphone, tone: "orange" },
  { name: "Fake Investment", note: "Guaranteed returns", icon: BadgeIndianRupee, tone: "pink" },
  { name: "Fake Job", note: "Pay before joining", icon: BriefcaseBusiness, tone: "violet" },
  { name: "Courier Scam", note: "Parcel threat", icon: MapPin, tone: "pink" },
  { name: "Loan App Scam", note: "Predatory lending", icon: HandCoins, tone: "blue" },
];

export function Awareness({ onStart }: AwarenessProps) {
  return (
    <div className="tab-screen awareness-screen">
      <section className="screen-intro">
        <div className="intro-copy">
          <div className="section-index">01</div>
          <p className="kicker">Know the signs. Stop the scam.</p>
          <h2>Cyber Scam Awareness</h2>
          <p>Learn how common scams work, recognise warning signs, and build everyday habits that protect you and your family.</p>
          <button className="primary-action" onClick={onStart}>Try a safe simulation <ArrowRight /></button>
        </div>
        <div className="awareness-visual">
          <div className="shield-orbit"><ShieldCheck /><i /><i /><i /></div>
          <div><strong>Pause. Check. Protect.</strong><span>A few seconds of verification can prevent financial loss.</span></div>
        </div>
      </section>

      <div className="content-heading">
        <div><span>Explore common threats</span><h3>Top scam categories</h3></div>
        <small>Tap a category to learn its warning signs</small>
      </div>
      <div className="scam-grid">
        {SCAM_CATEGORIES.map(({ name, note, icon: Icon, tone }) => (
          <article key={name} className={`scam-card ${tone}`}>
            <span><Icon /></span>
            <div><strong>{name}</strong><small>{note}</small></div>
            <ChevronRight />
          </article>
        ))}
      </div>
      <section className="remember-card">
        <ShieldCheck />
        <div><strong>Remember</strong><p>Think before you click. Verify before you trust. Report suspicious activity to protect yourself and others.</p></div>
        <span>SAFE DIGITAL INDIA</span>
      </section>
    </div>
  );
}
