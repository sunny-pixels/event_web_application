export type ClubTier = "bronze" | "silver" | "gold";

/** Hexagon icon colors per club tier — brown-bronze, bright silver, warm gold. */
export const TIER_ICON_CLASS: Record<ClubTier, string> = {
  bronze: "text-amber-700",
  silver: "text-slate-300",
  gold: "text-amber-400",
};
