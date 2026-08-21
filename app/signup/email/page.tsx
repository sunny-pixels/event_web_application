"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { emailSchema, type EmailFormValues } from "@/lib/validation";
import { requestOtp } from "@/lib/mock-api";
import { useWizard } from "@/lib/wizard-store";
import { TextField } from "@/components/TextField";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";

export default function EmailStep() {
  const router = useRouter();
  const { state, setState } = useWizard();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
    defaultValues: {
      email: state.email,
      subscribeNewsletter: state.subscribeNewsletter,
    },
  });

  async function onSubmit(values: EmailFormValues) {
    setSubmitting(true);
    try {
      await requestOtp(values.email);
      setState({
        email: values.email,
        subscribeNewsletter: values.subscribeNewsletter,
      });
      router.push("/signup/otp");
    } catch {
      toast.error("Couldn't send the code. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white">
        Enter your email
      </h1>

      <TextField
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoFocus
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Button type="submit" className="mt-6" loading={submitting}>
        Proceed
      </Button>

      <div className="mt-4">
        <Controller
          control={control}
          name="subscribeNewsletter"
          render={({ field }) => (
            <Checkbox
              id="subscribeNewsletter"
              checked={field.value}
              onCheckedChange={field.onChange}
            >
              I&apos;d like to subscribe to your newsletter
            </Checkbox>
          )}
        />
      </div>
    </form>
  );
}
