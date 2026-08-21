export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex w-full gap-1.5" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white transition-all duration-500 ease-out"
            style={{ width: i < step ? "100%" : "0%" }}
          />
        </div>
      ))}
    </div>
  );
}
