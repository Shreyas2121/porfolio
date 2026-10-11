"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function EmailCopy({ email }: { email: string }) {
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);

  async function copyEmail() {
    setCopying(true);
    setStatus("");
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email address copied.");
    } catch {
      setStatus("Copy unavailable. Select and copy the email address above.");
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="select-all break-all font-medium">{email}</span>
        <button
          type="button"
          onClick={copyEmail}
          disabled={copying}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-contact-ink/30 px-3 py-2 text-sm font-semibold transition hover:bg-contact-ink/10 disabled:opacity-60"
        >
          {status === "Email address copied." ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copying ? "Copying…" : "Copy email"}
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-6 text-sm">
        {status}
      </p>
    </div>
  );
}
