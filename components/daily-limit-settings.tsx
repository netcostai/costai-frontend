"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function DailyLimitSettings() {
  const [limit, setLimit] = useState<number | null>(null);
  const [requestsToday, setRequestsToday] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function load() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const res = await fetch(`${API_URL}/v1/usage/today`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setLimit(data.daily_request_limit);
      setRequestsToday(data.requests_today);
      setInput(String(data.daily_request_limit));
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave() {
    setError(null);
    setSaving(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed < 1) {
      setError("Enter a number of at least 1.");
      setSaving(false);
      return;
    }

    const res = await fetch(`${API_URL}/v1/company/settings`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ daily_request_limit: parsed }),
    });

    if (res.ok) {
      setLimit(parsed);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setError("Failed to save.");
    }
    setSaving(false);
  }

  if (loading || limit === null) return null;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 mb-10">
      <h3 className="text-sm font-medium mb-1">Daily request limit</h3>
      <p className="text-xs text-muted mb-3">
        {requestsToday} of {limit} requests used today across your team. Resets at midnight UTC.
      </p>
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-28 bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-xs font-medium bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save"}
        </button>
      </div>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
}
