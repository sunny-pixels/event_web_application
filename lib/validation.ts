import { z } from "zod";
import { calculateAge, toISODate } from "./utils";

export const MIN_AGE = 18;
export const MAX_PRONOUNS = 3;

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  subscribeNewsletter: z.boolean(),
});
export type EmailFormValues = z.infer<typeof emailSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Enter all 6 digits")
    .regex(/^\d{6}$/, "OTP must be numeric"),
});
export type OtpFormValues = z.infer<typeof otpSchema>;

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username can't be longer than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers and underscores are allowed"
    ),
});
export type UsernameFormValues = z.infer<typeof usernameSchema>;

export const nameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(40, "Name can't be longer than 40 characters")
    .regex(/^[a-zA-Z][a-zA-Z' -]*$/, "Only letters, spaces, apostrophes and hyphens"),
});
export type NameFormValues = z.infer<typeof nameSchema>;

export const dobSchema = z
  .object({
    day: z.string().regex(/^\d{1,2}$/, "DD"),
    month: z.string().regex(/^\d{1,2}$/, "MM"),
    year: z.string().regex(/^\d{4}$/, "YYYY"),
  })
  .superRefine((val, ctx) => {
    const iso = toISODate(val.day, val.month, val.year);
    if (!iso) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid date of birth",
        path: ["day"],
      });
      return;
    }
    const age = calculateAge(iso);
    if (age === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid date of birth",
        path: ["day"],
      });
      return;
    }
    if (age < MIN_AGE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `You must be at least ${MIN_AGE} years old to join Extroverts.`,
        path: ["day"],
      });
    }
    if (age > 120) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "That date of birth doesn't look right",
        path: ["day"],
      });
    }
  });
export type DobFormValues = z.infer<typeof dobSchema>;

export const pronounsSchema = z.object({
  pronouns: z
    .array(z.string())
    .min(1, "Select at least one pronoun")
    .max(MAX_PRONOUNS, `Select up to ${MAX_PRONOUNS} pronouns`),
});
export type PronounsFormValues = z.infer<typeof pronounsSchema>;

export const termsSchema = z.object({
  inviteCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9]*$/, "Invite codes only contain letters and numbers")
    .max(10, "Invite codes are at most 10 characters"),
  agreedToTerms: z.boolean().refine((v) => v === true, {
    message: "You must agree to the Terms & Privacy Policy to continue",
  }),
});
export type TermsFormValues = z.infer<typeof termsSchema>;

export const PRONOUN_OPTIONS = [
  "he",
  "him",
  "his",
  "she",
  "her",
  "hers",
  "they",
  "them",
  "theirs",
  "ze",
  "zir",
  "zirs",
] as const;
