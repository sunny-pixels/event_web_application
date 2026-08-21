import { wait } from "./utils";

/**
 * Front-end only exercise: every "network" call here is simulated with an
 * artificial delay. A couple of inputs are seeded to deliberately fail so
 * error/failure states can be demonstrated.
 */

const RESERVED_USERNAMES = [
  "admin",
  "root",
  "test",
  "chetan",
  "extroverts",
  "support",
  "moderator",
];

export async function requestOtp(email: string): Promise<{ success: true }> {
  await wait(900);
  void email;
  return { success: true };
}

export async function verifyOtp(otp: string): Promise<{ success: true }> {
  await wait(900);
  if (otp === "000000") {
    throw new Error("Incorrect OTP. Please check the code and try again.");
  }
  return { success: true };
}

export async function checkUsernameAvailability(
  username: string
): Promise<{ available: boolean }> {
  await wait(700);
  return { available: !RESERVED_USERNAMES.includes(username.toLowerCase()) };
}

export type SignupPayload = {
  email: string;
  username: string;
  name: string;
  dob: string;
  age: number;
  pronouns: string[];
  inviteCode: string;
};

export async function submitSignup(
  payload: SignupPayload
): Promise<{ success: true; bonusTokens: number }> {
  await wait(1200);
  if (payload.inviteCode.trim().toUpperCase() === "FAIL") {
    throw new Error("Something went wrong on our end. Please try again.");
  }
  const bonusTokens = payload.inviteCode.trim() ? 30 : 0;
  return { success: true, bonusTokens };
}
