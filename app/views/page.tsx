"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { WelcomeSection } from "@/components/dashboard/welcome-section"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { WalletOverview } from "@/components/dashboard/wallet-overview"
import { LoanSummary } from "@/components/dashboard/loan-summary"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { NotificationsWidget } from "@/components/dashboard/notifications-widget"
import { CreditScoreWidget } from "@/components/dashboard/credit-score-widget"
import { ServiceOverview } from "@/components/dashboard/service-overview"
import { TransactionChart } from "@/components/dashboard/transaction-chart"
import { MarketTrends } from "@/components/dashboard/market-trends"
import { PredictiveAnalytics } from "@/components/dashboard/predictive-analytics"
import { CommunityFeed } from "@/components/dashboard/community-feed"
import { DashboardCustomizer } from "@/components/dashboard/dashboard-customizer"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
import { useState } from "react"

export default function DashboardPage() {
  const [customizeMode, setCustomizeMode] = useState(false)

  return (
    <DashboardShell>
      <div className="flex justify-between items-center mb-4">
        <DashboardHeader heading="Dashboard" text="Welcome back to your crypto dashboard." />
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setCustomizeMode(!customizeMode)}>
          <Settings2 className="h-4 w-4" />
          {customizeMode ? "Save Layout" : "Customize Dashboard"}
        </Button>
      </div>

      {customizeMode ? (
        <DashboardCustomizer />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <WelcomeSection className="md:col-span-2" />
            <QuickActions className="md:col-span-2 lg:col-span-2" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <WalletOverview className="md:col-span-2 lg:col-span-3" />
            <LoanSummary className="md:col-span-2 lg:col-span-2" />
            <CreditScoreWidget className="md:col-span-2 lg:col-span-2" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <TransactionChart className="md:col-span-2 lg:col-span-4" />
            <MarketTrends className="md:col-span-2 lg:col-span-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <PredictiveAnalytics className="md:col-span-2 lg:col-span-4" />
            <ServiceOverview className="md:col-span-2 lg:col-span-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <ActivityFeed />
            <div className="grid gap-4">
              <NotificationsWidget />
              <CommunityFeed />
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  )
}

