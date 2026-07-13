"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SavingsCalculator } from "@/components/savings-calculator";
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Now onboarding pilot customers
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient">
              Save with wholesale AI prices.
            </h1>

            <p className="mt-6 text-lg text-muted max-w-lg">
              CostAI routes your entire organization through a single metered gateway.
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