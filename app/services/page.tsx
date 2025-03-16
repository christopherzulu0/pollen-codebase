import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Coins, LineChart, Shield, Sun, Check, ChevronRight, Users, BarChart3, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Animated Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#003366] z-0">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#00CC66]"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-4 bg-[#00CC66] hover:bg-[#00CC66]/80 text-white">Innovative Solutions</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                Financial Services <span className="text-[#00CC66]">Reimagined</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg">
                Cutting-edge financial solutions designed to bring economic opportunity to everyone, regardless of their
                background.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#00CC66] hover:bg-[#00CC66]/80 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#003366]">
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Financial Services"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#003366] hover:bg-[#003366]/80 text-white">Our Offerings</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003366] mb-4">
              Comprehensive Financial Solutions
            </h2>
            <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
              Explore our range of innovative services designed to meet your financial needs
            </p>
          </div>

          <Tabs defaultValue="loans" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="loans" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white">
                <Coins className="h-4 w-4 mr-2" />
                Digital Loans
              </TabsTrigger>
              <TabsTrigger value="savings" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white">
                <Shield className="h-4 w-4 mr-2" />
                Savings
              </TabsTrigger>
              <TabsTrigger value="climate" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white">
                <Sun className="h-4 w-4 mr-2" />
                Climate Finance
              </TabsTrigger>
              <TabsTrigger value="credit" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white">
                <LineChart className="h-4 w-4 mr-2" />
                Credit Scoring
              </TabsTrigger>
            </TabsList>

            <div className="bg-gray-50 p-6 rounded-lg">
              <TabsContent value="loans" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">Digital Loans</h3>
                    <p className="text-gray-600 mb-6">
                      Our AI-powered lending platform provides quick access to capital with flexible terms and
                      competitive rates.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Non-collateralized borrowing enabled by AI credit scoring",
                        "Flexible repayment terms tailored to your income",
                        "Instant approval and disbursement",
                        "No hidden fees or penalties",
                        "Build your credit history with each repayment",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[#00CC66] mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-3xl font-bold text-[#003366]">
                          5.9% <span className="text-sm font-normal">APR</span>
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Loan amount</p>
                        <p className="text-3xl font-bold text-[#003366]">$100 - $10k</p>
                      </div>
                    </div>
                    <Button className="mt-6 bg-[#003366] hover:bg-[#003366]/80">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/placeholder.svg?height=800&width=600"
                      alt="Digital Loans"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="savings" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">Savings Accounts</h3>
                    <p className="text-gray-600 mb-6">
                      Earn competitive interest rates on your savings with our secure and accessible accounts.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Integration with decentralized money markets",
                        "Higher interest rates than traditional banks",
                        "No minimum balance requirements",
                        "Automated savings plans",
                        "Instant access to your funds when needed",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[#00CC66] mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Interest rate up to</p>
                        <p className="text-3xl font-bold text-[#003366]">
                          7.2% <span className="text-sm font-normal">APY</span>
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Minimum deposit</p>
                        <p className="text-3xl font-bold text-[#003366]">$0</p>
                      </div>
                    </div>
                    <Button className="mt-6 bg-[#003366] hover:bg-[#003366]/80">
                      Open Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/placeholder.svg?height=800&width=600"
                      alt="Savings Accounts"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="climate" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">Climate Financing</h3>
                    <p className="text-gray-600 mb-6">
                      Supporting sustainable development with specialized financing for climate-friendly initiatives.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Investments for climate innovation SMEs",
                        "Financing for solar irrigation equipment",
                        "Carbon credit marketplace integration",
                        "Green bonds and sustainable investments",
                        "Environmental impact tracking and reporting",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[#00CC66] mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Project funding up to</p>
                        <p className="text-3xl font-bold text-[#003366]">$500k</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Carbon offset</p>
                        <p className="text-3xl font-bold text-[#003366]">
                          15k+ <span className="text-sm font-normal">tons</span>
                        </p>
                      </div>
                    </div>
                    <Button className="mt-6 bg-[#003366] hover:bg-[#003366]/80">
                      Explore Projects
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/placeholder.svg?height=800&width=600"
                      alt="Climate Financing"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="credit" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#003366] mb-4">AI Credit Scoring</h3>
                    <p className="text-gray-600 mb-6">
                      Our innovative approach to credit scoring helps build financial identities for everyone.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Free credit profiles for all users",
                        "Alternative data analysis for accurate scoring",
                        "Personalized financial recommendations",
                        "Credit-building tools and resources",
                        "Transparent scoring criteria and improvement tips",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[#00CC66] mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Users with improved credit</p>
                        <p className="text-3xl font-bold text-[#003366]">250k+</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Average score increase</p>
                        <p className="text-3xl font-bold text-[#003366]">
                          +72 <span className="text-sm font-normal">points</span>
                        </p>
                      </div>
                    </div>
                    <Button className="mt-6 bg-[#003366] hover:bg-[#003366]/80">
                      Check Your Score
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/placeholder.svg?height=800&width=600"
                      alt="AI Credit Scoring"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Service Comparison Table */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#003366] hover:bg-[#003366]/80 text-white">Compare Options</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003366] mb-4">
              Find the Right Service for You
            </h2>
            <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
              Compare our services to find the perfect fit for your financial needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-[#003366] text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Service</th>
                  <th className="py-4 px-6 text-center">Ideal For</th>
                  <th className="py-4 px-6 text-center">Key Features</th>
                  <th className="py-4 px-6 text-center">Requirements</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    service: "Digital Loans",
                    icon: <Coins className="h-5 w-5 text-[#00CC66]" />,
                    idealFor: "Small businesses, entrepreneurs, and individuals needing quick capital",
                    features: ["Fast approval", "Flexible terms", "No collateral needed"],
                    requirements: "Valid ID, 3+ months of transaction history",
                    action: "Apply Now",
                  },
                  {
                    service: "Savings Accounts",
                    icon: <Shield className="h-5 w-5 text-[#00CC66]" />,
                    idealFor: "Anyone looking to grow their money with competitive interest rates",
                    features: ["High interest rates", "No minimum balance", "Instant access"],
                    requirements: "Valid ID, email address, phone number",
                    action: "Open Account",
                  },
                  {
                    service: "Climate Financing",
                    icon: <Sun className="h-5 w-5 text-[#00CC66]" />,
                    idealFor: "Green businesses, sustainable agriculture, renewable energy projects",
                    features: ["Specialized funding", "Impact tracking", "Carbon credits"],
                    requirements: "Project proposal, environmental impact assessment",
                    action: "Submit Project",
                  },
                  {
                    service: "AI Credit Scoring",
                    icon: <LineChart className="h-5 w-5 text-[#00CC66]" />,
                    idealFor: "Individuals with limited or no credit history seeking to build their profile",
                    features: ["Alternative data analysis", "Personalized recommendations", "Free profile"],
                    requirements: "Basic personal information, consent for data analysis",
                    action: "Get Score",
                  },
                ].map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-4 px-6 border-b border-gray-100">
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-2 font-medium text-[#003366]">{item.service}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-100 text-center text-sm">{item.idealFor}</td>
                    <td className="py-4 px-6 border-b border-gray-100">
                      <ul className="text-sm">
                        {item.features.map((feature, i) => (
                          <li key={i} className="flex items-center justify-center mb-1">
                            <Check className="h-4 w-4 text-[#00CC66] mr-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-100 text-center text-sm">{item.requirements}</td>
                    <td className="py-4 px-6 border-b border-gray-100 text-center">
                      <Button size="sm" className="bg-[#003366] hover:bg-[#003366]/80">
                        {item.action}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#003366] hover:bg-[#003366]/80 text-white">Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003366] mb-4">How It Works</h2>
            <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
              Our technology-driven approach makes accessing financial services simple and seamless
            </p>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>

            <div className="space-y-12 md:space-y-0 relative">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description:
                    "Sign up and complete your profile with basic information. Our AI system will begin building your financial identity.",
                  icon: <Users className="h-8 w-8 text-white" />,
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  step: "02",
                  title: "Access Services",
                  description:
                    "Browse our range of financial services and select the ones that meet your needs. Apply with just a few clicks.",
                  icon: <BarChart3 className="h-8 w-8 text-white" />,
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  step: "03",
                  title: "Grow Financially",
                  description:
                    "As you use our services, your credit profile improves, unlocking access to larger loans and better rates.",
                  icon: <Zap className="h-8 w-8 text-white" />,
                  image: "/placeholder.svg?height=400&width=600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`md:grid md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`relative z-10 ${index % 2 !== 0 ? "md:text-right md:order-2" : "md:order-1"}`}>
                    <div className="bg-white p-8 rounded-lg shadow-md relative">
                      <div className="absolute -top-5 left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-10 h-10 rounded-full bg-[#00CC66] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="absolute -left-4 top-0 text-6xl font-bold text-[#00CC66]/10">{item.step}</div>
                      <h3 className="text-xl font-bold text-[#003366] mb-4 mt-4">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <Button variant="link" className="text-[#00CC66] p-0 mt-4 hover:text-[#00CC66]/80">
                        Learn more <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className={`relative z-10 mt-6 md:mt-0 ${index % 2 !== 0 ? "md:order-1" : "md:order-2"}`}>
                    <div className="relative h-[250px] md:h-[300px] rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#003366] hover:bg-[#003366]/80 text-white">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003366] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
              Real stories from people and businesses who have transformed their financial lives with our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "The digital loan process was incredibly fast and straightforward. I was able to expand my business without the usual hassle of traditional bank loans.",
                service: "Digital Loans",
              },
              {
                name: "Michael Chen",
                role: "Freelance Developer",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "The savings account has helped me build an emergency fund with interest rates I couldn't find anywhere else. The app makes it easy to track my progress.",
                service: "Savings Accounts",
              },
              {
                name: "Amara Okafor",
                role: "Sustainable Farmer",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "The climate financing program helped me install solar irrigation systems that have increased my crop yield while reducing costs. It's been transformative.",
                service: "Climate Financing",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-[#003366]">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="border-[#00CC66] text-[#00CC66]">
                    {testimonial.service}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials">
              <Button variant="outline" className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white">
                View All Success Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#003366] hover:bg-[#003366]/80 text-white">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003366] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
              Find answers to common questions about our services and how they work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "Do I need collateral to get a loan?",
                  answer:
                    "No, our AI-powered credit scoring system allows us to offer non-collateralized loans based on your financial behavior and alternative data points. This makes our loans accessible to those who may not have traditional assets to use as collateral.",
                },
                {
                  question: "How is my data protected?",
                  answer:
                    "We use blockchain technology to ensure your data is secure, encrypted, and only accessible with your permission. You maintain ownership of your financial data at all times, and we comply with all relevant data protection regulations.",
                },
                {
                  question: "What interest rates do you offer?",
                  answer:
                    "Our interest rates are competitive and typically lower than traditional financial institutions. Rates vary based on your credit profile and the specific service you're using. We're transparent about our rates and you'll always know the exact rate before committing.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-[#003366] font-medium text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "Can I access services if I don't have a smartphone?",
                  answer:
                    "Yes, we offer USSD-based services that work on basic feature phones, ensuring our platform is accessible to everyone regardless of device. Our goal is to make financial services inclusive and available to all.",
                },
                {
                  question: "How do you verify my identity?",
                  answer:
                    "We use a combination of government-issued ID verification and biometric authentication to ensure secure access to your account. This multi-factor approach helps prevent fraud while making the process simple for legitimate users.",
                },
                {
                  question: "What happens if I can't repay my loan on time?",
                  answer:
                    "We offer flexible repayment options and work with you to adjust your payment schedule. We focus on helping you succeed rather than penalizing you. Contact our support team as soon as you anticipate any difficulty making a payment.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 3}`}>
                  <AccordionTrigger className="text-[#003366] font-medium text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions? We're here to help.</p>
            <Link href="/contact">
              <Button className="bg-[#003366] hover:bg-[#002244]">
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#003366] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                Ready to Transform Your <span className="text-[#00CC66]">Financial Future?</span>
              </h2>
              <p className="text-white/80 md:text-lg mb-8">
                Join thousands of individuals and businesses who have already taken control of their finances with our
                innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#00CC66] hover:bg-[#00CC66]/80 text-white">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#003366]">
                  Schedule a Consultation
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=100&width=100`}
                        alt={`User ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/80">
                  Joined by <span className="font-bold">25,000+</span> users worldwide
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00CC66]/20 to-[#00CC66]/5 rounded-lg transform rotate-3"></div>
              <Card className="border-none shadow-xl relative z-10 overflow-hidden">
                <CardHeader className="bg-[#00CC66]/10 pb-2">
                  <CardTitle className="text-[#003366]">Success Metrics</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {[
                      { label: "Loans Disbursed", value: "$25M+", growth: "+32% this year" },
                      { label: "Average Interest Savings", value: "4.2%", growth: "compared to traditional banks" },
                      { label: "User Satisfaction", value: "4.8/5", growth: "based on 12,000+ reviews" },
                    ].map((stat, index) => (
                      <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <div>
                          <p className="text-gray-500 text-sm">{stat.label}</p>
                          <p className="text-2xl font-bold text-[#003366]">{stat.value}</p>
                        </div>
                        <Badge variant="outline" className="text-[#00CC66] border-[#00CC66]">
                          {stat.growth}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

