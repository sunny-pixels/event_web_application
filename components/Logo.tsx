import { cn } from "@/lib/utils";

const sizes = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-5xl",
};

export function Logo({
  size = "md",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-start font-serif font-black italic leading-none text-white",
        sizes[size],
        className
      )}
      aria-label="Extroverts"
    >
      <span>E</span>
      <span aria-hidden className="ml-0.5 mt-0.5 h-[0.2em] w-[0.2em] shrink-0 rounded-full bg-white" />
    </span>
  );
}
