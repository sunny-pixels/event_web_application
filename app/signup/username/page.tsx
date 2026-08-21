"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { usernameSchema, type UsernameFormValues } from "@/lib/validation";
import { checkUsernameAvailability } from "@/lib/mock-api";
import { useWizard } from "@/lib/wizard-store";
import { debounce } from "@/lib/utils";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";

type Availability = "idle" | "checking" | "available" | "taken";

export default function UsernameStep() {
  const router = useRouter();
  const { state, setState, hydrated } = useWizard();
  const [availability, setAvailability] = useState<Availability>("idle");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    mode: "onChange",
    defaultValues: { username: state.username },
  });

  const username = watch("username");

  const checkRef = useRef(
    debounce(async (value: string) => {
      const result = await checkUsernameAvailability(value);
      setAvailability(result.available ? "available" : "taken");
    }, 500)
  );

  useEffect(() => {
    if (hydrated && !state.emailVerified) {
      router.replace("/signup/email");
    }
  }, [hydrated, state.emailVerified, router]);

  useEffect(() => {
    const parsed = usernameSchema.safeParse({ username });
    if (!parsed.success) {
      setAvailability("idle");
      return;
    }
    setAvailability("checking");
    checkRef.current(parsed.data.username);
  }, [username]);

  async function onSubmit(values: UsernameFormValues) {
    if (availability !== "available") return;
    setSubmitting(true);
    setState({ username: values.username });
    router.push("/signup/name");
  }

  if (!state.emailVerified) return null;

  const adornment =
    availability === "checking" ? (
      <Spinner className="text-white/40" />
    ) : availability === "available" ? (
      <Check className="h-4 w-4 text-emerald-400" />
    ) : availability === "taken" ? (
      <X className="h-4 w-4 text-rose-400" />
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white">
        Create a username that fits your vibe!
      </h1>

      <TextField
        label="Username"
        placeholder="nightowl_23"
        autoFocus
        autoComplete="off"
        maxLength={20}
        adornment={adornment}
        error={
          errors.username?.message ??
          (availability === "taken" ? "That username is already taken" : undefined)
        }
        hint="All your Superlatives and Invites will come your way with this name, so make it unforgettable!"
        {...register("username")}
      />

      <Button type="submit" className="mt-8" loading={submitting} disabled={availability !== "available"}>
        Next
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="mt-3"
        onClick={() => router.push("/signup/otp")}
      >
        Back
      </Button>
    </form>
  );
}
