"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export type WizardState = {
  email: string;
  subscribeNewsletter: boolean;
  emailVerified: boolean;
  username: string;
  name: string;
  dob: string | null;
  age: number | null;
  pronouns: string[];
  inviteCode: string;
  signupComplete: boolean;
  bonusTokens: number;
};

const initialState: WizardState = {
  email: "",
  subscribeNewsletter: false,
  emailVerified: false,
  username: "",
  name: "",
  dob: null,
  age: null,
  pronouns: [],
  inviteCode: "",
  signupComplete: false,
  bonusTokens: 0,
};

type Action =
  | { type: "SET"; payload: Partial<WizardState> }
  | { type: "HYDRATE"; payload: WizardState }
  | { type: "RESET" };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "HYDRATE":
      return action.payload;
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const STORAGE_KEY = "extroverts-wizard-state";

type WizardContextValue = {
  state: WizardState;
  setState: (payload: Partial<WizardState>) => void;
  reset: () => void;
  hydrated: boolean;
};

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useReducer(() => true, false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "HYDRATE", payload: { ...initialState, ...JSON.parse(raw) } });
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const value = useMemo<WizardContextValue>(
    () => ({
      state,
      setState: (payload) => dispatch({ type: "SET", payload }),
      reset: () => {
        sessionStorage.removeItem(STORAGE_KEY);
        dispatch({ type: "RESET" });
      },
      hydrated,
    }),
    [state, hydrated]
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within a WizardProvider");
  return ctx;
}
