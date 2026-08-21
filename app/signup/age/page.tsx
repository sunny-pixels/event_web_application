"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-store";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";
import { DobSheet } from "@/components/DobSheet";

export default function AgeStep() {
  const router = useRouter();
  const { state, setState, hydrated } = useWizard();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (hydrated && !state.name) {
      router.replace("/signup/name");
    }
  }, [hydrated, state.name, router]);

  function handleNext() {
    if (state.age === null) return;
    router.push("/signup/pronouns");
  }

  if (!state.name) return null;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white">
        How many years have you been partying?
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
          label="Age"
          value={state.age ?? ""}
          placeholder="Tap to select your date of birth"
          readOnly
          tabIndex={-1}
          hint="We need your age to verify you're eligible and help others know who they're connecting with."
          className="cursor-pointer"
        />
      </div>

      <Button className="mt-8" onClick={handleNext} disabled={state.age === null}>
        Next
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="mt-3"
        onClick={() => router.push("/signup/name")}
      >
        Back
      </Button>

      <DobSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onConfirm={(iso, age) => setState({ dob: iso, age })}
      />
    </div>
  );
}
