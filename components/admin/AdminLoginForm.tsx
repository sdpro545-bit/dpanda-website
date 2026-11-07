"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldAlert, KeyRound } from "lucide-react";

interface LoginFormProps {
  onSuccess: () => void;
}

export function AdminLoginForm({ onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onSuccess();
      } else {
        setError(data.error || "Authentication failed. Check your password.");
      }
    } catch {
      setError("Network or server connection failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--green-950)] text-white flex items-center justify-center p-4 selection:bg-[var(--mint-200)] selection:text-[var(--green-950)]">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[var(--green-900)]/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-[var(--mint-200)]">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-black text-2xl tracking-tight text-white">
            dPanda Operator Access
          </h1>
          <p className="text-xs text-white/50">
            Authorised exchange administrators only.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase font-mono text-white/60 block mb-1.5 font-medium">
              Administrator Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access passphrase"
                autoFocus
                required
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--mint-200)] transition-colors pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 rounded-xl bg-[var(--mint-200)] hover:bg-white text-[var(--green-950)] font-heading font-bold text-sm tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
          </button>
        </form>

        <div className="pt-4 border-t border-white/5 text-center">
          <p className="text-[11px] text-white/40 font-mono">
            Protected by IP rate-limiting & AES-256 session tokens.
          </p>
        </div>
      </div>
    </div>
  );
}
