"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { supabase } from "@/lib/supabase-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BillingSetupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRetry() {
    setError(null);
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("You must be signed in.");

      const res = await fetch(`${API_URL}/v1/billing/create-checkout-session`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!res.ok) throw new Error("Failed to start checkout.");

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-3">Billing setup incomplete</h1>
        <p className="text-muted mb-6">
          You'll need to add a payment method to start your 14-day free trial. You won't be charged today.
        </p>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          onClick={handleRetry}
          disabled={loading}
          className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Loading..." : "Continue to payment"}
        </button>
      </section>
    </>
  );
}
