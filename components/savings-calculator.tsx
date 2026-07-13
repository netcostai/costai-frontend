"use client";

import { useState } from "react";

export function SavingsCalculator() {
  const [spend, setSpend] = useState(5000);

  const savingsRate = 0.9;
  const newCost = spend * (1 - savingsRate);
  const savings = spend - newCost;

  const format = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl border border-border bg-surface p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">
            See what you'd stop overpaying
          </h2>
          <p className="text-muted">
            Enter your current monthly AI spend to estimate your savings with CostAI.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <label htmlFor="spend" className="block text-sm text-muted mb-2">
            Current monthly AI spend
          </label>
          <div className="relative mb-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
            <input
              id="spend"
              type="number"
              min={0}
              step={100}
              value={spend}
              onChange={(e) => setSpend(Math.max(0, Number(e.target.value)))}
              className="w-full bg-background border border-border rounded-lg pl-8 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <input
            type="range"
            min={0}
            max={50000}
            step={100}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full accent-primary"
          />

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="rounded-xl border border-border bg-background p-5 text-center">
              <p className="text-sm text-muted mb-1">With CostAI</p>
              <p className="text-2xl font-semibold">{format(newCost)}</p>
              <p className="text-xs text-muted mt-1">per month</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-5 text-center">
              <p className="text-sm text-accent mb-1">You save</p>
              <p className="text-2xl font-semibold text-accent">{format(savings)}</p>
              <p className="text-xs text-muted mt-1">per month</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
