"use client";

import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  adornment?: ReactNode;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, adornment, className, id, ...props }, ref) => {
    const fieldId = id ?? props.name;
    return (
      <div className="w-full">
        <label
          htmlFor={fieldId}
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            className={cn(
              "h-13 w-full rounded-xl border bg-transparent px-4 text-base text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/60",
              error ? "border-rose-500/70" : "border-white/20",
              adornment && "pr-11",
              className
            )}
            aria-invalid={!!error}
            {...props}
          />
          {adornment && (
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              {adornment}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-2 text-sm text-rose-400">{error}</p>
        ) : hint ? (
          <p className="mt-2 text-sm text-white/40">{hint}</p>
        ) : null}
      </div>
    );
  }
);
TextField.displayName = "TextField";
