"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

export function Navbar() {
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

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter">
          Cost<span className="text-primary">AI</span>
        </Link>

        <div className="flex items-center gap-3">
          {!checked ? null : loggedIn ? (
            <>
              <Link
                href="/gateway"
                className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                Gateway
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium border border-border hover:border-foreground/30 px-4 py-2 rounded-lg transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                Sign in
              </Link>
              <Link
                href="/gateway"
                className="text-sm font-medium bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
              >
                Launch Gateway
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}