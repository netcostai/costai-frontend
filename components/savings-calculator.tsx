"use client";

import { useState } from "react";

// --- Editable assumptions ---
const CACHEABLE_PCT = 0.25;
const CACHE_DISCOUNT = 0.90;
const WHOLESALE_DISCOUNT = 0.15;

const PRICE_PER_USER = 10;
const MAX_EMPLOYEES = 1000;

function calculateGrossSavingsRate() {
  return CACHEABLE_PCT * CACHE_DISCOUNT + WHOLESALE_DISCOUNT;
}

export function SavingsCalculator() {
  const [employees, setEmployees] = useState(25);
  const [spend, setSpend] = useState(5000);

  const grossSavingsRate = calculateGrossSavingsRate();
  const grossSavings = spend * grossSavingsRate;
  const newAiCost = spend - grossSavings;
  const platformFee = employees * PRICE_PER_USER;
  const totalCost = newAiCost + platformFee;
  const netSavings = spend - totalCost;
  const isNegative = netSavings < 0;

  const format = (n: number) =>
    Math.abs(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const clampEmployees = (n: number) => Math.min(MAX_EMPLOYEES, Math.max(1, n));

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-1">Estimate your savings</h2>
      <p className="text-sm text-muted mb-6">Adjust the numbers below to match your team.</p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="employees" className="text-sm text-muted">
            Number of employees
          </label>
          <input
            type="number"
            min={1}
            max={MAX_EMPLOYEES}
            value={employees}
            onChange={(e) => setEmployees(clampEmployees(Number(e.target.value)))}
            className="w-24 bg-background border border-border rounded-md px-2 py-1 text-sm text-right focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <input
          id="employees"
          type="range"
          min={1}
          max={MAX_EMPLOYEES}
          step={10}
          list="employee-ticks"
          value={employees}
          onChange={(e) => setEmployees(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <datalist id="employee-ticks">
          <option value="250" />
          <option value="500" />
          <option value="750" />
        </datalist>
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>1</span>
          <span>{MAX_EMPLOYEES.toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-6">
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

      <div className="space-y-2 mb-6 text-sm">
        <div className="flex justify-between text-muted">
          <span>New AI cost (after caching + wholesale rates)</span>
          <span className="text-foreground">{format(newAiCost)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>CostAI platform fee ({employees} × ${PRICE_PER_USER})</span>
          <span className="text-foreground">{format(platformFee)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-border font-medium">
          <span>Total monthly cost</span>
          <span>{format(totalCost)}</span>
        </div>
      </div>

      <div
        className={`rounded-xl p-5 text-center border ${
          isNegative ? "border-red-500/30 bg-red-500/10" : "border-accent/30 bg-accent/10"
        }`}
      >
        <p className={`text-xs mb-1 ${isNegative ? "text-red-400" : "text-accent"}`}>
          {isNegative ? "Net monthly cost increase" : "Net monthly savings"}
        </p>
        <p className={`text-2xl font-semibold ${isNegative ? "text-red-400" : "text-accent"}`}>
          {format(netSavings)}
        </p>
      </div>
    </div>
  );
}