"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { supabase } from "@/lib/supabase-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OnboardingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<"create" | "join">("create");
  const [companyName, setCompanyName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/sign-in");
        return;
      }

      const res = await fetch(`${API_URL}/v1/me`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.ok) {
        router.push("/gateway");
        return;
      }

      setChecking(false);
    }
    check();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("You must be signed in.");

      const body = mode === "create" ? { company_name: companyName } : { invite_code: inviteCode };

      const res = await fetch(`${API_URL}/v1/auth/complete-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Something went wrong. Check your invite code and try again.");

      router.push("/gateway");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <>
        <Navbar />
        <section className="max-w-md mx-auto px-4 py-20 text-center text-muted">Loading...</section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-4 py-20">
        <h1 className="text-2xl font-semibold mb-6 text-center">Set up your account</h1>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex rounded-lg border border-border p-1 mb-5">
            <button
              type="button"
              onClick={() => setMode("create")}
              className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${
                mode === "create" ? "bg-primary text-white" : "text-muted"
              }`}
            >
              New company
            </button>
            <button
              type="button"
              onClick={() => setMode("join")}
              className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${
                mode === "join" ? "bg-primary text-white" : "text-muted"
              }`}
            >
              Join my team
            </button>
          </div>

          {mode === "create" ? (
            <>
              <label className="block text-sm text-muted mb-1">Company name</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
              />
            </>
          ) : (
            <>
              <label className="block text-sm text-muted mb-1">Invite code</label>
              <input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                required
                placeholder="Ask your admin for this"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
              />
            </>
          )}

          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Setting up..." : "Continue"}
          </button>
        </form>
      </section>
    </>
  );
}
