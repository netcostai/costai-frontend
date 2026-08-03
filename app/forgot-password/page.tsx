"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { supabase } from "@/lib/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://netcost.ai/reset-password",
      });
      if (resetError) throw resetError;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <>
        <Navbar />
        <section className="max-w-md mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-3">Check your email</h1>
          <p className="text-muted">
            If an account exists for {email}, we sent a link to reset your password.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-4 py-20">
        <h1 className="text-2xl font-semibold mb-3 text-center">Reset your password</h1>
        <p className="text-sm text-muted text-center mb-6">
          Enter your email and we'll send you a link to reset it.
        </p>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6">
          <label className="block text-sm text-muted mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
          />

          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </section>
    </>
  );
}
