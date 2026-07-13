export type ProviderId = "openai" | "anthropic" | "google";

export const PROVIDERS: { id: ProviderId; displayName: string; color: string }[] = [
  { id: "openai", displayName: "ChatGPT", color: "#10a37f" },
  { id: "anthropic", displayName: "Claude", color: "#d97757" },
  { id: "google", displayName: "Gemini", color: "#4285f4" },
];
