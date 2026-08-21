import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { WizardProvider } from "@/lib/wizard-store";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Extroverts — Join the Club",
  description:
    "Sign up for Extroverts: find private parties, earn Vibe Tokens, and party with extroverts near you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <WizardProvider>{children}</WizardProvider>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "#18181b",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            },
          }}
        />
      </body>
    </html>
  );
}
