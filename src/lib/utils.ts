import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Safely merge Tailwind classes without style conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a year range: 2024 → 2027 or 2024 → Present */
export function formatYearRange(start: number, end?: number): string {
  if (!end) return `${start} — Present`;
  return `${start} — ${end}`;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Truncate a string to a max length with ellipsis */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '\u2026';
}

/** Check if a URL is external */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http') || url.startsWith('//');
}
