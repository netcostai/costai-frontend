"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { ProviderId } from "./providers";

type GatewayContextType = {
  apiKeys: Partial<Record<ProviderId, string>>;
  setApiKey: (provider: ProviderId, key: string) => void;
  hasApiKey: (provider: ProviderId) => boolean;
};

const GatewayContext = createContext<GatewayContextType | null>(null);

export function GatewayProvider({ children }: { children: ReactNode }) {
  const [apiKeys, setApiKeys] = useState<Partial<Record<ProviderId, string>>>({});

  const setApiKey = (provider: ProviderId, key: string) => {
    setApiKeys((prev) => ({ ...prev, [provider]: key }));
  };

  const hasApiKey = (provider: ProviderId) => Boolean(apiKeys[provider]);

  return (
    <GatewayContext.Provider value={{ apiKeys, setApiKey, hasApiKey }}>
      {children}
    </GatewayContext.Provider>
  );
}

export function useGatewayKeys() {
  const ctx = useContext(GatewayContext);
  if (!ctx) throw new Error("useGatewayKeys must be used inside GatewayProvider");
  return ctx;
}
