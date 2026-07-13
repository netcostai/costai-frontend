"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "./supabase-client";
import type { ProviderId } from "./providers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GatewayContextType = {
  connectedProviders: ProviderId[];
  loading: boolean;
  refresh: () => Promise<void>;
};

const GatewayContext = createContext<GatewayContextType | null>(null);

export function GatewayProvider({ children }: { children: ReactNode }) {
  const [connectedProviders, setConnectedProviders] = useState<ProviderId[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setConnectedProviders([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/v1/vault/status`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConnectedProviders(data.connected_providers);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <GatewayContext.Provider value={{ connectedProviders, loading, refresh }}>
      {children}
    </GatewayContext.Provider>
  );
}

export function useGatewayKeys() {
  const ctx = useContext(GatewayContext);
  if (!ctx) throw new Error("useGatewayKeys must be used inside GatewayProvider");
  return ctx;
}
