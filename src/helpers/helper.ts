/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// helpers.ts
export function asNonNullString(v: string | null | undefined): string {
  return v ?? '';
}

export function normalizeStringArray(v: unknown): string[] {
  // Handles: string[] | string (json or comma-separated) | null/undefined
  if (Array.isArray(v)) {
    return v.filter((x): x is string => typeof x === 'string');
  }

  if (typeof v === 'string') {
    // try JSON first: '["Chest","Back"]'
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) {
        return parsed.filter((x): x is string => typeof x === 'string');
      }
    } catch {
      // fallback: comma-separated: "Chest, Back"
      return v
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return [];
}
