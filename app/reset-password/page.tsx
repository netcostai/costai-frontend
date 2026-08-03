"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { supabase } from "@/lib/supabase-client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;

      router.push("/sign-in?reset=success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try requesting a new link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-4 py-20">
        <h1 className="text-2xl font-semibold mb-6 text-center">Set a new password</h1>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6">
          <label className="block text-sm text-muted mb-1">New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
          />

          <label className="block text-sm text-muted mb-1">Confirm new password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
          />

          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save new password"}
          </button>
        </form>
      </section>
    </>
  );
}
