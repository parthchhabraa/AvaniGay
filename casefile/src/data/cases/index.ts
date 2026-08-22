import type { Case } from "../../types";
import { necklaceCase } from "./necklace";
import { libraryCase } from "./library";
import { paintingCase } from "./painting";
import { letterCase } from "./letter";
import { inheritanceCase } from "./inheritance";

export const cases: Case[] = [necklaceCase, libraryCase, paintingCase, letterCase, inheritanceCase];

export const casesById: Record<string, Case> = Object.fromEntries(cases.map((c) => [c.id, c]));

export function getCase(id: string): Case | undefined {
  return casesById[id];
}
