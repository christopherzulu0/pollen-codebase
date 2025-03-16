"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  MoreHorizontal,
  Trash,
  Edit,
  Bell,
  Copy,
  Repeat,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

// Event type
interface CalendarEvent {
  id: string
  title: string
  date: string
  time?: string
  type: "bill" | "income" | "reminder" | "goal" | "appointment"
  amount?: number
  description?: string
  status?: "upcoming" | "completed" | "overdue"
  isRecurring?: boolean
  recurrencePattern?: string
  account?: string
  category?: string
  color?: string
}

// Day cell type
interface DayCell {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}

export default function CalendarPage() {
  // State
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([])
  const [calendarDays, setCalendarDays] = useState<DayCell[]>([])
  const [activeTab, setActiveTab] = useState("month")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Load events
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockEvents: CalendarEvent[] = [
        {
          id: "1",
          title: "Rent Payment",
          date: "2024-03-31",
          time: "09:00",
          type: "bill",
          amount: 1200,
          description: "Monthly rent payment",
          status: "upcoming",
          isRecurring: true,
          recurrencePattern: "monthly",
          account: "Checking Account",
          category: "Housing",
          color: "#ef4444",
        },
        {
          id: "2",
          title: "Salary Deposit",
          date: "2024-03-15",
          type: "income",
          amount: 3200,
          description: "Monthly salary payment",
          status: "completed",
          isRecurring: true,
          recurrencePattern: "monthly",
          account: "Checking Account",
          category: "Income",
          color: "#22c55e",
        },
        {
          id: "3",
          title: "Electric Bill",
          date: "2024-03-25",
          type: "bill",
          amount: 85.42,
          description: "Monthly electricity bill",
          status: "upcoming",
          isRecurring: true,
          recurrencePattern: "monthly",
          account: "Checking Account",
          category: "Utilities",
          color: "#ef4444",
        },
        {
          id: "4",
          title: "Internet Bill",
          date: "2024-03-22",
          type: "bill",
          amount: 65.99,
          description: "Monthly internet service",
          status: "upcoming",
          isRecurring: true,
          recurrencePattern: "monthly",
          account: "Checking Account",
          category: "Utilities",
          color: "#ef4444",
        },
        {
          id: "5",
          title: "Credit Card Payment",
          date: "2024-03-18",
          type: "bill",
          amount: 350,
          description: "Credit card minimum payment",
          status: "upcoming",
          isRecurring: true,
          recurrencePattern: "monthly",
          account: "Checking Account",
          category: "Debt",
          color: "#ef4444",
        },
        {
          id: "6",
          title: "Emergency Fund Goal",
          date: "2024-03-20",
          type: "goal",
          description: "Review emergency fund progress",
          status: "upcoming",
          account: "Savings Account",
          category: "Financial Planning",
          color: "#3b82f6",
        },
        {
          id: "7",
          title: "Financial Advisor Meeting",
          date: "2024-03-28",
          time: "14:00",
          type: "appointment",
          description: "Quarterly portfolio review",
          status: "upcoming",
          category: "Financial Planning",
          color: "#8b5cf6",
        },
        {
          id: "8",
          title: "Car Insurance Payment",
          date: "2024-03-10",
          type: "bill",
          amount: 120,
          description: "Monthly car insurance premium",
          status: "completed",
          isRecurring: true,
          recurrencePattern: "monthly",
          account: "Checking Account",
          category: "Insurance",
          color: "#ef4444",
        },
        {
          id: "9",
          title: "Budget Review",
          date: "2024-03-05",
          type: "reminder",
          description: "Monthly budget review and adjustments",
          status: "completed",
          isRecurring: true,
          recurrencePattern: "monthly",
          category: "Financial Planning",
          color: "#f59e0b",
        },
        {
          id: "10",
          title: "Phone Bill",
          date: "2024-03-15",
          type: "bill",
          amount: 75,
          description: "Monthly phone bill",
          status: "completed",
          isRecurring: true,
          recurrencePattern: "monthly",
          account: "Checking Account",
          category: "Utilities",
          color: "#ef4444",
        },
      ]

      setEvents(mockEvents)
      setFilteredEvents(mockEvents)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Generate calendar days
  useEffect(() => {
    if (events.length === 0) return

    const days: DayCell[] = []
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Add days from previous month to fill the first week
    const daysFromPrevMonth = firstDayOfWeek
    const prevMonth = new Date(year, month, 0)
    const prevMonthDays = prevMonth.getDate()

    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      const date = new Date(year, month - 1, i)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDate(date),
      })
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDate(date),
      })
    }

    // Add days from next month to complete the grid (6 rows x 7 columns = 42 cells)
    const daysToAdd = 42 - days.length
    for (let i = 1; i <= daysToAdd; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        events: getEventsForDate(date),
      })
    }

    setCalendarDays(days)
  }, [currentDate, events, filteredEvents])

  // Apply filters
  useEffect(() => {
    if (events.length === 0) return

    const filtered = events.filter((event) => {
      // Search filter
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))

      // Type filter
      const matchesType = typeFilter === "all" || event.type === typeFilter

      // Status filter
      const matchesStatus = statusFilter === "all" || event.status === statusFilter

      return matchesSearch && matchesType && matchesStatus
    })

    setFilteredEvents(filtered)
  }, [events, searchTerm, typeFilter, statusFilter])

  // Helper functions
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.date)
      return isSameDay(eventDate, date)
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Event handlers
  const handleDayClick = (day: DayCell) => {
    setSelectedDate(day.date)
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
  }

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "bill":
        return "bg-red-500"
      case "income":
        return "bg-green-500"
      case "reminder":
        return "bg-amber-500"
      case "goal":
        return "bg-blue-500"
      case "appointment":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get event type icon
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "bill":
        return <CreditCard className="h-4 w-4" />
      case "income":
        return <DollarSign className="h-4 w-4" />
      case "reminder":
        return <Bell className="h-4 w-4" />
      case "goal":
        return <CheckCircle className="h-4 w-4" />
      case "appointment":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  // Get event status badge
  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/30"
          >
            Upcoming
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/30"
          >
            Completed
          </Badge>
        )
      case "overdue":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/30"
          >
            Overdue
          </Badge>
        )
      default:
        return null
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setStatusFilter("all")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003366] mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading calendar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400">Track important financial dates and events</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#003366] hover:bg-[#002244]">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Create a new financial event or reminder.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right">
                    Title
                  </label>
                  <Input id="title" placeholder="Event title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="date" className="text-right">
                    Date
                  </label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="type" className="text-right">
                    Type
                  </label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bill">Bill Payment</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="goal">Financial Goal</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="amount" className="text-right">
                    Amount
                  </label>
                  <Input id="amount" type="number" placeholder="0.00" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right">
                    Description
                  </label>
                  <Input id="description" placeholder="Event description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">Recurring</div>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Checkbox id="recurring" />
                    <label htmlFor="recurring">This is a recurring event</label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Calendar Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="bill">Bills</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="reminder">Reminders</SelectItem>
                    <SelectItem value="goal">Goals</SelectItem>
                    <SelectItem value="appointment">Appointments</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon" onClick={resetFilters}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">{formatMonthYear(currentDate)}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <TabsContent value="month" className="mt-0">
            {/* Month View */}
            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              {/* Day names */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="bg-gray-100 dark:bg-gray-800 p-2 text-center text-sm font-medium">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 min-h-[100px] p-1 ${
                    day.isCurrentMonth ? "" : "text-gray-400 dark:text-gray-600"
                  } ${day.isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""} ${
                    isSameDay(day.date, selectedDate || new Date()) ? "ring-2 ring-[#003366] dark:ring-blue-500" : ""
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-sm font-medium ${day.isToday ? "bg-[#003366] dark:bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center" : ""}`}
                    >
                      {day.date.getDate()}
                    </span>
                    {day.events.length > 0 && (
                      <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-700 border-0">
                        {day.events.length}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                    {day.events.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded truncate cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        style={{ borderLeft: `3px solid ${event.color}` }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEventClick(event)
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {day.events.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 p-1">+{day.events.length - 3} more</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="week" className="mt-0">
            {/* Week View */}
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Week view coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="day" className="mt-0">
            {/* Day View */}
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Day view coming soon</p>
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      {/* Selected Date Events */}
      {selectedDate && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>{formatDate(selectedDate)}</CardTitle>
              <CardDescription>{getDayName(selectedDate)}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedDate(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent>
            {getEventsForDate(selectedDate).length === 0 ? (
              <div className="text-center py-6">
                <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No events for this day</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-4">
                  There are no financial events scheduled for this date.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                      <DialogDescription>Create a new financial event or reminder.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Event form would go here */}
                      <p className="text-center text-gray-500 dark:text-gray-400 py-4">Event form placeholder</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Event</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-4">
                {getEventsForDate(selectedDate).map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full ${getEventTypeColor(event.type)} flex items-center justify-center text-white mr-3`}
                        >
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{event.title}</h3>
                            {event.isRecurring && <Repeat className="h-3 w-3 text-blue-500 ml-2" />}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
                            {event.time && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{event.time}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {event.status && getEventStatusBadge(event.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Event
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate Event
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {event.description && (
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 pl-13 ml-10">
                        {event.description}
                      </div>
                    )}

                    {event.amount && (
                      <div className="mt-3 pl-13 ml-10">
                        <Badge
                          variant="outline"
                          className={`${event.type === "income" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"} border-0`}
                        >
                          {event.type === "income" ? "+" : "-"}${event.amount}
                        </Badge>
                      </div>
                    )}

                    {(event.account || event.category) && (
                      <div className="mt-3 flex flex-wrap gap-2 pl-13 ml-10">
                        {event.account && (
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                          >
                            {event.account}
                          </Badge>
                        )}
                        {event.category && (
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                          >
                            {event.category}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Selected Event Details */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                {formatDate(new Date(selectedEvent.date))}
                {selectedEvent.time && ` at ${selectedEvent.time}`}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center mb-4">
                <div
                  className={`w-10 h-10 rounded-full ${getEventTypeColor(selectedEvent.type)} flex items-center justify-center text-white mr-3`}
                >
                  {getEventTypeIcon(selectedEvent.type)}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">
                      {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                    </h3>
                    {selectedEvent.isRecurring && (
                      <div className="flex items-center ml-2">
                        <Repeat className="h-3 w-3 text-blue-500 mr-1" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedEvent.recurrencePattern?.charAt(0).toUpperCase() +
                            selectedEvent.recurrencePattern?.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  {selectedEvent.status && getEventStatusBadge(selectedEvent.status)}
                </div>
              </div>

              {selectedEvent.description && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h4>
                  <p className="text-gray-900 dark:text-gray-100">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.amount && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Amount</h4>
                  <p
                    className={`font-medium ${selectedEvent.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {selectedEvent.type === "income" ? "+" : "-"}${selectedEvent.amount}
                  </p>
                </div>
              )}

              {selectedEvent.account && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Account</h4>
                  <p className="text-gray-900 dark:text-gray-100">{selectedEvent.account}</p>
                </div>
              )}

              {selectedEvent.category && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</h4>
                  <p className="text-gray-900 dark:text-gray-100">{selectedEvent.category}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Button>
              <Button className="bg-[#003366] hover:bg-[#002244]">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Upcoming Financial Events</CardTitle>
            <CardDescription>Your next scheduled financial activities</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter((event) => event.status === "upcoming")
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full ${getEventTypeColor(event.type)} flex items-center justify-center text-white mr-3`}
                    >
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{event.title}</h3>
                        {event.isRecurring && <Repeat className="h-3 w-3 text-blue-500 ml-2" />}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(new Date(event.date))}
                        {event.time && ` at ${event.time}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {event.amount && (
                      <span
                        className={`font-medium mr-4 ${event.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {event.type === "income" ? "+" : "-"}${event.amount}
                      </span>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleEventClick(event)}>
                      View
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

