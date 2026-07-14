"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { supabase } from "@/lib/supabase-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function OnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillInvite = searchParams.get("invite") || "";

  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<"create" | "join">(prefillInvite ? "join" : "create");
  const [companyName, setCompanyName] = useState("");
  const [inviteCode, setInviteCode] = useState(prefillInvite);
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

      if (mode === "join") {
        router.push("/gateway");
        return;
      }

      const checkoutRes = await fetch(`${API_URL}/v1/billing/create-checkout-session`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!checkoutRes.ok) throw new Error("Company created, but failed to start billing setup.");

      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  if (checking) {
    return <section className="max-w-md mx-auto px-4 py-20 text-center text-muted">Loading...</section>;
  }

  return (
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
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-muted mb-4">
              You'll be asked for a card next — you won't be charged for 14 days.
            </p>
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
          {loading ? "Setting up..." : mode === "create" ? "Continue to payment" : "Continue"}
        </button>
      </form>
    </section>
  );
}

export default function OnboardingPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-muted">Loading...</div>}>
        <OnboardingForm />
      </Suspense>
    </>
  );
}