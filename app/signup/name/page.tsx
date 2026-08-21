"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { nameSchema, type NameFormValues } from "@/lib/validation";
import { useWizard } from "@/lib/wizard-store";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";

export default function NameStep() {
  const router = useRouter();
  const { state, setState, hydrated } = useWizard();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    mode: "onBlur",
    defaultValues: { name: state.name },
  });

  useEffect(() => {
    if (hydrated && !state.username) {
      router.replace("/signup/username");
    }
  }, [hydrated, state.username, router]);

  async function onSubmit(values: NameFormValues) {
    setSubmitting(true);
    setState({ name: values.name.trim() });
    router.push("/signup/age");
  }

  if (!state.username) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white">
        &quot;Name, please, for the party check!&quot;
      </h1>

      <TextField
        label="Name"
        placeholder="Your full name"
        autoFocus
        autoComplete="name"
        maxLength={40}
        error={errors.name?.message}
        hint="This is the name shown to members and requests. Cannot be changed later."
        {...register("name")}
      />

      <Button type="submit" className="mt-8" loading={submitting}>
        Next
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="mt-3"
        onClick={() => router.push("/signup/username")}
      >
        Back
      </Button>
    </form>
  );
}
