import { ArrowLeft, CircleHelp } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDashboardLanguage } from "./language-provider";

interface DeviceFrameProps {
  title: string;
  children: ReactNode;
}

export function DeviceFrame({ title, children }: DeviceFrameProps) {
  const { t } = useDashboardLanguage();

  return (
    <Card className="min-h-[455px] w-full overflow-hidden rounded-[28px] border-[6px] border-slate-800 shadow-2xl shadow-slate-900/20 sm:min-h-[475px] sm:border-[7px]">
      <CardHeader className="flex h-14 flex-row items-center justify-between border-b border-slate-200 px-4 py-0 text-slate-600">
        <ArrowLeft className="size-4" />
        <strong className="text-[10px]">{t(title)}</strong>
        <CircleHelp className="size-4" />
      </CardHeader>
      <CardContent className="p-4 sm:p-5">{children}</CardContent>
    </Card>
  );
}
