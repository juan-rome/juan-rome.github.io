import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class lists, resolving conflicting utility classes sanely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
