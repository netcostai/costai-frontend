"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { supabase } from "@/lib/supabase-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-4 py-20">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign in</h1>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6">
          <label className="block text-sm text-muted mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
          />

          <label className="block text-sm text-muted mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
          />

          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-sm text-muted text-center mt-4">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-primary hover:underline">
              Create one
            </a>
          </p>
        </form>
      </section>
    </>
  );
}
