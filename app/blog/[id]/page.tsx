"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Bookmark,
  BookmarkCheck,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ThumbsUp,
  MessageSquare,
  Tag,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: {
    name: string
    avatar: string
    role?: string
    bio?: string
  }
  category: string
  tags: string[]
  readTime: number
  views?: number
  likes?: number
  comments?: number
  isTrending?: boolean
  isFeatured?: boolean
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("article")
  const [commentText, setCommentText] = useState("")

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "How AI is Revolutionizing Credit Scoring in Emerging Markets",
      excerpt:
        "Traditional credit scoring methods exclude millions. Learn how AI is changing the game by analyzing alternative data points to create accurate credit profiles.",
      content: `
        <h2>The Problem with Traditional Credit Scoring</h2>
        <p>In emerging markets, traditional credit scoring systems exclude millions of people from accessing financial services. These systems rely heavily on credit history, formal employment records, and banking relationships – factors that many in developing economies simply don't have.</p>
        <p>This creates a paradoxical situation: without access to credit, individuals cannot build the credit history needed to access financial services in the future. This cycle of exclusion disproportionately affects:</p>
        <ul>
          <li>Small business owners in informal sectors</li>
          <li>Rural communities with limited banking infrastructure</li>
          <li>Young adults without established credit histories</li>
          <li>Women, who in many regions have less access to formal financial services</li>
        </ul>
        
        <h2>How AI is Changing the Game</h2>
        <p>Artificial intelligence and machine learning technologies are now enabling financial institutions to look beyond traditional credit data. By analyzing alternative data points, AI can create accurate risk profiles for individuals who would otherwise be invisible to the financial system.</p>
        <p>These alternative data sources include:</p>
        <ul>
          <li>Mobile phone usage patterns</li>
          <li>Digital payment histories (even small transactions)</li>
          <li>Utility bill payment records</li>
          <li>Social media activity and connections</li>
          <li>Psychometric testing results</li>
          <li>Behavioral data from smartphone apps</li>
        </ul>
        
        <h2>Real-World Impact</h2>
        <p>The results of AI-powered credit scoring are already showing promising results across multiple regions:</p>
        <p>In Kenya, a mobile lending platform using AI algorithms has provided over $2.5 billion in microloans to individuals and small businesses who would not qualify under traditional scoring methods. Default rates remain comparable to traditional bank loans, despite serving a supposedly "higher-risk" population.</p>
        <p>In India, a fintech startup analyzes over 10,000 data points per user – including smartphone metadata and behavioral patterns – to create credit scores for first-time borrowers. They've successfully extended credit to over 5 million previously unbanked individuals.</p>
        
        <h2>Ethical Considerations</h2>
        <p>While the potential of AI in credit scoring is enormous, it also raises important ethical questions:</p>
        <ul>
          <li>Data privacy and consent – ensuring individuals understand what data is being collected and how it's used</li>
          <li>Algorithmic bias – preventing AI systems from perpetuating or amplifying existing social biases</li>
          <li>Transparency – making sure credit decisions remain explainable and contestable</li>
          <li>Regulatory frameworks – developing appropriate oversight for these new technologies</li>
        </ul>
        
        <h2>The Future of AI in Financial Inclusion</h2>
        <p>As AI technologies continue to evolve, we can expect even more sophisticated approaches to credit scoring. Future developments may include:</p>
        <ul>
          <li>Hyper-personalized credit products tailored to individual needs and circumstances</li>
          <li>Real-time credit scoring that adjusts as new data becomes available</li>
          <li>Blockchain-based credit systems that allow individuals to control and monetize their own financial data</li>
          <li>Integration with digital identity solutions to further expand access</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>AI-powered credit scoring represents one of the most promising pathways to financial inclusion in emerging markets. By looking beyond traditional data sources, these technologies can help bridge the gap between the financial system and the billions of people currently excluded from it.</p>
        <p>The challenge now is to ensure these powerful tools are deployed responsibly, with appropriate safeguards for privacy, fairness, and transparency. If we get this right, AI could help unlock economic opportunity for millions of people worldwide.</p>
      `,
      image: "/placeholder.svg?height=600&width=800",
      date: "March 15, 2023",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "AI Research Lead",
        bio: "Sarah is our AI Research Lead with over 10 years of experience in machine learning and financial technology. She specializes in developing AI solutions for credit scoring and financial inclusion.",
      },
      category: "Technology",
      tags: ["AI", "Credit Scoring", "Financial Inclusion", "Machine Learning", "Fintech"],
      readTime: 8,
      views: 1240,
      likes: 89,
      comments: 24,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: 2,
      title: "The Impact of Solar Irrigation on Small-Scale Farming",
      excerpt:
        "Solar-powered irrigation systems are transforming agriculture in rural communities. Discover how climate financing is making this technology accessible.",
      content: "Full article content here...",
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
      comments: 18,
      isTrending: false,
    },
    {
      id: 3,
      title: "Blockchain and Financial Inclusion: A Perfect Match",
      excerpt:
        "Blockchain technology is removing barriers to financial services. Learn how it's creating transparent, secure, and accessible financial ecosystems.",
      content: "Full article content here...",
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
      comments: 32,
      isTrending: true,
    },
  ]

  // Sample comments data
  const comments = [
    {
      id: 1,
      author: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      date: "March 16, 2023",
      content:
        "This is a fascinating article! I've been following the developments in AI credit scoring for a while, and it's amazing to see the real-world impact it's having in emerging markets.",
      likes: 12,
      replies: [
        {
          id: 101,
          author: {
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=100&width=100",
            isAuthor: true,
          },
          date: "March 16, 2023",
          content:
            "Thank you, John! I'm glad you found it interesting. The field is evolving rapidly, and we're seeing new applications emerge every month.",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      author: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      date: "March 17, 2023",
      content:
        "I work with a microfinance institution in Colombia, and we're just starting to explore AI for credit scoring. This article provides a great overview of the potential benefits and challenges. Would love to connect and learn more about implementation strategies.",
      likes: 8,
      replies: [],
    },
    {
      id: 3,
      author: {
        name: "Robert Chen",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      date: "March 18, 2023",
      content:
        "The ethical considerations section is particularly important. As we rush to implement these technologies, we need to ensure we're not creating new forms of exclusion or bias. I'd be interested in hearing more about how organizations are addressing algorithmic bias in practice.",
      likes: 15,
      replies: [],
    },
  ]

  // Fetch post data
  useEffect(() => {
    const postId = Number(params.id)

    // Simulate API call
    setTimeout(() => {
      const foundPost = blogPosts.find((p) => p.id === postId)

      if (foundPost) {
        setPost(foundPost)

        // Find related posts (same category or tags)
        const related = blogPosts
          .filter(
            (p) =>
              p.id !== postId &&
              (p.category === foundPost.category || p.tags.some((tag) => foundPost.tags.includes(tag))),
          )
          .slice(0, 3)

        setRelatedPosts(related)
      } else {
        // Post not found, redirect to blog page
        router.push("/blog")
      }

      setIsLoading(false)
    }, 1000)
  }, [params.id, router])

  // Handle scroll for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle save/bookmark post
  const toggleSavePost = () => {
    setIsSaved(!isSaved)

    toast({
      title: isSaved ? "Post removed from bookmarks" : "Post saved to bookmarks",
      description: isSaved ? "You can always save it again later." : "You can find it in your saved posts.",
      duration: 3000,
    })
  }

  // Handle like post
  const toggleLikePost = () => {
    setIsLiked(!isLiked)

    if (post) {
      // Update likes count
      setPost({
        ...post,
        likes: isLiked ? (post.likes || 0) - 1 : (post.likes || 0) + 1,
      })
    }
  }

  // Handle share post
  const handleShare = (platform: string) => {
    // In a real app, this would use the Web Share API or copy to clipboard
    toast({
      title: `Shared on ${platform}!`,
      description: platform === "Copy Link" ? "Link copied to clipboard." : `Article shared on ${platform}.`,
      duration: 3000,
    })
  }

  // Handle submit comment
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (commentText.trim()) {
      toast({
        title: "Comment submitted!",
        description: "Your comment has been submitted for review.",
        duration: 3000,
      })

      setCommentText("")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00CC66]"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#003366]">Post not found</h2>
          <p className="text-gray-600 mb-4">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/blog")} className="bg-[#003366] hover:bg-[#002244]">
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div className="h-full bg-[#00CC66]" style={{ width: `${readingProgress}%` }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 bg-gradient-to-br from-[#003366] to-[#002244] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white bg-grid-8 opacity-10"></div>
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[140%] bg-[#00CC66]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[140%] bg-[#00CC66]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10"
                onClick={() => router.push("/blog")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-[#00CC66] hover:bg-[#00BB55] px-3 py-1">{post.category}</Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center text-white/80 text-sm mb-8 gap-y-2">
                <div className="flex items-center mr-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center mr-6">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center mr-6">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{post.likes} likes</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{post.comments} comments</span>
                </div>
              </div>

              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4 border-2 border-[#00CC66]">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-white">{post.author.name}</div>
                  {post.author.role && <div className="text-sm text-white/70">{post.author.role}</div>}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="relative -mt-16 mb-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar - Social Share */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 flex lg:flex-col items-center justify-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full h-10 w-10 border-gray-200 hover:bg-[#003366] hover:text-white hover:border-[#003366]"
                  onClick={() => handleShare("Facebook")}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full h-10 w-10 border-gray-200 hover:bg-[#003366] hover:text-white hover:border-[#003366]"
                  onClick={() => handleShare("Twitter")}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full h-10 w-10 border-gray-200 hover:bg-[#003366] hover:text-white hover:border-[#003366]"
                  onClick={() => handleShare("LinkedIn")}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full h-10 w-10 border-gray-200 hover:bg-[#003366] hover:text-white hover:border-[#003366]"
                  onClick={() => handleShare("Copy Link")}
                >
                  <Copy className="h-5 w-5" />
                </Button>
                <Separator className="hidden lg:block w-8 h-[1px] my-2" />
                <Button
                  size="icon"
                  variant={isSaved ? "default" : "outline"}
                  className={`rounded-full h-10 w-10 ${
                    isSaved
                      ? "bg-[#00CC66] hover:bg-[#00BB55] text-white border-[#00CC66]"
                      : "border-gray-200 hover:bg-[#00CC66] hover:text-white hover:border-[#00CC66]"
                  }`}
                  onClick={toggleSavePost}
                >
                  {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </Button>
                <Button
                  size="icon"
                  variant={isLiked ? "default" : "outline"}
                  className={`rounded-full h-10 w-10 ${
                    isLiked
                      ? "bg-[#00CC66] hover:bg-[#00BB55] text-white border-[#00CC66]"
                      : "border-gray-200 hover:bg-[#00CC66] hover:text-white hover:border-[#00CC66]"
                  }`}
                  onClick={toggleLikePost}
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger
                    value="article"
                    className="data-[state=active]:bg-[#003366] data-[state=active]:text-white"
                  >
                    Article
                  </TabsTrigger>
                  <TabsTrigger
                    value="comments"
                    className="data-[state=active]:bg-[#003366] data-[state=active]:text-white"
                  >
                    Comments ({comments.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="article" className="mt-6">
                  <article className="prose prose-lg max-w-none prose-headings:text-[#003366] prose-a:text-[#00CC66] prose-a:no-underline hover:prose-a:underline">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </article>

                  <div className="mt-12 flex flex-wrap gap-2">
                    <span className="text-gray-600">Tags:</span>
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Badge
                          variant="outline"
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 cursor-pointer"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  <Separator className="my-12" />

                  {/* Author Bio */}
                  <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <Avatar className="h-24 w-24 border-4 border-[#00CC66]">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold text-[#003366] mb-2">{post.author.name}</h3>
                        {post.author.role && <p className="text-gray-600 mb-4">{post.author.role}</p>}
                        {post.author.bio && <p className="text-gray-700">{post.author.bio}</p>}
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">
                            Follow
                          </Button>
                          <Button size="sm" className="bg-[#003366] hover:bg-[#002244]">
                            View All Articles
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="mt-6">
                  {/* Comment Form */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#003366] mb-4">Leave a Comment</h3>
                    <form onSubmit={handleSubmitComment}>
                      <textarea
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CC66] focus:border-transparent"
                        rows={4}
                        placeholder="Share your thoughts..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      ></textarea>
                      <div className="mt-2 flex justify-end">
                        <Button
                          type="submit"
                          className="bg-[#003366] hover:bg-[#002244]"
                          disabled={!commentText.trim()}
                        >
                          Post Comment
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-medium text-gray-900">{comment.author.name}</span>
                                {comment.author.isAuthor && <Badge className="ml-2 bg-[#00CC66]">Author</Badge>}
                                <span className="text-sm text-gray-500 ml-2">{comment.date}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {comment.likes}
                              </Button>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                            <div className="mt-3 flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 px-3 text-sm">
                                Reply
                              </Button>
                            </div>

                            {/* Replies */}
                            {comment.replies.length > 0 && (
                              <div className="mt-4 pl-6 border-l-2 border-gray-200 space-y-4">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="bg-white rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                        <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center mb-1">
                                          <span className="font-medium text-gray-900">{reply.author.name}</span>
                                          {reply.author.isAuthor && (
                                            <Badge className="ml-2 bg-[#00CC66] text-xs">Author</Badge>
                                          )}
                                          <span className="text-sm text-gray-500 ml-2">{reply.date}</span>
                                        </div>
                                        <p className="text-gray-700 text-sm">{reply.content}</p>
                                        <Button variant="ghost" size="sm" className="h-6 px-2 mt-1">
                                          <ThumbsUp className="h-3 w-3 mr-1" />
                                          {reply.likes}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Related Posts */}
            <div className="lg:col-span-3 order-3">
              <div className="lg:sticky lg:top-24 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Card key={relatedPost.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="relative h-24">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="col-span-2 p-3">
                            <Badge variant="outline" className="mb-1 text-xs">
                              {relatedPost.category}
                            </Badge>
                            <Link href={`/blog/${relatedPost.id}`}>
                              <h4 className="font-medium text-[#003366] hover:text-[#00CC66] transition-colors line-clamp-2 text-sm">
                                {relatedPost.title}
                              </h4>
                            </Link>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{relatedPost.readTime} min read</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#003366] mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(blogPosts.flatMap((p) => p.tags)))
                      .slice(0, 10)
                      .map((tag) => (
                        <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                          <Badge
                            variant="outline"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 cursor-pointer"
                          >
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                  </div>
                </div>

                <div className="bg-[#003366] text-white rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Get the latest insights and stories delivered to your inbox.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full p-2 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#00CC66] focus:border-transparent"
                    />
                    <Button className="w-full bg-[#00CC66] hover:bg-[#00BB55]">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next/Previous Article Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`/blog/${post.id > 1 ? post.id - 1 : blogPosts.length}`}>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="text-sm text-gray-500 mb-2">Previous Article</div>
                <h3 className="text-lg font-bold text-[#003366] mb-2 line-clamp-2">
                  {blogPosts.find((p) => p.id === (post.id > 1 ? post.id - 1 : blogPosts.length))?.title}
                </h3>
                <div className="mt-auto flex items-center text-[#00CC66]">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span>Read Article</span>
                </div>
              </div>
            </Link>

            <Link href={`/blog/${post.id < blogPosts.length ? post.id + 1 : 1}`}>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="text-sm text-gray-500 mb-2 text-right">Next Article</div>
                <h3 className="text-lg font-bold text-[#003366] mb-2 line-clamp-2 text-right">
                  {blogPosts.find((p) => p.id === (post.id < blogPosts.length ? post.id + 1 : 1))?.title}
                </h3>
                <div className="mt-auto flex items-center justify-end text-[#00CC66]">
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

