import { InsForgeClient } from "@insforge/sdk";

let client: InsForgeClient | null = null;

/** True when Vite env has InsForge backend URL + anon key (e.g. from `.insforge/project.json`). */
export function isInsforgeConfigured(): boolean {
  const url = import.meta.env.VITE_INSFORGE_BASE_URL;
  const key = import.meta.env.VITE_INSFORGE_ANON_KEY;
  return Boolean(url && key && String(url).startsWith("http"));
}

/** Singleton SDK client for database / auth. Only call when `isInsforgeConfigured()` is true. */
export function getInsforgeClient(): InsForgeClient {
  if (!isInsforgeConfigured()) {
    throw new Error("InsForge is not configured (set VITE_INSFORGE_BASE_URL and VITE_INSFORGE_ANON_KEY).");
  }
  if (!client) {
    client = new InsForgeClient({
      baseUrl: import.meta.env.VITE_INSFORGE_BASE_URL,
      anonKey: import.meta.env.VITE_INSFORGE_ANON_KEY,
    });
  }
  return client;
}
