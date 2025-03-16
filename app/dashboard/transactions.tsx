"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Search,
  Plus,
  CreditCard,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Tag,
  Upload,
  FileText,
  MoreHorizontal,
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Smartphone,
  Utensils,
  Briefcase,
  Repeat,
  AlertCircle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartGrid, ChartBar } from "@/components/ui/chart"

// Transaction category icons mapping
const categoryIcons = {
  Shopping: <ShoppingBag className="h-4 w-4" />,
  Food: <Utensils className="h-4 w-4" />,
  Coffee: <Coffee className="h-4 w-4" />,
  Housing: <Home className="h-4 w-4" />,
  Transportation: <Car className="h-4 w-4" />,
  Utilities: <Smartphone className="h-4 w-4" />,
  Salary: <Briefcase className="h-4 w-4" />,
  Transfer: <CreditCard className="h-4 w-4" />,
  Other: <DollarSign className="h-4 w-4" />,
}

// Transaction type
interface Transaction {
  id: number
  type: "income" | "expense"
  category: string
  description: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
  icon: React.ReactNode
  account: string
  tags?: string[]
  isRecurring?: boolean
  notes?: string
  attachments?: number
}

export default function TransactionsPage() {
  // State for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // UI states
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("list")
  const [showFilters, setShowFilters] = useState(false)

  // Load transaction data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTransactions: Transaction[] = [
        {
          id: 1,
          type: "expense",
          category: "Shopping",
          description: "Grocery Store",
          amount: 85.42,
          date: "2024-03-12",
          status: "completed",
          icon: categoryIcons["Shopping"],
          account: "Checking Account",
          tags: ["Food", "Essentials"],
        },
        {
          id: 2,
          type: "income",
          category: "Salary",
          description: "Monthly Salary",
          amount: 3200.0,
          date: "2024-03-10",
          status: "completed",
          icon: categoryIcons["Salary"],
          account: "Checking Account",
          isRecurring: true,
        },
        {
          id: 3,
          type: "expense",
          category: "Housing",
          description: "Rent Payment",
          amount: 1200.0,
          date: "2024-03-05",
          status: "completed",
          icon: categoryIcons["Housing"],
          account: "Checking Account",
          isRecurring: true,
          tags: ["Housing"],
        },
        {
          id: 4,
          type: "expense",
          category: "Food",
          description: "Restaurant",
          amount: 42.75,
          date: "2024-03-08",
          status: "completed",
          icon: categoryIcons["Food"],
          account: "Credit Card",
          tags: ["Dining Out"],
          attachments: 1,
        },
        {
          id: 5,
          type: "expense",
          category: "Transportation",
          description: "Uber Ride",
          amount: 18.5,
          date: "2024-03-11",
          status: "completed",
          icon: categoryIcons["Transportation"],
          account: "Credit Card",
        },
        {
          id: 6,
          type: "expense",
          category: "Coffee",
          description: "Starbucks",
          amount: 5.25,
          date: "2024-03-12",
          status: "pending",
          icon: categoryIcons["Coffee"],
          account: "Credit Card",
        },
        {
          id: 7,
          type: "income",
          category: "Transfer",
          description: "From Savings",
          amount: 500.0,
          date: "2024-03-09",
          status: "completed",
          icon: categoryIcons["Transfer"],
          account: "Checking Account",
        },
        {
          id: 8,
          type: "expense",
          category: "Utilities",
          description: "Electricity Bill",
          amount: 95.2,
          date: "2024-03-07",
          status: "completed",
          icon: categoryIcons["Utilities"],
          account: "Checking Account",
          isRecurring: true,
          tags: ["Utilities"],
        },
        {
          id: 9,
          type: "expense",
          category: "Shopping",
          description: "Amazon Purchase",
          amount: 67.99,
          date: "2024-03-06",
          status: "completed",
          icon: categoryIcons["Shopping"],
          account: "Credit Card",
          attachments: 2,
        },
        {
          id: 10,
          type: "expense",
          category: "Transportation",
          description: "Gas Station",
          amount: 45.3,
          date: "2024-03-04",
          status: "completed",
          icon: categoryIcons["Transportation"],
          account: "Credit Card",
          tags: ["Car"],
        },
        {
          id: 11,
          type: "expense",
          category: "Food",
          description: "Grocery Delivery",
          amount: 112.87,
          date: "2024-03-02",
          status: "completed",
          icon: categoryIcons["Shopping"],
          account: "Checking Account",
          tags: ["Food", "Essentials"],
        },
        {
          id: 12,
          type: "expense",
          category: "Utilities",
          description: "Internet Bill",
          amount: 79.99,
          date: "2024-03-01",
          status: "completed",
          icon: categoryIcons["Utilities"],
          account: "Checking Account",
          isRecurring: true,
          tags: ["Utilities"],
        },
      ]

      setTransactions(mockTransactions)
      setFilteredTransactions(mockTransactions)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Apply filters when any filter changes
  useEffect(() => {
    if (transactions.length === 0) return

    const filtered = transactions
      .filter((transaction) => {
        // Search filter
        const matchesSearch =
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.account.toLowerCase().includes(searchTerm.toLowerCase())

        // Category filter
        const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter

        // Type filter
        const matchesType = typeFilter === "all" || transaction.type === typeFilter

        // Account filter
        const matchesAccount = accountFilter === "all" || transaction.account === accountFilter

        // Date filter
        let matchesDate = true
        if (dateFilter !== "all") {
          const today = new Date()
          const transactionDate = new Date(transaction.date)
          const diffDays = Math.floor((today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24))

          switch (dateFilter) {
            case "today":
              matchesDate = diffDays === 0
              break
            case "yesterday":
              matchesDate = diffDays === 1
              break
            case "week":
              matchesDate = diffDays <= 7
              break
            case "month":
              matchesDate = diffDays <= 30
              break
            default:
              matchesDate = true
          }
        }

        return matchesSearch && matchesCategory && matchesType && matchesAccount && matchesDate
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      })

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, categoryFilter, typeFilter, dateFilter, accountFilter, sortOrder])

  // Toggle transaction expansion
  const toggleExpand = (id: number) => {
    setExpandedTransaction(expandedTransaction === id ? null : id)
  }

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  // Get unique categories and accounts for filters
  const categories = [...new Set(transactions.map((t) => t.category))]
  const accounts = [...new Set(transactions.map((t) => t.account))]

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Group transactions by date for timeline view
  const groupTransactionsByDate = () => {
    return filteredTransactions.reduce(
      (groups, transaction) => {
        const date = transaction.date
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(transaction)
        return groups
      },
      {} as Record<string, Transaction[]>,
    )
  }

  // Calculate spending by category for chart
  const getSpendingByCategory = () => {
    const categorySpending: Record<string, number> = {}

    filteredTransactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        if (!categorySpending[transaction.category]) {
          categorySpending[transaction.category] = 0
        }
        categorySpending[transaction.category] += transaction.amount
      }
    })

    return Object.entries(categorySpending).map(([category, amount]) => ({
      category,
      amount: amount || 0, // Ensure amount is never undefined
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setTypeFilter("all")
    setDateFilter("all")
    setAccountFilter("all")
    setSortOrder("desc")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003366] mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalIncome.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ArrowDownRight className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Net Balance</p>
                <p
                  className={`text-2xl font-bold ${balance >= 0 ? "text-[#003366] dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}
                >
                  ${balance.toFixed(2)}
                </p>
              </div>
              <div
                className={`h-12 w-12 rounded-full ${balance >= 0 ? "bg-blue-100 dark:bg-blue-900/30" : "bg-red-100 dark:bg-red-900/30"} flex items-center justify-center`}
              >
                <DollarSign
                  className={`h-6 w-6 ${balance >= 0 ? "text-[#003366] dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending by Category Chart */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>Breakdown of your expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer data={getSpendingByCategory()}>
              <Chart>
                <ChartBar dataKey="amount" target="category" className="fill-[#003366]" />
                <ChartGrid className="stroke-gray-200 dark:stroke-gray-700" />
                <ChartTooltip>
                  {({ dataPoint }) => (
                    <ChartTooltipContent>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium">
                          {dataPoint.category}: ${(dataPoint.amount || 0).toFixed(2)}
                        </span>
                      </div>
                    </ChartTooltipContent>
                  )}
                </ChartTooltip>
              </Chart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="border-none shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#003366] to-[#004488] text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl">Transaction History</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <DialogDescription>Enter the details of your transaction below.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Transaction form would go here */}
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">Transaction form placeholder</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Transaction</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <TabsList className="grid w-full sm:w-auto grid-cols-3 mb-4 sm:mb-0">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Type</label>
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Category</label>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                <div className="flex items-center">
                                  <span className="mr-2">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                                  <span>{category}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Account</label>
                        <Select value={accountFilter} onValueChange={setAccountFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Accounts" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Accounts</SelectItem>
                            {accounts.map((account) => (
                              <SelectItem key={account} value={account}>
                                {account}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Date Range</label>
                        <Select value={dateFilter} onValueChange={setDateFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="yesterday">Yesterday</SelectItem>
                            <SelectItem value="week">Last 7 Days</SelectItem>
                            <SelectItem value="month">Last 30 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Sort Order</label>
                        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sort Order" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="desc">Newest First</SelectItem>
                            <SelectItem value="asc">Oldest First</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" onClick={resetFilters} className="mr-2">
                        Reset Filters
                      </Button>
                      <Button size="sm" onClick={() => setShowFilters(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List View */}
            <TabsContent value="list" className="mt-0 space-y-4">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No transactions found</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Try adjusting your filters or search criteria to find what you're looking for.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTransactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div
                        className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        onClick={() => toggleExpand(transaction.id)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center mb-2 md:mb-0">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === "income"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                  : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              }`}
                            >
                              {transaction.type === "income" ? (
                                <ArrowDownRight className="h-5 w-5" />
                              ) : (
                                <ArrowUpRight className="h-5 w-5" />
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{transaction.description}</p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center mr-3">
                                  {transaction.icon}
                                  <span className="ml-1">{transaction.category}</span>
                                </span>
                                <span>{formatDate(transaction.date)}</span>
                                {transaction.isRecurring && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="ml-2">
                                          <Repeat className="h-3 w-3 text-blue-500" />
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Recurring Transaction</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.account}</p>
                              <p
                                className={`font-semibold ${
                                  transaction.type === "income"
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {transaction.type === "income" ? "+" : "-"}${(transaction.amount || 0).toFixed(2)}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`
                                ${
                                  transaction.status === "completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/30"
                                    : transaction.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/30"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/30"
                                }
                              `}
                            >
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-400 transition-transform ${
                                expandedTransaction === transaction.id ? "transform rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedTransaction === transaction.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Transaction ID</p>
                                  <p className="font-medium">#{transaction.id.toString().padStart(8, "0")}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Date & Time</p>
                                  <p className="font-medium">{new Date(transaction.date).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 dark:text-gray-400">Account</p>
                                  <p className="font-medium">{transaction.account}</p>
                                </div>
                              </div>

                              {transaction.tags && transaction.tags.length > 0 && (
                                <div className="mt-4">
                                  <p className="text-gray-500 dark:text-gray-400 mb-2">Tags</p>
                                  <div className="flex flex-wrap gap-2">
                                    {transaction.tags.map((tag) => (
                                      <Badge key={tag} variant="secondary" className="flex items-center">
                                        <Tag className="h-3 w-3 mr-1" />
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {transaction.notes && (
                                <div className="mt-4">
                                  <p className="text-gray-500 dark:text-gray-400 mb-1">Notes</p>
                                  <p className="text-sm">{transaction.notes}</p>
                                </div>
                              )}

                              {transaction.attachments && (
                                <div className="mt-4">
                                  <p className="text-gray-500 dark:text-gray-400 mb-2">Attachments</p>
                                  <Button variant="outline" size="sm" className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2" />
                                    View {transaction.attachments}{" "}
                                    {transaction.attachments === 1 ? "attachment" : "attachments"}
                                  </Button>
                                </div>
                              )}

                              <div className="mt-4 flex justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                  <Tag className="h-4 w-4 mr-2" />
                                  Edit Tags
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Add Receipt
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <MoreHorizontal className="h-4 w-4 mr-2" />
                                      More
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit Transaction</DropdownMenuItem>
                                    <DropdownMenuItem>Split Transaction</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate Transaction</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                      Delete Transaction
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Timeline View */}
            <TabsContent value="timeline" className="mt-0">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-8 pl-12">
                    <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
                  </div>
                ) : (
                  <div className="space-y-6 pl-12 relative">
                    {/* Group transactions by date */}
                    {Object.entries(groupTransactionsByDate()).map(([date, dateTransactions]) => (
                      <div key={date} className="mb-8">
                        <div className="absolute left-4 transform -translate-x-1/2 mt-1">
                          <div className="w-6 h-6 rounded-full bg-[#003366] dark:bg-[#004488] border-4 border-white dark:border-gray-900"></div>
                        </div>

                        <h3 className="text-lg font-semibold mb-4">
                          {new Date(date).toLocaleDateString(undefined, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </h3>

                        <div className="space-y-3">
                          {dateTransactions.map((transaction) => (
                            <motion.div
                              key={transaction.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      transaction.type === "income"
                                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                        : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {transaction.icon}
                                  </div>
                                  <div>
                                    <div className="flex items-center">
                                      <p className="font-medium">{transaction.description}</p>
                                      {transaction.isRecurring && <Repeat className="h-3 w-3 text-blue-500 ml-2" />}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                      <span>{transaction.category}</span>
                                      <span className="mx-2">•</span>
                                      <span>{transaction.account}</span>
                                    </div>
                                  </div>
                                </div>
                                <p
                                  className={`font-semibold ${
                                    transaction.type === "income"
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Analytics View */}
            <TabsContent value="analytics" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Spending by Category */}
                <Card>
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Breakdown of your expenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer data={getSpendingByCategory()}>
                        <Chart>
                          <ChartBar dataKey="amount" target="category" className="fill-[#003366]" />
                          <ChartGrid className="stroke-gray-200 dark:stroke-gray-700" />
                          <ChartTooltip>
                            {({ dataPoint }) => (
                              <ChartTooltipContent>
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs font-medium">
                                    {dataPoint.category}: ${dataPoint.amount.toFixed(2)}
                                  </span>
                                </div>
                              </ChartTooltipContent>
                            )}
                          </ChartTooltip>
                        </Chart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Income vs Expenses */}
                <Card>
                  <CardHeader>
                    <CardTitle>Income vs Expenses</CardTitle>
                    <CardDescription>Comparison of money in and out</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        data={[
                          { category: "Income", amount: totalIncome },
                          { category: "Expenses", amount: totalExpenses },
                        ]}
                      >
                        <Chart>
                          <ChartBar dataKey="amount" target="category" className="fill-[#003366]" />
                          <ChartGrid className="stroke-gray-200 dark:stroke-gray-700" />
                          <ChartTooltip>
                            {({ dataPoint }) => (
                              <ChartTooltipContent>
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs font-medium">
                                    {dataPoint.category}: ${dataPoint.amount.toFixed(2)}
                                  </span>
                                </div>
                              </ChartTooltipContent>
                            )}
                          </ChartTooltip>
                        </Chart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Insights</CardTitle>
                    <CardDescription>Key metrics and patterns from your transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Top Expense Category
                        </h3>
                        {getSpendingByCategory().length > 0 ? (
                          <>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                              {getSpendingByCategory().sort((a, b) => b.amount - a.amount)[0]?.category || "N/A"}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              $
                              {getSpendingByCategory()
                                .sort((a, b) => b.amount - a.amount)[0]
                                ?.amount.toFixed(2) || "0.00"}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">No data available</p>
                        )}
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Average Transaction
                        </h3>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          $
                          {filteredTransactions.length > 0
                            ? (
                                filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / filteredTransactions.length
                              ).toFixed(2)
                            : "0.00"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Based on {filteredTransactions.length} transactions
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Largest Expense</h3>
                        {filteredTransactions.filter((t) => t.type === "expense").length > 0 ? (
                          <>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                              $
                              {Math.max(
                                ...filteredTransactions.filter((t) => t.type === "expense").map((t) => t.amount),
                              ).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {filteredTransactions
                                .filter((t) => t.type === "expense")
                                .sort((a, b) => b.amount - a.amount)[0]?.description || "N/A"}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">No data available</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

