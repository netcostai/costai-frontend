"use client";

import { useState } from "react";

// --- Editable assumptions ---
const CACHEABLE_PCT = 0.25;
const CACHE_DISCOUNT = 0.90;
const WHOLESALE_DISCOUNT = 0.15;

const PRICE_PER_USER = 10;
const MAX_EMPLOYEES = 4000;

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
          <label htmlFor="employees" className="text-sm
