"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Bell,
  Coffee,
  Home,
  MessageCircle,
  Music,
  Plus,
  Star,
  User,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ClubCard } from "@/components/ClubCard";
import { PartyCard, type PartyCardData } from "@/components/PartyCard";
import { NotificationsSheet } from "@/components/NotificationsSheet";
import { useWizard } from "@/lib/wizard-store";
import { cn } from "@/lib/utils";

const PARTIES: PartyCardData[] = [
  {
    title: "Cafe",
    description: "A relaxed evening catch-up over coffee and conversation.",
    host: "chetan",
    category: { label: "Coffee Break", icon: Coffee, tone: "amber" },
    time: "9:49 PM",
    date: "12/09/26",
    location: "My Hii Cafe – Riverfront, Ahmedabad, Sabarmati Riverfront",
    ctaLabel: "View Flyer",
    spotsLeft: 3,
  },
  {
    title: "Let's hang out at night",
    host: "chetan",
    category: { label: "Coffee Break", icon: Coffee, tone: "amber" },
    time: "6:35 AM",
    date: "11/09/26",
    location: "Location visible only to members",
    confidential: true,
    ctaLabel: "View Flyer",
    spotsLeft: 3,
  },
  {
    title: "Party jam",
    description: "Live acoustic sets and an open mic on the rooftop.",
    host: "jatinraja",
    category: { label: "Music Jam", icon: Music, tone: "violet" },
    time: "9:24 PM",
    date: "03/09/26",
    location: "Heartbeat RoofTop Cafe, Ahmedabad, T/f 01 High Street",
    ctaLabel: "View Flyer",
    spotsLeft: 3,
  },
  {
    title: "Sunday Brunch Club",
    description: "Bottomless mimosas and a rooftop view to match.",
    host: "priya_v",
    category: { label: "Dinner Event", icon: UtensilsCrossed, tone: "orange" },
    time: "11:00 AM",
    date: "14/09/26",
    location: "Cloud Nine Rooftop, Ahmedabad",
    ctaLabel: "View Flyer",
    spotsLeft: 5,
  },
];

const NAV_ITEMS: { icon: LucideIcon; label: string; active?: boolean }[] = [
  { icon: Home, label: "Home", active: true },
  { icon: MessageCircle, label: "Messages" },
  { icon: Plus, label: "Create" },
  { icon: User, label: "Profile" },
];

function WelcomeToastOnMount({ name, bonusTokens }: { name: string; bonusTokens: number }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("welcome") === "1") {
      toast.success(
        bonusTokens > 0
          ? `Welcome to the club, ${name}! +${bonusTokens} Honorary Vibe Tokens.`
          : `Welcome to the club, ${name}!`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function HomeFeedPage() {
  const { state } = useWizard();
  const [notifOpen, setNotifOpen] = useState(false);
  const displayName = state.name || "Guest";
  const tokenCaption =
    state.bonusTokens > 0
      ? `You have ${state.bonusTokens} Honorary Vibe Tokens!`
      : "You have 0 Honorary Vibe Tokens!";

  useEffect(() => {
    const alreadyAsked = sessionStorage.getItem("extroverts-notif-asked");
    if (alreadyAsked) return;
    const timer = setTimeout(() => {
      setNotifOpen(true);
      sessionStorage.setItem("extroverts-notif-asked", "1");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-zinc-950 lg:flex lg:min-h-screen">
      <Suspense fallback={null}>
        <WelcomeToastOnMount name={displayName} bonusTokens={state.bonusTokens} />
      </Suspense>

      {/* ---------- Desktop / laptop: sidebar nav ---------- */}
      <aside className="hidden shrink-0 border-r border-white/10 lg:flex lg:w-60 lg:flex-col lg:justify-between lg:px-6 lg:py-8">
        <div>
          <Logo size="md" />
          <nav className="mt-10 flex flex-col gap-1">
            {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:bg-white/5 hover:text-white/70"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300">
              {displayName[0]?.toUpperCase() ?? "G"}
            </div>
            <span className="truncate text-sm font-semibold text-white">
              {displayName}
            </span>
          </div>
          <p className="mt-4 text-xs text-white/25">Extroverts Web • v1.0.0</p>
        </div>
      </aside>

      <div className="flex-1">
        {/* ---------- Phone / tablet: 1:1 app replica ---------- */}
        <main className="mx-auto min-h-screen w-full max-w-md bg-zinc-950 pb-24 pt-6 sm:max-w-lg sm:border-x sm:border-white/10 lg:hidden">
          <div className="px-5">
            <header className="mb-6 flex items-center justify-between">
              <Logo size="md" />
              <div className="flex items-center gap-2">
                <button className="flex h-8 items-center gap-1 rounded-full border border-white/20 px-3 text-xs font-bold text-white">
                  <MessageCircle className="h-3.5 w-3.5" /> 3
                </button>
                <button
                  onClick={() => setNotifOpen(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white"
                  aria-label="Favorites"
                >
                  <Star className="h-4 w-4" />
                </button>
              </div>
            </header>

            <ClubCard tier="bronze" progressPercent={20} caption={tokenCaption} />

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-5 text-center text-sm font-extrabold leading-relaxed text-white/80">
              Want to be treated? Everyone here is looking for reasons to{" "}
              <span className="text-violet-400">party</span>, so bring your best vibe
              and expect the same from others. Let&apos;s party responsibly and make
              every experience a great one!
            </div>

            <section className="mt-8 flex flex-col gap-5">
              {PARTIES.map((party) => (
                <PartyCard key={party.title} data={party} />
              ))}
            </section>

            <p className="mt-10 text-center text-xs text-white/25">
              Extroverts Web • v1.0.0
            </p>
          </div>

          <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex w-full max-w-md items-center justify-around border-t border-white/10 bg-zinc-950/95 py-3 backdrop-blur sm:max-w-lg">
            <Home className="h-6 w-6 text-white" />
            <MessageCircle className="h-6 w-6 text-white/30" />
            <Plus className="h-6 w-6 text-white/30" />
            <User className="h-6 w-6 text-white/30" />
          </nav>
        </main>

        {/* ---------- Desktop / laptop: dashboard layout ---------- */}
        <div className="hidden lg:block lg:px-12 lg:py-10">
          <header className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/40">Welcome back,</p>
              <h1 className="text-2xl font-extrabold text-white">{displayName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-9 items-center gap-1.5 rounded-full border border-white/20 px-3.5 text-xs font-bold text-white">
                <MessageCircle className="h-3.5 w-3.5" /> 3
              </button>
              <button
                onClick={() => setNotifOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white"
                aria-label="Favorites"
              >
                <Star className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1">
              <ClubCard tier="bronze" progressPercent={20} caption={tokenCaption} />
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-5 text-sm font-extrabold leading-relaxed text-white/80">
                Want to be treated? Everyone here is looking for reasons to{" "}
                <span className="text-violet-400">party</span>, so bring your best
                vibe and expect the same from others. Let&apos;s party responsibly and
                make every experience a great one!
              </div>
            </div>

            <div className="col-span-2">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                Happening near you
              </h2>
              <div className="grid grid-cols-2 gap-5">
                {PARTIES.map((party) => (
                  <PartyCard key={party.title} data={party} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationsSheet open={notifOpen} onOpenChange={setNotifOpen} />
    </div>
  );
}
