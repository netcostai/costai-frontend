"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { PROVIDERS } from "@/lib/providers";
import { ProviderCard } from "@/components/provider-card";
import { PendingRequests } from "@/components/pending-requests";
import { useGatewayKeys } from "@/lib/gateway-context";
import { supabase } from "@/lib/supabase-client";

export default function GatewayPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const { role, status, inviteCode, companyName } = useGatewayKeys();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/sign-in");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  if (checking) {
    return (
      <>
        <Navbar />
        <section className="max-w-5xl mx-auto px-4 py-20 text-center text-muted">Loading...</section>
      </>
    );
  }

  if (status === "pending") {
    return (
      <>
        <Navbar />
        <section className="max-w-md mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-3">Waiting for approval</h1>
          <p className="text-muted">
            Your request to join {companyName || "this company"} is pending. An admin needs to approve
            you before you can use the gateway.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">Connect a provider</h1>
          <p className="text-muted max-w-lg mx-auto">
            Add your API key for any provider below to start routing requests through CostAI's gateway.
          </p>
        </div>

        {role === "admin" && (
          <>
            <PendingRequests />
            {inviteCode && (
              <div className="rounded-xl border border-border bg-surface p-4 mb-10 text-center">
                <p className="text-sm text-muted mb-1">Invite teammates to {companyName} with this code:</p>
                <p className="font-mono text-lg tracking-wide">{inviteCode}</p>
              </div>
            )}
          </>
        )}

        <div className="grid sm:grid-cols-3 gap-6">
          {PROVIDERS.map((p) => (
            <ProviderCard key={p.id} id={p.id} displayName={p.displayName} color={p.color} />
          ))}
        </div>
      </section>
    </>
  );
}