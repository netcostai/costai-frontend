"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "./supabase-client";
import type { ProviderId } from "./providers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type GatewayContextType = {
  connectedProviders: ProviderId[];
  role: "admin" | "member" | null;
  status: "pending" | "active" | null;
  inviteCode: string | null;
  companyName: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const GatewayContext = createContext<GatewayContextType | null>(null);

export function GatewayProvider({ children }: { children: ReactNode }) {
  const [connectedProviders, setConnectedProviders] = useState<ProviderId[]>([]);
  const [role, setRole] = useState<"admin" | "member" | null>(null);
  const [status, setStatus] = useState<"pending" | "active" | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setConnectedProviders([]);
      setRole(null);
      setStatus(null);
      setInviteCode(null);
      setCompanyName(null);
      setLoading(false);
      return;
    }

    try {
      const meRes = await fetch(`${API_URL}/v1/me`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (meRes.ok) {
        const me = await meRes.json();
        setRole(me.role);
        setStatus(me.status);
        setInviteCode(me.invite_code);
        setCompanyName(me.company_name);

        if (me.status === "active") {
          const statusRes = await fetch(`${API_URL}/v1/vault/status`, {
            headers: { Authorization: `Bearer ${session.access_token}` },
          });
          if (statusRes.ok) {
            const data = await statusRes.json();
            setConnectedProviders(data.connected_providers);
          }
        } else {
          setConnectedProviders([]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <GatewayContext.Provider
      value={{ connectedProviders, role, status, inviteCode, companyName, loading, refresh }}
    >
      {children}
    </GatewayContext.Provider>
  );
}

export function useGatewayKeys() {
  const ctx = useContext(GatewayContext);
  if (!ctx) throw new Error("useGatewayKeys must be used inside GatewayProvider");
  return ctx;
}