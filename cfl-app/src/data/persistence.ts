import type { CareerState } from "./types";

const SAVE_KEY = "cfl-app.career.v1";

export function saveCareer(state: CareerState): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function loadCareer(): CareerState | null {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CareerState;
  } catch {
    localStorage.removeItem(SAVE_KEY);
    return null;
  }
}

export function clearCareer(): void {
  localStorage.removeItem(SAVE_KEY);
}
