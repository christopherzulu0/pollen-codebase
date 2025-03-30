import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Calculator,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  Info,
  Percent,
  ShieldCheck,
  Truck,
} from "lucide-react"

export default function LoanApplicationPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Loan Application" text="Apply for a new loan or financing option">
        <Button variant="outline" className="mr-2">
          Save Draft
        </Button>
        <Button>Continue Application</Button>
      </DashboardHeader>

      <Tabs defaultValue="personal" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="personal">Loan Type</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <div className="hidden md:block">
            <Badge variant="outline" className="gap-1">
              Application ID: LOAN-2025-03-1234
            </Badge>
          </div>
        </div>

        <TabsContent value="personal" className="space-y-4">
          <LoanTypeSelection />
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <LoanCalculator />
        </TabsContent>

        <TabsContent value="application" className="space-y-4">
          <LoanApplicationForm />
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <LoanApplicationReview />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function LoanTypeSelection() {
  const loanTypes = [
    {
      id: "personal",
      title: "Personal Loan",
      description: "For personal expenses, debt consolidation, or unexpected costs",
      icon: CreditCard,
      interestRate: "12-18%",
      maxAmount: "$25,000",
      processingTime: "1-3 days",
      color: "border-blue-500",
    },
    {
      id: "home",
      title: "Home Loan",
      description: "For buying, building, or renovating your home",
      icon: Home,
      interestRate: "6-9%",
      maxAmount: "$500,000",
      processingTime: "7-14 days",
      color: "border-green-500",
    },
    {
      id: "auto",
      title: "Auto Loan",
      description: "For purchasing a new or used vehicle",
      icon: Truck,
      interestRate: "8-12%",
      maxAmount: "$75,000",
      processingTime: "2-5 days",
      color: "border-purple-500",
    },
    {
      id: "business",
      title: "Business Loan",
      description: "For business expansion, equipment, or working capital",
      icon: DollarSign,
      interestRate: "10-16%",
      maxAmount: "$100,000",
      processingTime: "5-10 days",
      color: "border-amber-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {loanTypes.map((loan) => (
        <Card key={loan.id} className={`border-l-4 ${loan.color} hover:shadow-md transition-shadow cursor-pointer`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <loan.icon className="h-5 w-5" />
                  {loan.title}
                </CardTitle>
                <CardDescription>{loan.description}</CardDescription>
              </div>
              <Badge variant="outline" className="ml-2">
                Popular
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-muted-foreground flex items-center gap-1">
                  <Percent className="h-3 w-3" /> Interest
                </div>
                <div>{loan.interestRate}</div>
              </div>
              <div>
                <div className="text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-3 w-3" /> Max Amount
                </div>
                <div>{loan.maxAmount}</div>
              </div>
              <div>
                <div className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Processing
                </div>
                <div>{loan.processingTime}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-1">
              Select This Loan <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function LoanCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Loan Calculator
        </CardTitle>
        <CardDescription>Calculate your monthly payments and total cost of the loan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="loan-amount">Loan Amount</Label>
                <span className="text-sm font-medium">$10,000</span>
              </div>
              <Slider defaultValue={[10000]} max={100000} step={1000} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$1,000</span>
                <span>$100,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="loan-term">Loan Term (months)</Label>
                <span className="text-sm font-medium">36 months</span>
              </div>
              <Slider defaultValue={[36]} max={84} step={12} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>12 months</span>
                <span>84 months</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <span className="text-sm font-medium">12%</span>
              </div>
              <Slider defaultValue={[12]} max={24} step={0.5} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6%</span>
                <span>24%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input type="date" id="start-date" defaultValue="2025-04-01" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">Payment Summary</h3>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Payment:</span>
                  <span className="font-medium">$332.14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Principal:</span>
                  <span className="font-medium">$10,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Interest:</span>
                  <span className="font-medium">$1,957.04</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Fee:</span>
                  <span className="font-medium">$200.00</span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost:</span>
                    <span>$12,157.04</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Payment Schedule</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    First payment due on May 1, 2025. Last payment on April 1, 2028.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-xs mt-1">
                    View full amortization schedule
                  </Button>
                </div>
              </div>
            </div>

            <Button className="w-full">Apply with These Terms</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LoanApplicationForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Loan Application Form
        </CardTitle>
        <CardDescription>Please provide the required information to process your loan application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">KYC Verification Required</h4>
              <p className="text-xs text-muted-foreground mt-1">
                You must complete your KYC verification before your loan application can be processed.
              </p>
              <Button variant="link" className="h-auto p-0 text-xs mt-1">
                Complete KYC Verification
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Loan Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="loan-purpose">Loan Purpose</Label>
              <Select>
                <SelectTrigger id="loan-purpose">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                  <SelectItem value="home-improvement">Home Improvement</SelectItem>
                  <SelectItem value="major-purchase">Major Purchase</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="medical">Medical Expenses</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <Input id="loan-amount" placeholder="Enter loan amount" defaultValue="10000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-term">Loan Term</Label>
              <Select>
                <SelectTrigger id="loan-term">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                  <SelectItem value="48">48 months</SelectItem>
                  <SelectItem value="60">60 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="repayment-frequency">Repayment Frequency</Label>
              <Select>
                <SelectTrigger id="repayment-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Financial Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="monthly-income">Monthly Income</Label>
              <Input id="monthly-income" placeholder="Enter monthly income" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employment-status">Employment Status</Label>
              <Select>
                <SelectTrigger id="employment-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employer-name">Employer Name</Label>
              <Input id="employer-name" placeholder="Enter employer name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" placeholder="Enter job title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employment-length">Length of Employment</Label>
              <Select>
                <SelectTrigger id="employment-length">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="more-than-10">More than 10 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-income">Other Income Sources</Label>
              <Input id="other-income" placeholder="Enter other income" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Existing Debts</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mortgage-rent">Monthly Mortgage/Rent</Label>
              <Input id="mortgage-rent" placeholder="Enter amount" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="car-loan">Car Loan Payment</Label>
              <Input id="car-loan" placeholder="Enter amount" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credit-card">Credit Card Payments</Label>
              <Input id="credit-card" placeholder="Enter amount" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-loans">Other Loan Payments</Label>
              <Input id="other-loans" placeholder="Enter amount" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Continue to Review</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function LoanApplicationReview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Application Review
        </CardTitle>
        <CardDescription>Review your loan application details before submission</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-medium">Loan Summary</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Loan Type:</span>
              <span className="font-medium">Personal Loan</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Loan Amount:</span>
              <span className="font-medium">$10,000.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Loan Term:</span>
              <span className="font-medium">36 months</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Interest Rate:</span>
              <span className="font-medium">12.00%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Payment:</span>
              <span className="font-medium">$332.14</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Cost:</span>
              <span className="font-medium">$12,157.04</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-medium">Applicant Information</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Full Name:</span>
              <span className="font-medium">John Doe</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">john.doe@example.com</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">+260 97 1234567</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Address:</span>
              <span className="font-medium">123 Main St, Lusaka</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Employment:</span>
              <span className="font-medium">Employed</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Income:</span>
              <span className="font-medium">$3,500.00</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-medium">Required Documents</h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Proof of Identity</span>
              <Badge variant="outline" className="text-green-600 bg-green-50">
                Verified
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Proof of Address</span>
              <Badge variant="outline" className="text-green-600 bg-green-50">
                Verified
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Proof of Income</span>
              <Badge variant="outline" className="text-amber-600 bg-amber-50">
                Pending
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bank Statements</span>
              <Badge variant="outline" className="text-red-600 bg-red-50">
                Required
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Next Steps</h4>
              <p className="text-xs text-muted-foreground mt-1">
                After submission, your application will be reviewed within 1-3 business days. You'll receive updates via
                email and SMS.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" className="mt-1" />
          <label htmlFor="terms" className="text-sm">
            I confirm that all information provided is accurate and complete. I authorize the lender to verify my
            information and check my credit history.
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Edit Application</Button>
          <Button>Submit Application</Button>
        </div>
      </CardContent>
    </Card>
  )
}

