"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LENGTH = 6;

export function OtpInput({
  value,
  onChange,
  onComplete,
  error,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: LENGTH }, (_, i) => value[i] ?? "");

  useEffect(() => {
    if (value.length === LENGTH) {
      onComplete?.(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function setDigitAt(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, LENGTH));
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigitAt(index, digit);
    if (digit && index < LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setDigitAt(index - 1, "");
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  }

  return (
    <div>
      <motion.div
        className="flex justify-between gap-2"
        animate={error ? { x: [0, -8, 8, -6, 6, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            aria-label={`Digit ${index + 1} of OTP`}
            className={cn(
              "h-14 w-full max-w-14 rounded-xl border bg-transparent text-center text-xl font-semibold text-white outline-none transition-colors focus:border-white/60",
              error ? "border-rose-500/70" : "border-white/20"
            )}
          />
        ))}
      </motion.div>
      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
    </div>
  );
}
