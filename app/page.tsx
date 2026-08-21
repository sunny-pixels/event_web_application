"use client";

import { useState } from "react";
import {
  Bell,
  MessageCircle,
  Coffee,
  Music,
  UtensilsCrossed,
  Sparkles,
  Star,
  ShieldCheck,
  Gift,
  Hexagon,
  ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ClubCard } from "@/components/ClubCard";
import { PartyCard, type PartyCardData } from "@/components/PartyCard";
import { AccountRequiredSheet } from "@/components/AccountRequiredSheet";
import { MiniPartyCard } from "@/components/MiniPartyCard";
import { TIER_ICON_CLASS, type ClubTier } from "@/lib/tiers";
import { cn } from "@/lib/utils";

const DESKTOP_PARTIES: PartyCardData[] = [
  {
    title: "Cafe",
    description: "A relaxed evening catch-up over coffee and conversation.",
    host: "chetan",
    category: { label: "Coffee Break", icon: Coffee, tone: "amber" },
    time: "9:49 PM",
    date: "12/09/26",
    location: "My Hii Cafe – Riverfront, Ahmedabad",
    ctaLabel: "Join",
  },
  {
    title: "Party jam",
    description: "Live acoustic sets and an open mic on the rooftop.",
    host: "jatinraja",
    category: { label: "Music Jam", icon: Music, tone: "violet" },
    time: "9:24 PM",
    date: "03/09/26",
    location: "Heartbeat RoofTop Cafe, Ahmedabad",
    ctaLabel: "Join",
  },
  {
    title: "Parttyyy",
    description: "A dinner table full of strangers who won't stay strangers.",
    host: "bhanuhu",
    category: { label: "Dinner Event", icon: UtensilsCrossed, tone: "orange" },
    time: "8:00 PM",
    date: "20/09/26",
    location: "Location visible only to members",
    confidential: true,
    ctaLabel: "Join",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Private parties",
    description:
      "Real events hosted by real members — cafés, rooftops, and dinners you won't find on a generic events app.",
  },
  {
    icon: Star,
    title: "Vibe Tokens & club tiers",
    description:
      "Earn Honorary Vibe Tokens for showing up and being good company. Climb from Bronze to Golden Club.",
  },
  {
    icon: ShieldCheck,
    title: "18+, verified members",
    description:
      "Every member confirms their age at signup, so you always know who you're partying with.",
  },
  {
    icon: Gift,
    title: "Invite bonuses",
    description: "Bring a friend with an invite code and earn up to +30 HVTs instantly.",
  },
];

const TIERS: { tier: ClubTier; blurb: string }[] = [
  { tier: "bronze", blurb: "Where every new member starts. Full access, zero cost." },
  { tier: "silver", blurb: "Unlocked after your first few events. Priority on invites." },
  { tier: "gold", blurb: "Top of the club. First access to every private party." },
];

export default function LandingPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      {/* ---------- Phone / tablet: 1:1 app replica ---------- */}
      <main className="mx-auto min-h-screen w-full max-w-md bg-zinc-950 px-5 pb-16 pt-6 sm:max-w-lg sm:border-x sm:border-white/10 sm:pt-10 lg:hidden">
        <header className="mb-6 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSheetOpen(true)}
              className="flex h-8 items-center gap-1 rounded-full border border-white/20 px-3 text-xs font-bold text-white"
            >
              VIP <span className="text-white/50">0</span>
            </button>
            <button
              onClick={() => setSheetOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              onClick={() => setSheetOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Messages"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </header>

        <ClubCard tier="silver" progressPercent={65} caption="20 HVTs to Golden Club" />

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-5 text-center text-sm font-extrabold leading-relaxed text-white/80">
          Want to be treated? Everyone here is looking for reasons to{" "}
          <span className="text-violet-400">party</span>, so bring your best vibe and
          expect the same from others. Let&apos;s party responsibly and make every
          experience a great one!
        </div>

        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Happening near you
            </h2>
            <button
              onClick={() => setSheetOpen(true)}
              className="text-xs font-semibold text-white/50 underline underline-offset-2"
            >
              Sign in to see more
            </button>
          </div>

          <PartyCard onCta={() => setSheetOpen(true)} data={DESKTOP_PARTIES[0]} />
        </section>
      </main>

      {/* ---------- Desktop / laptop: full marketing landing page ---------- */}
      <div className="hidden bg-zinc-950 lg:block">
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-56 left-1/3 h-128 w-lg -translate-x-1/2 rounded-full bg-violet-600/20 blur-[160px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-40 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]"
          />

          <header className="relative mx-auto flex max-w-7xl items-center justify-between px-10 py-7">
            <Logo size="md" />
            <nav className="flex items-center gap-8 text-sm font-semibold text-white/60">
              <a href="#discover" className="transition-colors hover:text-white">
                Discover
              </a>
              <a href="#membership" className="transition-colors hover:text-white">
                Membership
              </a>
              <a href="#how-it-works" className="transition-colors hover:text-white">
                How it works
              </a>
            </nav>
            <button
              onClick={() => setSheetOpen(true)}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-zinc-200"
            >
              Get Started
            </button>
          </header>

          <section className="relative mx-auto grid max-w-7xl grid-cols-2 items-center gap-16 px-10 py-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/50">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                Private parties, real people
              </span>
              <h1 className="mt-6 text-6xl font-extrabold leading-[1.05] text-white">
                Every good night starts with an invite.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
                Extroverts connects you to private parties, rooftop hangouts, and
                spontaneous meetups — curated by the people throwing them, not an
                algorithm.
              </p>
              <div className="mt-9 flex items-center gap-4">
                <button
                  onClick={() => setSheetOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-zinc-200"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#how-it-works"
                  className="rounded-xl border border-white/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="relative flex h-104 items-center justify-center">
              <MiniPartyCard
                title="Cafe"
                category="Coffee Break"
                icon={Coffee}
                className="absolute -left-4 top-2 -rotate-6"
              />
              <MiniPartyCard
                title="Party jam"
                category="Music Jam"
                icon={Music}
                className="absolute right-2 top-24 rotate-3"
              />
              <MiniPartyCard
                title="Parttyyy"
                category="Dinner Event"
                icon={UtensilsCrossed}
                className="absolute left-16 bottom-0 rotate-2"
              />
            </div>
          </section>
        </div>

        <section className="mx-auto max-w-4xl px-10 py-10 text-center">
          <p className="text-2xl font-extrabold leading-relaxed text-white/80">
            Want to be treated? Everyone here is looking for reasons to{" "}
            <span className="text-violet-400">party</span>, so bring your best vibe and
            expect the same from others. Let&apos;s party responsibly and make every
            experience a great one!
          </p>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-10 py-16">
          <h2 className="mb-10 text-center text-sm font-bold uppercase tracking-widest text-white/40">
            Why extroverts join
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors hover:border-white/25"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="discover" className="mx-auto max-w-7xl px-10 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">
                Happening near you
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-white">
                Parties you can join this week
              </p>
            </div>
            <button
              onClick={() => setSheetOpen(true)}
              className="text-sm font-semibold text-white/60 underline underline-offset-4 hover:text-white"
            >
              Sign in to see more
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {DESKTOP_PARTIES.map((party) => (
              <PartyCard key={party.title} data={party} onCta={() => setSheetOpen(true)} />
            ))}
          </div>
        </section>

        <section id="membership" className="mx-auto max-w-7xl px-10 py-16">
          <h2 className="mb-10 text-center text-sm font-bold uppercase tracking-widest text-white/40">
            Your club, your pace
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {TIERS.map(({ tier, blurb }) => (
              <div
                key={tier}
                className="rounded-2xl border border-white/10 bg-white/3 p-7"
              >
                <Hexagon
                  className={cn("h-8 w-8", TIER_ICON_CLASS[tier])}
                  fill="currentColor"
                  fillOpacity={0.2}
                />
                <h3 className="mt-4 text-lg font-bold capitalize text-white">
                  {tier} Club
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{blurb}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-10 py-20 text-center">
          <h2 className="text-4xl font-extrabold text-white">Ready to find your people?</h2>
          <p className="mx-auto mt-4 max-w-md text-white/50">
            It takes two minutes to join. No credit card, no algorithm — just an
            invite.
          </p>
          <button
            onClick={() => setSheetOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-zinc-200"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        <footer className="border-t border-white/10 px-10 py-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Logo size="sm" />
            <p className="text-xs text-white/30">Extroverts Web • v1.0.0</p>
          </div>
        </footer>
      </div>

      <AccountRequiredSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </>
  );
}
