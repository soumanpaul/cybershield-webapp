"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  ChevronDown,
  FileText,
  GraduationCap,
  Home,
  KeyRound,
  Link2,
  Menu,
  PieChart,
  Shield,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Overview", icon: Home, href: "#overview", external: false },
  { label: "Scam Insights", icon: BarChart3, href: "/captured-data", external: true },
  { label: "Awareness Programs", icon: GraduationCap, href: "/", external: true },
  { label: "Citizen Engagement", icon: Users, href: "#engagement", external: false },
  { label: "Resources", icon: FileText, href: "#resources", external: false },
] as const;

const summaryCards = [
  { label: "Citizens Assisted", value: "1,248", change: "+12%", icon: Users, color: "blue" },
  { label: "Scam Checks", value: "842", change: "+18%", icon: FileText, color: "green" },
  { label: "High Risk Checks", value: "271", change: "+9%", icon: AlertTriangle, color: "red" },
  { label: "Awareness Challenges Completed", value: "463", change: "+26%", icon: GraduationCap, color: "purple" },
] as const;

const scams = [
  { label: "UPI Fraud", value: 31, color: "bg-red-500" },
  { label: "Digital Arrest", value: 24, color: "bg-orange-500" },
  { label: "KYC Phishing", value: 17, color: "bg-blue-500" },
  { label: "Job Scam", value: 13, color: "bg-emerald-500" },
  { label: "Investment Scam", value: 10, color: "bg-violet-500" },
  { label: "Other", value: 5, color: "bg-slate-500" },
] as const;

const activity = [
  { day: "Mon", value: 58 },
  { day: "Tue", value: 121 },
  { day: "Wed", value: 94 },
  { day: "Thu", value: 166 },
  { day: "Fri", value: 94 },
  { day: "Sat", value: 114 },
  { day: "Sun", value: 128 },
] as const;

const warningSignals = [
  { label: "Urgent payment request", value: 213, icon: AlertTriangle },
  { label: "Unknown links", value: 186, icon: Link2 },
  { label: "OTP/password request", value: 149, icon: KeyRound },
  { label: "Police impersonation", value: 102, icon: Shield },
] as const;

const cardThemes = {
  blue: "from-sky-100 to-sky-50 text-blue-600",
  green: "from-emerald-100 to-emerald-50 text-emerald-600",
  red: "from-rose-100 to-rose-50 text-red-500",
  purple: "from-violet-100 to-violet-50 text-violet-700",
};

export function PoliceAwarenessDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fbff] font-sans text-[#082758]">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[268px] flex-col overflow-hidden bg-gradient-to-b from-[#082f61] via-[#0b3b70] to-[#082e58] text-white shadow-2xl transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button type="button" onClick={() => setMenuOpen(false)} className="absolute right-4 top-4 rounded-lg p-2 text-blue-100 hover:bg-white/10 lg:hidden" aria-label="Close navigation"><X className="size-5" /></button>

        <div className="flex min-h-[158px] items-center gap-4 border-b border-white/10 bg-[#06264d]/55 px-7">
          <div className="relative grid size-[58px] shrink-0 place-items-center text-amber-400">
            <Shield className="absolute size-[58px]" strokeWidth={1.5} />
            <Star className="size-6 fill-amber-400" />
          </div>
          <div>
            <p className="whitespace-nowrap text-[23px] font-black leading-none tracking-[-0.8px]">CyberRakshak</p>
            <p className="mt-2 text-lg font-medium text-blue-50">Police Dashboard</p>
            <p className="mt-3 text-[11px] text-blue-200">Safer Citizens. Stronger India.</p>
          </div>
        </div>

        <nav className="py-2" aria-label="Police dashboard navigation">
          {navigation.map(({ label, icon: Icon, href, external }, index) => {
            const className = `group relative flex min-h-14 items-center gap-5 px-8 text-[16px] font-medium transition ${index === 0 ? "bg-gradient-to-r from-[#1769ba] to-[#104c88] text-white before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#3ba5ff]" : "text-blue-50 hover:bg-white/8 hover:text-white"}`;
            const content = <><Icon className={`size-6 ${index === 0 ? "fill-blue-200 text-blue-200" : "text-blue-200"}`} /><span>{label}</span></>;
            return external ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={className} title={`Open ${label} in a new tab`}>{content}</a>
            ) : (
              <Link key={label} href={href} onClick={() => setMenuOpen(false)} className={className}>{content}</Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-4 px-7 pb-10 text-blue-300">
          <div className="relative grid size-14 place-items-center"><Shield className="absolute size-14" /><Star className="size-5 fill-blue-300" /></div>
          <p className="text-sm leading-5">Together<br />Against<br />Cyber Crime</p>
        </div>
      </aside>

      {menuOpen && <button type="button" aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setMenuOpen(false)} />}

      <section className="min-h-screen lg:ml-[268px]">
        <header className="relative flex min-h-24 items-center justify-between overflow-hidden border-b border-blue-100 bg-gradient-to-r from-[#d8edff] via-[#edf7ff] to-[#dceeff] px-5 sm:px-8 lg:px-12">
          <Image src="/assets/data-dashboard/police-india-gate.png" alt="" fill priority className="pointer-events-none object-cover object-[35%_67%] opacity-[0.13]" />
          <div className="relative z-10 flex items-center gap-4">
            <button type="button" onClick={() => setMenuOpen(true)} className="rounded-lg border border-blue-200 bg-white/70 p-2.5 text-blue-900 lg:hidden" aria-label="Open navigation"><Menu className="size-5" /></button>
            <div className="hidden sm:block">
              <p className="text-sm font-extrabold leading-[1.15] tracking-wide text-[#073477]">SAFE CITIZENS<br />SECURE INDIA</p>
              <span className="mt-2 block h-1.5 w-24 rounded-full bg-gradient-to-r from-orange-500 via-white to-green-600 shadow-sm" />
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-4 text-[#061f48] sm:gap-6">
            <div className="relative grid size-12 place-items-center"><Shield className="absolute size-12" strokeWidth={1.8} /><Star className="size-5 fill-[#061f48]" /></div>
            <div className="hidden h-9 w-px bg-blue-300 sm:block" />
            <p className="text-sm font-semibold sm:text-base">Serve <span className="mx-2 text-blue-300">|</span> Protect <span className="mx-2 text-blue-300">|</span> Prevent</p>
          </div>
        </header>

        <div id="overview" className="mx-auto w-full max-w-[1540px] px-5 pb-2 pt-7 sm:px-7 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h1 className="!text-[28px] !font-black !leading-tight !tracking-[-0.8px] !text-[#082758] sm:!text-[32px]">Cyber Safety Awareness at a Glance</h1>
              <p className="mt-1 text-base font-medium text-[#17477f] sm:text-lg">Aggregated insights from citizen interactions and scam simulations</p>
            </div>
            <button type="button" className="flex h-12 w-fit items-center gap-3 rounded-lg px-3 text-base font-semibold text-[#0b3773] hover:bg-blue-50"><CalendarDays className="size-5" />September 2026<ChevronDown className="size-4" /></button>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard summary">
            {summaryCards.map(({ label, value, change, icon: Icon, color }) => (
              <article key={label} className={`h-[145px] rounded-xl bg-gradient-to-br p-3 shadow-[inset_0_0_0_1px_rgba(148,184,220,.12)] ${cardThemes[color]}`}>
                <div className="flex items-center gap-4">
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white/45"><Icon className="size-9" strokeWidth={2.2} /></span>
                  <div className="min-w-0 text-[#071f4c]">
                    <p className="min-h-10 text-[16px] font-bold leading-5">{label}</p>
                    <p className="text-[34px] font-black leading-none tracking-tight">{value}</p>
                    <p className="mt-2 flex items-center gap-1.5 whitespace-nowrap text-xs text-[#42638c]"><TrendingUp className="size-4 stroke-[3] text-emerald-600" /><strong className={color === "red" ? "text-red-500" : "text-emerald-600"}>{change}</strong><span>vs last month</span></p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-[1.04fr_1fr]">
            <DashboardPanel title="Top Scam Categories" icon={PieChart} action="View All">
              <div className="space-y-3 px-5 pb-5 pt-2">
                {scams.map(({ label, value, color }) => (
                  <div key={label} className="grid grid-cols-[155px_1fr_44px] items-center gap-3 text-[16px]">
                    <span>{label}</span>
                    <span className="h-5 overflow-hidden rounded-md bg-slate-100"><span className={`block h-full rounded-md ${color}`} style={{ width: `${value * 2.9}%` }} /></span>
                    <strong className="text-right">{value}%</strong>
                  </div>
                ))}
              </div>
            </DashboardPanel>

            <DashboardPanel title="Weekly Activity" icon={BarChart3} action="Last 7 Days" dropdown>
              <div className="relative mx-5 mb-4 mt-2 h-[210px] border-b border-l border-blue-100 pl-10">
                {[200, 150, 100, 50, 0].map((tick, index) => <span key={tick} className="absolute left-0 text-xs text-[#315a89]" style={{ bottom: `${index * 25 - 2}%`, transform: "translate(-115%, 50%)" }}>{tick}</span>)}
                {[0, 25, 50, 75, 100].map((position) => <i key={position} className="absolute inset-x-0 border-t border-dashed border-blue-100" style={{ bottom: `${position}%` }} />)}
                <div className="absolute inset-0 flex items-end justify-around gap-3 px-4">
                  {activity.map(({ day, value }) => <div key={day} className="relative flex h-full flex-1 items-end justify-center"><span className="w-full max-w-12 rounded-t bg-gradient-to-b from-[#62aff1] to-[#78baf1] shadow-sm" style={{ height: `${value / 2}%` }} /><strong className="absolute -bottom-7 text-xs font-medium text-[#214d80]">{day}</strong></div>)}
                </div>
              </div>
            </DashboardPanel>
          </section>

          <section id="engagement" className="mt-5 grid gap-5 lg:grid-cols-[1.04fr_1fr]">
            <DashboardPanel title="Most Common Warning Signals" icon={AlertTriangle} action="View All" compact>
              <div className="px-5 pb-2">
                {warningSignals.map(({ label, value, icon: Icon }, index) => <div key={label} className={`grid min-h-11 grid-cols-[46px_1fr_auto] items-center ${index ? "border-t border-blue-100" : ""}`}><Icon className={`size-6 ${index === 0 ? "fill-red-500 text-red-500" : "text-[#134c91]"}`} /><span className="text-base">{label}</span><strong className="text-lg">{value}</strong></div>)}
              </div>
            </DashboardPanel>

            <article id="resources" className="relative min-h-[258px] overflow-hidden rounded-xl bg-gradient-to-br from-[#edf8ff] to-[#dcefff] shadow-[inset_0_0_0_1px_rgba(148,184,220,.15)]">
              <Image src="/assets/data-dashboard/police-india-gate.png" alt="Police officer overlooking India Gate" fill priority className="object-cover object-center opacity-95" sizes="(min-width: 1180px) 40vw, 100vw" />
              <div className="relative z-10 flex h-full min-h-[258px] w-[48%] flex-col justify-center px-7 py-7">
                <span className="text-5xl font-black leading-none text-blue-700">“</span>
                <h2 className="mt-1 text-xl font-black leading-7 text-[#073778]">Informed Citizens<br />Make Safer Communities</h2>
                <span className="my-4 h-px w-12 bg-blue-400" />
                <p className="text-sm leading-6 text-[#245489]">Cyber awareness today,<br />a safer tomorrow.</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-20 grid h-12 grid-cols-3 border-t border-blue-200 bg-white/72 backdrop-blur-sm">
                {[{ icon: Users, label: "Educate" }, { icon: ShieldCheck, label: "Prevent" }, { icon: Users, label: "Protect" }].map(({ icon: Icon, label }, index) => <span key={label} className={`flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 ${index ? "border-l border-blue-200" : ""}`}><Icon className="size-5" />{label}</span>)}
              </div>
            </article>
          </section>
        </div>

        <footer className="flex min-h-14 flex-col justify-between gap-2 border-t border-blue-100 bg-white px-5 py-4 text-xs text-[#315a89] sm:flex-row sm:items-center lg:px-8">
          <p><strong className="text-[#071f4c]">CyberRakshak</strong> <span className="mx-2">|</span> Awareness today. A safer tomorrow.</p>
          <p>Aggregated &amp; anonymized data. For internal use by authorized police personnel only.</p>
        </footer>
      </section>
    </main>
  );
}

function DashboardPanel({ title, icon: Icon, action, dropdown = false, compact = false, children }: { title: string; icon: typeof PieChart; action: string; dropdown?: boolean; compact?: boolean; children: React.ReactNode }) {
  return (
    <article className={`${compact ? "min-h-[258px]" : "min-h-[300px]"} rounded-xl border border-blue-100 bg-white shadow-[0_2px_12px_rgba(31,78,121,.04)]`}>
      <header className="flex min-h-16 items-center justify-between px-5">
        <div className="flex items-center gap-4"><Icon className="size-7 fill-blue-700 text-blue-700" /><h2 className="text-xl font-black text-[#071f4c]">{title}</h2></div>
        <button type="button" className={`flex items-center gap-2 text-sm font-semibold text-blue-700 ${dropdown ? "rounded-lg border border-blue-100 px-3 py-2" : ""}`}>{action}{dropdown && <ChevronDown className="size-4" />}</button>
      </header>
      {children}
    </article>
  );
}
