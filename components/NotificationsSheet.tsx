"use client";

import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";

export function NotificationsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Notifications"
      description="Stay in the loop about parties, invites & more."
    >
      <div className="mt-2 flex flex-col gap-3">
        <Button onClick={() => onOpenChange(false)}>Allow Notifications</Button>
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          Not Now
        </Button>
      </div>
    </BottomSheet>
  );
}
