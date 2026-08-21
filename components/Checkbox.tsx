"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  onCheckedChange,
  children,
  error,
  id,
  disabled,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
  id?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex items-start gap-3 text-sm text-white/70",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
        )}
      >
        <RadixCheckbox.Root
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
            checked ? "border-white bg-white" : "border-white/30 bg-transparent",
            error && "border-rose-500/70"
          )}
        >
          <RadixCheckbox.Indicator>
            <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <span>{children}</span>
      </label>
      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
    </div>
  );
}
