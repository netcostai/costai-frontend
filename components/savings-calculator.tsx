"use client";

import { useState } from "react";

// --- Editable assumptions ---
// Update these once you have real customer usage data.
// Each *_PCT is "% of total spend that this lever applies to"
// Each *_DISCOUNT is "how much cheaper that portion becomes"
const CACHEABLE_PCT = 0.25;   // share of spend that's repeated/cacheable input
const CACHE_DISCOUNT = 0.90;  // cache reads are ~90% cheaper than normal input

const ROUTABLE_PCT = 0.25;    // share of spend that could run on a cheaper model
const ROUTING_DISCOUNT = 0.75; // cheaper models can be ~75%+ cheaper per token

const BATCHABLE_PCT = 0.10;   // share of spend that's non-real-time (batchable)
const BATCH_DISCOUNT = 0.50;  // batch API pricing is typically ~50% off

const WHOLESALE_DISCOUNT = 0.05; // flat pass-through margin savings on all spend

function calculateBlendedSavingsRate() {
  return (
    CACHEABLE_PCT * CACHE_DISCOUNT +
    ROUTABLE_PCT * ROUTING_DISCOUNT +
    BATCHABLE_PCT * BATCH_DISCOUNT +
    WHOLESALE_DISCOUNT
  );
}

export function SavingsCalculator() {
  const [employees, setEmployees] = useState(25);
  const [spend, setSpend] = useState(5000);

  const savingsRate = calculateBlendedSavingsRate();
  const newCost = spend * (1 - savingsRate);
  const savings = spend - newCost;

  const format = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-1">Estimate your savings</h2>
      <p className="text-sm text-muted mb-6">Adjust the numbers below to match your team.</p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="employees" className="text-sm text-muted">
            Number of employees
          </label>
          <span className="text-sm font-medium">{employees}</span>
        </div>
        <input
          id="employees"
          type="range"
          min={1}
          max={500}
          step={1}
          value={employees}
          onChange={(e) => setEmployees(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="spend" className="block text-sm text-muted mb-2">
          Current monthly AI spend
        </label>
        <div className="relative">
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
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-background p-4 text-center">
          <p className="text-xs text-muted mb-1">With CostAI</p>
          <p className="text-xl font-semibold">{format(newCost)}</p>
          <p className="text-xs text-muted mt-1">per month</p>
        </div>
        <div className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-center">
          <p className="text-xs text-accent mb-1">You save</p>
          <p className="text-xl font-semibold text-accent">{format(savings)}</p>
          <p className="text-xs text-muted mt-1">per month</p>
        </div>
      </div>
    </div>
  );
}
