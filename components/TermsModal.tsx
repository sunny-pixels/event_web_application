"use client";

import { BottomSheet } from "./BottomSheet";

export function TermsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Terms & Privacy Policy">
      <div className="space-y-4 text-sm leading-relaxed text-white/60">
        <p>
          This is placeholder legal copy for the purposes of this demo. In a production
          app, this space would contain the full Terms of Service and Privacy Policy
          covering account eligibility, acceptable conduct at events, data collection
          and usage, and dispute resolution.
        </p>
        <p>
          <strong className="text-white/80">Eligibility.</strong> You must be at least
          18 years old to create an account. By continuing, you confirm the date of
          birth you provided is accurate.
        </p>
        <p>
          <strong className="text-white/80">Your data.</strong> We use your email,
          name, and profile details to run your account and keep events safe. We never
          sell your data to third parties.
        </p>
        <p>
          <strong className="text-white/80">Conduct.</strong> Members are expected to
          treat each other with respect at every event. Harassment of any kind results
          in immediate removal from the club.
        </p>
        <p>
          <strong className="text-white/80">Invite codes.</strong> Bonus Vibe Tokens
          from invite codes are promotional and may be adjusted or revoked at our
          discretion.
        </p>
      </div>
    </BottomSheet>
  );
}
