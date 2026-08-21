"use client";

import { useRouter } from "next/navigation";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";

export function AccountRequiredSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="You need an account"
      description="Create an account to join events, earn HVTs, and party with extroverts near you — all for free!"
    >
      <div className="mt-2 flex flex-col gap-3">
        <Button onClick={() => router.push("/signup/email")}>Get Started</Button>
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          Maybe Later
        </Button>
      </div>
    </BottomSheet>
  );
}
