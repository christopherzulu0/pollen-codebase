"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Copy,
  QrCode,
  RefreshCw,
  Search,
  Filter,
  Shield,
  Fingerprint,
  Repeat,
  Clock,
  Download,
  BarChart4,
  Image,
  Layers,
  AlertCircle,
  ChevronDown,
  Info,
  Plus,
  CalendarIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"
import { useTheme } from "next-themes"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

export default function WalletPage() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [refreshing, setRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [transactionType, setTransactionType] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showQrCode, setShowQrCode] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [swapFrom, setSwapFrom] = useState("BTC")
  const [swapTo, setSwapTo] = useState("USDT")
  const [swapAmount, setSwapAmount] = useState("0.01")

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The address has been copied to your clipboard.",
      duration: 3000,
    })
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
    toast({
      title: "Refreshed",
      description: "Your wallet data has been updated.",
      duration: 3000,
    })
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your transaction history is being exported.",
      duration: 3000,
    })
  }

  const wallets = [
    {
      id: 1,
      name: "Kwacha",
      symbol: "ZMW",
      balance: 12345.67,
      address: "1234567890",
      bank: "Zambia National Bank",
      change: "+3.5%",
      color: "bg-green-500",
    },
    {
      id: 2,
      name: "Bitcoin",
      symbol: "BTC",
      balance: 0.025,
      usdValue: 1250,
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      network: "Bitcoin Network",
      change: "+5.7%",
      color: "bg-orange-500",
    },
    {
      id: 3,
      name: "Ethereum",
      symbol: "ETH",
      balance: 0.75,
      usdValue: 1875,
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      network: "Ethereum Network",
      change: "+3.1%",
      color: "bg-blue-500",
    },
    {
      id: 4,
      name: "Tether",
      symbol: "USDT",
      balance: 2500,
      usdValue: 2500,
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      network: "Ethereum Network",
      change: "+0.1%",
      color: "bg-green-500",
    },
    {
      id: 5,
      name: "Celo",
      symbol: "CELO",
      balance: 75.5,
      usdValue: 150.25,
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      network: "Celo Network",
      change: "-1.2%",
      color: "bg-purple-500",
    },
  ]

  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 2500,
      currency: "ZMW",
      date: "2023-07-15",
      time: "14:30:25",
      status: "completed",
      from: "Mobile Money",
      to: "Kwacha Wallet",
      fee: 25,
      hash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 1000,
      currency: "ZMW",
      date: "2023-07-10",
      time: "09:15:10",
      status: "completed",
      from: "Kwacha Wallet",
      to: "Bank Account",
      fee: 10,
      hash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      id: 3,
      type: "swap",
      amount: 0.01,
      currency: "BTC",
      date: "2023-07-08",
      time: "16:45:30",
      status: "completed",
      from: "BTC Wallet",
      to: "ETH Wallet",
      fee: 0.0005,
      hash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      id: 4,
      type: "deposit",
      amount: 0.5,
      currency: "ETH",
      date: "2023-07-05",
      time: "11:20:15",
      status: "completed",
      from: "External Wallet",
      to: "ETH Wallet",
      fee: 0.001,
      hash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      id: 5,
      type: "withdrawal",
      amount: 500,
      currency: "USDT",
      date: "2023-07-01",
      time: "08:30:45",
      status: "pending",
      from: "USDT Wallet",
      to: "External Wallet",
      fee: 5,
      hash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    // Apply type filter
    if (transactionType && transaction.type !== transactionType) return false

    // Apply search query
    if (
      searchQuery &&
      !`${transaction.amount} ${transaction.currency} ${transaction.from} ${transaction.to}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  const nfts = [
    {
      id: 1,
      name: "Crypto Punk #1234",
      collection: "CryptoPunks",
      image: "/placeholder.svg?height=300&width=300",
      value: 5.5,
      currency: "ETH",
    },
    {
      id: 2,
      name: "Bored Ape #5678",
      collection: "BAYC",
      image: "/placeholder.svg?height=300&width=300",
      value: 12.3,
      currency: "ETH",
    },
    {
      id: 3,
      name: "Azuki #9012",
      collection: "Azuki",
      image: "/placeholder.svg?height=300&width=300",
      value: 3.2,
      currency: "ETH",
    },
  ]

  const priceData = {
    BTC: [
      { date: "2023-01", price: 16500 },
      { date: "2023-02", price: 22000 },
      { date: "2023-03", price: 28000 },
      { date: "2023-04", price: 30000 },
      { date: "2023-05", price: 27000 },
      { date: "2023-06", price: 31000 },
      { date: "2023-07", price: 29500 },
      { date: "2023-08", price: 28000 },
      { date: "2023-09", price: 26500 },
      { date: "2023-10", price: 34000 },
      { date: "2023-11", price: 37000 },
      { date: "2023-12", price: 42000 },
    ],
    ETH: [
      { date: "2023-01", price: 1200 },
      { date: "2023-02", price: 1600 },
      { date: "2023-03", price: 1800 },
      { date: "2023-04", price: 2000 },
      { date: "2023-05", price: 1900 },
      { date: "2023-06", price: 1950 },
      { date: "2023-07", price: 1850 },
      { date: "2023-08", price: 1700 },
      { date: "2023-09", price: 1650 },
      { date: "2023-10", price: 1800 },
      { date: "2023-11", price: 2100 },
      { date: "2023-12", price: 2500 },
    ],
    USDT: [
      { date: "2023-01", price: 1.0 },
      { date: "2023-02", price: 1.0 },
      { date: "2023-03", price: 1.0 },
      { date: "2023-04", price: 1.0 },
      { date: "2023-05", price: 1.0 },
      { date: "2023-06", price: 1.0 },
      { date: "2023-07", price: 1.0 },
      { date: "2023-08", price: 1.0 },
      { date: "2023-09", price: 1.0 },
      { date: "2023-10", price: 1.0 },
      { date: "2023-11", price: 1.0 },
      { date: "2023-12", price: 1.0 },
    ],
    CELO: [
      { date: "2023-01", price: 0.6 },
      { date: "2023-02", price: 0.75 },
      { date: "2023-03", price: 0.9 },
      { date: "2023-04", price: 1.1 },
      { date: "2023-05", price: 0.95 },
      { date: "2023-06", price: 0.85 },
      { date: "2023-07", price: 0.8 },
      { date: "2023-08", price: 0.7 },
      { date: "2023-09", price: 0.65 },
      { date: "2023-10", price: 0.9 },
      { date: "2023-11", price: 1.2 },
      { date: "2023-12", price: 1.98 },
    ],
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-background p-2 shadow-md">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownToLine className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpFromLine className="h-4 w-4 text-amber-500" />
      case "swap":
        return <Repeat className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Wallet" text="Manage your crypto and fiat balances" />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="swap">Swap</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Wallets</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Wallet
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wallets.map((wallet) => (
              <motion.div
                key={wallet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="overflow-hidden border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-primary/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">{wallet.name}</CardTitle>
                      <Badge variant="outline" className={cn("bg-opacity-10", wallet.color)}>
                        {wallet.symbol}
                      </Badge>
                    </div>
                    <CardDescription>{wallet.symbol === "ZMW" ? "Fiat Currency" : "Cryptocurrency"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-2xl font-bold">
                        {wallet.symbol === "ZMW"
                          ? `K ${wallet.balance.toLocaleString()}`
                          : `${wallet.balance} ${wallet.symbol}`}
                      </div>
                      <div className={cn("text-xs", wallet.change.startsWith("+") ? "text-green-500" : "text-red-500")}>
                        {wallet.change}
                      </div>
                    </div>

                    {wallet.symbol !== "ZMW" && (
                      <div className="text-sm text-muted-foreground mb-4">
                        ≈ ${wallet.usdValue.toLocaleString()} USD
                      </div>
                    )}

                    <div className="rounded-lg border border-border/50 p-2 bg-background/50 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          {wallet.symbol === "ZMW" ? "Account Number" : "Address"}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="truncate max-w-[120px]">{wallet.address}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopy(wallet.address)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-muted-foreground">{wallet.symbol === "ZMW" ? "Bank" : "Network"}</span>
                        <span>{wallet.symbol === "ZMW" ? wallet.bank : wallet.network}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm" className="w-[48%]">
                      <ArrowDownToLine className="mr-2 h-3 w-3" />
                      Deposit
                    </Button>
                    <Button variant="outline" size="sm" className="w-[48%]">
                      <ArrowUpFromLine className="mr-2 h-3 w-3" />
                      Withdraw
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Price Charts</CardTitle>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select crypto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">Bitcoin</SelectItem>
                      <SelectItem value="ETH">Ethereum</SelectItem>
                      <SelectItem value="USDT">Tether</SelectItem>
                      <SelectItem value="CELO">Celo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>Historical price data for {selectedCrypto}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceData[selectedCrypto]}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        stroke={theme === "dark" ? "#888888" : "#333333"}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke={theme === "dark" ? "#888888" : "#333333"}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#priceGradient)"
                        strokeWidth={2}
                        name={selectedCrypto}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Security Center</CardTitle>
                <CardDescription>Protect your crypto assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">2FA Authentication</span>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Biometric Verification</span>
                    </div>
                    <Switch checked={false} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Withdrawal Delay</span>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>

                <Separator />

                <div className="rounded-lg border border-border/50 p-3 bg-background/50">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Security Tip</p>
                      <p className="text-xs text-muted-foreground">
                        Never share your private keys or seed phrases with anyone. Store them in a secure, offline
                        location.
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deposit" className="space-y-4">
          <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Deposit Funds</CardTitle>
              <CardDescription>Add funds to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Wallet</Label>
                <Select defaultValue="BTC">
                  <SelectTrigger>
                    <SelectValue placeholder="Select wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ZMW">Kwacha (ZMW)</SelectItem>
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    <SelectItem value="USDT">Tether (USDT)</SelectItem>
                    <SelectItem value="CELO">Celo (CELO)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border/50 p-4 bg-background/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Deposit Address</h3>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowQrCode(true)}>
                    <QrCode className="h-4 w-4" />
                    Show QR Code
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Address</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopy("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Network</span>
                    <span className="text-sm">Bitcoin Network</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div className="text-xs text-muted-foreground">
                      Only send Bitcoin (BTC) to this address. Sending any other cryptocurrency may result in permanent
                      loss.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Deposit Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col gap-2 justify-center">
                    <ArrowDownToLine className="h-6 w-6" />
                    <span>Crypto Transfer</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2 justify-center">
                    <ArrowDownToLine className="h-6 w-6" />
                    <span>Mobile Money</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col gap-2 justify-center">
                    <ArrowDownToLine className="h-6 w-6" />
                    <span>Bank Transfer</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Confirm Deposit</Button>
            </CardFooter>
          </Card>

          <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Bitcoin Deposit Address</DialogTitle>
                <DialogDescription>Scan this QR code to deposit Bitcoin to your wallet</DialogDescription>
              </DialogHeader>
              <div className="flex justify-center p-4">
                <div className="w-64 h-64 bg-white p-4 rounded-lg flex items-center justify-center">
                  <div className="w-56 h-56 bg-muted flex items-center justify-center">
                    <QrCode className="w-40 h-40" />
                  </div>
                </div>
              </div>
              <div className="text-center text-sm">
                <p className="font-medium">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                <p className="text-muted-foreground mt-1">Bitcoin Network</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => handleCopy("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Address
                </Button>
                <Button onClick={() => setShowQrCode(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4">
          <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>Withdraw funds from your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Select Wallet</Label>
                  <Select defaultValue="BTC">
                    <SelectTrigger>
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ZMW">Kwacha (ZMW)</SelectItem>
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                      <SelectItem value="USDT">Tether (USDT)</SelectItem>
                      <SelectItem value="CELO">Celo (CELO)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Available Balance</Label>
                  <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
                    0.025 BTC (≈ $1,250.00)
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Withdrawal Amount</Label>
                <div className="flex">
                  <Input type="number" placeholder="0.00" />
                  <div className="flex items-center justify-center h-10 px-3 border border-l-0 rounded-r-md bg-muted">
                    BTC
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Minimum withdrawal: 0.001 BTC</div>
              </div>

              <div className="space-y-2">
                <Label>Recipient Address</Label>
                <Input placeholder="Enter BTC address" />
              </div>

              <div className="space-y-2">
                <Label>Network</Label>
                <Select defaultValue="bitcoin">
                  <SelectTrigger>
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bitcoin">Bitcoin Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-border/50 p-3 bg-background/50">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Amount</span>
                    <span className="text-sm font-medium">0.01 BTC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Network Fee</span>
                    <span className="text-sm font-medium">0.0001 BTC</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-sm font-medium">0.0101 BTC</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  Withdrawals are subject to security verification and may take up to 24 hours to process.
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm">2FA Verification Required</span>
                </div>
                <Button variant="outline" size="sm">
                  Send Code
                </Button>
              </div>
              <Button className="w-full">Withdraw Funds</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="swap" className="space-y-4">
          <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Swap Crypto</CardTitle>
              <CardDescription>Exchange between different cryptocurrencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>From</Label>
                <div className="flex">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                  />
                  <Select value={swapFrom} onValueChange={setSwapFrom}>
                    <SelectTrigger className="w-[120px] rounded-l-none border-l-0">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="CELO">CELO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-muted-foreground">Available: 0.025 BTC</div>
              </div>

              <div className="flex justify-center">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Repeat className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <div className="flex">
                  <Input type="number" placeholder="0.00" value="0.15" readOnly />
                  <Select value={swapTo} onValueChange={setSwapTo}>
                    <SelectTrigger className="w-[120px] rounded-l-none border-l-0">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="CELO">CELO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-lg border border-border/50 p-3 bg-background/50">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Exchange Rate</span>
                    <span className="text-sm font-medium">1 BTC = 15 ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Network Fee</span>
                    <span className="text-sm font-medium">0.0005 BTC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Slippage Tolerance</span>
                    <span className="text-sm font-medium">0.5%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Minimum Received</span>
                    <span className="text-sm font-medium">0.14925 ETH</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  Swap quotes are provided by decentralized exchanges and are subject to change based on market
                  conditions.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Swap Tokens</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View your recent transactions</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-4 space-y-3">
                      <Input
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-sm"
                      />
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant={transactionType === null ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setTransactionType(null)}
                        >
                          All
                        </Badge>
                        <Badge
                          variant={transactionType === "deposit" ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setTransactionType("deposit")}
                        >
                          Deposits
                        </Badge>
                        <Badge
                          variant={transactionType === "withdrawal" ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setTransactionType("withdrawal")}
                        >
                          Withdrawals
                        </Badge>
                        <Badge
                          variant={transactionType === "swap" ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setTransactionType("swap")}
                        >
                          Swaps
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1 text-xs">
                              <CalendarIcon className="h-3 w-3" />
                              {date ? format(date, "PPP") : "Pick a date"}
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <Button variant="outline" size="sm" className="text-xs">
                          Apply Filters
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Reset
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-lg border border-border/50 p-3 bg-background/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-muted">{getTypeIcon(transaction.type)}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium capitalize">{transaction.type}</p>
                              {getStatusBadge(transaction.status)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {transaction.date} at {transaction.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              transaction.type === "deposit"
                                ? "text-green-500"
                                : transaction.type === "withdrawal"
                                  ? "text-amber-500"
                                  : "text-blue-500",
                            )}
                          >
                            {transaction.type === "deposit" ? "+" : transaction.type === "withdrawal" ? "-" : ""}
                            {transaction.amount} {transaction.currency}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Fee: {transaction.fee} {transaction.currency}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">From: </span>
                          <span>{transaction.from}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">To: </span>
                          <span>{transaction.to}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span className="truncate max-w-[150px]">{transaction.hash}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => handleCopy(transaction.hash)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No transactions match your filters</div>
                )}

                <Button variant="outline" size="sm" className="w-full">
                  Load More
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nfts" className="space-y-4">
          <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>NFT Gallery</CardTitle>
              <CardDescription>View and manage your NFT collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map((nft) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-border/50 transition-all duration-300 hover:shadow-md hover:border-primary/50">
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white/50 bg-black/30 backdrop-blur-sm w-full"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm">{nft.name}</h3>
                            <p className="text-xs text-muted-foreground">{nft.collection}</p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10">
                            {nft.value} {nft.currency}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                <Card className="overflow-hidden border-border/50 border-dashed">
                  <div className="aspect-square flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-center">Import NFTs</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1 mb-4">
                      Connect your wallet or enter contract details
                    </p>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Import NFT
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="mt-6 rounded-lg border border-border/50 p-4 bg-background/50">
                <div className="flex items-start gap-3">
                  <Layers className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">NFT Portfolio Value</h3>
                    <p className="text-2xl font-bold mt-1">21.0 ETH</p>
                    <p className="text-xs text-muted-foreground">≈ $52,500 USD</p>

                    <div className="mt-4 flex items-center gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <BarChart4 className="mr-2 h-3 w-3" />
                        View Analytics
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Download className="mr-2 h-3 w-3" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

