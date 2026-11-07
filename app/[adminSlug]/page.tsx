import { notFound } from "next/navigation";
import { Metadata } from "next";
import { verifyAdminSession } from "@/lib/auth/admin";
import {
  getGiftCardsWithRates,
  getCryptoAssetsWithPrices,
  getPublicSettings,
  getAuditLog,
  getRateHistory,
} from "@/lib/data/store";
import { AdminClientWrapper } from "@/components/admin/AdminClientWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "dPanda Control",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
  },
};

interface Props {
  params: {
    adminSlug: string;
  };
}

export default async function AdminPage({ params }: Props) {
  const expectedSlug = process.env.ADMIN_SLUG || "dpanda-control-center-2026-secure";

  // Wrong path immediately triggers standard Next.js 404 page
  if (params.adminSlug !== expectedSlug) {
    notFound();
  }

  const isAuth = await verifyAdminSession();
  const { cards, rates } = await getGiftCardsWithRates();
  const crypto = await getCryptoAssetsWithPrices();
  const settings = await getPublicSettings();
  const audit = isAuth ? await getAuditLog() : [];
  const history = isAuth ? await getRateHistory() : [];

  return (
    <AdminClientWrapper
      isAuthenticated={isAuth}
      cards={cards}
      rates={rates}
      crypto={crypto}
      settings={settings}
      audit={audit}
      history={history}
      adminSlug={expectedSlug}
    />
  );
}
