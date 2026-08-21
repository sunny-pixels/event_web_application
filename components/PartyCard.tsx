import { Clock, MapPin, Calendar, Hexagon, type LucideIcon } from "lucide-react";
import { gradientForSeed, cn } from "@/lib/utils";

type Tone = "amber" | "orange" | "violet";

const toneClasses: Record<Tone, string> = {
  amber: "bg-amber-400/15 text-amber-300",
  orange: "bg-orange-400/15 text-orange-300",
  violet: "bg-violet-400/15 text-violet-300",
};

export type PartyCardData = {
  title: string;
  description?: string;
  host: string;
  category: { label: string; icon: LucideIcon; tone: Tone };
  time?: string;
  date?: string;
  location?: string;
  confidential?: boolean;
  spotsLeft?: number;
  ctaLabel: string;
};

export function PartyCard({
  data,
  onCta,
}: {
  data: PartyCardData;
  onCta?: () => void;
}) {
  const CategoryIcon = data.category.icon;
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div
        className="flex h-28 shrink-0 items-center justify-center"
        style={{ background: gradientForSeed(data.title) }}
      >
        <CategoryIcon className="h-10 w-10 text-white/40" strokeWidth={1.5} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">{data.title}</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Private Party
            </p>
          </div>
          <Hexagon className="mt-1 h-6 w-6 shrink-0 text-white/25" />
        </div>

        {data.description && (
          <p className="mt-2 text-sm text-white/40">{data.description}</p>
        )}

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-white">@{data.host}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
              toneClasses[data.category.tone]
            )}
          >
            <CategoryIcon className="h-3.5 w-3.5" />
            {data.category.label}
          </span>
        </div>

        {(data.time || data.date || data.location) && (
          <div className="mt-4 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
            {(data.time || data.date) && (
              <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="flex items-center gap-2 px-3 py-2.5 text-sm text-white/80">
                  <Clock className="h-4 w-4 text-white/40" />
                  {data.time}
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 text-sm text-white/80">
                  <Calendar className="h-4 w-4 text-white/40" />
                  {data.date}
                </div>
              </div>
            )}
            {data.location && (
              <div className="relative flex items-center gap-2 px-3 py-2.5 text-sm text-white/80">
                <MapPin className="h-4 w-4 shrink-0 text-white/40" />
                <span className={cn(data.confidential && "blur-sm select-none")}>
                  {data.location}
                </span>
                {data.confidential && (
                  <span className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 text-[10px] font-bold uppercase tracking-widest text-white/70">
                    Confidential — members only
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        <button
          onClick={onCta}
          className="mt-4 h-12 w-full rounded-xl bg-white text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-zinc-200 lg:mt-auto"
        >
          {data.ctaLabel}
        </button>
      </div>

      {typeof data.spotsLeft === "number" && (
        <div className="bg-amber-600/90 py-2 text-center text-xs font-bold uppercase tracking-wider text-black">
          {data.spotsLeft} spots left!
        </div>
      )}
    </div>
  );
}
