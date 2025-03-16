"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Calendar,
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  HelpCircle,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Plus,
  Settings,
  User,
  Search,
  PiggyBank,
  ArrowUpRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import DashboardWidget from "@/components/dashboard-widgets"
import TransactionsPage from "./transactions"
import AnalyticsPage from "./analytics"
import CalendarPage from "./calendar"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto shadow-md">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#003366] to-[#004488] flex items-center justify-center text-white font-bold mr-2">
              P
            </div>
            <h1 className="text-xl font-bold text-[#003366] dark:text-white">Pollen AI</h1>
          </div>

          <div className="px-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Sarah Johnson</p>
                  <div className="flex items-center">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[#003366]/10 text-[#003366] dark:bg-[#003366]/20 dark:text-blue-300"
                    >
                      Premium
                    </Badge>
                    <span className="ml-2 text-xs text-green-600 dark:text-green-400 flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 mb-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h2>
          </div>
          <div className="mt-1 flex-grow flex flex-col px-2 space-y-1">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "overview" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <PieChart className="mr-3 h-5 w-5" />
              Overview
            </Button>
            <Button
              variant={activeTab === "accounts" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "accounts" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
              onClick={() => setActiveTab("accounts")}
            >
              <CreditCard className="mr-3 h-5 w-5" />
              Accounts
            </Button>
            <Button
              variant={activeTab === "transactions" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "transactions" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
              onClick={() => setActiveTab("transactions")}
            >
              <DollarSign className="mr-3 h-5 w-5" />
              Transactions
            </Button>
            <Button
              variant={activeTab === "analytics" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "analytics" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <PieChart className="mr-3 h-5 w-5" />
              Analytics
            </Button>
          </div>

          <div className="px-4 mt-6 mb-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</h2>
          </div>
          <div className="px-2 space-y-1">
            <Button
              variant={activeTab === "calendar" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "calendar" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
              onClick={() => setActiveTab("calendar")}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Calendar
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === "messages" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""} relative`}
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Messages
              <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </Button>
          </div>

          <div className="px-2 mt-auto">
            <Separator className="my-4" />
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-3 h-5 w-5" />
              Help & Support
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center flex-shrink-0 px-4 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#003366] to-[#004488] flex items-center justify-center text-white font-bold mr-2">
                    P
                  </div>
                  <h1 className="text-xl font-bold text-[#003366] dark:text-white">Pollen AI</h1>
                </div>

                <div className="px-4 py-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Sarah Johnson</p>
                        <div className="flex items-center">
                          <Badge
                            variant="secondary"
                            className="text-xs bg-[#003366]/10 text-[#003366] dark:bg-[#003366]/20 dark:text-blue-300"
                          >
                            Premium
                          </Badge>
                          <span className="ml-2 text-xs text-green-600 dark:text-green-400 flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                            Online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 mb-2">
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h2>
                </div>
                <div className="flex-grow overflow-y-auto px-2 pt-1 space-y-1">
                  <Button
                    variant={activeTab === "overview" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "overview" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
                    onClick={() => {
                      setActiveTab("overview")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <PieChart className="mr-3 h-5 w-5" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === "accounts" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "accounts" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
                    onClick={() => {
                      setActiveTab("accounts")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <CreditCard className="mr-3 h-5 w-5" />
                    Accounts
                  </Button>
                  <Button
                    variant={activeTab === "transactions" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "transactions" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
                    onClick={() => {
                      setActiveTab("transactions")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <DollarSign className="mr-3 h-5 w-5" />
                    Transactions
                  </Button>
                  <Button
                    variant={activeTab === "analytics" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "analytics" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
                    onClick={() => {
                      setActiveTab("analytics")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <PieChart className="mr-3 h-5 w-5" />
                    Analytics
                  </Button>
                  <Button
                    variant={activeTab === "calendar" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "calendar" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""}`}
                    onClick={() => {
                      setActiveTab("calendar")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    Calendar
                  </Button>
                  <Button
                    variant={activeTab === "messages" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "messages" ? "bg-[#003366] hover:bg-[#002244] text-white" : ""} relative`}
                    onClick={() => {
                      setActiveTab("messages")
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <MessageSquare className="mr-3 h-5 w-5" />
                    Messages
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      3
                    </span>
                  </Button>
                </div>

                <div className="px-2 mt-auto">
                  <Separator className="my-4" />
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <HelpCircle className="mr-3 h-5 w-5" />
                    Help & Support
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Log Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#003366] to-[#004488] flex items-center justify-center text-white font-bold ml-2">
            P
          </div>
          <h1 className="text-xl font-bold text-[#003366] dark:text-white ml-2">Pollen AI</h1>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-1 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              5
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 flex-1">
        <main className="py-6 px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Top Header with Search and Actions */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search transactions, accounts..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#003366] dark:focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    5
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="bg-[#003366] hover:bg-[#002244]">
                      <Plus className="h-4 w-4 mr-2" />
                      Quick Actions
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Add Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DollarSign className="mr-2 h-4 w-4" />
                      <span>Transfer Money</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PiggyBank className="mr-2 h-4 w-4" />
                      <span>Create Savings Goal</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Contact Support</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="hidden">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="accounts">Accounts</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-0">
                {/* Welcome Card */}
                <Card className="mb-6 bg-gradient-to-r from-[#003366] to-[#004488] text-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">Welcome back, Sarah!</h2>
                        <p className="mt-1 text-white/80">Here's what's happening with your finances today.</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-white/70 text-sm">Total Balance</p>
                        <p className="text-2xl font-bold mt-1">$32,450.75</p>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="flex items-center text-green-300">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            4.2%
                          </span>
                          <span className="text-white/70 ml-2">vs last month</span>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-white/70 text-sm">Monthly Income</p>
                        <p className="text-2xl font-bold mt-1">$4,500.00</p>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="flex items-center text-green-300">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            2.8%
                          </span>
                          <span className="text-white/70 ml-2">vs last month</span>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-white/70 text-sm">Monthly Expenses</p>
                        <p className="text-2xl font-bold mt-1">$3,200.00</p>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="flex items-center text-red-300">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            1.5%
                          </span>
                          <span className="text-white/70 ml-2">vs last month</span>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-white/70 text-sm">Savings Rate</p>
                        <p className="text-2xl font-bold mt-1">28.9%</p>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="flex items-center text-green-300">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            1.5%
                          </span>
                          <span className="text-white/70 ml-2">vs last month</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <DashboardWidget type="account-summary" />
                  <DashboardWidget type="recent-transactions" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <DashboardWidget type="upcoming-payments" />
                  <DashboardWidget type="spending-insights" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DashboardWidget type="savings-goals" />
                  <DashboardWidget type="quick-actions" />
                </div>
              </TabsContent>

              {/* Accounts Tab */}
              <TabsContent value="accounts" className="mt-0">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accounts</h1>
                  <Button size="sm" className="bg-[#003366] hover:bg-[#002244]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Checking Account</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <CardDescription>Primary Account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-[#003366] dark:text-white">$8,250.45</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available Balance</span>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
                            Transfer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Savings Account</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <PiggyBank className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <CardDescription>Emergency Fund</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-[#003366] dark:text-white">$12,750.30</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available Balance</span>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
                            Transfer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Credit Card</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                      <CardDescription>Rewards Card</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">-$1,250.00</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Current Balance</span>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
                            Pay Balance
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Activity</CardTitle>
                      <CardDescription>Recent transactions across all accounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                          Account activity details will appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="mt-0">
                <TransactionsPage />
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-0">
                <AnalyticsPage />
              </TabsContent>

              {/* Calendar Tab */}
              <TabsContent value="calendar" className="mt-0">
                <CalendarPage />
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages" className="mt-0">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
                  <Button size="sm" className="bg-[#003366] hover:bg-[#002244]">
                    <Plus className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No messages yet</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
                        Your messages and notifications will appear here.
                      </p>
                      <Button>Start a Conversation</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

