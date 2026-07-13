"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type PendingUser = { user_id: string; email: string };

export function PendingRequests() {
  const [pending, setPending] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPending() {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const res = await fetch(`${API_URL}/v1/team/pending`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setPending(data.pending);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPending();
  }, []);

  async function handleAction(userId: string, action: "approve" | "deny") {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    await fetch(`${API_URL}/v1/team/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ user_id: userId }),
    });

    setPending((prev) => prev.filter((p) => p.user_id !== userId));
  }

  if (loading || pending.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 mb-10">
      <h3 className="text-sm font-medium mb-4">Pending team requests</h3>
      <div className="space-y-3">
        {pending.map((p) => (
          <div key={p.user_id} className="flex items-center justify-between text-sm">
            <span className="text-muted">{p.email}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(p.user_id, "approve")}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(p.user_id, "deny")}
                className="border border-border hover:border-foreground/30 text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
              >
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
