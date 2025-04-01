"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  Play,
  Bell,
  X,
  CreditCard,
  Wallet,
  PieChart,
  TrendingUp,
  Globe,
  MessageSquare,
  MapPin,
  DollarSign,
  FileText,
  Wifi,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import AnimatedCounter from "@/components/animated-counter"
import FeatureCard from "@/components/feature-card"
import LoanCalculator from "@/components/loan-calculator"
import CurrencyConverter from "@/components/currency-converter"
import GoalTracker from "@/components/goal-tracker"
import VirtualCard from "@/components/virtual-card"
import ParallaxSection from "@/components/parallax-section"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartArea,
  ChartLine,
  ChartTitle,
  ChartLegend,
  ChartLegendItem,
  ChartGrid,
} from "@/components/ui/chart"
import TransactionHistory from "@/components/transaction-history"
import FinancialHealthScore from "@/components/financial-health-score"
import BudgetPlanner from "@/components/budget-planner"
import TeamSection from "@/components/team-section"
import StatisticsSection from "@/components/statistics-section"
import BlogSection from "@/components/blog-section"

export default function HomePage() {
  const [showNotification, setShowNotification] = useState(false)
  const [showFab, setShowFab] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 3000)

    // Show floating action button after scrolling
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFab(true)
      } else {
        setShowFab(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen" >
      {/* Notification */}
      {/* <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 z-50 w-full flex justify-center px-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-md w-full">
              <div className="flex items-start">
                <div className="flex-shrink-0 hidden sm:block">
                  <div className="w-10 h-10 rounded-full bg-[#4C4EFB]/20 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-[#4C4EFB]" />
                  </div>
                </div>
                <div className="ml-0 sm:ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">New Feature Available!</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try our new AI-powered financial assistant for personalized guidance.
                  </p>
                  <div className="mt-2 flex flex-col xs:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full xs:w-auto"
                      onClick={() => setShowNotification(false)}
                    >
                      Dismiss
                    </Button>
                    <Button
                      size="sm"
                      className="w-full xs:w-auto bg-[#4C4EFB] hover:bg-[#00BB55] text-white"
                      onClick={() => {
                        setShowNotification(false)
                        document.getElementById("ai-assistant")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowNotification(false)}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Floating Action Button */}
      {/* <AnimatePresence>
        {showFab && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  className="h-14 w-14 rounded-full bg-[#4C4EFB] hover:bg-[#00BB55] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageSquare className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="bg-[#003366] p-4 text-white rounded-t-lg">
                  <h3 className="font-semibold">Quick Actions</h3>
                </div>
                <div className="p-4 space-y-2">
                  <button
                    className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center"
                    onClick={() => document.getElementById("loan-calculator")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <CreditCard className="h-5 w-5 mr-3 text-[#4C4EFB]" />
                    <span>Calculate Loan</span>
                  </button>
                  <button
                    className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center"
                    onClick={() =>
                      document.getElementById("currency-converter")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <Globe className="h-5 w-5 mr-3 text-[#4C4EFB]" />
                    <span>Convert Currency</span>
                  </button>
                  <button
                    className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center"
                    onClick={() => document.getElementById("ai-assistant")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <MessageSquare className="h-5 w-5 mr-3 text-[#4C4EFB]" />
                    <span>Chat with AI Assistant</span>
                  </button>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                    <Button className="w-full bg-[#003366] hover:bg-[#002244]">Get Started</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Hero Section */}
      {/**
        className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[##FFC000] via-[#003366] to-[#004488]
       
       **/}
      <section
        ref={heroRef}
        className="relative w-full py-20 md:py-32 -mt-20 overflow-hidden bg-[rgb(7,8,6)]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute -top-[40%] -right-[10%] w-[70%] h-[140%] bg-[#4C4EFB]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
            className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[140%] bg-[#4C4EFB]/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-8 [mask-image:radial-gradient(white,transparent_85%)]"></div>
        </div>

        <motion.div style={{ opacity }} className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg className="w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 50L48 45.7C96 41.3 192 32.7 288 29.2C384 25.7 480 27.3 576 35.8C672 44.3 768 59.7 864 64.2C960 68.7 1056 62.3 1152 55.8C1248 49.3 1344 42.7 1392 39.3L1440 36V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
              fill="white"
              fillOpacity="0.05"
            />
          </svg>
        </motion.div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium"
              >
                <span className="flex h-2 w-2 rounded-full bg-[#4C4EFB] mr-2"></span>
                <span className="animate-pulse">Empowering Financial Inclusion</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight"
              >
                AI & Blockchain for{" "}
                <span className="text-[#4C4EFB] relative">
                  Financial Freedom
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 358 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10C45.6667 4 158.4 -4.8 356 10"
                      stroke="#FFC000"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-white/80 text-lg md:text-xl max-w-[600px]"
              >
                Providing accessible financial services to underserved communities through innovative technology
                solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <Button
                  size="lg"
                  className="bg-[#4C4EFB] hover:bg-[#FFC000] text-white rounded-full group transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-[#4C4EFB]/20"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 rounded-full backdrop-blur-sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative perspective-1000"
            >
              <motion.div
                initial={{ rotateY: -15 }}
                whileHover={{ rotateY: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-[#003366]/20 border border-white/10 backdrop-blur-sm transform"
              >
                <Image
                  src='/hero.jpg'
                  alt="Financial Inclusion"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 "></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="font-bold text-xl">Empowering Communities</p>
                  <p className="text-white/80">Through financial technology</p>
                </div>
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-[#4C4EFB]/30 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#4C4EFB]/20 rounded-full blur-2xl"
              />

              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute top-1/4 -right-12 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] transform rotate-y-[-8deg] hover:rotate-y-0 transition-transform duration-700 animate-float"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#4C4EFB]/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-[#4C4EFB]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#003366]">Instant Approval</p>
                    <p className="text-xs text-gray-500">AI-powered decisions</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-1/4 -left-12 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] transform rotate-y-[-8deg] hover:rotate-y-0 transition-transform duration-700 animate-float animation-delay-1000"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#003366]/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[#003366]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#003366]">Secure Transactions</p>
                    <p className="text-xs text-gray-500">Blockchain protected</p>
                  </div>
                </div>
              </motion.div> */}
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#070806] to-transparent"></div>
        </div>
      </section>

      {/* Trusted By Section */}
      {/* <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#003366]/60 dark:text-white/60 font-medium">TRUSTED BY LEADING ORGANIZATIONS</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
              >
                <Image
                  src={`/placeholder.svg?height=60&width=120&text=Partner${i}`}
                  alt={`Partner ${i}`}
                  width={120}
                  height={60}
                  className="h-8 md:h-10 w-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Overview Section */}
      <ParallaxSection className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Our Mission
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Revolutionizing Access to{" "}
              <span className="relative inline-block text-[#4C4EFB]">
                Financial Services
                {/* <motion.svg
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 358 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10C45.6667 4 158.4 -4.8 356 10" stroke="#FFC000" strokeWidth="3" strokeLinecap="round" />
                </motion.svg> */}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Pollen combines artificial intelligence and blockchain technology to create innovative financial
              solutions for the 70% of Zambians who lack access to traditional banking services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: <Zap className="h-10 w-10 text-white" />,
                title: "Digital Loans",
                description: "Low-interest loans backed by stablecoins with AI-powered credit scoring.",
                iconBg: "bg-gradient-to-br from-[#4C4EFB] to-[#00AA44]",
                delay: 0,
              },
              {
                icon: <Shield className="h-10 w-10 text-white" />,
                title: "Village bank",
                description: "Decentralised village banking protocols enables users  to pool funds together and conduct peer to peer lending",
                iconBg: "bg-gradient-to-br from-[#003366] to-[#002244]",
                delay: 0.2,
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-white" />,
                title: "AI Credit Scoring",
                description: "AI powered credit scoring helps to assess a borrower's creditworthiness by analysing financial, behavioural, and alternative data",
                iconBg: "bg-gradient-to-br from-[#4C4EFB] to-[#00AA44]",
                delay: 0.4,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: feature.delay, duration: 0.6 }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconBg={feature.iconBg}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Shortfalls Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Current Challenges
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Shortfalls of Existing <span className="text-[#4C4EFB]">Banking Services</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Understanding the limitations of traditional banking services in Zambia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Limited Physical Access",
                description: "Many rural areas lack physical bank branches, making it difficult for residents to access basic banking services.",
                icon: <MapPin className="h-6 w-6 text-[#4C4EFB]" />,
                listItems: [
                  "Remote locations without bank branches",
                  "Long travel distances to nearest bank",
                  "Limited banking hours in rural areas"
                ]
              },
              {
                title: "High Transaction Costs",
                description: "Traditional banks often charge high fees for basic transactions, making banking unaffordable for many.",
                icon: <DollarSign className="h-6 w-6 text-[#4C4EFB]" />,
                listItems: [
                  "High account maintenance fees",
                  "Expensive transfer charges",
                  "Minimum balance requirements"
                ]
              },
              {
                title: "Stringent Requirements",
                description: "Complex documentation and strict eligibility criteria prevent many from opening accounts.",
                icon: <FileText className="h-6 w-6 text-[#4C4EFB]" />,
                listItems: [
                  "Complex KYC procedures",
                  "Multiple document requirements",
                  "Strict eligibility criteria"
                ]
              },
              {
                title: "Limited Credit Access",
                description: "Small businesses and individuals struggle to access credit due to traditional credit scoring methods.",
                icon: <CreditCard className="h-6 w-6 text-[#4C4EFB]" />,
                listItems: [
                  "Traditional credit scoring limitations",
                  "High interest rates",
                  "Collateral requirements"
                ]
              },
              {
                title: "Poor Digital Infrastructure",
                description: "Insufficient digital banking infrastructure limits access to online financial services.",
                icon: <Wifi className="h-6 w-6 text-[#4C4EFB]" />,
                listItems: [
                  "Limited internet connectivity",
                  "Unreliable mobile networks",
                  "Basic digital literacy challenges"
                ]
              },
              {
                title: "Financial Literacy Gap",
                description: "Limited financial education prevents many from understanding and utilizing banking services effectively.",
                icon: <BookOpen className="h-6 w-6 text-[#4C4EFB]" />,
                listItems: [
                  "Lack of financial education",
                  "Limited understanding of banking services",
                  "Cultural barriers to banking"
                ]
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#4C4EFB]/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.listItems.map((listItem, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-[#4C4EFB] mr-2">•</span>
                      {listItem}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {/* <StatisticsSection /> */}

      {/* Virtual Card Section */}
      {/* <section className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              New Feature
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Virtual <span className="text-[#4C4EFB]">Financial Card</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Manage your finances with our secure virtual card, designed for both online and offline transactions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <VirtualCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4C4EFB]/10 flex items-center justify-center mr-4 mt-1">
                    <Shield className="h-6 w-6 text-[#4C4EFB]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">Enhanced Security</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Advanced encryption and blockchain verification protect your transactions and personal data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4C4EFB]/10 flex items-center justify-center mr-4 mt-1">
                    <Wallet className="h-6 w-6 text-[#4C4EFB]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">Instant Transactions</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Send and receive money instantly with minimal fees, even across international borders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4C4EFB]/10 flex items-center justify-center mr-4 mt-1">
                    <PieChart className="h-6 w-6 text-[#4C4EFB]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">Spending Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Track your spending patterns with AI-powered analytics and receive personalized insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4C4EFB]/10 flex items-center justify-center mr-4 mt-1">
                    <TrendingUp className="h-6 w-6 text-[#4C4EFB]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">Rewards Program</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Earn points on every transaction that can be redeemed for discounts or converted to
                      cryptocurrency.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    size="lg"
                    className="bg-[#003366] hover:bg-[#002244] text-white rounded-full group transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-[#003366]/20"
                  >
                    Apply for Virtual Card
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      {/* <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Our Leadership
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Meet the <span className="text-[#4C4EFB]">Experts</span> Behind Pollen AI
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Our diverse team combines expertise in AI, blockchain, finance, and sustainable development to drive our
              mission forward.
            </p>
          </motion.div>

          <TeamSection />
        </div>
      </section> */}

      {/* Statistics Section */}

      {/* Statistics Section */}
      {/* <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#003366] dark:bg-gray-800">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-8"></div>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute -top-[40%] -right-[10%] w-[70%] h-[140%] bg-[#4C4EFB]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
            className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[140%] bg-[#4C4EFB]/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-8"></div>
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#4C4EFB] mr-2"></span>
              The Challenge
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-3xl">
              Financial Exclusion in Numbers
            </h2>
            <p className="text-white/80 max-w-[800px] md:text-lg mt-4">
              Financial exclusion remains a significant barrier to economic development in many regions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: 70,
                suffix: "%",
                label: "of Zambians lack access to financial services",
                color: "bg-gradient-to-br from-[#4C4EFB] to-[#00AA44]",
                delay: 0,
              },
              {
                value: 2.5,
                suffix: "B",
                label: "people globally are unbanked or underbanked",
                color: "bg-gradient-to-br from-[#003366] to-[#002244]",
                delay: 0.2,
              },
              {
                value: 80,
                suffix: "%",
                label: "of small businesses can't access needed financing",
                color: "bg-gradient-to-br from-[#4C4EFB] to-[#00AA44]",
                delay: 0.4,
              },
              {
                value: 40,
                suffix: "%",
                label: "higher costs for financial services in underserved areas",
                color: "bg-gradient-to-br from-[#003366] to-[#002244]",
                delay: 0.6,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: stat.delay, duration: 0.6 }}
              >
                <StatisticCard value={stat.value} suffix={stat.suffix} label={stat.label} color={stat.color} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Financial Inclusion Progress</h3>
              <div className="h-[300px] w-full">
                <ChartContainer
                  className="text-white"
                  data={[
                    { date: "2018", traditional: 20, pollenai: 5 },
                    { date: "2019", traditional: 22, pollenai: 15 },
                    { date: "2020", traditional: 25, pollenai: 30 },
                    { date: "2021", traditional: 27, pollenai: 45 },
                    { date: "2022", traditional: 30, pollenai: 60 },
                    { date: "2023", traditional: 32, pollenai: 75 },
                  ]}
                >
                  <ChartTitle className="text-white/90">Financial Inclusion Rate (%)</ChartTitle>
                  <ChartLegend className="text-white/90">
                    <ChartLegendItem name="traditional" className="text-white/70" />
                    <ChartLegendItem name="pollenai" className="text-[#4C4EFB]" />
                  </ChartLegend>
                  <Chart>
                    <ChartGrid className="stroke-white/10" />
                    <ChartArea dataKey="traditional" className="fill-white/10" />
                    <ChartLine dataKey="traditional" className="stroke-white/70" />
                    <ChartArea dataKey="pollenai" className="fill-[#4C4EFB]/20" />
                    <ChartLine dataKey="pollenai" className="stroke-[#4C4EFB]" />
                    <ChartTooltip>
                      {({ dataPoint }) => (
                        <ChartTooltipContent className="bg-[#003366] border-[#4C4EFB]">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
                              <span className="text-xs font-medium text-white/70">
                                Traditional: {dataPoint.traditional || 0}%
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#4C4EFB]" />
                              <span className="text-xs font-medium text-[#4C4EFB]">
                                Pollen AI: {dataPoint.pollenai || 0}%
                              </span>
                            </div>
                          </div>
                        </ChartTooltipContent>
                      )}
                    </ChartTooltip>
                  </Chart>
                </ChartContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Currency Converter Section */}
      {/* <section id="currency-converter" className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Global Transfers
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Currency <span className="text-[#4C4EFB]">Converter</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Send money internationally with competitive exchange rates and minimal fees.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <CurrencyConverter />
          </motion.div>
        </div>
      </section> */}

      {/* Goal Tracker Section */}
      {/* <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Financial Planning
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Track Your <span className="text-[#4C4EFB]">Financial Goals</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Set savings goals and track your progress with our interactive goal tracker.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <GoalTracker />
          </motion.div>
        </div>
      </section> */}

      {/* Loan Calculator Section */}
      {/* <section id="loan-calculator" className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Try It Yourself
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Calculate Your <span className="text-[#4C4EFB]">Potential Savings</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              See how much you could save with our competitive rates compared to traditional financial services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Tabs defaultValue="loan" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="loan" className="text-lg py-3">
                  Loan Calculator
                </TabsTrigger>
                <TabsTrigger value="savings" className="text-lg py-3">
                  Savings Calculator
                </TabsTrigger>
              </TabsList>
              <TabsContent value="loan" className="mt-0">
                <LoanCalculator />
              </TabsContent>
              <TabsContent value="savings" className="mt-0">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-6">
                        Savings Growth Calculator
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Initial Deposit (USD)
                          </label>
                          <input
                            type="range"
                            min="100"
                            max="10000"
                            step="100"
                            defaultValue="1000"
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#4C4EFB]"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>$100</span>
                            <span>$10,000</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Monthly Contribution (USD)
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            defaultValue="100"
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#4C4EFB]"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>$0</span>
                            <span>$1,000</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Time Period (Years)
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            defaultValue="5"
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#4C4EFB]"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>1 year</span>
                            <span>20 years</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Interest Rate (%)
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Traditional Bank</p>
                              <input
                                type="number"
                                defaultValue="1.5"
                                min="0"
                                max="10"
                                step="0.1"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md dark:text-white"
                              />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pollen AI</p>
                              <input
                                type="number"
                                defaultValue="8.5"
                                min="0"
                                max="20"
                                step="0.1"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-6">Projected Growth</h3>
                      <div className="h-[200px] mb-6">
                        <ChartContainer
                          data={[
                            { year: "Year 1", traditional: 1150, pollenai: 1350 },
                            { year: "Year 2", traditional: 1300, pollenai: 1750 },
                            { year: "Year 3", traditional: 1450, pollenai: 2200 },
                            { year: "Year 4", traditional: 1600, pollenai: 2700 },
                            { year: "Year 5", traditional: 1750, pollenai: 3250 },
                          ]}
                        >
                          <Chart>
                            <ChartGrid className="stroke-gray-200 dark:stroke-gray-700" />
                            <ChartLine dataKey="traditional" className="stroke-gray-400" />
                            <ChartLine dataKey="pollenai" className="stroke-[#4C4EFB]" />
                            <ChartTooltip>
                              {({ dataPoint }) => (
                                <ChartTooltipContent>
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                      <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                      <span className="text-xs font-medium">
                                        Traditional: ${(dataPoint.traditional || 0).toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="h-1.5 w-1.5 rounded-full bg-[#4C4EFB]" />
                                      <span className="text-xs font-medium">
                                        Pollen AI: ${(dataPoint.pollenai || 0).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </ChartTooltipContent>
                              )}
                            </ChartTooltip>
                          </Chart>
                        </ChartContainer>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Traditional Bank</p>
                          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">$1,750</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">After 5 years</p>
                        </div>
                        <div className="bg-[#4C4EFB]/10 dark:bg-[#4C4EFB]/20 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Pollen AI</p>
                          <p className="text-2xl font-bold text-[#4C4EFB]">$3,250</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">After 5 years</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Advantage</p>
                          <p className="text-lg font-bold text-[#4C4EFB]">+$1,500 (85.7%)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section> */}

      {/* AI Chatbot Section */}
      {/* <section id="ai-assistant" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative max-w-md mx-auto lg:mr-0">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="bg-[#003366] p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold">Pollen AI Assistant</h3>
                    <Badge variant="outline" className="ml-auto text-white border-white/20">
                      Online
                    </Badge>
                  </div>

                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#003366] flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]"
                      >
                        <p className="text-gray-800 dark:text-gray-200">
                          Hello! I'm your Pollen AI assistant. How can I help you today?
                        </p>
                      </motion.div>
                    </div>

                    <div className="flex items-start justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="bg-[#4C4EFB]/10 dark:bg-[#4C4EFB]/20 rounded-lg p-3 max-w-[80%]"
                      >
                        <p className="text-gray-800 dark:text-gray-200">
                          I'm interested in getting a loan for my small business.
                        </p>
                      </motion.div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0 ml-3">
                        <span className="text-gray-600 dark:text-gray-300 text-xs font-bold">You</span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#003366] flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]"
                      >
                        <p className="text-gray-800 dark:text-gray-200">
                          Great! I'd be happy to help you with a business loan. Could you tell me a bit about your
                          business and how much funding you're looking for?
                        </p>
                      </motion.div>
                    </div>

                    <div className="flex items-start justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="bg-[#4C4EFB]/10 dark:bg-[#4C4EFB]/20 rounded-lg p-3 max-w-[80%]"
                      >
                        <p className="text-gray-800 dark:text-gray-200">
                          I run a small tailoring shop and need about $5,000 to buy new equipment.
                        </p>
                      </motion.div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0 ml-3">
                        <span className="text-gray-600 dark:text-gray-300 text-xs font-bold">You</span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#003366] flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]"
                      >
                        <p className="text-gray-800 dark:text-gray-200">
                          Thanks for sharing that information. Our Digital Loans service would be perfect for your
                          needs. With our AI-powered credit scoring, we can offer you competitive rates without
                          requiring traditional collateral.
                        </p>
                        <p className="text-gray-800 dark:text-gray-200 mt-2">
                          Based on the information you've provided, you might qualify for a $5,000 loan with an
                          estimated interest rate of 8-12% and flexible repayment terms of 12-36 months.
                        </p>
                        <p className="text-gray-800 dark:text-gray-200 mt-2">
                          Would you like to start a preliminary application now?
                        </p>
                      </motion.div>
                    </div>

                    <div className="flex items-start justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                        className="bg-[#4C4EFB]/10 dark:bg-[#4C4EFB]/20 rounded-lg p-3 max-w-[80%]"
                      >
                        <p className="text-gray-800 dark:text-gray-200">
                          Yes, that sounds great! How long will the application process take?
                        </p>
                      </motion.div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0 ml-3">
                        <span className="text-gray-600 dark:text-gray-300 text-xs font-bold">You</span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#003366] flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3, duration: 0.5 }}
                        className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]"
                      >
                        <p className="text-gray-800 dark:text-gray-200">
                          The preliminary application takes just 5 minutes to complete. Once submitted, our AI system
                          will analyze your application and provide an initial decision within 1 hour. If approved, you
                          could receive funds in your account within 24-48 hours.
                        </p>
                        <p className="text-gray-800 dark:text-gray-200 mt-2">
                          Would you like me to guide you through the application steps now?
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#4C4EFB] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                      <button className="bg-[#4C4EFB] text-white p-2 rounded-r-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#4C4EFB]/20 rounded-full blur-2xl -z-10"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                  className="absolute -top-6 -left-6 w-32 h-32 bg-[#003366]/20 rounded-full blur-2xl -z-10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
                24/7 Support
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white mb-6">
                AI-Powered <span className="text-[#4C4EFB]">Financial Assistant</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Get instant answers to your financial questions and personalized guidance from our AI assistant.
              </p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4C4EFB]/10 flex items-center justify-center mr-4 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#4C4EFB]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">24/7 Availability</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get answers to your questions and support whenever you need it, day or night.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4C4EFB]/10 flex items-center justify-center mr-4 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#4C4EFB]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">Personalized Guidance</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Receive tailored financial advice based on your unique situation and goals.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4C4EFB]/10 flex items-center justify-center mr-4 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#4C4EFB]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">Instant Responses</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      No waiting in queues or on hold. Get immediate answers to your questions.
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-10"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="lg"
                        className="bg-[#4C4EFB] hover:bg-[#00BB55] text-white rounded-full group transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-[#4C4EFB]/20"
                      >
                        Chat with Our Assistant
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get personalized financial advice now!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Transaction History Section */}
      {/* <section className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Transaction Tracking
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Monitor Your <span className="text-[#4C4EFB]">Financial Activity</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Keep track of your income and expenses with our comprehensive transaction history tool.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <TransactionHistory />
          </motion.div>
        </div>
      </section> */}

      {/* Financial Health Score Section */}
      {/* <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Financial Wellness
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Understand Your <span className="text-[#4C4EFB]">Financial Health</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Get a comprehensive assessment of your financial wellbeing with personalized recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <FinancialHealthScore />
          </motion.div>
        </div>
      </section> */}

      {/* Budget Planner Section */}
      {/* <section className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center space-y-4 mb-16"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#003366]/10 dark:bg-[#003366]/30 text-[#003366] dark:text-white text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#003366] dark:bg-[#4C4EFB] mr-2"></span>
              Budget Management
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#003366] dark:text-white max-w-3xl">
              Plan and Track Your <span className="text-[#4C4EFB]">Budget</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[800px] md:text-lg mt-4">
              Create and manage your budget with our intuitive planning tool to achieve your financial goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <BudgetPlanner />
          </motion.div>
        </div>
      </section> */}

       {/* Problem Statement Section with Interactive Elements */}
       <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-[#003366]">The Challenge We're Addressing</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Financial exclusion remains a significant barrier to economic development in many regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#00CC66]">
                <h3 className="text-xl font-semibold text-[#003366] mb-4">The Global Challenge</h3>
                <p className="text-gray-600">
                  Despite global advances in technology, financial exclusion remains a significant barrier to economic
                  development in many regions. In Zambia alone, 70% of the population lacks access to basic financial
                  services, limiting opportunities for growth and prosperity.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#00CC66]">
                <h3 className="text-xl font-semibold text-[#003366] mb-4">Conventional Banking Limitation</h3>
                <p className="text-gray-600">
                  Traditional banking systems often fail to serve those without formal employment, credit history, or
                  collateral. This creates a cycle of exclusion that disproportionately affects rural communities,
                  women, and young entrepreneurs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#00CC66]">
                <h3 className="text-xl font-semibold text-[#003366] mb-4">Shortfalls of Existing Banking Services</h3>
                <p className="text-gray-600 mb-4">
                  Many banks in Zambia still rely on traditional banking models that require physical presence, extensive paperwork, and formal identification. This excludes individuals without proper documentation, such as rural farmers and youth.
                </p>
                <ul className="text-gray-600 space-y-2 list-disc pl-5">
                  <li className="text-gray-600">Women often lack access to credit due to limited collateral, as property ownership is predominantly male-dominated.</li>
                  <li className="text-gray-600">Youths face challenges in obtaining loans due to insufficient credit history or lack of employment stability.</li>
                  <li className="text-gray-600">Farmers struggle with seasonal income cycles, yet banks rarely offer flexible repayment terms or agricultural-specific loans.</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#003366] mb-6">Financial Exclusion by the Numbers</h3>

                {/* Interactive Chart */}
                <div className="space-y-6">
                  {[
                    { region: "Zambia", percentage: 70, color: "#00CC66" },
                    { region: "Sub-Saharan Africa", percentage: 57, color: "#00AA55" },
                    { region: "South Asia", percentage: 45, color: "#008844" },
                    { region: "Latin America", percentage: 39, color: "#006633" },
                    { region: "Global", percentage: 31, color: "#004422" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold text-gray-700">{item.region}</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-700">{item.percentage}%</span>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200 group cursor-pointer transition-all hover:shadow-md">
                          <div
                            style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full transition-all duration-500 ease-in-out group-hover:opacity-90"
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-bold">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-[#003366] mb-3">Impact on Economic Growth</h4>
                  <p className="text-gray-600 text-sm">
                    Studies show that increasing financial inclusion by 10% can boost a country's GDP by up to 2.5%,
                    highlighting the critical importance of addressing this challenge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Blog Section */}
      {/* <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#4C4EFB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#003366]/5 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
  
          <BlogSection />
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 md:py-32 bg-gradient-to-br from-[#002244] via-[#003366] to-[#004488] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute -top-[40%] -right-[10%] w-[70%] h-[140%] bg-[#4C4EFB]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
            className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[140%] bg-[#4C4EFB]/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-8"></div>
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
              Ready to Experience the Future of Finance?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10">
              Join thousands of users who are already benefiting from our innovative financial solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#4C4EFB] hover:bg-[#00BB55] text-white rounded-full group transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-[#4C4EFB]/20"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10 rounded-full backdrop-blur-sm"
              >
                Contact Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  )
}

// function StatisticCard({
//   value,
//   suffix,
//   label,
//   color,
// }: { value: number; suffix: string; label: string; color: string }) {
//   return (
//     <Card className="border-none shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
//       <div className={`h-2 ${color}`}></div>
//       <CardContent className="p-8">
//         <div className="flex items-baseline mb-2">
//           <AnimatedCounter value={value} className="text-5xl font-bold text-[#003366] dark:text-white" />
//           <span className="text-3xl font-bold text-[#003366] dark:text-white ml-1">{suffix}</span>
//         </div>
//         <p className="text-gray-600 dark:text-gray-300">{label}</p>
//       </CardContent>
//     </Card>
//   )
// }

