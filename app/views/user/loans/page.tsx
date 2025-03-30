"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  CreditCard,
  Download,
  FileText,
  HelpCircle,
  Home,
  Info,
  Landmark,
  PiggyBank,
  Plus,
  RefreshCw,
  Shield,
  Tractor,
  TrendingUp,
  Upload,
  Bell,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample loan data
const loans = [
  {
    id: 1,
    type: "Personal Loan",
    description: "Short-term personal loan",
    amount: 10000,
    remaining: 5000,
    nextPayment: 1200,
    nextPaymentDate: "15 Aug",
    interestRate: 12,
    progress: 50,
    status: "active",
    startDate: "10 Feb 2023",
    endDate: "10 Feb 2024",
    paymentHistory: [
      { month: "Feb", amount: 1200, onTime: true },
      { month: "Mar", amount: 1200, onTime: true },
      { month: "Apr", amount: 1200, onTime: true },
      { month: "May", amount: 1200, onTime: true },
      { month: "Jun", amount: 1200, onTime: false },
      { month: "Jul", amount: 1200, onTime: true },
    ],
  },
  {
    id: 2,
    type: "Village Banking Loan",
    description: "Group savings and loan program",
    amount: 5000,
    remaining: 2500,
    nextPayment: 600,
    nextPaymentDate: "22 Aug",
    interestRate: 8,
    progress: 50,
    status: "active",
    startDate: "15 Mar 2023",
    endDate: "15 Mar 2024",
    paymentHistory: [
      { month: "Mar", amount: 600, onTime: true },
      { month: "Apr", amount: 600, onTime: true },
      { month: "May", amount: 600, onTime: true },
      { month: "Jun", amount: 600, onTime: true },
      { month: "Jul", amount: 600, onTime: true },
    ],
  },
  {
    id: 3,
    type: "Agricultural Loan",
    description: "Seasonal farming support",
    amount: 15000,
    remaining: 15000,
    nextPayment: 1800,
    nextPaymentDate: "30 Aug",
    interestRate: 7.5,
    progress: 0,
    status: "pending",
    startDate: "Pending Approval",
    endDate: "Estimated: 12 months",
    paymentHistory: [],
  },
]

// Sample loan recommendations
const loanRecommendations = [
  {
    type: "Home Improvement Loan",
    maxAmount: 25000,
    interestRate: 10.5,
    term: "Up to 36 months",
    eligibility: "High",
    description: "Based on your credit score and payment history",
  },
  {
    type: "Education Loan",
    maxAmount: 15000,
    interestRate: 9.0,
    term: "Up to 48 months",
    eligibility: "Medium",
    description: "Subsidized rates for educational purposes",
  },
  {
    type: "Business Expansion",
    maxAmount: 50000,
    interestRate: 11.5,
    term: "Up to 60 months",
    eligibility: "Medium",
    description: "For established businesses with good revenue",
  },
]

// Amortization chart data
const generateAmortizationData = (loanAmount, interestRate, term) => {
  const monthlyRate = interestRate / 100 / 12
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)

  let remainingBalance = loanAmount
  const data = []

  for (let i = 1; i <= term; i++) {
    const interestPayment = remainingBalance * monthlyRate
    const principalPayment = monthlyPayment - interestPayment
    remainingBalance -= principalPayment

    data.push({
      month: i,
      principal: principalPayment,
      interest: interestPayment,
      balance: remainingBalance > 0 ? remainingBalance : 0,
    })
  }

  return data
}

// Loan comparison data
const loanComparisonData = [
  { name: "Principal", value: 10000 },
  { name: "Interest", value: 1200 },
  { name: "Fees", value: 300 },
]

const COLORS = ["#0088FE", "#FF8042", "#FFBB28"]

export default function LoansPage() {
  const [loanAmount, setLoanAmount] = useState(10000)
  const [loanTerm, setLoanTerm] = useState(12)
  const [interestRate, setInterestRate] = useState(12)
  const [paymentFrequency, setPaymentFrequency] = useState("monthly")
  const [selectedLoanType, setSelectedLoanType] = useState("personal")
  const [applicationStep, setApplicationStep] = useState(1)
  const [showRefinanceOptions, setShowRefinanceOptions] = useState(false)

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
    return payment.toFixed(2)
  }

  // Calculate total repayment
  const calculateTotalRepayment = () => {
    return (calculateMonthlyPayment() * loanTerm).toFixed(2)
  }

  // Calculate total interest
  const calculateTotalInterest = () => {
    return (calculateTotalRepayment() - loanAmount).toFixed(2)
  }

  // Early repayment calculation
  const calculateEarlyRepayment = (months) => {
    const remainingMonths = loanTerm - months
    const monthlyRate = interestRate / 100 / 12
    const remainingBalance =
      (loanAmount * (Math.pow(1 + monthlyRate, loanTerm) - Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1)
    const interestSaved = calculateMonthlyPayment() * loanTerm - calculateMonthlyPayment() * months - remainingBalance

    return {
      remainingBalance: remainingBalance.toFixed(2),
      interestSaved: interestSaved.toFixed(2),
    }
  }

  // Amortization data
  const amortizationData = generateAmortizationData(loanAmount, interestRate, loanTerm)

  // Handle loan application next step
  const handleNextStep = () => {
    setApplicationStep((prev) => Math.min(prev + 1, 4))
  }

  // Handle loan application previous step
  const handlePrevStep = () => {
    setApplicationStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Loan Center"
        text="Manage your loans, apply for new ones, and explore financial options"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Loan
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Loan Summary Card */}
        <Card className="md:col-span-7 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm border-blue-100 dark:border-blue-900">
          <CardHeader className="pb-2">
            <CardTitle>Loan Summary</CardTitle>
            <CardDescription>Overview of your current loan portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Loan Amount</p>
                <p className="text-2xl font-bold">K 30,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                <p className="text-2xl font-bold">K 22,500</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Monthly Payments</p>
                <p className="text-2xl font-bold">K 3,600</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Loan Health</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">Good</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                  >
                    <Check className="mr-1 h-3 w-3" /> On Track
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="insights">Loan Insights</TabsTrigger>
        </TabsList>

        {/* Active Loans Tab */}
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {loans.map((loan) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`overflow-hidden ${loan.status === "pending" ? "border-amber-200 dark:border-amber-800" : ""}`}
                >
                  <div className={`h-1 ${loan.status === "pending" ? "bg-amber-500" : "bg-blue-600"}`}></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{loan.type}</CardTitle>
                        <CardDescription>{loan.description}</CardDescription>
                      </div>
                      {loan.status === "pending" ? (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                        >
                          Pending Approval
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                        >
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Loan Amount</span>
                          <span className="text-sm font-medium">K {loan.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Remaining Balance</span>
                          <span className="text-sm font-medium">K {loan.remaining.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Next Payment</span>
                          <span className="text-sm font-medium">
                            K {loan.nextPayment} on {loan.nextPaymentDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Interest Rate</span>
                          <span className="text-sm font-medium">{loan.interestRate}% p.a.</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Start Date</span>
                          <span className="text-sm font-medium">{loan.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">End Date</span>
                          <span className="text-sm font-medium">{loan.endDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Payment Frequency</span>
                          <span className="text-sm font-medium">Monthly</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Loan Term</span>
                          <span className="text-sm font-medium">12 months</span>
                        </div>
                      </div>
                    </div>

                    {loan.status !== "pending" && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Repayment Progress</span>
                          <span className="text-sm font-medium">{loan.progress}%</span>
                        </div>
                        <Progress value={loan.progress} className="h-2" />
                      </div>
                    )}

                    {loan.status !== "pending" && loan.paymentHistory.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Payment History</p>
                        <div className="flex justify-between">
                          {loan.paymentHistory.map((payment, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <span className="text-xs">{payment.month}</span>
                              <div
                                className={`w-3 h-3 rounded-full mt-1 ${payment.onTime ? "bg-green-500" : "bg-red-500"}`}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {loan.status !== "pending" ? (
                      <>
                        <Button variant="outline" onClick={() => setShowRefinanceOptions(!showRefinanceOptions)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Refinance Options
                        </Button>
                        <Button>Make Payment</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Application Details
                        </Button>
                        <Button variant="destructive">Cancel Application</Button>
                      </>
                    )}
                  </CardFooter>

                  {/* Refinance Options Panel */}
                  {showRefinanceOptions && loan.status !== "pending" && (
                    <div className="px-6 pb-6 space-y-4 bg-muted/50 rounded-b-lg">
                      <h4 className="text-sm font-medium pt-2">Refinance Options</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">Lower Interest Rate</CardTitle>
                          </CardHeader>
                          <CardContent className="py-2">
                            <p className="text-xs text-muted-foreground">
                              Reduce your rate from {loan.interestRate}% to 10.5%
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">Monthly savings: K 75</p>
                          </CardContent>
                          <CardFooter className="py-2">
                            <Button size="sm" className="w-full">
                              Apply
                            </Button>
                          </CardFooter>
                        </Card>
                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">Extended Term</CardTitle>
                          </CardHeader>
                          <CardContent className="py-2">
                            <p className="text-xs text-muted-foreground">Extend from 12 to 18 months</p>
                            <p className="text-xs text-muted-foreground mt-1">New payment: K 800/month</p>
                          </CardContent>
                          <CardFooter className="py-2">
                            <Button size="sm" className="w-full">
                              Apply
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Early Repayment Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>Early Repayment Calculator</CardTitle>
              <CardDescription>See how much you can save by paying off your loans early</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Loan</Label>
                    <Select defaultValue="personal">
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Loan (K 5,000 remaining)</SelectItem>
                        <SelectItem value="village">Village Banking Loan (K 2,500 remaining)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Months Paid Early</Label>
                      <span className="text-sm">6 months</span>
                    </div>
                    <Slider defaultValue={[6]} max={12} step={1} className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Payment Amount</Label>
                    <div className="flex space-x-2">
                      <Input type="number" placeholder="Enter amount" defaultValue="2500" />
                      <Button>Calculate</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium">Early Repayment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Current Remaining Balance</span>
                      <span className="text-sm font-medium">K 5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Remaining Term</span>
                      <span className="text-sm font-medium">6 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Interest Saved</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        K {calculateEarlyRepayment(6).interestSaved}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Payoff Amount</span>
                      <span className="text-sm font-medium">K {calculateEarlyRepayment(6).remainingBalance}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-2">Pay Off Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Apply for Loan Tab */}
        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apply for a New Loan</CardTitle>
              <CardDescription>Complete the application process to get a new loan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                          ${
                            applicationStep === step
                              ? "bg-blue-600 text-white"
                              : applicationStep > step
                                ? "bg-green-500 text-white"
                                : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {applicationStep > step ? <Check className="h-4 w-4" /> : step}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {step === 1 ? "Loan Type" : step === 2 ? "Personal Info" : step === 3 ? "Documents" : "Review"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-muted h-1 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${(applicationStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Loan Type Selection */}
              {applicationStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Loan Type</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${selectedLoanType === "personal" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : ""}`}
                        onClick={() => setSelectedLoanType("personal")}
                      >
                        <CreditCard className="h-8 w-8 mb-2 text-blue-600" />
                        <h4 className="font-medium">Personal Loan</h4>
                        <p className="text-xs text-muted-foreground mt-1">Short-term loans with competitive rates</p>
                        <div className="mt-2 text-xs">
                          <div className="flex justify-between">
                            <span>Interest Rate:</span>
                            <span className="font-medium">12% p.a.</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Amount:</span>
                            <span className="font-medium">K 25,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Term:</span>
                            <span className="font-medium">Up to 36 months</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${selectedLoanType === "village" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : ""}`}
                        onClick={() => setSelectedLoanType("village")}
                      >
                        <PiggyBank className="h-8 w-8 mb-2 text-blue-600" />
                        <h4 className="font-medium">Village Banking</h4>
                        <p className="text-xs text-muted-foreground mt-1">Group savings and loan program</p>
                        <div className="mt-2 text-xs">
                          <div className="flex justify-between">
                            <span>Interest Rate:</span>
                            <span className="font-medium">8% p.a.</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Amount:</span>
                            <span className="font-medium">K 10,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Term:</span>
                            <span className="font-medium">Up to 24 months</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${selectedLoanType === "agri" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : ""}`}
                        onClick={() => setSelectedLoanType("agri")}
                      >
                        <Tractor className="h-8 w-8 mb-2 text-blue-600" />
                        <h4 className="font-medium">Agricultural Loan</h4>
                        <p className="text-xs text-muted-foreground mt-1">Seasonal farming support</p>
                        <div className="mt-2 text-xs">
                          <div className="flex justify-between">
                            <span>Interest Rate:</span>
                            <span className="font-medium">7.5% p.a.</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Amount:</span>
                            <span className="font-medium">K 50,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Term:</span>
                            <span className="font-medium">Up to 36 months</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Loan Details</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="loanAmount">Loan Amount (K)</Label>
                        <Input
                          id="loanAmount"
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loanTerm">Loan Term (Months)</Label>
                        <Input
                          id="loanTerm"
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="purpose">Loan Purpose</Label>
                        <Select defaultValue="personal">
                          <SelectTrigger id="purpose">
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">Personal Expenses</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="home">Home Improvement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collateral">Collateral Type</Label>
                        <Select defaultValue="none">
                          <SelectTrigger id="collateral">
                            <SelectValue placeholder="Select collateral" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Collateral</SelectItem>
                            <SelectItem value="property">Property</SelectItem>
                            <SelectItem value="vehicle">Vehicle</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                            <SelectItem value="other">Other Assets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Pre-qualification Check</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Based on your profile and credit history, you are pre-qualified for this loan amount. Your
                          estimated APR is 12-14% based on final verification.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {applicationStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">National ID Number</Label>
                      <Input id="idNumber" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Residential Address</Label>
                    <Input id="address" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="employment">Employment Status</Label>
                      <Select defaultValue="employed">
                        <SelectTrigger id="employment">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="business-owner">Business Owner</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income">Monthly Income (K)</Label>
                      <Input id="income" type="number" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employer">Employer Name</Label>
                    <Input id="employer" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I confirm that all information provided is accurate and complete
                    </Label>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {applicationStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Required Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Please upload the following documents to complete your application
                  </p>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">National ID</h4>
                            <p className="text-xs text-muted-foreground">Front and back of your ID card</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">Proof of Income</h4>
                            <p className="text-xs text-muted-foreground">Last 3 months pay slips or bank statements</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">Proof of Address</h4>
                            <p className="text-xs text-muted-foreground">Utility bill or rental agreement</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                      </div>
                    </div>

                    {selectedLoanType === "agri" && (
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <h4 className="font-medium">Farm Ownership Documents</h4>
                              <p className="text-xs text-muted-foreground">Land title or lease agreement</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Secure Document Handling</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          All documents are encrypted and securely stored. We comply with data protection regulations
                          and your information will only be used for loan processing purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review and Submit */}
              {applicationStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Review Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Please review your application details before submitting
                  </p>

                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Loan Details</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Loan Type:</span>
                          <span className="text-sm font-medium">
                            {selectedLoanType === "personal"
                              ? "Personal Loan"
                              : selectedLoanType === "village"
                                ? "Village Banking Loan"
                                : "Agricultural Loan"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Loan Amount:</span>
                          <span className="text-sm font-medium">K {loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Loan Term:</span>
                          <span className="text-sm font-medium">{loanTerm} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Interest Rate:</span>
                          <span className="text-sm font-medium">
                            {selectedLoanType === "personal" ? "12%" : selectedLoanType === "village" ? "8%" : "7.5%"}{" "}
                            p.a.
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Monthly Payment:</span>
                          <span className="text-sm font-medium">K {calculateMonthlyPayment()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Total Repayment:</span>
                          <span className="text-sm font-medium">K {calculateTotalRepayment()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Personal Information</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Full Name:</span>
                          <span className="text-sm font-medium">John Doe</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ID Number:</span>
                          <span className="text-sm font-medium">123456789</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Phone Number:</span>
                          <span className="text-sm font-medium">+260 97 1234567</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Employment:</span>
                          <span className="text-sm font-medium">Employed</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Documents</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">National ID:</span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                          >
                            <Check className="mr-1 h-3 w-3" /> Uploaded
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Proof of Income:</span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                          >
                            <Check className="mr-1 h-3 w-3" /> Uploaded
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Proof of Address:</span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                          >
                            <Check className="mr-1 h-3 w-3" /> Uploaded
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="terms-final" />
                      <Label htmlFor="terms-final" className="text-sm">
                        I agree to the terms and conditions of the loan agreement
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {applicationStep > 1 && (
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
              )}
              {applicationStep < 4 ? (
                <Button onClick={handleNextStep} className={applicationStep === 1 ? "w-full" : ""}>
                  Continue
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">Submit Application</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Loan Calculator Tab */}
        <TabsContent value="calculator" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Loan Calculator</CardTitle>
                <CardDescription>Calculate your potential loan payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="calc-amount">Loan Amount (K)</Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="calc-amount"
                        defaultValue={[loanAmount]}
                        max={50000}
                        step={1000}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-24"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calc-term">Loan Term (Months)</Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="calc-term"
                        defaultValue={[loanTerm]}
                        max={60}
                        step={1}
                        onValueChange={(value) => setLoanTerm(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-24"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calc-interest">Interest Rate (% p.a.)</Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        id="calc-interest"
                        defaultValue={[interestRate]}
                        max={30}
                        step={0.5}
                        onValueChange={(value) => setInterestRate(value[0])}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-24"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calc-frequency">Payment Frequency</Label>
                    <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                      <SelectTrigger id="calc-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Estimated payments based on your inputs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">Estimated Monthly Payment</div>
                  <div className="text-4xl font-bold">K {calculateMonthlyPayment()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total Principal</div>
                    <div className="text-lg font-semibold">K {loanAmount.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total Interest</div>
                    <div className="text-lg font-semibold">K {calculateTotalInterest()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Total Repayment</div>
                    <div className="text-lg font-semibold">K {calculateTotalRepayment()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Loan Term</div>
                    <div className="text-lg font-semibold">{loanTerm} months</div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-3">Payment Breakdown</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Principal", value: Number(loanAmount) },
                          { name: "Interest", value: Number(calculateTotalInterest()) },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#f97316" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs">Interest</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply for This Loan</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Amortization Schedule</CardTitle>
              <CardDescription>See how your payments are applied over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={amortizationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: "Month", position: "insideBottomRight", offset: -10 }} />
                    <YAxis label={{ value: "Amount (K)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => `K ${Number(value).toFixed(2)}`} />
                    <Area type="monotone" dataKey="principal" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="interest" stackId="1" stroke="#f97316" fill="#f97316" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 border rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 bg-muted p-2 font-medium text-sm">
                  <div>Month</div>
                  <div>Principal</div>
                  <div>Interest</div>
                  <div>Remaining Balance</div>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {amortizationData.slice(0, 12).map((data, index) => (
                    <div key={index} className="grid grid-cols-4 p-2 text-sm border-t">
                      <div>{data.month}</div>
                      <div>K {data.principal.toFixed(2)}</div>
                      <div>K {data.interest.toFixed(2)}</div>
                      <div>K {data.balance.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Loan Recommendations</CardTitle>
              <CardDescription>Based on your profile and financial history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {loanRecommendations.map((loan, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 border-b">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{loan.type}</h3>
                          <p className="text-sm text-muted-foreground">{loan.description}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`
                          ${
                            loan.eligibility === "High"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                          }
                        `}
                        >
                          {loan.eligibility} Eligibility
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Max Amount</p>
                          <p className="font-medium">K {loan.maxAmount.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Interest Rate</p>
                          <p className="font-medium">{loan.interestRate}% p.a.</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Term</p>
                          <p className="font-medium">{loan.term}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loan Comparison Tool</CardTitle>
              <CardDescription>Compare different loan options side by side</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Loan Type</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Term</th>
                      <th className="text-left p-2">Interest Rate</th>
                      <th className="text-left p-2">Monthly Payment</th>
                      <th className="text-left p-2">Total Interest</th>
                      <th className="text-left p-2">Total Cost</th>
                      <th className="text-left p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Personal Loan</td>
                      <td className="p-2">K 10,000</td>
                      <td className="p-2">12 months</td>
                      <td className="p-2">12%</td>
                      <td className="p-2">K 888.49</td>
                      <td className="p-2">K 661.88</td>
                      <td className="p-2">K 10,661.88</td>
                      <td className="p-2">
                        <Button size="sm" variant="outline">
                          Select
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Village Banking</td>
                      <td className="p-2">K 10,000</td>
                      <td className="p-2">12 months</td>
                      <td className="p-2">8%</td>
                      <td className="p-2">K 856.39</td>
                      <td className="p-2">K 436.68</td>
                      <td className="p-2">K 10,436.68</td>
                      <td className="p-2">
                        <Button size="sm" variant="outline">
                          Select
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">Agricultural Loan</td>
                      <td className="p-2">K 10,000</td>
                      <td className="p-2">12 months</td>
                      <td className="p-2">7.5%</td>
                      <td className="p-2">K 852.65</td>
                      <td className="p-2">K 411.80</td>
                      <td className="p-2">K 10,411.80</td>
                      <td className="p-2">
                        <Button size="sm" variant="outline">
                          Select
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Total Cost Comparison</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={loanComparisonData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#f97316" />
                        <Cell fill="#facc15" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs">Interest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Fees</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loan Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Loan Health Score</CardTitle>
                <CardDescription>Overall status of your loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-500 stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - 0.85)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">85%</span>
                    </div>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-medium">Excellent</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Payment History</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-1.5" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Debt-to-Income Ratio</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-1.5" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Loan Utilization</span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <Progress value={80} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Payment Trends</CardTitle>
                <CardDescription>Your payment behavior over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { month: "Jan", onTime: 1, late: 0 },
                        { month: "Feb", onTime: 1, late: 0 },
                        { month: "Mar", onTime: 1, late: 0 },
                        { month: "Apr", onTime: 1, late: 0 },
                        { month: "May", onTime: 0, late: 1 },
                        { month: "Jun", onTime: 1, late: 0 },
                        { month: "Jul", onTime: 1, late: 0 },
                      ]}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="onTime" stackId="1" stroke="#10b981" fill="#10b981" />
                      <Area type="monotone" dataKey="late" stackId="1" stroke="#ef4444" fill="#ef4444" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">On Time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Late</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>Next 30 days payment schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-2 rounded-lg bg-muted/50">
                    <Calendar className="h-10 w-10 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium">Personal Loan</p>
                      <div className="flex items-center">
                        <p className="text-sm text-muted-foreground">15 Aug - K 1,200</p>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-0">
                          10 days left
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-2 rounded-lg bg-muted/50">
                    <Calendar className="h-10 w-10 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium">Village Banking Loan</p>
                      <div className="flex items-center">
                        <p className="text-sm text-muted-foreground">22 Aug - K 600</p>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-0">
                          17 days left
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Payment Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Debt Reduction Strategies</CardTitle>
              <CardDescription>Personalized recommendations to reduce your debt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Debt Snowball Method</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pay off your smallest debts first to build momentum. Based on your current loans, you could be
                        debt-free in 10 months by adding just K 500 extra to your monthly payments.
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-1 text-blue-600 dark:text-blue-400">
                        See detailed plan
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Debt Consolidation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Consolidate your multiple loans into a single loan with a lower interest rate. You could save
                        approximately K 1,200 in interest payments.
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-1 text-blue-600 dark:text-blue-400">
                        Explore consolidation options
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Landmark className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Refinancing Opportunity</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your Personal Loan qualifies for refinancing at a lower rate of 10.5%. This could save you K 75
                        per month and K 900 over the remaining loan term.
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-1 text-blue-600 dark:text-blue-400">
                        Apply for refinancing
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Education</CardTitle>
              <CardDescription>Resources to improve your financial literacy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <HelpCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">Understanding Interest Rates</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn how interest rates affect your loans and how to get the best rates.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-1 text-blue-600 dark:text-blue-400">
                      Read article
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                    <Home className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">Building Credit Score</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tips and strategies to improve your credit score and qualify for better loans.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-1 text-blue-600 dark:text-blue-400">
                      Read article
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">Avoiding Loan Scams</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      How to identify and avoid predatory lending practices and loan scams.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-1 text-blue-600 dark:text-blue-400">
                      Read article
                    </Button>
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

