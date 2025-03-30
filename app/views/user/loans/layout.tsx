import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Loans & Financing",
  description: "Manage your loans and financing options",
}

interface LoansLayoutProps {
  children: React.ReactNode
}

export default function LoansLayout({ children }: LoansLayoutProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loans & Financing</h1>
          <p className="text-muted-foreground">Manage your loans, apply for new financing, and track your repayments</p>
        </div>

        <Tabs defaultValue="overview" className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="overview" asChild>
              <Link href="/loans">Overview</Link>
            </TabsTrigger>
            <TabsTrigger value="apply" asChild>
              <Link href="/loans/apply">Apply</Link>
            </TabsTrigger>
            <TabsTrigger value="kyc" asChild>
              <Link href="/loans/kyc">KYC</Link>
            </TabsTrigger>
            <TabsTrigger value="history" asChild>
              <Link href="/loans/history">History</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {children}
    </div>
  )
}

