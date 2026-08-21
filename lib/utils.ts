import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Simple debounce that preserves the latest call's args. */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delayMs: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}

export function calculateAge(dobISO: string): number | null {
  const dob = new Date(dobISO);
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/** Builds a DD/MM/YYYY string into an ISO (YYYY-MM-DD) date, or null if invalid. */
export function toISODate(day: string, month: string, year: string): string | null {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  if (!d || !m || !y) return null;
  if (y < 1900 || y > 9999) return null;
  if (m < 1 || m > 12) return null;

  const date = new Date(y, m - 1, d);
  const isRealDate =
    date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  if (!isRealDate) return null;
  if (date.getTime() > Date.now()) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${y}-${pad(m)}-${pad(d)}`;
}

/**
 * Curated gradient pairs (all sit comfortably inside the app's dark
 * violet/amber palette) picked deterministically by seed, instead of raw
 * hash-to-hue math which can land on clashing combinations.
 */
const GRADIENT_PRESETS = [
  "linear-gradient(135deg, #7c3aed, #db2777)",
  "linear-gradient(135deg, #f59e0b, #ea580c)",
  "linear-gradient(135deg, #6366f1, #7c3aed)",
  "linear-gradient(135deg, #0ea5e9, #6366f1)",
  "linear-gradient(135deg, #f43f5e, #f59e0b)",
  "linear-gradient(135deg, #14b8a6, #6366f1)",
];

/** Deterministic gradient (party thumbnail placeholder) derived from a string seed. */
export function gradientForSeed(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENT_PRESETS[Math.abs(hash) % GRADIENT_PRESETS.length];
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
