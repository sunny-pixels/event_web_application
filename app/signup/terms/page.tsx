"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { termsSchema, type TermsFormValues } from "@/lib/validation";
import { submitSignup } from "@/lib/mock-api";
import { useWizard } from "@/lib/wizard-store";
import { TextField } from "@/components/TextField";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { TermsModal } from "@/components/TermsModal";

const MANIFESTO: { text: string; highlight: string }[] = [
  { text: "KINDNESS = GOOD {H} DAY", highlight: "HAIR" },
  { text: "SIP IN? {H} IN.", highlight: "CHIP" },
  { text: "GHOSTING IS FOR {H}.", highlight: "HALLOWEEN" },
  { text: "OUTFITS LOUD, {H} CLEAR.", highlight: "INTENTIONS" },
  { text: "JOINING? FREE. HOSTING? {H} FREE.", highlight: "ALSO" },
  { text: "EARLLY IS {H}.", highlight: "ICONIC" },
  { text: "YES. {H} MISTAKE.", highlight: "SPELLING" },
];

export default function TermsStep() {
  const router = useRouter();
  const { state, setState, hydrated } = useWizard();
  const [submitting, setSubmitting] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TermsFormValues>({
    resolver: zodResolver(termsSchema),
    mode: "onBlur",
    defaultValues: { inviteCode: state.inviteCode, agreedToTerms: false },
  });

  const inviteCode = watch("inviteCode");

  useEffect(() => {
    if (hydrated && state.pronouns.length === 0) {
      router.replace("/signup/pronouns");
    }
  }, [hydrated, state.pronouns, router]);

  async function onSubmit(values: TermsFormValues) {
    if (state.age === null || !state.dob) return;
    setSubmitting(true);
    try {
      const result = await submitSignup({
        email: state.email,
        username: state.username,
        name: state.name,
        dob: state.dob,
        age: state.age,
        pronouns: state.pronouns,
        inviteCode: values.inviteCode,
      });
      setState({
        inviteCode: values.inviteCode,
        signupComplete: true,
        bonusTokens: result.bonusTokens,
      });
      toast.success("Welcome to the club!");
      router.push("/app?welcome=1");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (state.pronouns.length === 0) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6 space-y-1 text-lg font-extrabold leading-snug text-white/70">
        {MANIFESTO.map(({ text, highlight }, i) => {
          const [before, after] = text.split("{H}");
          return (
            <p key={i}>
              {before}
              <span className="text-violet-400">{highlight}</span>
              {after}
            </p>
          );
        })}
      </div>

      <TextField
        label="Enter invite code (optional)"
        placeholder="e.g. FRIENDS10"
        maxLength={10}
        autoCapitalize="characters"
        error={errors.inviteCode?.message}
        hint={
          inviteCode
            ? "Valid codes get you up to +30 HVTs on signup!"
            : "Enter invite code and get up to +30 HVTs!"
        }
        {...register("inviteCode")}
      />

      <div className="mt-5">
        <Controller
          control={control}
          name="agreedToTerms"
          render={({ field }) => (
            <Checkbox
              id="agreedToTerms"
              checked={field.value}
              onCheckedChange={field.onChange}
              error={errors.agreedToTerms?.message}
            >
              I agree to the{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setTermsModalOpen(true);
                }}
                className="font-semibold text-white underline underline-offset-2"
              >
                Terms &amp; Privacy Policy
              </button>
            </Checkbox>
          )}
        />
      </div>

      <Button type="submit" className="mt-8" loading={submitting}>
        Sign Up
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="mt-3"
        onClick={() => router.push("/signup/pronouns")}
      >
        Back
      </Button>

      <TermsModal open={termsModalOpen} onOpenChange={setTermsModalOpen} />
    </form>
  );
}
