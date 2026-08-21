"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-store";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";
import { PronounsSheet } from "@/components/PronounsSheet";

export default function PronounsStep() {
  const router = useRouter();
  const { state, setState, hydrated } = useWizard();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (hydrated && state.age === null) {
      router.replace("/signup/age");
    }
  }, [hydrated, state.age, router]);

  if (state.age === null) return null;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white">
        Which pronouns feel right for you?
      </h1>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setSheetOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSheetOpen(true);
          }
        }}
        className="cursor-pointer"
      >
        <TextField
          label="Pronouns"
          value={state.pronouns.join(" / ")}
          placeholder="Tap to select pronouns"
          readOnly
          tabIndex={-1}
          hint="Select the pronouns that feel right for you."
          className="cursor-pointer"
        />
      </div>

      <Button
        className="mt-8"
        onClick={() => router.push("/signup/terms")}
        disabled={state.pronouns.length === 0}
      >
        Next
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="mt-3"
        onClick={() => router.push("/signup/age")}
      >
        Back
      </Button>

      <PronounsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        selected={state.pronouns}
        onChange={(pronouns) => setState({ pronouns })}
      />
    </div>
  );
}
