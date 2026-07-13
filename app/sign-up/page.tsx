"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { supabase } from "@/lib/supabase-client";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: "https://netcost.ai/onboarding" },
      });
      if (signUpError) throw signUpError;

      if (data.session) {
        router.push("/onboarding");
      } else {
        setCheckEmail(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (checkEmail) {
    return (
      <>
        <Navbar />
        <section className="max-w-md mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-3">Check your email</h1>
          <p className="text-muted">
            We sent a confirmation link to {email}. Click it to finish setting up your account.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-4 py-20">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create your account</h1>
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
            minLength={8}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-primary"
          />

          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-sm text-muted text-center mt-4">
            Already have an account?{" "}
            <a href="/sign-in" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </section>
    </>
  );
}
