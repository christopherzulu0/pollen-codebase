import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Calendar, Check, CreditCard, Download, FileText, Filter, Home, Search, Truck } from "lucide-react"

export default function LoanHistoryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Loan History" text="View your loan applications and payment history">
        <Button variant="outline" className="gap-1">
          <Download className="h-4 w-4" /> Export
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="closed">Closed Loans</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search loans..." className="pl-8" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowUpDown className="h-4 w-4" /> Sort
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" /> Date Range
            </Button>
          </div>
        </div>

        <TabsContent value="applications" className="space-y-4">
          <LoanApplicationsHistory />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <ActiveLoans />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <PaymentHistory />
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          <ClosedLoans />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function LoanApplicationsHistory() {
  const applications = [
    {
      id: "LOAN-2025-03-1234",
      type: "Personal Loan",
      amount: "$10,000",
      date: "Mar 15, 2025",
      status: "In Review",
      statusColor: "bg-amber-100 text-amber-800",
    },
    {
      id: "LOAN-2025-02-9876",
      type: "Auto Loan",
      amount: "$25,000",
      date: "Feb 28, 2025",
      status: "Approved",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "LOAN-2025-01-5432",
      type: "Home Loan",
      amount: "$150,000",
      date: "Jan 10, 2025",
      status: "Declined",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: "LOAN-2024-12-7890",
      type: "Personal Loan",
      amount: "$5,000",
      date: "Dec 05, 2024",
      status: "Cancelled",
      statusColor: "bg-gray-100 text-gray-800",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Loan Applications
        </CardTitle>
        <CardDescription>View all your loan applications and their current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <div className="grid grid-cols-6 gap-2 border-b bg-muted/50 p-4 text-sm font-medium">
            <div>Application ID</div>
            <div>Loan Type</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {applications.map((app) => (
            <div key={app.id} className="grid grid-cols-6 gap-2 border-b p-4 text-sm">
              <div className="font-medium">{app.id}</div>
              <div>{app.type}</div>
              <div>{app.amount}</div>
              <div>{app.date}</div>
              <div>
                <Badge className={`${app.statusColor}`}>{app.status}</Badge>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">No loan applications found</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ActiveLoans() {
  const loans = [
    {
      id: "LOAN-2024-10-4321",
      type: "Personal Loan",
      icon: CreditCard,
      amount: "$15,000",
      balance: "$12,450",
      nextPayment: "Apr 15, 2025",
      nextAmount: "$332.14",
      progress: 17,
    },
    {
      id: "LOAN-2023-05-8765",
      type: "Auto Loan",
      icon: Truck,
      amount: "$35,000",
      balance: "$21,350",
      nextPayment: "Apr 10, 2025",
      nextAmount: "$525.60",
      progress: 39,
    },
    {
      id: "LOAN-2022-08-2468",
      type: "Home Loan",
      icon: Home,
      amount: "$250,000",
      balance: "$198,750",
      nextPayment: "Apr 01, 2025",
      nextAmount: "$1,245.33",
      progress: 20,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {loans.map((loan) => (
        <Card key={loan.id} className="overflow-hidden">
          <div className="bg-primary h-1" style={{ width: `${loan.progress}%` }}></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <loan.icon className="h-4 w-4" />
                  {loan.type}
                </CardTitle>
                <CardDescription>{loan.id}</CardDescription>
              </div>
              <Badge variant="outline" className="h-fit">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground">Original Amount</div>
                  <div className="font-medium">{loan.amount}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Current Balance</div>
                  <div className="font-medium">{loan.balance}</div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-muted-foreground">Next Payment</div>
                    <div className="font-medium">{loan.nextPayment}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground">Amount Due</div>
                    <div className="font-medium">{loan.nextAmount}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Details
                </Button>
                <Button size="sm" className="flex-1">
                  Pay Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function PaymentHistory() {
  const payments = [
    {
      id: "PMT-2025-03-1234",
      loanId: "LOAN-2024-10-4321",
      loanType: "Personal Loan",
      amount: "$332.14",
      date: "Mar 15, 2025",
      status: "Successful",
      method: "Bank Transfer",
    },
    {
      id: "PMT-2025-03-5678",
      loanId: "LOAN-2023-05-8765",
      loanType: "Auto Loan",
      amount: "$525.60",
      date: "Mar 10, 2025",
      status: "Successful",
      method: "Credit Card",
    },
    {
      id: "PMT-2025-03-9012",
      loanId: "LOAN-2022-08-2468",
      loanType: "Home Loan",
      amount: "$1,245.33",
      date: "Mar 01, 2025",
      status: "Successful",
      method: "Direct Debit",
    },
    {
      id: "PMT-2025-02-3456",
      loanId: "LOAN-2024-10-4321",
      loanType: "Personal Loan",
      amount: "$332.14",
      date: "Feb 15, 2025",
      status: "Successful",
      method: "Bank Transfer",
    },
    {
      id: "PMT-2025-02-7890",
      loanId: "LOAN-2023-05-8765",
      loanType: "Auto Loan",
      amount: "$525.60",
      date: "Feb 10, 2025",
      status: "Successful",
      method: "Credit Card",
    },
    {
      id: "PMT-2025-02-1234",
      loanId: "LOAN-2022-08-2468",
      loanType: "Home Loan",
      amount: "$1,245.33",
      date: "Feb 01, 2025",
      status: "Successful",
      method: "Direct Debit",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Payment History
        </CardTitle>
        <CardDescription>View all your loan payment transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <div className="grid grid-cols-7 gap-2 border-b bg-muted/50 p-4 text-sm font-medium">
            <div>Payment ID</div>
            <div>Loan</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
            <div>Method</div>
            <div className="text-right">Receipt</div>
          </div>

          {payments.map((payment) => (
            <div key={payment.id} className="grid grid-cols-7 gap-2 border-b p-4 text-sm">
              <div className="font-medium">{payment.id}</div>
              <div>{payment.loanType}</div>
              <div>{payment.amount}</div>
              <div>{payment.date}</div>
              <div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <Check className="mr-1 h-3 w-3" />
                  {payment.status}
                </Badge>
              </div>
              <div>{payment.method}</div>
              <div className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ClosedLoans() {
  const loans = [
    {
      id: "LOAN-2023-01-7654",
      type: "Personal Loan",
      icon: CreditCard,
      amount: "$8,000",
      startDate: "Jan 15, 2023",
      endDate: "Jan 15, 2024",
      status: "Paid Off",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "LOAN-2022-05-3210",
      type: "Auto Loan",
      icon: Truck,
      amount: "$15,000",
      startDate: "May 10, 2022",
      endDate: "Nov 10, 2024",
      status: "Paid Off",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "LOAN-2021-08-9876",
      type: "Personal Loan",
      icon: CreditCard,
      amount: "$5,000",
      startDate: "Aug 01, 2021",
      endDate: "Feb 01, 2022",
      status: "Paid Off",
      statusColor: "bg-green-100 text-green-800",
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            Closed Loans
          </CardTitle>
          <CardDescription>View your completed and paid off loans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-6 gap-2 border-b bg-muted/50 p-4 text-sm font-medium">
              <div>Loan ID</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Start Date</div>
              <div>End Date</div>
              <div>Status</div>
            </div>

            {loans.map((loan) => (
              <div key={loan.id} className="grid grid-cols-6 gap-2 border-b p-4 text-sm">
                <div className="font-medium">{loan.id}</div>
                <div className="flex items-center gap-1">
                  <loan.icon className="h-4 w-4" />
                  {loan.type}
                </div>
                <div>{loan.amount}</div>
                <div>{loan.startDate}</div>
                <div>{loan.endDate}</div>
                <div>
                  <Badge className={loan.statusColor}>{loan.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Loan Repayment Achievement</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Congratulations! You've successfully paid off 3 loans. This positive repayment history contributes to your
              credit score improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

