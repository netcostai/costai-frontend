import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_50%_0%,rgba(59,130,246,0.15),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Now onboarding pilot customers
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-gradient max-w-3xl mx-auto">
          Save with wholesale AI prices.
        </h1>

        <p className="mt-6 text-lg text-muted max-w-xl mx-auto">
          CostAI routes your entire organization through a single metered gateway.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/pilot"
            className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 rounded-lg glow-blue transition-all"
          >
            Claim 14-Day Free Pilot
          </Link>
          <Link
            href="/sign-in"
            className="border border-border hover:border-foreground/30 text-foreground font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
