"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { useWizard } from "@/lib/wizard-store";
import { requestOtp, verifyOtp } from "@/lib/mock-api";
import { OtpInput } from "@/components/OtpInput";
import { Button } from "@/components/Button";

const RESEND_SECONDS = 30;

export default function OtpStep() {
  const router = useRouter();
  const { state, setState, hydrated } = useWizard();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>();
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (hydrated && !state.email) {
      router.replace("/signup/email");
    }
  }, [hydrated, state.email, router]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  async function verify(code: string) {
    setError(undefined);
    setVerifying(true);
    try {
      await verifyOtp(code);
      setState({ emailVerified: true });
      router.push("/signup/username");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setOtp("");
    } finally {
      setVerifying(false);
    }
  }

  async function handleResend() {
    setResending(true);
    try {
      await requestOtp(state.email);
      toast.success("A new code has been sent.");
      setSecondsLeft(RESEND_SECONDS);
      setOtp("");
      setError(undefined);
    } catch {
      toast.error("Couldn't resend the code. Please try again.");
    } finally {
      setResending(false);
    }
  }

  if (!state.email) return null;

  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white">Enter OTP</h1>

      <div className="mb-6 flex gap-2.5 rounded-xl border border-dashed border-violet-400/30 bg-violet-500/10 px-4 py-3 text-sm leading-relaxed text-violet-200">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          This is a front-end-only demo, so no real email is sent. Enter{" "}
          <strong className="font-bold">any 6 digits</strong> (e.g. 123456) to
          continue, or try <strong className="font-bold">000000</strong> to see the
          error state.
        </p>
      </div>

      <OtpInput
        value={otp}
        onChange={setOtp}
        onComplete={verify}
        error={error}
        disabled={verifying}
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={handleResend}
          disabled={secondsLeft > 0 || resending}
          className="text-sm font-semibold text-white/60 underline-offset-2 hover:text-white disabled:text-white/30 disabled:no-underline"
        >
          {secondsLeft > 0 ? `Resend OTP in ${secondsLeft}s` : "Resend OTP"}
        </button>
      </div>

      <Button className="mt-6" loading={verifying} onClick={() => verify(otp)} disabled={otp.length !== 6}>
        Verify
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="mt-3"
        onClick={() => router.push("/signup/email")}
      >
        Go Back
      </Button>

      <p className="mt-4 text-sm text-white/40">
        A 6-digit OTP has been sent to{" "}
        <span className="text-white/70">{state.email}</span>.
      </p>
    </div>
  );
}
