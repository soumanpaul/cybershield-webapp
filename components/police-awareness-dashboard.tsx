"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  GraduationCap,
  Home,
  Menu,
  MessageCircleQuestion,
  MousePointerClick,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Overview", icon: Home, href: "#overview", external: false },
  { label: "Scam Insights", icon: BarChart3, href: "/captured-data", external: true },
  { label: "Awareness Programs", icon: GraduationCap, href: "/data-dashboard", external: true },
  { label: "About the Project", icon: Users, href: "#about", external: false },
  { label: "How It Helps", icon: FileText, href: "#how-it-helps", external: false },
] as const;

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

        <div id="overview" className="mx-auto w-full max-w-[1320px] px-5 py-10 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
          <div className="mb-8 max-w-4xl">
            <div>
              <h1 className="!text-[28px] !font-black !leading-tight !tracking-[-0.8px] !text-[#082758] sm:!text-[32px]">Cyber Safety Awareness at a Glance</h1>
              <p className="mt-1 text-base font-medium text-[#17477f] sm:text-lg">Aggregated insights from citizen interactions and scam simulations</p>
            </div>
          </div>

          <section id="about" className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_18px_60px_rgba(30,88,148,.09)]" aria-labelledby="about-title">
            <div className="grid lg:grid-cols-[1.15fr_.85fr]">
              <div className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  <Sparkles className="size-4" /> About CyberRakshak
                </span>
                <h2 id="about-title" className="mt-6 max-w-2xl text-3xl font-black leading-tight tracking-tight text-[#082758] sm:text-4xl">
                  Helping people feel safer online
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#315a89]">
                  CyberRakshak is a simple cyber-safety learning project. It helps citizens understand common online scams, practise spotting warning signs, and learn what to do before sharing money or personal information.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b6d94]">
                  The goal is simple: make cyber awareness easy to understand and useful in everyday life.
                </p>
              </div>

              <div id="how-it-helps" className="flex flex-col justify-center bg-gradient-to-br from-[#0a3b73] to-[#082a55] px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-12">
                <p className="mb-6 text-sm font-extrabold uppercase tracking-[0.18em] text-blue-200">How it helps</p>
                <div className="space-y-6">
                  {[
                    { icon: MessageCircleQuestion, title: "Learn", text: "Understand how common digital scams work." },
                    { icon: MousePointerClick, title: "Practise", text: "Try safe simulations based on real situations." },
                    { icon: ShieldCheck, title: "Stay protected", text: "Know the warning signs and choose the safer action." },
                  ].map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/10 text-blue-100"><Icon className="size-6" /></span>
                      <div>
                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="mt-1 leading-6 text-blue-100">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-7 grid gap-4 sm:grid-cols-3" aria-label="CyberRakshak values">
            {[
              { title: "Simple", text: "Clear guidance without technical words." },
              { title: "Practical", text: "Examples that connect with daily life." },
              { title: "For everyone", text: "Useful for citizens of every age." },
            ].map(({ title, text }) => (
              <article key={title} className="rounded-2xl border border-blue-100 bg-blue-50/55 p-6">
                <h3 className="text-lg font-black text-[#0b3773]">{title}</h3>
                <p className="mt-2 leading-6 text-[#4b6d94]">{text}</p>
              </article>
            ))}
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
