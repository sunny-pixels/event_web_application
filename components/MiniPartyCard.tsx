import type { LucideIcon } from "lucide-react";
import { gradientForSeed, cn } from "@/lib/utils";

export function MiniPartyCard({
  title,
  category,
  icon: Icon,
  className,
}: {
  title: string;
  category: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-48 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-2xl shadow-black/40 backdrop-blur",
        className
      )}
    >
      <div
        className="mb-3 flex h-16 w-full items-center justify-center rounded-xl"
        style={{ background: gradientForSeed(title) }}
      >
        <Icon className="h-7 w-7 text-white/40" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="mt-1 text-xs font-semibold text-violet-300">{category}</p>
    </div>
  );
}
