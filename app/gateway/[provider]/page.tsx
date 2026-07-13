"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { PROVIDERS } from "@/lib/providers";
import { useGatewayKeys } from "@/lib/gateway-context";
import { supabase } from "@/lib/supabase-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function GatewayChatPage() {
  const params = useParams<{ provider: string }>();
  const { connectedProviders } = useGatewayKeys();
  const provider = PROVIDERS.find((p) => p.id === params.provider);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!provider) {
    return (
      <>
        <Navbar />
        <section className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-muted">Unknown provider.</p>
        </section>
      </>
    );
  }

  const connected = connectedProviders.includes(provider.id);

  if (!connected) {
    return (
      <>
        <Navbar />
        <section className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-3">No key connected yet</h1>
          <p className="text-muted mb-6">Add your {provider.displayName} key first from the gateway page.</p>
          <a href="/gateway" className="text-primary hover:underline">
            ← Back to Gateway
          </a>
        </section>
      </>
    );
  }

  async function handleSend() {
    setLoading(true);
    setError(null);
    setResponse("");
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("You must be signed in.");

      const res = await fetch(`${API_URL}/v1/proxy/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ provider: provider.id, prompt }),
      });
      if (!res.ok) throw new Error("Request failed.");
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Gateway — powered by {provider.displayName}
          </div>
          <h1 className="text-2xl font-semibold">Try your gateway</h1>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          rows={4}
          className="w-full bg-surface border border-border rounded-lg p-4 mb-4 focus:outline-none focus:border-primary transition-colors"
        />

        <button
          onClick={handleSend}
          disabled={loading || !prompt}
          className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 mb-6"
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        {response && (
          <div className="rounded-xl border border-border bg-surface p-5 whitespace-pre-wrap text-sm">
            {response}
          </div>
        )}
      </section>
    </>
  );
}
