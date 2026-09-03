import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card" className={cn("rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-content" className={cn("p-6 pt-0", className)} {...props} />;
}
