import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardLanguage } from "./language-provider";

interface JourneyStepsProps {
  labels: readonly string[];
  active: number;
  tone?: "violet" | "green" | "red";
}

const activeTone = {
  violet: "border-violet-600 bg-violet-600",
  green: "border-green-600 bg-green-600",
  red: "border-red-600 bg-red-600",
};

export function JourneySteps({ labels, active, tone = "violet" }: JourneyStepsProps) {
  const { t } = useDashboardLanguage();

  return (
    <div className="mx-auto my-5 flex max-w-3xl items-start justify-center">
      {labels.map((label, index) => (
        <div key={label} className="relative flex-1 text-center">
          <span className={cn("relative z-10 mx-auto grid size-7 place-items-center rounded-full border-2 border-slate-300 bg-slate-50 text-[9px] font-extrabold text-slate-400", index <= active && `text-white ${activeTone[tone]}`)}>
            {index < active ? <Check className="size-3" /> : index + 1}
          </span>
          <small className={cn("mx-auto mt-2 block max-w-24 text-[8px] font-bold text-slate-400", index <= active && "text-slate-700")}>{t(label)}</small>
          {index < labels.length - 1 && <i className="absolute left-[calc(50%+16px)] top-[13px] w-[calc(100%-32px)] border-t-2 border-slate-200" />}
        </div>
      ))}
    </div>
  );
}
