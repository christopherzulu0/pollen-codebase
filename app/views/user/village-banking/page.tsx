import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users } from "lucide-react"

export default function VillageBankingPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Village Banking" text="Manage your village banking groups and loans" />

      <Tabs defaultValue="groups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="groups">My Groups</TabsTrigger>
          <TabsTrigger value="join">Join Group</TabsTrigger>
          <TabsTrigger value="create">Create Group</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Lusaka Savings Group</CardTitle>
                  <Badge>Active</Badge>
                </div>
                <CardDescription>Community savings group with 15 members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                      +12
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">15 members</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Group Savings</span>
                    <span className="text-sm font-medium">K 45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Your Contribution</span>
                    <span className="text-sm font-medium">K 3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Next Meeting</span>
                    <span className="text-sm font-medium">Aug 15, 2023</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cycle Progress</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-muted-foreground">Cycle ends in 3 months</div>
                </div>

                <Button className="w-full">View Group Details</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Business Entrepreneurs</CardTitle>
                  <Badge variant="outline">Pending</Badge>
                </div>
                <CardDescription>Business funding group with 8 members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>EF</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>GH</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>IJ</AvatarFallback>
                    </Avatar>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                      +5
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">8 members</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Group Savings</span>
                    <span className="text-sm font-medium">K 24,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Your Contribution</span>
                    <span className="text-sm font-medium">K 3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Next Meeting</span>
                    <span className="text-sm font-medium">Aug 22, 2023</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cycle Progress</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="text-xs text-muted-foreground">Cycle ends in 9 months</div>
                </div>

                <Button className="w-full">View Group Details</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="join" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Join a Village Banking Group</CardTitle>
              <CardDescription>Browse available groups to join</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Kitwe Community Savers</h3>
                      <p className="text-sm text-muted-foreground">A savings group for Kitwe residents</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">12 members</span>
                      </div>
                    </div>
                    <Button>Request to Join</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Women Entrepreneurs</h3>
                      <p className="text-sm text-muted-foreground">Supporting women-owned businesses</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">18 members</span>
                      </div>
                    </div>
                    <Button>Request to Join</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Farmers Cooperative</h3>
                      <p className="text-sm text-muted-foreground">For agricultural business owners</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">15 members</span>
                      </div>
                    </div>
                    <Button>Request to Join</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Village Banking Group</CardTitle>
              <CardDescription>Set up your own savings group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Group Name</label>
                  <input type="text" className="w-full p-2 rounded-md border" placeholder="Enter group name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full p-2 rounded-md border min-h-[100px]"
                    placeholder="Describe the purpose of your group"
                  ></textarea>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Contribution (K)</label>
                    <input type="number" className="w-full p-2 rounded-md border" placeholder="Enter minimum amount" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contribution Frequency</label>
                    <select className="w-full p-2 rounded-md border">
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cycle Duration (Months)</label>
                    <input type="number" className="w-full p-2 rounded-md border" placeholder="Enter cycle duration" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum Members</label>
                    <input type="number" className="w-full p-2 rounded-md border" placeholder="Enter maximum members" />
                  </div>
                </div>

                <Button className="w-full">Create Group</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

