"use client";

import { usePathname } from "next/navigation";
import { Coffee, Gift, Music, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ProgressBar } from "@/components/ProgressBar";
import { MiniPartyCard } from "@/components/MiniPartyCard";

const PROFILE_STEPS = ["username", "name", "age", "pronouns"];

const STEP_COPY: Record<string, { headline: string; subhead: string }> = {
  email: {
    headline: "Your next great night is one invite away.",
    subhead:
      "Join a club built on private parties, real people, and zero awkward small talk.",
  },
  otp: {
    headline: "Your next great night is one invite away.",
    subhead:
      "Join a club built on private parties, real people, and zero awkward small talk.",
  },
  username: {
    headline: "A couple quick details before we let you in.",
    subhead: "This only takes a minute — and it's the last step before your first invite.",
  },
  name: {
    headline: "A couple quick details before we let you in.",
    subhead: "This only takes a minute — and it's the last step before your first invite.",
  },
  age: {
    headline: "A couple quick details before we let you in.",
    subhead: "This only takes a minute — and it's the last step before your first invite.",
  },
  pronouns: {
    headline: "A couple quick details before we let you in.",
    subhead: "This only takes a minute — and it's the last step before your first invite.",
  },
  terms: {
    headline: "Almost there.",
    subhead:
      "Read the fine print (we kept it fun), grab a bonus with an invite code, and you're in.",
  },
};

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "18+, verified members" },
  { icon: Sparkles, label: "Private parties only" },
  { icon: Gift, label: "Invite bonuses on signup" },
];

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const step = pathname?.split("/").pop() ?? "";
  const showGettingReady = [...PROFILE_STEPS, "terms"].includes(step);
  const profileIndex = PROFILE_STEPS.indexOf(step);
  const copy = STEP_COPY[step] ?? STEP_COPY.email;

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 lg:flex">
      {/* ---------- Desktop / laptop: branding panel ---------- */}
      <aside className="relative hidden w-[44%] shrink-0 overflow-hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/3 h-128 w-lg -translate-x-1/2 rounded-full bg-violet-600/20 blur-[160px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]"
        />

        <Logo size="md" className="relative" />

        <div className="relative flex h-72 items-center justify-center">
          <MiniPartyCard
            title="Cafe"
            category="Coffee Break"
            icon={Coffee}
            className="absolute -left-2 top-0 -rotate-6"
          />
          <MiniPartyCard
            title="Party jam"
            category="Music Jam"
            icon={Music}
            className="absolute right-0 top-16 rotate-3"
          />
          <MiniPartyCard
            title="Parttyyy"
            category="Dinner Event"
            icon={UtensilsCrossed}
            className="absolute left-14 bottom-0 rotate-2"
          />
        </div>

        <div className="relative">
          <h2 className="text-3xl font-extrabold leading-snug text-white">
            {copy.headline}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
            {copy.subhead}
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-white/60">
                <Icon className="h-4 w-4 text-violet-300" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ---------- Form panel (all breakpoints) ---------- */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-8 sm:py-16 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px] lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px] lg:hidden"
        />

        <main className="relative flex w-full max-w-sm flex-col">
          <header className="mb-8 flex items-center justify-between lg:hidden">
            <Logo size="sm" />
            {showGettingReady && (
              <span className="text-xs font-extrabold uppercase tracking-widest text-white/50">
                Getting Ready
              </span>
            )}
          </header>

          {showGettingReady && (
            <span className="mb-6 hidden text-xs font-extrabold uppercase tracking-widest text-white/50 lg:block">
              Getting Ready
            </span>
          )}

          {profileIndex >= 0 && (
            <div className="mb-8">
              <ProgressBar step={profileIndex + 1} total={PROFILE_STEPS.length} />
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
