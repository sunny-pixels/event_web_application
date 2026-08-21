"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-300 disabled:text-zinc-500",
  secondary:
    "border border-white/25 bg-transparent text-white hover:bg-white/10 disabled:border-white/10 disabled:text-white/40",
  ghost: "bg-transparent text-white/70 hover:text-white",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold uppercase tracking-wide transition-colors duration-150 disabled:cursor-not-allowed",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {loading && <Spinner className={variant === "primary" ? "text-black" : "text-white"} />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
