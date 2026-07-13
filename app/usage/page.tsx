"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { useGatewayKeys } from "@/lib/gateway-context";
import { supabase } from "@/lib/supabase-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UsageRow = {
  user_id: string;
  email: string;
  requests: number;
  input_tokens: number;
  output_tokens: number;
};

export default function UsagePage() {
  const router = useRouter();
  const { role, loading: contextLoading } = useGatewayKeys();
  const [usage, setUsage] = useState<UsageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/sign-in");
        return;
      }

      const res = await fetch(`${API_URL}/v1/usage/summary`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.status === 403) {
        setError("Only company admins can view usage.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError("Failed to load usage data.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUsage(data.usage);
      setLoading(false);
    }

    if (!contextLoading) load();
  }, [router, contextLoading]);

  return (
    <>
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-semibold mb-1">Team usage</h1>
        <p className="text-muted mb-8 text-sm">Requests and token usage by employee, this billing period.</p>

        {loading ? (
          <p className="text-muted text-sm">Loading...</p>
        ) : error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : usage.length === 0 ? (
          <p className="text-muted text-sm">No usage yet.</p>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface text-muted text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Employee</th>
                  <th className="px-4 py-3 font-medium text-right">Requests</th>
                  <th className="px-4 py-3 font-medium text-right">Input tokens</th>
                  <th className="px-4 py-3 font-medium text-right">Output tokens</th>
                </tr>
              </thead>
              <tbody>
                {usage.map((row) => (
                  <tr key={row.user_id} className="border-t border-border">
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3 text-right">{row.requests}</td>
                    <td className="px-4 py-3 text-right">{row.input_tokens.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">{row.output_tokens.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
