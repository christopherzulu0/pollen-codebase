"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  ChevronUp,
  Plus,
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
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartArea,
  ChartLine,
  ChartGrid,
  ChartBar,
} from "@/components/ui/chart"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [showInsights, setShowInsights] = useState(true)

  // Load analytics data
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call with a shorter timeout for better user experience
    const timer = setTimeout(() => {
      const mockData = {
        overview: {
          totalIncome: 4500,
          totalExpenses: 3200,
          netSavings: 1300,
          savingsRate: 28.9,
          monthlyComparison: {
            income: 5.2,
            expenses: 3.8,
            savings: 8.7,
          },
          financialHealthScore: 82,
        },
        spending: {
          byCategory: [
            { category: "Housing", amount: 1200 },
            { category: "Food", amount: 650 },
            { category: "Transportation", amount: 350 },
            { category: "Utilities", amount: 280 },
            { category: "Entertainment", amount: 220 },
            { category: "Shopping", amount: 180 },
            { category: "Healthcare", amount: 150 },
            { category: "Other", amount: 170 },
          ],
          trend: [
            { month: "Jan", amount: 3050 },
            { month: "Feb", amount: 3100 },
            { month: "Mar", amount: 3200 },
            { month: "Apr", amount: 3150 },
            { month: "May", amount: 3250 },
            { month: "Jun", amount: 3300 },
          ],
        },
        income: {
          sources: [
            { source: "Salary", amount: 4000 },
            { source: "Freelance", amount: 350 },
            { source: "Investments", amount: 150 },
          ],
          trend: [
            { month: "Jan", amount: 4200 },
            { month: "Feb", amount: 4200 },
            { month: "Mar", amount: 4500 },
            { month: "Apr", amount: 4300 },
            { month: "May", amount: 4400 },
            { month: "Jun", amount: 4500 },
          ],
        },
        savings: {
          accounts: [
            { name: "Emergency Fund", amount: 8500, target: 15000 },
            { name: "Vacation Fund", amount: 2500, target: 5000 },
            { name: "Retirement", amount: 21450, target: 1000000 },
          ],
          trend: [
            { month: "Jan", amount: 30200 },
            { month: "Feb", amount: 31100 },
            { month: "Mar", amount: 32450 },
            { month: "Apr", amount: 33800 },
            { month: "May", amount: 35200 },
            { month: "Jun", amount: 36700 },
          ],
        },
        budget: {
          categories: [
            { category: "Housing", budgeted: 1200, actual: 1200, status: "on-track" },
            { category: "Food", budgeted: 600, actual: 650, status: "over-budget" },
            { category: "Transportation", budgeted: 400, actual: 350, status: "under-budget" },
            { category: "Utilities", budgeted: 300, actual: 280, status: "under-budget" },
            { category: "Entertainment", budgeted: 200, actual: 220, status: "over-budget" },
            { category: "Shopping", budgeted: 150, actual: 180, status: "over-budget" },
            { category: "Healthcare", budgeted: 150, actual: 150, status: "on-track" },
            { category: "Other", budgeted: 200, actual: 170, status: "under-budget" },
          ],
          summary: {
            totalBudgeted: 3200,
            totalActual: 3200,
            status: "on-track",
          },
        },
        insights: [
          {
            id: 1,
            type: "alert",
            title: "Over Budget in Food",
            description: "You've spent $50 (8.3%) more than budgeted on Food this month.",
            action: "Review Budget",
            severity: "medium",
          },
          {
            id: 2,
            type: "achievement",
            title: "Savings Goal Progress",
            description: "You're 56% of the way to your Emergency Fund goal. Keep it up!",
            action: "View Goals",
            severity: "low",
          },
          {
            id: 3,
            type: "tip",
            title: "Reduce Entertainment Spending",
            description: "You could save $20 more per month by reducing your Entertainment budget.",
            action: "See How",
            severity: "low",
          },
          {
            id: 4,
            type: "opportunity",
            title: "Increase Retirement Contributions",
            description: "Increasing your retirement contributions by 1% could result in $45,000 more at retirement.",
            action: "Learn More",
            severity: "medium",
          },
        ],
        predictions: {
          nextMonthExpenses: 3250,
          savingsProjection: 1250,
          yearEndSavings: 15600,
          financialGoals: {
            emergencyFund: {
              currentAmount: 8500,
              targetAmount: 15000,
              projectedCompletion: "2024-11-15",
              monthsRemaining: 8,
            },
            vacationFund: {
              currentAmount: 2500,
              targetAmount: 5000,
              projectedCompletion: "2024-09-20",
              monthsRemaining: 6,
            },
          },
        },
      }

      setAnalyticsData(mockData)
      setIsLoading(false)
    }, 800) // Reduced timeout for better user experience

    return () => clearTimeout(timer)
  }, [timeRange])

  // Handle time range change
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
  }

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate API refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get insight icon
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "opportunity":
        return <Zap className="h-5 w-5 text-blue-500" />
      case "achievement":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "tip":
        return <TrendingUp className="h-5 w-5 text-purple-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  // Get insight background
  const getInsightBg = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-amber-500/10 border-amber-500/20"
      case "opportunity":
        return "bg-blue-500/10 border-blue-500/20"
      case "achievement":
        return "bg-green-500/10 border-green-500/20"
      case "tip":
        return "bg-purple-500/10 border-purple-500/20"
      default:
        return "bg-gray-500/10 border-gray-500/20"
    }
  }

  // Get budget status color
  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-green-600 dark:text-green-400"
      case "over-budget":
        return "text-red-600 dark:text-red-400"
      case "under-budget":
        return "text-blue-600 dark:text-blue-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  // Get budget status icon
  const getBudgetStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "over-budget":
        return <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
      case "under-budget":
        return <TrendingDown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      default:
        return null
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003366] mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (!analyticsData) {
    return (
      <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Unable to load analytics</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
          There was a problem loading your financial analytics. Please try again later.
        </p>
        <Button onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Detailed insights into your financial health</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Schedule Reports</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Financial Health Score */}
      <Card className="bg-gradient-to-r from-[#003366] to-[#004488] text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Financial Health Score</h2>
              <p className="text-white/80 mb-4">Your overall financial wellness assessment</p>

              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="white"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * analyticsData.overview.financialHealthScore) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{analyticsData.overview.financialHealthScore}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg">Excellent</h3>
                  <p className="text-white/80 text-sm">Your financial health is in great shape!</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/70 text-sm">Savings Rate</p>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold">{analyticsData.overview.savingsRate}%</span>
                    <Badge className="ml-2 bg-green-500/20 text-green-100 border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {analyticsData.overview.monthlyComparison.savings}%
                    </Badge>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/70 text-sm">Monthly Income</p>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold">${analyticsData.overview.totalIncome}</span>
                    <Badge className="ml-2 bg-green-500/20 text-green-100 border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {analyticsData.overview.monthlyComparison.income}%
                    </Badge>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/70 text-sm">Monthly Expenses</p>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold">${analyticsData.overview.totalExpenses}</span>
                    <Badge className="ml-2 bg-red-500/20 text-red-100 border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {analyticsData.overview.monthlyComparison.expenses}%
                    </Badge>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/70 text-sm">Net Savings</p>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold">${analyticsData.overview.netSavings}</span>
                    <Badge className="ml-2 bg-green-500/20 text-green-100 border-0">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {analyticsData.overview.monthlyComparison.savings}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Insights */}
      {showInsights && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Financial Insights</CardTitle>
                <CardDescription>Personalized recommendations based on your financial activity</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowInsights(false)}>
                <ChevronUp className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analyticsData.insights.map((insight: any) => (
                  <div key={insight.id} className={`p-4 rounded-lg border ${getInsightBg(insight.type)}`}>
                    <div className="flex">
                      <div className="flex-shrink-0 mt-0.5">{getInsightIcon(insight.type)}</div>
                      <div className="ml-3 flex-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{insight.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge
                            variant="outline"
                            className={`
                              ${
                                insight.severity === "high"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/30"
                                  : insight.severity === "medium"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/30"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/30"
                              }
                            `}
                          >
                            {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)} Priority
                          </Badge>
                          <Button variant="link" className="p-0 h-auto text-sm text-[#003366] dark:text-blue-400">
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="spending" className="flex items-center">
            <PieChart className="h-4 w-4 mr-2" />
            Spending
          </TabsTrigger>
          <TabsTrigger value="income" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Income
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Budget
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Comparison of money in and out</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    data={[
                      { category: "Income", amount: analyticsData?.overview?.totalIncome || 0 },
                      { category: "Expenses", amount: analyticsData?.overview?.totalExpenses || 0 },
                      { category: "Savings", amount: analyticsData?.overview?.netSavings || 0 },
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
                                {dataPoint.category}: ${dataPoint.amount || 0}
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

            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Where your money is going</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer data={analyticsData?.spending?.byCategory || []}>
                    <Chart>
                      <ChartBar dataKey="amount" target="category" className="fill-[#003366]" />
                      <ChartGrid className="stroke-gray-200 dark:stroke-gray-700" />
                      <ChartTooltip>
                        {({ dataPoint }) => (
                          <ChartTooltipContent>
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-medium">
                                {dataPoint.category}: ${dataPoint.amount || 0}
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

          <Card>
            <CardHeader>
              <CardTitle>Financial Predictions</CardTitle>
              <CardDescription>Projected financial outcomes based on your current habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Next Month Expenses</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${analyticsData.predictions.nextMonthExpenses}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Projected</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Next Month Savings</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${analyticsData.predictions.savingsProjection}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Projected</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Year-End Savings</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${analyticsData.predictions.yearEndSavings}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Projected total</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Emergency Fund Goal</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.predictions.financialGoals.emergencyFund.monthsRemaining} months
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Until completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spending Tab */}
        <TabsContent value="spending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>How your spending has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer data={analyticsData?.spending?.trend || []}>
                  <Chart>
                    <ChartLine dataKey="amount" className="stroke-[#003366] stroke-2" />
                    <ChartArea dataKey="amount" className="fill-[#003366]/20" />
                    <ChartGrid className="stroke-gray-200 dark:stroke-gray-700" />
                    <ChartTooltip>
                      {({ dataPoint }) => (
                        <ChartTooltipContent>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium">
                              {dataPoint.month}: ${dataPoint.amount || 0}
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

          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Detailed breakdown of your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analyticsData.spending.byCategory.map((category: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#003366] mr-2"></div>
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <span className="font-medium">${category.amount}</span>
                    </div>
                    <Progress value={(category.amount / analyticsData.overview.totalExpenses) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {((category.amount / analyticsData.overview.totalExpenses) * 100).toFixed(1)}% of total
                      </span>
                      <span>${category.amount} spent</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Income Tab */}
        <TabsContent value="income" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Trends</CardTitle>
              <CardDescription>How your income has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer data={analyticsData?.income?.trend || []}>
                  <Chart>
                    <ChartLine dataKey="amount" className="stroke-green-500 stroke-2" />
                    <ChartArea dataKey="amount" className="fill-green-500/20" />
                    <ChartGrid className="stroke-gray-200 dark:stroke-gray-700" />
                    <ChartTooltip>
                      {({ dataPoint }) => (
                        <ChartTooltipContent>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium">
                              {dataPoint.month}: ${dataPoint.amount || 0}
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

          <Card>
            <CardHeader>
              <CardTitle>Income Sources</CardTitle>
              <CardDescription>Breakdown of your income streams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analyticsData.income.sources.map((source: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <span className="font-medium">${source.amount}</span>
                    </div>
                    <Progress
                      value={(source.amount / analyticsData.overview.totalIncome) * 100}
                      className="h-2"
                      indicatorClassName="bg-green-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{((source.amount / analyticsData.overview.totalIncome) * 100).toFixed(1)}% of total</span>
                      <span>${source.amount} earned</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Budget Summary</CardTitle>
                <CardDescription>How you're tracking against your budget</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adjust Budget
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Budgeted</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${analyticsData.budget.summary.totalBudgeted}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monthly budget</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Spent</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${analyticsData.budget.summary.totalActual}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This month</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Budget Status</h3>
                  <div className="flex items-center">
                    <p className={`text-xl font-bold ${getBudgetStatusColor(analyticsData.budget.summary.status)}`}>
                      {analyticsData.budget.summary.status === "on-track"
                        ? "On Track"
                        : analyticsData.budget.summary.status === "over-budget"
                          ? "Over Budget"
                          : "Under Budget"}
                    </p>
                    <div className="ml-2">{getBudgetStatusIcon(analyticsData.budget.summary.status)}</div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Overall status</p>
                </div>
              </div>

              <div className="space-y-6">
                {analyticsData.budget.categories.map((category: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            category.status === "on-track"
                              ? "bg-green-500"
                              : category.status === "over-budget"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          } mr-2`}
                        ></div>
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm ${getBudgetStatusColor(category.status)}`}>
                          ${category.actual} / ${category.budgeted}
                        </span>
                        <div className="ml-2">{getBudgetStatusIcon(category.status)}</div>
                      </div>
                    </div>
                    <Progress
                      value={(category.actual / category.budgeted) * 100}
                      className="h-2"
                      indicatorClassName={`${
                        category.status === "on-track"
                          ? "bg-green-500"
                          : category.status === "over-budget"
                            ? "bg-red-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {category.status === "on-track"
                          ? "On Track"
                          : category.status === "over-budget"
                            ? `${(((category.actual - category.budgeted) / category.budgeted) * 100).toFixed(1)}% over budget`
                            : `${(((category.budgeted - category.actual) / category.budgeted) * 100).toFixed(1)}% under budget`}
                      </span>
                      <span>
                        ${Math.abs(category.actual - category.budgeted)}{" "}
                        {category.actual > category.budgeted ? "over" : "under"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

