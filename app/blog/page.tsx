"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Calendar,
  User,
  Search,
  X,
  Clock,
  Bookmark,
  BookmarkCheck,
  Share2,
  TrendingUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Tag,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content?: string
  image: string
  date: string
  author: {
    name: string
    avatar: string
    role?: string
  }
  category: string
  tags: string[]
  readTime: number
  views?: number
  likes?: number
  isTrending?: boolean
  isFeatured?: boolean
}

export default function BlogPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [tagFilters, setTagFilters] = useState<string[]>([])
  const [dateFilter, setDateFilter] = useState("all")
  const [readTimeFilter, setReadTimeFilter] = useState([0, 15])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [savedPosts, setSavedPosts] = useState<number[]>([])
  const [activeView, setActiveView] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "How AI is Revolutionizing Credit Scoring in Emerging Markets",
      excerpt:
        "Traditional credit scoring methods exclude millions. Learn how AI is changing the game by analyzing alternative data points to create accurate credit profiles for those without traditional credit histories.",
      image: "/placeholder.svg?height=600&width=800",
      date: "March 15, 2023",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "AI Research Lead",
      },
      category: "Technology",
      tags: ["AI", "Credit Scoring", "Financial Inclusion"],
      readTime: 5,
      views: 1240,
      likes: 89,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: 2,
      title: "The Impact of Solar Irrigation on Small-Scale Farming",
      excerpt:
        "Solar-powered irrigation systems are transforming agriculture in rural communities. Discover how climate financing is making this technology accessible to farmers who previously relied on unpredictable rainfall patterns.",
      image: "/placeholder.svg?height=600&width=800",
      date: "April 2, 2023",
      author: {
        name: "David Mwanza",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Climate Finance Specialist",
      },
      category: "Climate Finance",
      tags: ["Sustainable Agriculture", "Solar Energy", "Climate Finance"],
      readTime: 7,
      views: 856,
      likes: 67,
      isTrending: false,
    },
    {
      id: 3,
      title: "Blockchain and Financial Inclusion: A Perfect Match",
      excerpt:
        "Blockchain technology is removing barriers to financial services. Learn how it's creating transparent, secure, and accessible financial ecosystems for the unbanked and underbanked populations worldwide.",
      image: "/placeholder.svg?height=600&width=800",
      date: "May 10, 2023",
      author: {
        name: "Michael Banda",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Blockchain Developer",
      },
      category: "Blockchain",
      tags: ["Blockchain", "Cryptocurrency", "Financial Inclusion"],
      readTime: 6,
      views: 1560,
      likes: 124,
      isTrending: true,
    },
    {
      id: 4,
      title: "Women Entrepreneurs: Breaking Barriers with Financial Access",
      excerpt:
        "Women entrepreneurs face unique challenges in accessing finance. See how innovative financial solutions are helping them overcome these obstacles and build successful businesses in traditionally male-dominated sectors.",
      image: "/placeholder.svg?height=600&width=800",
      date: "June 8, 2023",
      author: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Gender Equality Advocate",
      },
      category: "Financial Inclusion",
      tags: ["Women Entrepreneurs", "Gender Equality", "Microfinance"],
      readTime: 8,
      views: 932,
      likes: 78,
      isTrending: false,
    },
    {
      id: 5,
      title: "The Future of Banking in Africa: Digital and Inclusive",
      excerpt:
        "Traditional banking is being disrupted by digital solutions. Explore how this transformation is creating opportunities for financial inclusion across the African continent, reaching previously underserved communities.",
      image: "/placeholder.svg?height=600&width=800",
      date: "July 22, 2023",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "AI Research Lead",
      },
      category: "Digital Banking",
      tags: ["Digital Banking", "Mobile Money", "Africa"],
      readTime: 6,
      views: 1120,
      likes: 93,
      isTrending: true,
    },
    {
      id: 6,
      title: "Carbon Credits: A New Revenue Stream for Rural Communities",
      excerpt:
        "Carbon credit markets are opening up new opportunities. Learn how rural communities can benefit from sustainable practices that generate credits, creating economic incentives for environmental conservation.",
      image: "/placeholder.svg?height=600&width=800",
      date: "August 15, 2023",
      author: {
        name: "David Mwanza",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Climate Finance Specialist",
      },
      category: "Climate Finance",
      tags: ["Carbon Credits", "Sustainability", "Rural Development"],
      readTime: 5,
      views: 745,
      likes: 62,
      isTrending: false,
    },
    {
      id: 7,
      title: "Mobile Money: The Gateway to Financial Services",
      excerpt:
        "Mobile money has transformed how people access financial services in developing countries. Discover how this technology is bridging the gap between the unbanked and the formal financial system.",
      image: "/placeholder.svg?height=600&width=800",
      date: "September 5, 2023",
      author: {
        name: "James Okonjo",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Mobile Banking Expert",
      },
      category: "Digital Banking",
      tags: ["Mobile Money", "Financial Services", "Digital Inclusion"],
      readTime: 4,
      views: 890,
      likes: 71,
      isTrending: false,
    },
    {
      id: 8,
      title: "Microfinance 2.0: Technology-Enabled Lending for the Underserved",
      excerpt:
        "Microfinance institutions are leveraging technology to reach more clients. Learn how digital tools are making microloans more accessible, affordable, and impactful for small businesses.",
      image: "/placeholder.svg?height=600&width=800",
      date: "October 12, 2023",
      author: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Gender Equality Advocate",
      },
      category: "Financial Inclusion",
      tags: ["Microfinance", "Digital Lending", "Small Business"],
      readTime: 7,
      views: 680,
      likes: 54,
      isTrending: false,
    },
    {
      id: 9,
      title: "The Role of Data in Sustainable Development Finance",
      excerpt:
        "Data-driven decision making is transforming sustainable development finance. Explore how better data collection and analysis are leading to more effective allocation of resources and measurable impact.",
      image: "/placeholder.svg?height=600&width=800",
      date: "November 8, 2023",
      author: {
        name: "Michael Banda",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Blockchain Developer",
      },
      category: "Technology",
      tags: ["Data Analytics", "Sustainable Development", "Impact Measurement"],
      readTime: 9,
      views: 1050,
      likes: 88,
      isTrending: true,
    },
    {
      id: 10,
      title: "Green Bonds: Financing the Transition to Clean Energy",
      excerpt:
        "Green bonds are becoming an important tool for financing renewable energy projects. Learn how these financial instruments are mobilizing capital for the transition to a low-carbon economy.",
      image: "/placeholder.svg?height=600&width=800",
      date: "December 1, 2023",
      author: {
        name: "David Mwanza",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Climate Finance Specialist",
      },
      category: "Climate Finance",
      tags: ["Green Bonds", "Renewable Energy", "Sustainable Finance"],
      readTime: 6,
      views: 920,
      likes: 76,
      isTrending: false,
    },
  ]

  // Get unique categories and tags
  const categories = ["all", ...Array.from(new Set(blogPosts.map((post) => post.category)))]
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  // Featured post is the first one marked as featured
  const featuredPost = blogPosts.find((post) => post.isFeatured) || blogPosts[0]

  // Trending posts
  const trendingPosts = blogPosts.filter((post) => post.isTrending).slice(0, 3)

  // Initialize filtered posts with all posts
  useEffect(() => {
    setFilteredPosts(blogPosts)
  }, [])

  // Handle search and filtering
  const handleSearch = () => {
    setIsSearching(true)
    setShowSuggestions(false)

    setTimeout(() => {
      const filtered = blogPosts.filter((post) => {
        // Search term filter
        const matchesSearch =
          searchTerm === "" ||
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          post.author.name.toLowerCase().includes(searchTerm.toLowerCase())

        // Category filter
        const matchesCategory = categoryFilter === "all" || post.category === categoryFilter

        // Tags filter
        const matchesTags = tagFilters.length === 0 || tagFilters.some((tag) => post.tags.includes(tag))

        // Date filter
        const postDate = new Date(post.date)
        let matchesDate = true

        if (dateFilter === "last-month") {
          const oneMonthAgo = new Date()
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
          matchesDate = postDate >= oneMonthAgo
        } else if (dateFilter === "last-3-months") {
          const threeMonthsAgo = new Date()
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
          matchesDate = postDate >= threeMonthsAgo
        } else if (dateFilter === "last-year") {
          const oneYearAgo = new Date()
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
          matchesDate = postDate >= oneYearAgo
        }

        // Read time filter
        const matchesReadTime = post.readTime >= readTimeFilter[0] && post.readTime <= readTimeFilter[1]

        // Tab filter
        const matchesTab =
          activeTab === "all" ||
          (activeTab === "trending" && post.isTrending) ||
          (activeTab === "saved" && savedPosts.includes(post.id))

        return matchesSearch && matchesCategory && matchesTags && matchesDate && matchesReadTime && matchesTab
      })

      setFilteredPosts(filtered)
      setIsSearching(false)
    }, 500)
  }

  // Handle search suggestions
  useEffect(() => {
    if (searchTerm.length > 2) {
      // Generate suggestions based on post titles, tags, and categories
      const titleSuggestions = blogPosts
        .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((post) => post.title)
        .slice(0, 3)

      const tagSuggestions = Array.from(
        new Set(
          blogPosts.flatMap((post) => post.tags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
        ),
      ).slice(0, 3)

      const categorySuggestions = Array.from(
        new Set(
          blogPosts
            .filter((post) => post.category.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((post) => post.category),
        ),
      ).slice(0, 2)

      const authorSuggestions = Array.from(
        new Set(
          blogPosts
            .filter((post) => post.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((post) => `Author: ${post.author.name}`),
        ),
      ).slice(0, 2)

      const allSuggestions = [
        ...titleSuggestions,
        ...tagSuggestions,
        ...categorySuggestions,
        ...authorSuggestions,
      ].slice(0, 5)

      setSearchSuggestions(allSuggestions)
      setShowSuggestions(allSuggestions.length > 0)
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm])

  // Handle tag selection
  const toggleTagFilter = (tag: string) => {
    setTagFilters((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Handle save/bookmark post
  const toggleSavePost = (postId: number) => {
    setSavedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))

    toast({
      title: savedPosts.includes(postId) ? "Post removed from bookmarks" : "Post saved to bookmarks",
      description: savedPosts.includes(postId)
        ? "You can always save it again later."
        : "You can find it in your saved posts.",
      duration: 3000,
    })
  }

  // Handle share post
  const handleSharePost = (post: BlogPost) => {
    // In a real app, this would use the Web Share API or copy to clipboard
    toast({
      title: "Share link copied!",
      description: `Link to "${post.title}" has been copied to clipboard.`,
      duration: 3000,
    })
  }

  // Handle load more posts
  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 6, filteredPosts.length))
  }

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Apply filters when they change
  useEffect(() => {
    handleSearch()
  }, [categoryFilter, tagFilters, dateFilter, readTimeFilter, activeTab])

  // Reset visible posts count when filtered posts change
  useEffect(() => {
    setVisiblePosts(6)
  }, [filteredPosts])

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#003366] to-[#002244] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white bg-grid-8 opacity-10"></div>
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[140%] bg-[#00CC66]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[140%] bg-[#00CC66]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <Badge className="mb-4 bg-[#00CC66] hover:bg-[#00BB55] text-white px-3 py-1 text-sm">
                Pollen AI Blog
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                Insights for a <span className="text-[#00CC66]">Financially Inclusive</span> Future
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl">
                Explore the latest trends, insights, and stories about financial inclusion, technology, and sustainable
                development from our experts.
              </p>

              <div className="relative max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    ref={searchInputRef}
                    placeholder="Search articles, topics, or authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => searchTerm.length > 2 && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="pl-10 pr-10 py-6 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:border-[#00CC66] rounded-full"
                  />
                  {searchTerm && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                      onClick={() => {
                        setSearchTerm("")
                        setFilteredPosts(blogPosts)
                      }}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Search suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden">
                    <ul className="py-2">
                      {searchSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            if (suggestion.startsWith("Author: ")) {
                              setSearchTerm(suggestion.replace("Author: ", ""))
                            } else {
                              setSearchTerm(suggestion)
                            }
                            setShowSuggestions(false)
                            setTimeout(() => handleSearch(), 100)
                          }}
                        >
                          <span className="text-gray-800 dark:text-gray-200">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-white/70">Popular:</span>
                {["AI", "Financial Inclusion", "Climate Finance", "Blockchain"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(tag)
                      handleSearch()
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative h-[400px] w-full perspective-1000">
                <div className="absolute top-0 left-0 w-full h-full rotate-y-[8deg] shadow-2xl rounded-xl overflow-hidden transform-gpu preserve-3d">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt="Featured blog post"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <Badge className="mb-2 bg-[#00CC66]">Featured</Badge>
                    <h3 className="text-xl font-bold text-white mb-2">{featuredPost.title}</h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredPost.date}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{featuredPost.author.name}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-10 -right-10 w-[60%] h-[60%] rotate-y-[-8deg] shadow-xl rounded-xl overflow-hidden transform-gpu preserve-3d">
                  <Image src={blogPosts[2].image || "/placeholder.svg"} alt="Blog post" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-sm font-bold text-white">{blogPosts[2].title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Controls and Filters */}
          <div className="mb-8 flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-[#003366] dark:text-white">Blog Posts</h2>
                <Badge className="bg-[#00CC66]">{filteredPosts.length}</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="dark-mode" className="text-sm text-gray-600 dark:text-gray-300">
                    Dark Mode
                  </Label>
                  <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                </div>

                <div className="flex border rounded-md overflow-hidden">
                  <button
                    className={cn(
                      "px-3 py-2 text-sm",
                      activeView === "grid"
                        ? "bg-[#003366] text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300",
                    )}
                    onClick={() => setActiveView("grid")}
                  >
                    Grid
                  </button>
                  <button
                    className={cn(
                      "px-3 py-2 text-sm",
                      activeView === "list"
                        ? "bg-[#003366] text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300",
                    )}
                    onClick={() => setActiveView("list")}
                  >
                    List
                  </button>
                </div>

                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {(categoryFilter !== "all" ||
                    tagFilters.length > 0 ||
                    dateFilter !== "all" ||
                    readTimeFilter[0] !== 0 ||
                    readTimeFilter[1] !== 15) && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-[#00CC66]">
                      {(categoryFilter !== "all" ? 1 : 0) +
                        (tagFilters.length > 0 ? 1 : 0) +
                        (dateFilter !== "all" ? 1 : 0) +
                        (readTimeFilter[0] !== 0 || readTimeFilter[1] !== 15 ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full max-w-md mx-auto md:mx-0 grid grid-cols-3">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white">
                  All Posts
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-[#003366] data-[state=active]:text-white"
                >
                  Trending
                </TabsTrigger>
                <TabsTrigger value="saved" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white">
                  Saved ({savedPosts.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Category Filter */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</h3>
                      <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category === "all" ? "All Categories" : category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tags Filter */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</h3>
                      <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-2 scrollbar-hide">
                        {allTags.map((tag) => (
                          <div key={tag} className="flex items-center">
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={tagFilters.includes(tag)}
                              onCheckedChange={() => toggleTagFilter(tag)}
                              className="mr-2"
                            />
                            <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer">
                              {tag}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Date Filter */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</h3>
                      <Select value={dateFilter} onValueChange={(value) => setDateFilter(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="last-month">Last Month</SelectItem>
                          <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                          <SelectItem value="last-year">Last Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Read Time Filter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Read Time</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {readTimeFilter[0]}-{readTimeFilter[1]} min
                        </span>
                      </div>
                      <Slider
                        value={readTimeFilter}
                        min={0}
                        max={15}
                        step={1}
                        onValueChange={setReadTimeFilter}
                        className="my-4"
                      />
                    </div>

                    {/* Filter Actions */}
                    <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-2 pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCategoryFilter("all")
                          setTagFilters([])
                          setDateFilter("all")
                          setReadTimeFilter([0, 15])
                        }}
                      >
                        Reset Filters
                      </Button>
                      <Button size="sm" className="bg-[#003366] hover:bg-[#002244]" onClick={handleSearch}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trending Posts Section */}
          {activeTab === "all" && (
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-5 w-5 text-[#00CC66] mr-2" />
                <h3 className="text-xl font-bold text-[#003366] dark:text-white">Trending Now</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                      <div className="relative h-48">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#00CC66] hover:bg-[#00BB55]">Trending</Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white"
                                  onClick={() => toggleSavePost(post.id)}
                                >
                                  {savedPosts.includes(post.id) ? (
                                    <BookmarkCheck className="h-4 w-4" />
                                  ) : (
                                    <Bookmark className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {savedPosts.includes(post.id) ? "Saved" : "Save for later"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white"
                                  onClick={() => handleSharePost(post)}
                                >
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Share</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <Badge
                            variant="outline"
                            className="mr-2 bg-[#003366]/10 text-[#003366] dark:bg-[#003366]/20 dark:text-[#00CC66] border-[#003366]/20"
                          >
                            {post.category}
                          </Badge>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-3 hover:text-[#00CC66] dark:hover:text-[#00CC66] transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                              <Image
                                src={post.author.avatar || "/placeholder.svg"}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {post.author.name}
                              </span>
                              {post.author.role && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime} min</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-[#00CC66] hover:text-[#00BB55] font-medium flex items-center"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Main Blog Posts */}
          {isSearching ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00CC66]"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="mb-4">
                <Search className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#003366] dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We couldn't find any articles matching your search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setTagFilters([])
                  setDateFilter("all")
                  setReadTimeFilter([0, 15])
                  setFilteredPosts(blogPosts)
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {activeView === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                        <div className="relative h-48">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {post.isTrending && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-[#00CC66] hover:bg-[#00BB55]">Trending</Badge>
                            </div>
                          )}
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white"
                                    onClick={() => toggleSavePost(post.id)}
                                  >
                                    {savedPosts.includes(post.id) ? (
                                      <BookmarkCheck className="h-4 w-4" />
                                    ) : (
                                      <Bookmark className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {savedPosts.includes(post.id) ? "Saved" : "Save for later"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white"
                                    onClick={() => handleSharePost(post)}
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Share</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <Badge
                              variant="outline"
                              className="mr-2 bg-[#003366]/10 text-[#003366] dark:bg-[#003366]/20 dark:text-[#00CC66] border-[#003366]/20"
                            >
                              {post.category}
                            </Badge>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <Link href={`/blog/${post.id}`}>
                            <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-3 hover:text-[#00CC66] dark:hover:text-[#00CC66] transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                                <Image
                                  src={post.author.avatar || "/placeholder.svg"}
                                  alt={post.author.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {post.author.name}
                                </span>
                                {post.author.role && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{post.readTime} min</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="px-6 pb-6 pt-0">
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-[#00CC66] hover:text-[#00BB55] font-medium flex items-center"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6 mb-12">
                  {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="relative h-48 md:h-full">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                            {post.isTrending && (
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-[#00CC66] hover:bg-[#00BB55]">Trending</Badge>
                              </div>
                            )}
                          </div>
                          <div className="md:col-span-2 p-6">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <Badge
                                  variant="outline"
                                  className="mr-2 bg-[#003366]/10 text-[#003366] dark:bg-[#003366]/20 dark:text-[#00CC66] border-[#003366]/20"
                                >
                                  {post.category}
                                </Badge>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{post.date}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => toggleSavePost(post.id)}
                                      >
                                        {savedPosts.includes(post.id) ? (
                                          <BookmarkCheck className="h-4 w-4 text-[#00CC66]" />
                                        ) : (
                                          <Bookmark className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {savedPosts.includes(post.id) ? "Saved" : "Save for later"}
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => handleSharePost(post)}
                                      >
                                        <Share2 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Share</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <Link href={`/blog/${post.id}`}>
                              <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-3 hover:text-[#00CC66] dark:hover:text-[#00CC66] transition-colors">
                                {post.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600 cursor-pointer"
                                  onClick={() => {
                                    if (!tagFilters.includes(tag)) {
                                      toggleTagFilter(tag)
                                      handleSearch()
                                    }
                                  }}
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                                  <Image
                                    src={post.author.avatar || "/placeholder.svg"}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {post.author.name}
                                  </span>
                                  {post.author.role && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{post.readTime} min read</span>
                                </div>
                                <Link
                                  href={`/blog/${post.id}`}
                                  className="text-[#00CC66] hover:text-[#00BB55] font-medium flex items-center"
                                >
                                  Read More
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {visiblePosts < filteredPosts.length && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white dark:border-[#00CC66] dark:text-[#00CC66] dark:hover:bg-[#00CC66] dark:hover:text-white"
                    onClick={loadMorePosts}
                  >
                    Load More Articles
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Featured Author Section */}
          <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="relative w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-[#00CC66]">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Featured Author"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <Badge className="mb-2 bg-[#00CC66]">Featured Author</Badge>
                <h3 className="text-2xl font-bold text-[#003366] dark:text-white mb-2">Sarah Johnson</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sarah is our AI Research Lead with over 10 years of experience in machine learning and financial
                  technology. She specializes in developing AI solutions for credit scoring and financial inclusion.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                    AI Expert
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                    Financial Inclusion
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700">
                    Machine Learning
                  </Badge>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white dark:border-[#00CC66] dark:text-[#00CC66] dark:hover:bg-[#00CC66] dark:hover:text-white"
                  >
                    View All Articles
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#003366] to-[#002244] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-[#00CC66] hover:bg-[#00BB55] px-3 py-1">Stay Updated</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-white/80 mb-8 md:text-lg">
                Get the latest insights, news, and stories about financial inclusion and technology delivered directly
                to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Your email address"
                  type="email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#00CC66]"
                />
                <Button className="bg-[#00CC66] hover:bg-[#00BB55] text-white">Subscribe</Button>
              </div>
              <p className="text-white/60 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-[#00CC66] mr-2"></div>
                  <span className="text-sm">Weekly Updates</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-[#00CC66] mr-2"></div>
                  <span className="text-sm">Exclusive Content</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-[#00CC66] mr-2"></div>
                  <span className="text-sm">No Spam</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Topics Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003366] dark:text-white mb-4">
              Explore Related Topics
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dive deeper into the subjects that matter most to you with our curated topic collections.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Financial Inclusion",
              "Climate Finance",
              "Blockchain",
              "AI & Technology",
              "Digital Banking",
              "Sustainable Development",
              "Gender Equality",
              "Rural Development",
            ].map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/blog/topic/${topic.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center h-full flex flex-col items-center justify-center hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#00CC66]/20">
                    <h3 className="text-lg font-semibold text-[#003366] dark:text-white mb-2">{topic}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.floor(Math.random() * 20) + 5} articles
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Page</span>
              <Input className="w-16 h-8 text-center" defaultValue="1" />
              <span className="text-sm text-gray-500 dark:text-gray-400">of 10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

