"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dobSchema, type DobFormValues } from "@/lib/validation";
import { calculateAge, toISODate } from "@/lib/utils";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";

export function DobSheet({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (iso: string, age: number) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DobFormValues>({
    resolver: zodResolver(dobSchema),
    defaultValues: { day: "", month: "", year: "" },
  });

  function onSubmit(values: DobFormValues) {
    const iso = toISODate(values.day, values.month, values.year);
    const age = iso ? calculateAge(iso) : null;
    if (!iso || age === null) return;
    onConfirm(iso, age);
    reset();
    onOpenChange(false);
  }

  const dateError = errors.day?.message ?? errors.month?.message ?? errors.year?.message;

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Date of Birth">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-3 gap-3">
          <input
            {...register("day")}
            placeholder="DD"
            inputMode="numeric"
            maxLength={2}
            className="h-13 rounded-xl border border-white/20 bg-transparent text-center text-base text-white placeholder:text-white/30 outline-none focus:border-white/60"
          />
          <input
            {...register("month")}
            placeholder="MM"
            inputMode="numeric"
            maxLength={2}
            className="h-13 rounded-xl border border-white/20 bg-transparent text-center text-base text-white placeholder:text-white/30 outline-none focus:border-white/60"
          />
          <input
            {...register("year")}
            placeholder="YYYY"
            inputMode="numeric"
            maxLength={4}
            className="h-13 rounded-xl border border-white/20 bg-transparent text-center text-base text-white placeholder:text-white/30 outline-none focus:border-white/60"
          />
        </div>
        {dateError && <p className="mt-3 text-sm text-rose-400">{dateError}</p>}

        <Button type="submit" className="mt-5" loading={isSubmitting}>
          Proceed
        </Button>
      </form>
    </BottomSheet>
  );
}
