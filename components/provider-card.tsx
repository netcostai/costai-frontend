"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProviderId } from "@/lib/providers";
import { useGatewayKeys } from "@/lib/gateway-context";
import { AddKeyModal } from "@/components/add-key-modal";

export function ProviderCard({
  id,
  displayName,
  color,
}: {
  id: ProviderId;
  displayName: string;
  color: string;
}) {
  const { connectedProviders, role, refresh } = useGatewayKeys();
  const [modalOpen, setModalOpen] = useState(false);
  const connected = connectedProviders.includes(id);
  const isAdmin = role === "admin";

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col items-center text-center">
      <div
        className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}1a`, border: `1px solid ${color}40` }}
      >
        <span className="text-2xl font-bold tracking-tight" style={{ color }}>
          {displayName[0]}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-1" style={{ color }}>
        {displayName}
      </h3>
      <p className="text-xs text-muted mb-4">{connected ? "Key connected" : "Not connected"}</p>

      {connected ? (
        <Link
          href={`/gateway/${id}`}
          className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          Open Gateway
        </Link>
      ) : isAdmin ? (
        <button
          onClick={() => setModalOpen(true)}
          className="w-full border border-border hover:border-foreground/30 text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          Add your key
        </button>
      ) : (
        <p className="text-xs text-muted">Ask your admin to connect this</p>
      )}

      {modalOpen && (
        <AddKeyModal provider={id} displayName={displayName} onClose={() => setModalOpen(false)} onSaved={refresh} />
      )}
    </div>
  );
}