import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SettingsProvider } from "@/contexts/settings-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pollen AI - Empowering Financial Inclusion",
  description:
    "Pollen AI combines artificial intelligence and blockchain technology to create innovative financial solutions for underserved communities.",
    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en"  className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <SettingsProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SettingsProvider>
      </body>
    </html>
  )
}



import './globals.css'