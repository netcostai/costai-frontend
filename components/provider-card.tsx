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
  const { hasApiKey } = useGatewayKeys();
  const [modalOpen, setModalOpen] = useState(false);
  const connected = hasApiKey(id);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col items-center text-center">
      <div
        className="h-14 w-14 rounded-full flex items-center justify-center text-xl font-semibold text-white mb-4"
        style={{ backgroundColor: color }}
      >
        {displayName[0]}
      </div>
      <h3 className="font-medium mb-1">{displayName}</h3>
      <p className="text-xs text-muted mb-4">
        {connected ? "Key connected" : "Not connected"}
      </p>

      {connected ? (
        <Link
          href={`/gateway/${id}`}
          className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          Open Gateway
        </Link>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className="w-full border border-border hover:border-foreground/30 text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          Add your key
        </button>
      )}

      {modalOpen && (
        <AddKeyModal provider={id} displayName={displayName} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
