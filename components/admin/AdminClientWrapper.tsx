"use client";

import React, { useState } from "react";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminDashboard } from "./AdminDashboard";
import { GiftCard, GiftCardRate, CryptoAsset, PublicSettings, AuditEntry, RateHistoryEntry } from "@/lib/data/types";

interface AdminClientWrapperProps {
  isAuthenticated: boolean;
  cards: GiftCard[];
  rates: GiftCardRate[];
  crypto: CryptoAsset[];
  settings: PublicSettings;
  audit: AuditEntry[];
  history: RateHistoryEntry[];
  adminSlug: string;
}

export function AdminClientWrapper({
  isAuthenticated: initialAuth,
  cards,
  rates,
  crypto,
  settings,
  audit,
  history,
  adminSlug,
}: AdminClientWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);

  if (!isAuthenticated) {
    return <AdminLoginForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminDashboard
      initialCards={cards}
      initialRates={rates}
      initialCrypto={crypto}
      initialSettings={settings}
      initialAudit={audit}
      initialHistory={history}
      adminSlug={adminSlug}
    />
  );
}
