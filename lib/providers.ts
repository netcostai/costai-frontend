export type ProviderId = "openai" | "anthropic" | "google";

export const PROVIDERS: {
  id: ProviderId;
  displayName: string;
  color: string;
  devConsoleUrl: string;
  supportsImageGeneration: boolean;
}[] = [
  {
    id: "openai",
    displayName: "ChatGPT",
    color: "#10a37f",
    devConsoleUrl: "https://platform.openai.com/api-keys",
    supportsImageGeneration: true,
  },
  {
    id: "google",
    displayName: "Gemini",
    color: "#4285f4",
    devConsoleUrl: "https://aistudio.google.com/apikey",
    supportsImageGeneration: true,
  },
  {
    id: "anthropic",
    displayName: "Claude",
    color: "#d97757",
    devConsoleUrl: "https://console.anthropic.com/settings/keys",
    supportsImageGeneration: false,
  },
];