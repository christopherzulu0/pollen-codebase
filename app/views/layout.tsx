import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeWrapper } from "@/components/theme-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "UserDashboard",
  description: "Pollen user dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased", inter.className)} suppressHydrationWarning>
      <ThemeWrapper>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
              <MainNav />
              <div className="flex items-center gap-4">
                <ModeToggle />
                <UserNav />
              </div>
            </div>
          </header>
          <div className="flex-1">
            <div className="container py-6">
              <main>{children}</main>
            </div>
          </div>
          {/* <SiteFooter /> */}
        </div>
        <Toaster />
      </ThemeWrapper>
    </div>
  )
}



