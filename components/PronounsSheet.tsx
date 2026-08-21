"use client";

import { PRONOUN_OPTIONS, MAX_PRONOUNS } from "@/lib/validation";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { BottomSheet } from "./BottomSheet";

export function PronounsSheet({
  open,
  onOpenChange,
  selected,
  onChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: string[];
  onChange: (pronouns: string[]) => void;
}) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((p) => p !== option));
      return;
    }
    if (selected.length >= MAX_PRONOUNS) return;
    onChange([...selected, option]);
  }

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Select Pronouns"
      description={`Select up to ${MAX_PRONOUNS}${
        selected.length >= MAX_PRONOUNS ? " — limit reached" : ""
      }`}
    >
      <div className="flex max-h-80 flex-col gap-4 overflow-y-auto pr-1">
        {PRONOUN_OPTIONS.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <Checkbox
              key={option}
              id={`pronoun-${option}`}
              checked={isSelected}
              disabled={!isSelected && selected.length >= MAX_PRONOUNS}
              onCheckedChange={() => toggle(option)}
            >
              {option}
            </Checkbox>
          );
        })}
      </div>
      <Button className="mt-5" onClick={() => onOpenChange(false)}>
        Done
      </Button>
    </BottomSheet>
  );
}
