"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003366] to-[#00CC66] flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <span className={`text-2xl font-bold ${isScrolled ? "text-[#003366] dark:text-white" : "text-white"}`}>
                Pollen AI
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-[#003366] dark:hover:text-white"
                  : "text-white/80 hover:text-white"
              } transition-colors`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-[#003366] dark:hover:text-white"
                      : "text-white/80 hover:text-white"
                  } transition-colors`}
                >
                  About
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/about" className="cursor-pointer">
                    Our Mission
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about#team" className="cursor-pointer">
                    Our Team
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about#values" className="cursor-pointer">
                    Our Values
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-[#003366] dark:hover:text-white"
                      : "text-white/80 hover:text-white"
                  } transition-colors`}
                >
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/services/digital-loans" className="cursor-pointer">
                    Digital Loans
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/savings" className="cursor-pointer">
                    Savings Accounts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/climate-financing" className="cursor-pointer">
                    Climate Financing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/credit-scoring" className="cursor-pointer">
                    AI Credit Scoring
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent> */}
            </DropdownMenu>

            <Link
              href="/innovations"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-[#003366] dark:hover:text-white"
                  : "text-white/80 hover:text-white"
              } transition-colors`}
            >
              Innovations
            </Link>

            <Link
              href="/testimonials"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-[#003366] dark:hover:text-white"
                  : "text-white/80 hover:text-white"
              } transition-colors`}
            >
              Testimonials
            </Link>

            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-[#003366] dark:hover:text-white"
                  : "text-white/80 hover:text-white"
              } transition-colors`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-[#003366] dark:hover:text-white"
                  : "text-white/80 hover:text-white"
              } transition-colors`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button className="bg-[#00CC66] hover:bg-[#00BB55] text-white rounded-full transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-[#00CC66]/20">
              Get Started
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className={isScrolled ? "text-[#003366] dark:text-white" : "text-white"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white dark:bg-gray-900 z-50 p-6 overflow-y-auto">
          <nav className="flex flex-col space-y-6">
            <Link
              href="/"
              className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-10 h-10 rounded-full bg-[#003366]/10 dark:bg-[#003366]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#003366] dark:text-[#00CC66]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </span>
              Home
            </Link>

            <div className="border-b border-gray-100 dark:border-gray-800 py-2"></div>

            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-3">ABOUT US</p>
              <Link
                href="/about"
                className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-10 h-10 rounded-full bg-[#003366]/10 dark:bg-[#003366]/20 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#003366] dark:text-[#00CC66]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Our Mission
              </Link>
              <Link
                href="/about#team"
                className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-10 h-10 rounded-full bg-[#003366]/10 dark:bg-[#003366]/20 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#003366] dark:text-[#00CC66]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </span>
                Our Team
              </Link>
            </div>

            <div className="border-b border-gray-100 dark:border-gray-800 py-2"></div>

            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-3">SERVICES</p>
              <Link
                href="/services/digital-loans"
                className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-10 h-10 rounded-full bg-[#00CC66]/10 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#00CC66]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Digital Loans
              </Link>
              <Link
                href="/services/savings"
                className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-10 h-10 rounded-full bg-[#00CC66]/10 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#00CC66]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Savings Accounts
              </Link>
              <Link
                href="/services/climate-financing"
                className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-10 h-10 rounded-full bg-[#00CC66]/10 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#00CC66]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Climate Financing
              </Link>
            </div>

            <div className="border-b border-gray-100 dark:border-gray-800 py-2"></div>

            <Link
              href="/innovations"
              className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-10 h-10 rounded-full bg-[#003366]/10 dark:bg-[#003366]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#003366] dark:text-[#00CC66]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
              </span>
              Innovations
            </Link>

            <Link
              href="/testimonials"
              className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-10 h-10 rounded-full bg-[#003366]/10 dark:bg-[#003366]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#003366] dark:text-[#00CC66]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Testimonials
            </Link>

            <Link
              href="/blog"
              className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-10 h-10 rounded-full bg-[#003366]/10 dark:bg-[#003366]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#003366] dark:text-[#00CC66]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clipRule="evenodd"
                  />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
              </span>
              Blog
            </Link>

            <Link
              href="/contact"
              className="text-lg font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-10 h-10 rounded-full bg-[#003366]/10 dark:bg-[#003366]/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#003366] dark:text-[#00CC66]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              Contact
            </Link>

            <div className="pt-6">
              <Button className="bg-[#00CC66] hover:bg-[#00BB55] text-white w-full rounded-xl py-6 text-lg shadow-lg">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

