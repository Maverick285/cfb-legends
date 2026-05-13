import type { ProgramSeedBundle } from "./types";

export async function loadSeedBundle(): Promise<ProgramSeedBundle> {
  const response = await fetch("/seed/seed-v0.1-demo.json");
  if (!response.ok) {
    throw new Error(`Could not load seed bundle: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<ProgramSeedBundle>;
}
