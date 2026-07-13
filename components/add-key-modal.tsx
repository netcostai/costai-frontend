"use client";

import { useState } from "react";
import type { ProviderId } from "@/lib/providers";
import { useGatewayKeys } from "@/lib/gateway-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function AddKeyModal({
  provider,
  displayName,
  onClose,
}: {
  provider: ProviderId;
  displayName: string;
  onClose: () => void;
}) {
  const { setApiKey } = useGatewayKeys();
  const [companyName, setCompanyName] = useState("");
  const [rawKey, setRawKey] = useState("");
  const [issuedKey, setIssuedKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/v1/vault/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName,
          provider,
          raw_provider_key: rawKey,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save key. Please check your key and try again.");
      }

      const data = await res.json();
      setApiKey(provider, data.api_key);
      setIssuedKey(data.api_key);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6">
        {issuedKey ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Your gateway key</h3>
            <p className="text-sm text-muted mb-4">
              Save this now — you won't be able to see it again. This is your CostAI
              gateway key, not your {displayName} key.
            </p>
            <div className="bg-background border border-border rounded-lg p-3 text-sm break-all mb-4">
              {issuedKey}
            </div>
            <button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Done
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold mb-1">Add your {displayName} key</h3>
            <p className="text-sm text-muted mb-4">
              Your key is encrypted at rest and never leaves our vault.
            </p>

            <label className="block text-sm text-muted mb-1">Company name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
            />

            <label className="block text-sm text-muted mb-1">{displayName} API key</label>
            <input
              type="password"
              value={rawKey}
              onChange={(e) => setRawKey(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
            />

            {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-border rounded-lg py-2.5 text-sm hover:border-foreground/30 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save key"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
