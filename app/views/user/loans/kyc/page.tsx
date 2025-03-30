"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ArrowRight, Check, Clock, FileText, HelpCircle, Upload, User, X } from "lucide-react"
import { useState } from "react"

export default function KYCPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="KYC Verification"
        text="Manage your personal information and documents for loan verification"
      >
        <KYCStatusBadge status="in-progress" />
      </DashboardHeader>

      <div className="grid gap-4">
        <KYCProgressTracker />

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <PersonalInformationForm />
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <DocumentsUpload />
          </TabsContent>

          <TabsContent value="verification" className="space-y-4">
            <VerificationStatus />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

function KYCStatusBadge({ status }: { status: "pending" | "in-progress" | "verified" | "rejected" }) {
  const statusConfig = {
    pending: { label: "Pending", variant: "outline", icon: Clock },
    "in-progress": { label: "In Progress", variant: "secondary", icon: ArrowRight },
    verified: { label: "Verified", variant: "success", icon: Check },
    rejected: { label: "Rejected", variant: "destructive", icon: X },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant as any} className="gap-1 px-2 py-1">
      <config.icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  )
}

function KYCProgressTracker() {
  const steps = [
    { name: "Personal Information", status: "complete" },
    { name: "Document Upload", status: "current" },
    { name: "Verification", status: "upcoming" },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">KYC Verification Progress</h3>
              <p className="text-sm text-muted-foreground">Complete all steps to get verified</p>
            </div>
            <Progress value={66} className="w-[100px]" />
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex items-center justify-between">
                {steps.map((step, stepIdx) => (
                  <div key={step.name} className="relative flex flex-col items-center">
                    <div
                      className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${
                        step.status === "complete"
                          ? "bg-primary border-primary text-primary-foreground"
                          : step.status === "current"
                            ? "border-primary text-primary"
                            : "border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {step.status === "complete" ? <Check className="h-4 w-4" /> : <span>{stepIdx + 1}</span>}
                    </div>
                    <p className="mt-2 text-xs font-medium">{step.name}</p>
                  </div>
                ))}
              </div>

              <div className="absolute top-4 left-0 right-0 -z-10">
                <div className="h-0.5 w-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: "50%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PersonalInformationForm() {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
        <CardDescription>Provide your personal details for KYC verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Basic Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID Number</Label>
              <Input id="nationalId" placeholder="Enter your ID number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / SSN</Label>
              <Input id="taxId" placeholder="Enter your tax ID" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Contact Information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="Enter your street address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter your city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" placeholder="Enter your state/province" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Postal/ZIP Code</Label>
              <Input id="zipCode" placeholder="Enter your postal code" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="zm">Zambia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Employment & Income</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select>
                <SelectTrigger id="employmentStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" placeholder="Enter your occupation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employer">Employer Name</Label>
              <Input id="employer" placeholder="Enter your employer name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workPhone">Work Phone</Label>
              <Input id="workPhone" placeholder="Enter your work phone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income</Label>
              <Input id="annualIncome" placeholder="Enter your annual income" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="incomeSource">Source of Income</Label>
              <Select>
                <SelectTrigger id="incomeSource">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="investments">Investments</SelectItem>
                  <SelectItem value="pension">Pension</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Information</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentsUpload() {
  const [hoveredDocument, setHoveredDocument] = useState<string | null>(null)

  const documents = [
    {
      id: "id-proof",
      name: "ID Proof",
      description: "National ID, Passport, or Driver's License",
      status: "pending",
      required: true,
    },
    {
      id: "address-proof",
      name: "Proof of Address",
      description: "Utility bill or bank statement (less than 3 months old)",
      status: "pending",
      required: true,
    },
    {
      id: "income-proof",
      name: "Proof of Income",
      description: "Pay slips, tax returns, or bank statements",
      status: "pending",
      required: true,
    },
    {
      id: "photo",
      name: "Recent Photograph",
      description: "Clear photo with white background",
      status: "uploaded",
      required: true,
    },
    {
      id: "signature",
      name: "Signature Specimen",
      description: "Clear scan of your signature on white paper",
      status: "verified",
      required: true,
    },
    {
      id: "additional",
      name: "Additional Documents",
      description: "Any other supporting documents",
      status: "none",
      required: false,
    },
  ]

  return (
    <Card className="border-l-4 border-l-amber-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Upload
        </CardTitle>
        <CardDescription>Upload the required documents for KYC verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Document Guidelines</h4>
              <p className="text-sm text-muted-foreground">
                All documents must be clear, legible, and in JPG, PNG, or PDF format. Maximum file size is 5MB.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`relative rounded-lg border p-4 transition-all duration-200 ${
                hoveredDocument === doc.id ? "border-primary shadow-sm" : ""
              }`}
              onMouseEnter={() => setHoveredDocument(doc.id)}
              onMouseLeave={() => setHoveredDocument(null)}
            >
              <div className="flex justify-between">
                <h4 className="text-sm font-medium flex items-center gap-1">
                  {doc.name}
                  {doc.required && <span className="text-red-500">*</span>}
                </h4>
                <DocumentStatusBadge status={doc.status} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{doc.description}</p>

              {doc.status === "verified" ? (
                <div className="mt-4 flex items-center gap-2 text-xs text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Verified on March 15, 2025</span>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor={`dropzone-file-${doc.id}`}
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                        <p className="mb-1 text-xs text-muted-foreground">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">JPG, PNG or PDF (max. 5MB)</p>
                      </div>
                      <input id={`dropzone-file-${doc.id}`} type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              )}

              {doc.status === "uploaded" && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs">document.pdf</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Submit Documents</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentStatusBadge({ status }: { status: "none" | "pending" | "uploaded" | "verified" | "rejected" }) {
  const statusConfig = {
    none: { label: "Not Uploaded", variant: "outline" },
    pending: { label: "Pending Review", variant: "secondary" },
    uploaded: { label: "Uploaded", variant: "default" },
    verified: { label: "Verified", variant: "success" },
    rejected: { label: "Rejected", variant: "destructive" },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant as any} className="text-xs">
      {config.label}
    </Badge>
  )
}

function VerificationStatus() {
  const verificationSteps = [
    {
      name: "Document Submission",
      status: "complete",
      date: "Mar 15, 2025",
      notes: "All required documents submitted",
    },
    { name: "Initial Review", status: "complete", date: "Mar 16, 2025", notes: "Documents passed initial screening" },
    { name: "Background Check", status: "in-progress", date: "Mar 17, 2025", notes: "Verification in progress" },
    { name: "Final Approval", status: "pending", date: null, notes: null },
  ]

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-5 w-5" />
          Verification Status
        </CardTitle>
        <CardDescription>Track the status of your KYC verification process</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-amber-100 p-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">Verification in Progress</h4>
              <p className="text-sm text-muted-foreground">
                Your documents are being reviewed. This process typically takes 1-3 business days.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Verification Timeline</h3>
          <ol className="relative border-l border-muted">
            {verificationSteps.map((step, index) => (
              <li key={index} className="mb-6 ml-6">
                <span
                  className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ${
                    step.status === "complete"
                      ? "bg-green-100 ring-8 ring-white"
                      : step.status === "in-progress"
                        ? "bg-blue-100 ring-8 ring-white"
                        : "bg-muted ring-8 ring-white"
                  }`}
                >
                  {step.status === "complete" ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : step.status === "in-progress" ? (
                    <Clock className="h-3 w-3 text-blue-600" />
                  ) : (
                    <div className="h-3 w-3" />
                  )}
                </span>
                <h3 className="flex items-center text-sm font-semibold">
                  {step.name}
                  {step.date && <span className="ml-2 text-xs font-normal text-muted-foreground">{step.date}</span>}
                </h3>
                {step.notes && <p className="text-xs text-muted-foreground">{step.notes}</p>}
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Verification Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Submission Date</div>
              <div className="font-medium">March 15, 2025</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Expected Completion</div>
              <div className="font-medium">March 18, 2025</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Verification ID</div>
              <div className="font-medium">KYC-2025031501</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Assigned Reviewer</div>
              <div className="font-medium">Compliance Team</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>Refresh Status</Button>
        </div>
      </CardContent>
    </Card>
  )
}

