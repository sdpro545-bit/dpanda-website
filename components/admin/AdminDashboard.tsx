"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import Image from "next/image";
import {
  Shield,
  ShieldAlert,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Sliders,
  Check,
  X,
  RotateCcw,
  AlertTriangle,
  ArrowUpDown,
  DollarSign,
  TrendingUp,
  Settings as SettingsIcon,
  Clock,
  ExternalLink,
  Layers,
  Power,
} from "lucide-react";
import { GiftCard, GiftCardRate, CryptoAsset, PublicSettings, AuditEntry, RateHistoryEntry } from "@/lib/data/types";

interface DashboardProps {
  initialCards: GiftCard[];
  initialRates: GiftCardRate[];
  initialCrypto: CryptoAsset[];
  initialSettings: PublicSettings;
  initialAudit: AuditEntry[];
  initialHistory: RateHistoryEntry[];
  adminSlug: string;
}

type TabType = "overview" | "cards" | "crypto" | "settings" | "audit";

function formatLagos(isoString: string) {
  try {
    return new Intl.DateTimeFormat("en-NG", {
      timeZone: "Africa/Lagos",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

export function AdminDashboard({
  initialCards,
  initialRates,
  initialCrypto,
  initialSettings,
  initialAudit,
  initialHistory,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [rates, setRates] = useState<GiftCardRate[]>(initialRates);
  const [crypto, setCrypto] = useState<CryptoAsset[]>(initialCrypto);
  const [settings, setSettings] = useState<PublicSettings>(initialSettings);
  const [audit, setAudit] = useState<AuditEntry[]>(initialAudit);
  const [history, setHistory] = useState<RateHistoryEntry[]>(initialHistory);

  const [toast, setToast] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Rate filters
  const [cardSearch, setCardSearch] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState<string>("ALL");

  // Inline editing state: { [rateId]: rateValue }
  const [editingRates, setEditingRates] = useState<Record<string, number>>({});
  // Crypto rate editing: { [symbol]: rateValue }
  const [editingCrypto, setEditingCrypto] = useState<Record<string, number>>({});

  // Bulk rate adjustment
  const [selectedRateIds, setSelectedRateIds] = useState<string[]>([]);
  const [bulkMode, setBulkMode] = useState<"fixed" | "percent">("fixed");
  const [bulkValue, setBulkValue] = useState<number>(10);
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<PublicSettings>(initialSettings);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  const seedRatesExist = useMemo(() => {
    return rates.some((r) => r.isSeed) || crypto.some((c) => c.isSeed);
  }, [rates, crypto]);

  const activeCardsCount = useMemo(() => {
    const activeIds = new Set(rates.filter((r) => r.isActive).map((r) => r.cardId));
    return activeIds.size;
  }, [rates]);

  const activeCoinsCount = useMemo(() => {
    return crypto.filter((c) => c.isActive).length;
  }, [crypto]);

  const lastUpdateTime = useMemo(() => {
    const allDates = [
      ...rates.map((r) => new Date(r.updatedAt).getTime()),
      ...crypto.map((c) => new Date(c.updatedAt).getTime()),
    ];
    if (allDates.length === 0) return "Never";
    const maxTime = Math.max(...allDates);
    return formatLagos(new Date(maxTime).toISOString());
  }, [rates, crypto]);

  const filteredRates = useMemo(() => {
    return rates.filter((r) => {
      const matchSearch =
        r.cardName.toLowerCase().includes(cardSearch.toLowerCase()) ||
        r.variant.toLowerCase().includes(cardSearch.toLowerCase());
      const matchCurr = currencyFilter === "ALL" || r.currency === currencyFilter;
      return matchSearch && matchCurr;
    });
  }, [rates, cardSearch, currencyFilter]);

  // Bulk adjustment preview
  const bulkPreview = useMemo(() => {
    return selectedRateIds
      .map((id) => {
        const item = rates.find((r) => r.id === id);
        if (!item) return null;
        let newRate = item.rateNgn;
        if (bulkMode === "fixed") {
          newRate += bulkValue;
        } else {
          newRate = Math.round(item.rateNgn * (1 + bulkValue / 100));
        }
        return {
          id,
          name: `${item.cardName} (${item.variant})`,
          current: item.rateNgn,
          next: Math.max(1, newRate),
        };
      })
      .filter(Boolean) as { id: string; name: string; current: number; next: number }[];
  }, [selectedRateIds, rates, bulkMode, bulkValue]);

  // Handle single rate save
  const handleSaveRate = async (rateId: string) => {
    const newRate = editingRates[rateId];
    if (newRate === undefined || isNaN(newRate) || newRate <= 0) return;

    // Optimistic update
    const previousRates = [...rates];
    setRates((prev) =>
      prev.map((r) => (r.id === rateId ? { ...r, rateNgn: newRate, isSeed: false, updatedAt: new Date().toISOString() } : r))
    );

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_CARD_RATE",
          payload: { id: rateId, newRateNgn: newRate },
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      showToast("Saved. Live now.");
      // Clear edit state for this item
      setEditingRates((prev) => {
        const updated = { ...prev };
        delete updated[rateId];
        return updated;
      });
      refreshData();
    } catch {
      setRates(previousRates);
      showToast("Error saving rate. Reverted.");
    }
  };

  // Handle toggle rate active
  const handleToggleRate = async (id: string, current: boolean) => {
    const nextState = !current;
    setRates((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: nextState } : r)));

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "TOGGLE_CARD_ACTIVE",
          payload: { id, isActive: nextState },
        }),
      });
      if (!res.ok) throw new Error();
      showToast("Status updated.");
      refreshData();
    } catch {
      setRates((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: current } : r)));
      showToast("Update failed.");
    }
  };

  // Handle bulk save
  const handleConfirmBulk = async () => {
    if (selectedRateIds.length === 0) return;

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "BULK_UPDATE_RATES",
          payload: {
            rateIds: selectedRateIds,
            deltaNgn: bulkMode === "fixed" ? bulkValue : undefined,
            percentDelta: bulkMode === "percent" ? bulkValue : undefined,
          },
        }),
      });
      if (!res.ok) throw new Error();
      showToast(`Updated ${selectedRateIds.length} rates.`);
      setShowBulkModal(false);
      setSelectedRateIds([]);
      refreshData();
    } catch {
      showToast("Bulk update failed.");
    }
  };

  // Handle crypto rate save
  const handleSaveCryptoRate = async (symbol: string) => {
    const newRate = editingCrypto[symbol];
    if (newRate === undefined || isNaN(newRate) || newRate <= 0) return;

    const previousCrypto = [...crypto];
    setCrypto((prev) =>
      prev.map((c) => (c.symbol === symbol ? { ...c, ngnPerUsd: newRate, isSeed: false, updatedAt: new Date().toISOString() } : c))
    );

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_CRYPTO_RATE",
          payload: { symbol, newNgnPerUsd: newRate },
        }),
      });
      if (!res.ok) throw new Error();
      showToast("Crypto rate saved.");
      setEditingCrypto((prev) => {
        const u = { ...prev };
        delete u[symbol];
        return u;
      });
      refreshData();
    } catch {
      setCrypto(previousCrypto);
      showToast("Crypto rate update failed.");
    }
  };

  // Handle crypto active toggle
  const handleToggleCrypto = async (symbol: string, current: boolean) => {
    const nextState = !current;
    setCrypto((prev) => prev.map((c) => (c.symbol === symbol ? { ...c, isActive: nextState } : c)));
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "TOGGLE_CRYPTO_ACTIVE",
          payload: { symbol, isActive: nextState },
        }),
      });
      if (!res.ok) throw new Error();
      showToast("Crypto status updated.");
      refreshData();
    } catch {
      setCrypto((prev) => prev.map((c) => (c.symbol === symbol ? { ...c, isActive: current } : c)));
    }
  };

  // Handle Global Pause Rates Toggle
  const handleToggleGlobalPause = async () => {
    const nextPause = !settings.ratesPaused;
    setSettings((prev) => ({ ...prev, ratesPaused: nextPause }));
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_SETTINGS",
          payload: { partial: { ratesPaused: nextPause } },
        }),
      });
      if (!res.ok) throw new Error();
      showToast(nextPause ? "All public rates paused." : "Rates resumed live.");
      refreshData();
    } catch {
      setSettings((prev) => ({ ...prev, ratesPaused: !nextPause }));
    }
  };

  // Handle Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_SETTINGS",
          payload: { partial: settingsForm },
        }),
      });
      if (!res.ok) throw new Error();
      setSettings(settingsForm);
      showToast("Settings saved.");
      refreshData();
    } catch {
      showToast("Failed to save settings.");
    }
  };

  // Handle Undo History
  const handleUndo = async (historyId: string) => {
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UNDO_CHANGE",
          payload: { historyId },
        }),
      });
      if (!res.ok) throw new Error();
      showToast("Change reverted.");
      refreshData();
    } catch {
      showToast("Failed to revert change.");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  // Refresh latest state from server
  const refreshData = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          setRates(data.rates || []);
          setCrypto(data.crypto || []);
          setSettings(data.settings || {});
          setSettingsForm(data.settings || {});
          setAudit(data.audit || []);
          setHistory(data.history || []);
        }
      } catch {
        // silent catch
      }
    });
  };

  // Periodic poll every 30s to stay fresh
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--green-950)] text-white font-sans selection:bg-[var(--mint-200)] selection:text-[var(--green-950)]">
      {/* Toast Notification (No glow, clean pill) */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--mint-200)] text-[var(--green-950)] font-semibold text-sm shadow-xl">
          <Check className="w-4 h-4 text-[var(--green-950)]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="border-b border-white/10 bg-[var(--green-900)]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl tracking-tight text-[var(--mint-200)]">
                dPanda
              </span>
              <span className="text-xs uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
                Control Center
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-white/50 border-l border-white/10 pl-4">
              <Clock className="w-3.5 h-3.5" />
              <span>Lagos: {formatLagos(new Date().toISOString())}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              disabled={isPending}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`} />
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Seed Rates Warning Banner */}
      {seedRatesExist && (
        <div className="bg-amber-950/80 border-b border-amber-500/30 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm text-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Seed rates are still live.</strong> Update these placeholder values with actual trading rates before accepting customer trades.
              </span>
            </div>
            <button
              onClick={() => setActiveTab("cards")}
              className="hidden sm:inline-block underline font-medium hover:text-white ml-4 shrink-0"
            >
              Review Rates
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-white/10 mb-6 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === "overview"
                ? "border-[var(--mint-200)] text-[var(--mint-200)] bg-white/5"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("cards")}
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === "cards"
                ? "border-[var(--mint-200)] text-[var(--mint-200)] bg-white/5"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Gift Card Rates ({rates.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("crypto")}
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === "crypto"
                ? "border-[var(--mint-200)] text-[var(--mint-200)] bg-white/5"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Crypto Rates ({crypto.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === "settings"
                ? "border-[var(--mint-200)] text-[var(--mint-200)] bg-white/5"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2.5 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === "audit"
                ? "border-[var(--mint-200)] text-[var(--mint-200)] bg-white/5"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>History & Audit ({audit.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-mono text-white/50">Active Gift Cards</span>
                <p className="text-3xl font-heading font-black mt-1 text-white">{activeCardsCount} of 12</p>
                <p className="text-xs text-white/60 mt-1">{rates.filter((r) => r.isActive).length} rate variants active</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-mono text-white/50">Active Crypto Assets</span>
                <p className="text-3xl font-heading font-black mt-1 text-white">{activeCoinsCount} of {crypto.length}</p>
                <p className="text-xs text-white/60 mt-1">BTC, USDT, ETH, SOL, BNB</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-mono text-white/50">Public Trading State</span>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      settings.ratesPaused ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />
                  <p className="text-xl font-heading font-bold text-white">
                    {settings.ratesPaused ? "Paused" : "Active Live"}
                  </p>
                </div>
                <p className="text-xs text-white/60 mt-1">
                  {settings.ratesPaused ? "Visitors see rate update notice" : "Quotes operating normally"}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-mono text-white/50">Last Rate Change</span>
                <p className="text-sm font-semibold mt-2 text-white/90 truncate">{lastUpdateTime}</p>
                <p className="text-xs text-white/50 mt-1">Timestamps in Lagos Time</p>
              </div>
            </div>

            {/* Global Controls & Emergency Switch */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Emergency Master Switch: Pause All Rates</h3>
                <p className="text-sm text-white/60 max-w-2xl mt-0.5">
                  When paused, calculators on the public website prevent quote calculations and instruct users that rates are undergoing routine updates.
                </p>
              </div>
              <button
                onClick={handleToggleGlobalPause}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shrink-0 ${
                  settings.ratesPaused
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                    : "bg-amber-500 hover:bg-amber-400 text-black"
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{settings.ratesPaused ? "Resume Live Rates" : "Pause All Rates"}</span>
              </button>
            </div>

            {/* Recent Changes Log Preview */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg text-white">Recent Rate Adjustments</h3>
                <button
                  onClick={() => setActiveTab("audit")}
                  className="text-xs text-[var(--mint-200)] hover:underline"
                >
                  View full history &rarr;
                </button>
              </div>
              {history.length === 0 ? (
                <p className="text-sm text-white/50 py-4">No recent rate changes recorded yet.</p>
              ) : (
                <div className="divide-y divide-white/10">
                  {history.slice(0, 5).map((h) => (
                    <div key={h.id} className="py-3 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium text-white">{h.cardOrCoin}</span>
                        <span className="text-xs text-white/50 ml-2">by {h.changedBy}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white/50 line-through">₦{h.oldRate}</span>
                        <span className="font-semibold text-[var(--mint-200)]">₦{h.newRate}</span>
                        <span className="text-xs text-white/40">{formatLagos(h.changedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: GIFT CARD RATES */}
        {activeTab === "cards" && (
          <div className="space-y-6">
            {/* Filter & Bulk Actions Bar */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={cardSearch}
                    onChange={(e) => setCardSearch(e.target.value)}
                    placeholder="Search card or variant..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--mint-200)]"
                  />
                </div>
                <select
                  value={currencyFilter}
                  onChange={(e) => setCurrencyFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--mint-200)]"
                >
                  <option value="ALL">All Currencies</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (selectedRateIds.length === filteredRates.length) {
                      setSelectedRateIds([]);
                    } else {
                      setSelectedRateIds(filteredRates.map((r) => r.id));
                    }
                  }}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 transition-colors"
                >
                  {selectedRateIds.length === filteredRates.length ? "Deselect All" : "Select All"}
                </button>
                <button
                  onClick={() => setShowBulkModal(true)}
                  disabled={selectedRateIds.length === 0}
                  className="px-4 py-2 rounded-xl bg-[var(--mint-200)] hover:bg-white text-[var(--green-950)] font-semibold text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Bulk Adjust ({selectedRateIds.length})</span>
                </button>
              </div>
            </div>

            {/* Rates Table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-black/30 text-white/60 text-xs uppercase font-mono tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={selectedRateIds.length > 0 && selectedRateIds.length === filteredRates.length}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedRateIds(filteredRates.map((r) => r.id));
                            else setSelectedRateIds([]);
                          }}
                          className="rounded border-white/30 text-[var(--mint-200)] focus:ring-0"
                        />
                      </th>
                      <th className="p-3">Card & Variant</th>
                      <th className="p-3">Currency</th>
                      <th className="p-3">Min / Max</th>
                      <th className="p-3">Rate (₦ per 1)</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Updated</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredRates.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-white/40">
                          No cards match your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredRates.map((r) => {
                        const isEditing = editingRates[r.id] !== undefined;
                        const currentVal = isEditing ? editingRates[r.id] : r.rateNgn;
                        const isSelected = selectedRateIds.includes(r.id);

                        return (
                          <tr
                            key={r.id}
                            className={`hover:bg-white/5 transition-colors ${
                              isSelected ? "bg-white/[0.07]" : ""
                            }`}
                          >
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedRateIds((prev) => [...prev, r.id]);
                                  } else {
                                    setSelectedRateIds((prev) => prev.filter((id) => id !== r.id));
                                  }
                                }}
                                className="rounded border-white/30 text-[var(--mint-200)] focus:ring-0"
                              />
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-white">{r.cardName}</div>
                              <div className="text-xs text-white/50">{r.variant}</div>
                            </td>
                            <td className="p-3 font-mono font-bold text-white/80">{r.currency}</td>
                            <td className="p-3 text-xs text-white/60">
                              {r.currency === "USD" ? "$" : "£"}
                              {r.minAmount} – {r.maxAmount ? `${r.currency === "USD" ? "$" : "£"}${r.maxAmount}` : "No max"}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-white/40">₦</span>
                                <input
                                  type="number"
                                  value={currentVal}
                                  onChange={(e) =>
                                    setEditingRates({
                                      ...editingRates,
                                      [r.id]: parseInt(e.target.value) || 0,
                                    })
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveRate(r.id);
                                  }}
                                  className={`w-24 px-2 py-1 rounded bg-black/40 border text-sm font-mono font-bold ${
                                    isEditing
                                      ? "border-[var(--mint-200)] text-[var(--mint-200)]"
                                      : "border-white/10 text-white"
                                  } focus:outline-none`}
                                />
                                {isEditing && (
                                  <button
                                    onClick={() => handleSaveRate(r.id)}
                                    className="p-1 rounded bg-[var(--mint-200)] text-[var(--green-950)] hover:bg-white"
                                    title="Save on Enter"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="p-3">
                              {r.isSeed ? (
                                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  Seed Rate
                                </span>
                              ) : (
                                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  Verified
                                </span>
                              )}
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => handleToggleRate(r.id, r.isActive)}
                                className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${
                                  r.isActive
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                                }`}
                              >
                                {r.isActive ? "Active" : "Inactive"}
                              </button>
                            </td>
                            <td className="p-3 text-xs text-white/40">{formatLagos(r.updatedAt)}</td>
                            <td className="p-3 text-right">
                              {isEditing && (
                                <button
                                  onClick={() =>
                                    setEditingRates((prev) => {
                                      const u = { ...prev };
                                      delete u[r.id];
                                      return u;
                                    })
                                  }
                                  className="text-xs text-white/40 hover:text-white"
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CRYPTO RATES */}
        {activeTab === "crypto" && (
          <div className="space-y-6">
            {/* Reference Market Guidance Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-mono text-[var(--mint-200)]">Market Reference Guide</span>
                <h3 className="font-heading font-bold text-lg text-white mt-0.5">
                  Reference NGN / USD Benchmark: ₦{settings.referenceNgnUsd || 1665}
                </h3>
                <p className="text-xs text-white/60 mt-1 max-w-xl">
                  This benchmark represents the current interbank/parallel reference rate. The public receives payouts based on your set ₦ per $1 values below.
                </p>
              </div>
              <button
                onClick={() => {
                  const ref = settings.referenceNgnUsd || 1665;
                  const newCrypto = { ...editingCrypto };
                  crypto.forEach((c) => {
                    newCrypto[c.symbol] = ref;
                  });
                  setEditingCrypto(newCrypto);
                  showToast("Applied benchmark to all coin draft fields.");
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white transition-colors"
              >
                Copy Reference to All Drafts
              </button>
            </div>

            {/* Crypto Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crypto.map((c) => {
                const isEditing = editingCrypto[c.symbol] !== undefined;
                const currentVal = isEditing ? editingCrypto[c.symbol] : c.ngnPerUsd;
                const approxNgn = Math.floor((c.usdPrice || 0) * currentVal);

                return (
                  <div key={c.symbol} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white font-mono">
                          {c.symbol}
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-lg text-white">{c.name}</h4>
                          <span className="text-xs text-white/50 font-mono">ID: {c.coingeckoId}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleCrypto(c.symbol, c.isActive)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${
                          c.isActive
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                        }`}
                      >
                        {c.isActive ? "Active" : "Inactive"}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/30 border border-white/5">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-white/40">Live USD Price</span>
                        <p className="text-base font-bold text-white font-mono mt-0.5">
                          ${c.usdPrice?.toLocaleString() ?? "—"}
                        </p>
                        <span
                          className={`text-[10px] font-mono ${
                            (c.change24h || 0) >= 0 ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {(c.change24h || 0) >= 0 ? "+" : ""}
                          {c.change24h?.toFixed(2)}% (24h)
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-white/40">Calculated Payout</span>
                        <p className="text-base font-bold text-[var(--mint-200)] font-mono mt-0.5">
                          ₦{approxNgn.toLocaleString()}
                        </p>
                        <span className="text-[10px] text-white/40">per 1.0 {c.symbol}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-white/60 block mb-1.5 font-medium">
                        Your Rate (₦ per $1 trade value):
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-sm">₦</span>
                        <input
                          type="number"
                          value={currentVal}
                          onChange={(e) =>
                            setEditingCrypto({
                              ...editingCrypto,
                              [c.symbol]: parseInt(e.target.value) || 0,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveCryptoRate(c.symbol);
                          }}
                          className={`flex-1 px-3 py-2 rounded-xl bg-black/40 border text-base font-mono font-bold ${
                            isEditing
                              ? "border-[var(--mint-200)] text-[var(--mint-200)]"
                              : "border-white/10 text-white"
                          } focus:outline-none`}
                        />
                        <button
                          onClick={() => handleSaveCryptoRate(c.symbol)}
                          disabled={!isEditing}
                          className="px-4 py-2 rounded-xl bg-[var(--mint-200)] text-[var(--green-950)] font-semibold text-xs hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/5">
                      <span>{c.isSeed ? "Seed Rate" : "Owner Verified"}</span>
                      <span>Updated: {formatLagos(c.updatedAt)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5">
              <h3 className="font-heading font-bold text-xl text-white">Public Website Settings</h3>

              <div>
                <label className="text-xs uppercase font-mono text-white/60 block mb-1.5">
                  WhatsApp Support Number (International format, digits only)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumberIntl}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, whatsappNumberIntl: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="2347052367655"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[var(--mint-200)]"
                />
                <span className="text-xs text-white/40 mt-1 block">
                  All trade quotes generate direct WhatsApp links to this number.
                </span>
              </div>

              <div>
                <label className="text-xs uppercase font-mono text-white/60 block mb-1.5">
                  Reference NGN / USD Market Benchmark (₦)
                </label>
                <input
                  type="number"
                  value={settingsForm.referenceNgnUsd || 1665}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, referenceNgnUsd: parseInt(e.target.value) || 1665 })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[var(--mint-200)]"
                />
              </div>

              <div className="pt-2 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-semibold text-sm text-white block">Top Announcement Banner</label>
                    <span className="text-xs text-white/50">Display a global banner at the very top of all pages.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsForm.banner?.enabled || false}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        banner: {
                          enabled: e.target.checked,
                          text: settingsForm.banner?.text || "",
                        },
                      })
                    }
                    className="rounded border-white/30 text-[var(--mint-200)] focus:ring-0 w-4 h-4"
                  />
                </div>

                {settingsForm.banner?.enabled && (
                  <div>
                    <input
                      type="text"
                      value={settingsForm.banner.text}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          banner: { enabled: true, text: e.target.value },
                        })
                      }
                      placeholder="e.g., Fast holiday gift card payouts active all weekend."
                      className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--mint-200)]"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <label className="font-semibold text-sm text-white block">Maintenance Mode</label>
                  <span className="text-xs text-white/50">Temporarily closes calculators for scheduled server maintenance.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settingsForm.maintenanceMode || false}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      maintenanceMode: e.target.checked,
                    })
                  }
                  className="rounded border-white/30 text-[var(--mint-200)] focus:ring-0 w-4 h-4"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[var(--mint-200)] hover:bg-white text-[var(--green-950)] font-heading font-bold text-sm transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: AUDIT & HISTORY */}
        {activeTab === "audit" && (
          <div className="space-y-6">
            {/* Rate History with Undo */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-lg text-white">Rate Change History</h3>
              {history.length === 0 ? (
                <p className="text-sm text-white/50">No rate adjustments made yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs uppercase font-mono text-white/50 border-b border-white/10">
                      <tr>
                        <th className="pb-2">Target</th>
                        <th className="pb-2">Old Rate</th>
                        <th className="pb-2">New Rate</th>
                        <th className="pb-2">Changed By</th>
                        <th className="pb-2">Time (Lagos)</th>
                        <th className="pb-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {history.map((h) => (
                        <tr key={h.id} className="hover:bg-white/5">
                          <td className="py-2.5 font-medium text-white">{h.cardOrCoin}</td>
                          <td className="py-2.5 text-white/50 line-through">₦{h.oldRate}</td>
                          <td className="py-2.5 font-bold text-[var(--mint-200)]">₦{h.newRate}</td>
                          <td className="py-2.5 text-xs text-white/70">{h.changedBy}</td>
                          <td className="py-2.5 text-xs text-white/40">{formatLagos(h.changedAt)}</td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleUndo(h.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs text-white transition-colors"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Revert</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* System Audit Log */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-lg text-white">Security & Action Audit Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase font-mono text-white/50 border-b border-white/10">
                    <tr>
                      <th className="pb-2">Action</th>
                      <th className="pb-2">Target</th>
                      <th className="pb-2">Change</th>
                      <th className="pb-2">Actor</th>
                      <th className="pb-2">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {audit.map((a) => (
                      <tr key={a.id} className="hover:bg-white/5">
                        <td className="py-2.5">
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-white/80">
                            {a.action}
                          </span>
                        </td>
                        <td className="py-2.5 font-medium text-white">{a.target}</td>
                        <td className="py-2.5 text-xs text-white/70">
                          {a.oldValue} &rarr; {a.newValue}
                        </td>
                        <td className="py-2.5 text-xs text-white/60">{a.actor}</td>
                        <td className="py-2.5 text-xs text-white/40">{formatLagos(a.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Adjustment Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl bg-[var(--green-900)] border border-white/10 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-lg">Bulk Adjust {selectedRateIds.length} Rates</h4>
              <button
                onClick={() => setShowBulkModal(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex rounded-xl bg-black/40 p-1 border border-white/10">
              <button
                onClick={() => setBulkMode("fixed")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  bulkMode === "fixed" ? "bg-[var(--mint-200)] text-[var(--green-950)]" : "text-white/60"
                }`}
              >
                Fixed Amount (₦)
              </button>
              <button
                onClick={() => setBulkMode("percent")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  bulkMode === "percent" ? "bg-[var(--mint-200)] text-[var(--green-950)]" : "text-white/60"
                }`}
              >
                Percentage (%)
              </button>
            </div>

            <div>
              <label className="text-xs text-white/60 block mb-1">
                {bulkMode === "fixed" ? "Amount to add or subtract (e.g. +20 or -15):" : "Percentage change (e.g. +2 or -5):"}
              </label>
              <input
                type="number"
                value={bulkValue}
                onChange={(e) => setBulkValue(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono font-bold focus:outline-none focus:border-[var(--mint-200)]"
              />
            </div>

            {/* Preview Box */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 max-h-48 overflow-y-auto space-y-2 text-xs">
              <span className="font-mono text-white/40 uppercase block mb-1">Preview of Changes:</span>
              {bulkPreview.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                  <span className="text-white/80 truncate max-w-[180px]">{p.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-white/40 line-through">₦{p.current}</span>
                    <span className="text-[var(--mint-200)] font-bold">₦{p.next}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBulk}
                className="flex-1 py-2.5 rounded-xl bg-[var(--mint-200)] hover:bg-white text-[var(--green-950)] font-semibold text-xs transition-colors"
              >
                Apply & Save Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
