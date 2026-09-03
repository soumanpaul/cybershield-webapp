import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDashboardLanguage } from "./language-provider";

interface ScreenTitleProps {
  number: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  urgent?: boolean;
}

export function ScreenTitle({ number, icon, title, subtitle, urgent = false }: ScreenTitleProps) {
  const { t } = useDashboardLanguage();

  return (
    <div className="flex min-h-20 flex-wrap items-start gap-3 border-b border-slate-200 px-1 pb-5 sm:flex-nowrap sm:items-center">
      <div className={cn("grid h-6 w-10 shrink-0 place-items-center rounded-md bg-blue-100 text-[10px] font-extrabold tracking-wider text-blue-700", urgent && "bg-red-100 text-red-600")}>{number}</div>
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 [&_svg]:size-5", urgent && "bg-red-100 text-red-600")}>{icon}</span>
      <div className="w-full sm:w-auto">
        <h2 className="text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl">{t(title)}</h2>
        <p className="mt-1 text-[11px] text-slate-500">{t(subtitle)}</p>
      </div>
    </div>
  );
}
