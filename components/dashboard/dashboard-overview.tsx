import {
  ArrowRight,
  ExternalLink,
  Gamepad2,
  Megaphone,
  Phone,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDashboardLanguage } from "./language-provider";
import type { TabId } from "./types";

interface DashboardOverviewProps {
  onNavigate: (tab: TabId) => void;
}

interface OverviewCard {
  tab: Exclude<TabId, "home">;
  title: string;
  description: string;
  action: string;
  icon: LucideIcon;
  iconStyle: string;
  buttonStyle: string;
}

const OVERVIEW_CARDS: OverviewCard[] = [
  {
    tab: "awareness",
    title: "Cyber Scam Awareness",
    description: "Learn about the latest scams, warning signs, and safe practices to protect yourself.",
    action: "Explore Awareness",
    icon: ShieldCheck,
    iconStyle: "bg-blue-100 text-blue-600",
    buttonStyle: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
  },
  {
    tab: "simulator",
    title: "Experience Scam (Scam Simulator)",
    description: "Step into real-life scam scenarios and learn how to make the right choices.",
    action: "Start Simulator",
    icon: Gamepad2,
    iconStyle: "bg-violet-100 text-violet-700",
    buttonStyle: "from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700",
  },
  {
    tab: "analyzer",
    title: "Scam Analyzer",
    description: "Analyze suspicious messages, links, or content and check if they look like a scam.",
    action: "Analyze Now",
    icon: Search,
    iconStyle: "bg-green-100 text-green-700",
    buttonStyle: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
  },
  {
    tab: "report",
    title: "Report a scam",
    description: "Find helpline numbers, reporting links, guidelines and useful resources.",
    action: "View Resources",
    icon: ShieldCheck,
    iconStyle: "bg-amber-100 text-amber-500",
    buttonStyle: "from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500",
  },
];

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const { t } = useDashboardLanguage();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600 sm:text-sm">
            {t("Welcome to Cyber Suraksha")}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl">
            {t("Stay Informed.")} <span className="!text-green-600">{t("Stay Secure.")}</span>
          </h1>
          <p className="mt-3 max-w-xl text-[11px] font-medium leading-6 text-slate-600 sm:text-xs">
            {t("Learn about common cyber scams, how to identify them, and what you can do to protect yourself and others.")}
          </p>
        </div>

        <a
          href="tel:1930"
          aria-label={t("Call 1930")}
          className="flex min-w-64 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 no-underline shadow-sm transition hover:border-red-200 hover:shadow-md"
        >
          <span className="grid size-11 place-items-center rounded-full bg-red-50 text-red-500"><Phone className="size-5" /></span>
          <span className="flex-1"><small className="block text-[9px] font-semibold text-slate-600">{t("Financial Fraud?")}</small><strong className="block text-base text-red-500">{t("Call 1930")}</strong><em className="mt-1 block text-[8px] not-italic text-slate-400">{t("Helpline for cyber financial fraud")}</em></span>
          <ArrowRight className="size-3 text-slate-400" />
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {OVERVIEW_CARDS.map(({ tab, title, description, action, icon: Icon, iconStyle, buttonStyle }) => (
          <Card key={tab} className="flex min-h-64 flex-col rounded-xl border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <CardContent className="flex h-full flex-1 flex-col p-5">
              <span className={cn("grid size-12 place-items-center rounded-full", iconStyle)}><Icon className="size-6" strokeWidth={2} /></span>
              <h2 className="mt-5 min-h-10 text-[12px] font-bold leading-4 text-slate-900">{t(title)}</h2>
              <p className="mt-2 text-[10px] leading-5 text-slate-600">{t(description)}</p>
              <Button className={cn("mt-auto h-10 w-full justify-between bg-gradient-to-r px-3 text-[9px] font-bold", buttonStyle)} onClick={() => onNavigate(tab)}>
                {t(action)} <span className="flex items-center gap-2"><ArrowRight className="size-3 opacity-50" /><ArrowRight className="size-3" /></span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-5 py-3">
        <Megaphone className="size-5 text-blue-600" />
        <p className="flex-1 text-[9px] font-semibold text-slate-600">{t("Remember: Think before you click. Verify before you trust. Report to protect.")}</p>
        <Button variant="outline" size="sm" className="border-blue-100 bg-white text-[8px] font-bold text-blue-600" onClick={() => onNavigate("awareness")}>{t("Know More Tips")} <ExternalLink className="size-3" /></Button>
      </div>
    </div>
  );
}
