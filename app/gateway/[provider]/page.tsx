"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/navbar";
import { PROVIDERS } from "@/lib/providers";
import { useGatewayKeys } from "@/lib/gateway-context";
import { supabase } from "@/lib/supabase-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Mode = "text" | "image";

export default function GatewayChatPage() {
  const params = useParams<{ provider: string }>();
  const { connectedProviders } = useGatewayKeys();
  const provider = PROVIDERS.find((p) => p.id === params.provider);

  const [mode, setMode] = useState<Mode>("text");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!provider) {
    return (
      <>
        <Navbar />
        <section className="max-w-3xl mx-auto px-4 py-20 text-center">
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
        <section className="max-w-3xl mx-auto px-4 py-20 text-center">
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
    setImageBase64(null);
    setCopied(false);
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
        body: JSON.stringify({ provider: provider.id, prompt, mode }),
      });
      if (!res.ok) throw new Error("Request failed.");
      const data = await res.json();

      if (data.type === "image") {
        setImageBase64(data.image_base64);
      } else {
        setResponse(data.response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission can fail in some browser contexts; button
      // stays as "Copy" so the user can try again or copy manually.
    }
  }

  return (
    <>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center mt-6 mb-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3 text-base text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            Powered by {provider.displayName}
          </div>
        </div>

        {provider.supportsImageGeneration && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-border p-1">
              <button
                onClick={() => setMode("text")}
                className={`text-sm px-4 py-1.5 rounded-md transition-colors ${
                  mode === "text" ? "bg-primary text-white" : "text-muted"
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setMode("image")}
                className={`text-sm px-4 py-1.5 rounded-md transition-colors ${
                  mode === "image" ? "bg-primary text-white" : "text-muted"
                }`}
              >
                Image
              </button>
            </div>
          </div>
        )}

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={mode === "image" ? "Describe the image you want..." : "Ask something..."}
          rows={4}
          disabled={loading}
          className="w-full bg-surface border border-border rounded-lg p-4 mb-4 text-base focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
        />

        <button
          onClick={handleSend}
          disabled={loading || !prompt}
          className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-70 mb-8 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {mode === "image" ? "Generating..." : "Thinking..."}
            </>
          ) : mode === "image" ? (
            "Generate Image"
          ) : (
            "Send"
          )}
        </button>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        {imageBase64 && (
          <div className="rounded-xl border border-border bg-surface p-6">
            <img src={`data:image/png;base64,${imageBase64}`} alt="Generated" className="w-full rounded-lg mb-4" />
            <div className="flex justify-end pt-3 border-t border-border">
              <a href={`data:image/png;base64,${imageBase64}`} download="generated-image.png" className="text-xs font-medium border border-border hover:border-foreground/30 px-3 py-1.5 rounded-md transition-colors">
                Download image
              </a>
            </div>
          </div>
        )}

        {response && (
          <div className="text-lg leading-relaxed">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-5 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                ul: ({ children }) => <ul className="list-disc list-outside pl-6 mb-5 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-outside pl-6 mb-5 space-y-2">{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                h1: ({ children }) => <h1 className="text-2xl font-semibold mb-3 mt-6 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-6 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-5 first:mt-0">{children}</h3>,
                code: ({ children }) => (
                  <code className="bg-surface border border-border rounded px-1.5 py-0.5 text-base font-mono">
                    {children}
                  </code>
                ),
                a: ({ children, href }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {children}
                  </a>
                ),
              }}
            >
              {response}
            </ReactMarkdown>

            <div className="flex justify-end mt-6 pt-4 border-t border-border">
              <button
                onClick={handleCopy}
                className="text-xs font-medium border border-border hover:border-foreground/30 px-3 py-1.5 rounded-md transition-colors"
              >
                {copied ? "Copied!" : "Copy response"}
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}