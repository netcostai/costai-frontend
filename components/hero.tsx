"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SavingsCalculator } from "@/components/savings-calculator";
import { PROVIDERS } from "@/lib/providers";
import { supabase } from "@/lib/supabase-client";

export function Hero() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
      setChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_50%_0%,rgba(59,130,246,0.15),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted mb-6">
              <span>Works with</span>
              <span className="flex items-center gap-3">
                {PROVIDERS.map((p) => (
                  <span key={p.id} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="font-semibold" style={{ color: p.color }}>
                      {p.displayName}
                    </span>
                  </span>
                ))}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient">
              Save with wholesale AI prices.
            </h1>

            <p className="mt-6 text-lg text-muted max-w-lg">
              NetCost.ai routes your entire organization through a single metered gateway.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/pilot"
                className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 rounded-lg glow-blue transition-all"
              >
                Claim 14-Day Free Pilot
              </Link>
              {checked && !loggedIn && (
                <Link
                  href="/sign-in"
                  className="border border-border hover:border-foreground/30 text-foreground font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <SavingsCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}