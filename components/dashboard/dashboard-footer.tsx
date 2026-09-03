import { LockKeyhole, Phone, Search, ShieldCheck, type LucideIcon } from "lucide-react";
import { useDashboardLanguage } from "./language-provider";

const TIPS: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Think before you click", text: "Don’t open unknown links.", icon: ShieldCheck },
  { title: "Verify before you trust", text: "Use official channels.", icon: Search },
  { title: "Protect your information", text: "Never share OTP, PIN or CVV.", icon: LockKeyhole },
];

export function DashboardFooter() {
  const { t } = useDashboardLanguage();

  return (
    <footer className="mt-auto grid w-full overflow-hidden border border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm md:grid-cols-2 xl:grid-cols-4">
      {TIPS.map(({ title, text, icon: Icon }) => (
        <div key={title} className="grid min-h-20 grid-cols-[36px_1fr] content-center items-center gap-x-2 px-5 py-4">
          <Icon className="row-span-2 size-6 text-blue-700" />
          <b className="text-[10px] text-blue-950">{t(title)}</b>
          <small className="mt-1 text-[9px] text-slate-500">{t(text)}</small>
        </div>
      ))}
      <a href="tel:1930" aria-label={t("Call 1930")} className="flex min-h-20 items-center gap-3 bg-gradient-to-br from-blue-700 to-blue-950 px-6 py-4 text-white no-underline">
        <Phone className="size-7" />
        <span><b className="block text-[10px]">{t("Financial cyber fraud?")}</b><strong className="block text-xl uppercase">{t("Call 1930")}</strong></span>
      </a>
    </footer>
  );
}
