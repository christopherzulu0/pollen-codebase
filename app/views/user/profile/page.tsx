import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Check, CreditCard, Mail, MapPin, Phone, User } from "lucide-react"

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your account information" />

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User avatar" />
                    <AvatarFallback className="text-4xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </Button>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Profile completion</div>
                    <Progress value={85} className="h-2 w-32 mt-1" />
                    <div className="text-sm mt-1">85% Complete</div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input type="text" className="w-full p-2 rounded-md border" defaultValue="John" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input type="text" className="w-full p-2 rounded-md border" defaultValue="Doe" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        className="w-full p-2 rounded-md border"
                        defaultValue="john.doe@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <input type="tel" className="w-full p-2 rounded-md border" defaultValue="+260 97 1234567" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <input type="date" className="w-full p-2 rounded-md border" defaultValue="1990-01-01" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">National ID Number</label>
                      <input type="text" className="w-full p-2 rounded-md border" defaultValue="123456789" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <input type="text" className="w-full p-2 rounded-md border" defaultValue="123 Main Street" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <input type="text" className="w-full p-2 rounded-md border" defaultValue="Lusaka" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Province</label>
                      <input type="text" className="w-full p-2 rounded-md border" defaultValue="Lusaka Province" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Postal Code</label>
                      <input type="text" className="w-full p-2 rounded-md border" defaultValue="10101" />
                    </div>
                  </div>

                  <Button className="mt-4">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <input
                      type="password"
                      className="w-full p-2 rounded-md border"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <input type="password" className="w-full p-2 rounded-md border" placeholder="Enter new password" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full p-2 rounded-md border"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <Button>Update Password</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">SMS Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Receive a code via SMS to verify your identity
                      </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">Authenticator App</div>
                      <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate verification codes
                      </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Sessions</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Current Session</div>
                        <div className="text-sm text-muted-foreground">Chrome on Windows • Lusaka, Zambia</div>
                        <div className="text-xs text-muted-foreground mt-1">Started 2 hours ago</div>
                      </div>
                      <Badge variant="outline" className="gap-1">
                        <Check className="h-3 w-3" />
                        Active
                      </Badge>
                    </div>
                  </div>

                  <Button variant="outline">Log Out of All Other Sessions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>Verify your identity to unlock all features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <User className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Basic Information</div>
                      <div className="text-sm text-muted-foreground">Name, date of birth, and contact details</div>
                    </div>
                  </div>
                  <Badge className="gap-1">
                    <Check className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Email Address</div>
                      <div className="text-sm text-muted-foreground">john.doe@example.com</div>
                    </div>
                  </div>
                  <Badge className="gap-1">
                    <Check className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Phone Number</div>
                      <div className="text-sm text-muted-foreground">+260 97 1234567</div>
                    </div>
                  </div>
                  <Badge className="gap-1">
                    <Check className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <CreditCard className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-medium">National ID</div>
                      <div className="text-sm text-muted-foreground">Upload your national ID card or passport</div>
                    </div>
                  </div>
                  <Button>Upload</Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Proof of Address</div>
                      <div className="text-sm text-muted-foreground">Upload a utility bill or bank statement</div>
                    </div>
                  </div>
                  <Button>Upload</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Customize your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Settings</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Email Notifications</label>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="text-sm text-muted-foreground">Receive important updates and alerts via email</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">SMS Notifications</label>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="text-sm text-muted-foreground">Receive important updates and alerts via SMS</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Marketing Communications</label>
                      <input type="checkbox" className="toggle" />
                    </div>
                    <div className="text-sm text-muted-foreground">Receive promotional offers and newsletters</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Language and Region</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <select className="w-full p-2 rounded-md border">
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                      <option value="pt">Portuguese</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Currency</label>
                    <select className="w-full p-2 rounded-md border">
                      <option value="zmw">Zambian Kwacha (ZMW)</option>
                      <option value="usd">US Dollar (USD)</option>
                      <option value="eur">Euro (EUR)</option>
                      <option value="gbp">British Pound (GBP)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Zone</label>
                    <select className="w-full p-2 rounded-md border">
                      <option value="africa/lusaka">Africa/Lusaka (GMT+2)</option>
                      <option value="utc">UTC</option>
                      <option value="america/new_york">America/New York (GMT-5)</option>
                      <option value="europe/london">Europe/London (GMT+0)</option>
                    </select>
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

