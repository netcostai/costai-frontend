"use client";

import { useState } from "react";

// --- Editable assumptions ---
// How usage is actually distributed across a typical org's staff
const HEAVY_USER_SHARE = 0.10;       // % of employees who are heavy AI users
const HEAVY_USER_USAGE_PCT = 0.90;   // heavy users consume ~90% of a "full seat" worth
const LIGHT_USER_USAGE_PCT = 0.05;   // everyone else barely uses it — ~5% of a full seat

// Wholesale/bulk AI pricing advantage on top of real (metered) usage
const WHOLESALE_DISCOUNT = 0.15;

const PRICE_PER_USER = 10; // CostAI platform fee, $/employee/month
const MAX_EMPLOYEES = 1000;

function calculateAvgUsagePct() {
  return (
    HEAVY_USER_SHARE * HEAVY_USER_USAGE_PCT +
    (1 - HEAVY_USER_SHARE) * LIGHT_USER_USAGE_PCT
  );
}

export function SavingsCalculator() {
  const [employees, setEmployees] = useState(100);
  const [pricePerUser, setPricePerUser] = useState(20);

  const avgUsagePct = calculateAvgUsagePct();

  const currentFlatCost = employees * pricePerUser;
  const realUsageCost = currentFlatCost * avgUsagePct;
  const wholesaleCost = realUsageCost * (1 - WHOLESALE_DISCOUNT);
  const platformFee = employees * PRICE_PER_USER;
  const totalWithCostAI = wholesaleCost + platformFee;
  const netSavings = currentFlatCost - totalWithCostAI;
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
        <label htmlFor="pricePerUser" className="block text-sm text-muted mb-2">
          Current price per user/month (flat-rate AI subscription)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
          <input
            id="pricePerUser"
            type="number"
            min={0}
            step={1}
            value={pricePerUser}
            onChange={(e) => setPricePerUser(Math.max(0, Number(e.target.value)))}
            className="w-full bg-background border border-border rounded-lg pl-8 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2 mb-6 text-sm">
        <div className="flex justify-between text-muted">
          <span>Today's flat-rate cost ({employees} × ${pricePerUser})</span>
          <span className="text-foreground">{format(currentFlatCost)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Real usage, metered ({Math.round(avgUsagePct * 100)}% of seats)</span>
          <span className="text-foreground">{format(realUsageCost)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Wholesale AI rate (−{Math.round(WHOLESALE_DISCOUNT * 100)}%)</span>
          <span className="text-foreground">{format(wholesaleCost)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>CostAI platform fee ({employees} × ${PRICE_PER_USER})</span>
          <span className="text-foreground">{format(platformFee)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-border font-medium">
          <span>Total monthly cost with CostAI</span>
          <span>{format(totalWithCostAI)}</span>
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