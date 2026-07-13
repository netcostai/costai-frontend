"use client";

import { useEffect, useState } from "react";

export function InviteShare({ inviteCode, companyName }: { inviteCode: string; companyName: string }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const signupUrl = `https://netcost.ai/sign-up?invite=${inviteCode}`;
  const message = `Join ${companyName} on CostAI Gateway. Sign up here: ${signupUrl} (invite code: ${inviteCode})`;

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    `Join ${companyName} on CostAI Gateway`
  )}&body=${encodeURIComponent(message)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission can fail in some browser contexts;
      // the buttons below still work as a manual fallback.
    }
  }

  async function handleNativeShare() {
    try {
      await navigator.share({ title: `Join ${companyName} on CostAI Gateway`, text: message, url: signupUrl });
    } catch {
      // User closed the share sheet without picking anything — nothing to do.
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-3">
      <a href={mailtoHref} className="text-xs border border-border hover:border-foreground/30 px-3 py-1.5 rounded-md transition-colors">
        Email
      </a>
      <button onClick={handleCopy} className="text-xs border border-border hover:border-foreground/30 px-3 py-1.5 rounded-md transition-colors">
        {copied ? "Copied!" : "Copy message"}
      </button>
      {canNativeShare && (
        <button onClick={handleNativeShare} className="text-xs border border-border hover:border-foreground/30 px-3 py-1.5 rounded-md transition-colors">
          Share...
        </button>
      )}
    </div>
  );
}