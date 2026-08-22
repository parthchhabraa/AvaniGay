import { createContext, useContext } from "react";
import type { Case } from "../types";
import { useCaseProgress } from "./useCaseProgress";

export type CaseProgressApi = ReturnType<typeof useCaseProgress>;

export interface CaseContextValue extends CaseProgressApi {
  kase: Case;
}

export const CaseContext = createContext<CaseContextValue | null>(null);

export function useCaseContext(): CaseContextValue {
  const ctx = useContext(CaseContext);
  if (!ctx) throw new Error("useCaseContext must be used within a CaseContext.Provider");
  return ctx;
}
