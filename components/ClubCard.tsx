import { Hexagon, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { TIER_ICON_CLASS, type ClubTier } from "@/lib/tiers";

export function ClubCard({
  tier,
  progressPercent,
  caption,
}: {
  tier: ClubTier;
  progressPercent: number;
  caption: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
        Your Club
      </p>
      <div className="rounded-2xl border border-white/15 p-4">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold capitalize text-white">
            {tier} Club Member
          </span>
          <Hexagon
            className={cn("h-6 w-6", TIER_ICON_CLASS[tier])}
            fill="currentColor"
            fillOpacity={0.2}
          />
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-white/60">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        {caption}
      </div>
    </div>
  );
}
