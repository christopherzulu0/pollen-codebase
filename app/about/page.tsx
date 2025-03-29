import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, LineChart, Target, ArrowRight, Calendar, Award, Briefcase, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import AnimatedCounter from "@/components/animated-counter"
import TeamSection from "@/components/team-section"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Pollen AI Mission"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/90 to-[#003366]/70"></div>
        </div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 animate-fade-up">
              Our Story & Mission
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-up animate-delay-100">
              Revolutionizing financial inclusion through innovative technology solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-up animate-delay-200">
              <Button size="lg" className="bg-[#00CC66] hover:bg-[#00BB55] text-white">
                Our Mission
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section with Tabs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <Tabs defaultValue="mission" className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <TabsList className="inline-flex h-12 bg-[#003366]/10">
                <TabsTrigger
                  value="mission"
                  className="text-base px-6 data-[state=active]:bg-[#003366] data-[state=active]:text-white"
                >
                  Our Mission
                </TabsTrigger>
                <TabsTrigger
                  value="vision"
                  className="text-base px-6 data-[state=active]:bg-[#003366] data-[state=active]:text-white"
                >
                  Our Vision
                </TabsTrigger>
                <TabsTrigger
                  value="story"
                  className="text-base px-6 data-[state=active]:bg-[#003366] data-[state=active]:text-white"
                >
                  Our Story
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="mission" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003366]">Our Mission</h2>
                  <p className="text-gray-600 text-lg">
                    To democratize access to financial services for underserved communities through innovative
                    technology solutions that are secure, affordable, and accessible.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-[#00CC66]/10 p-2 rounded-full mr-4 mt-1">
                        <Users className="h-5 w-5 text-[#00CC66]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#003366]">Inclusive Access</h3>
                        <p className="text-gray-600">
                          Creating financial solutions that work for everyone, regardless of economic background or
                          location.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[#00CC66]/10 p-2 rounded-full mr-4 mt-1">
                        <Shield className="h-5 w-5 text-[#00CC66]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#003366]">Financial Security</h3>
                        <p className="text-gray-600">
                          Building trust through transparent, secure systems that protect user data and assets.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[#00CC66]/10 p-2 rounded-full mr-4 mt-1">
                        <Target className="h-5 w-5 text-[#00CC66]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#003366]">Sustainable Impact</h3>
                        <p className="text-gray-600">
                          Creating solutions that drive long-term economic growth and environmental sustainability.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Pollen AI Mission Visualization"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vision" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Pollen AI Vision"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003366]">Our Vision</h2>
                  <p className="text-gray-600 text-lg">
                    A financially inclusive world where everyone has access to opportunities regardless of their
                    economic background, creating pathways to prosperity for all communities.
                  </p>
                  <div className="bg-[#003366]/5 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#003366] mb-4">By 2030, we aim to:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-[#00CC66] mr-2 font-bold">•</span>
                        <span className="text-gray-600">
                          Provide financial services to 10 million previously unbanked individuals
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00CC66] mr-2 font-bold">•</span>
                        <span className="text-gray-600">
                          Facilitate $500 million in loans to small businesses and entrepreneurs
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00CC66] mr-2 font-bold">•</span>
                        <span className="text-gray-600">
                          Support 100,000 farmers with climate-resilient agricultural financing
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#00CC66] mr-2 font-bold">•</span>
                        <span className="text-gray-600">
                          Achieve carbon neutrality in all our operations and supported projects
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="story" className="mt-0">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#003366] text-center">
                  Our Journey
                </h2>
                <div className="relative">
                  {/* Timeline */}
                  <div className="absolute left-0 md:left-1/2 h-full w-1 bg-[#00CC66]/20 transform md:translate-x-[-50%]"></div>

                  {/* Timeline Items */}
                  <div className="space-y-12 relative">
                    {[
                      {
                        year: "2018",
                        title: "The Beginning",
                        description:
                          "Founded by a team of fintech experts and social entrepreneurs with a vision to transform financial access in underserved communities.",
                        image: "/placeholder.svg?height=300&width=400",
                      },
                      {
                        year: "2019",
                        title: "First Pilot Program",
                        description:
                          "Launched our first pilot program in rural Zambia, providing microloans to 500 small-scale farmers using mobile technology.",
                        image: "/placeholder.svg?height=300&width=400",
                      },
                      {
                        year: "2020",
                        title: "AI Credit Scoring",
                        description:
                          "Developed our proprietary AI credit scoring algorithm, enabling non-collateralized loans for individuals without traditional credit histories.",
                        image: "/placeholder.svg?height=300&width=400",
                      },
                      {
                        year: "2022",
                        title: "Blockchain Integration",
                        description:
                          "Integrated blockchain technology to create a secure, transparent ledger system for all financial transactions.",
                        image: "/placeholder.svg?height=300&width=400",
                      },
                      {
                        year: "2023",
                        title: "Climate Finance Initiative",
                        description:
                          "Launched our climate finance initiative, providing funding for solar irrigation systems and other sustainable agricultural technologies.",
                        image: "/placeholder.svg?height=300&width=400",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                      >
                        <div className="md:w-1/2 relative">
                          <div
                            className={`absolute top-0 ${index % 2 === 0 ? "md:right-[-25px]" : "md:left-[-25px]"} h-12 w-12 rounded-full bg-[#00CC66] text-white flex items-center justify-center z-10 shadow-lg transform translate-y-1/2`}
                          >
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div
                            className={`bg-white p-6 rounded-lg shadow-md border-2 border-[#003366]/10 ${index % 2 === 0 ? "md:text-right" : ""}`}
                          >
                            <div className="text-[#00CC66] font-bold text-xl mb-2">{item.year}</div>
                            <h3 className="text-xl font-bold text-[#003366] mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="md:w-1/2 relative h-[200px] rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-16 md:py-24 bg-[#003366] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Our Impact in Numbers</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Through innovative technology and strategic partnerships, we're making a measurable difference in
              financial inclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: 500000,
                label: "People Served",
                description: "Individuals with access to financial services through our platform",
              },
              {
                value: 25,
                label: "Countries",
                description: "Regions where our solutions are making a difference",
              },
              {
                value: 75000000,
                prefix: "$",
                label: "Loans Facilitated",
                description: "Capital deployed to underserved entrepreneurs and farmers",
              },
              {
                value: 85,
                suffix: "%",
                label: "Repayment Rate",
                description: "Success rate of our AI-powered credit scoring system",
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/10 border-none shadow-lg hover:bg-white/15 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <AnimatedCounter value={stat.value} className="mx-1" />
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </div>
                  <h3 className="text-xl font-semibold text-[#00CC66] mb-2">{stat.label}</h3>
                  <p className="text-white/70 text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      {/* Enhanced Team Section */}
      {/* <TeamSection /> */}

      {/* Enhanced Values Section with Animations */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-[#003366]">Our Core Values</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The principles that guide our work and shape our approach to financial inclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-[#00CC66]" />,
                title: "Inclusivity",
                description:
                  "We design our solutions to be accessible to everyone, regardless of their economic background or location.",
                examples: [
                  "USSD interfaces for feature phones",
                  "Multilingual support for local languages",
                  "Offline functionality for areas with limited connectivity",
                ],
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-[#00CC66]" />,
                title: "Innovation",
                description:
                  "We continuously explore new technologies and approaches to solve complex financial inclusion challenges.",
                examples: [
                  "AI-powered credit scoring algorithms",
                  "Blockchain-based transaction systems",
                  "Biometric authentication for the unbanked",
                ],
              },
              {
                icon: <LineChart className="h-10 w-10 text-[#00CC66]" />,
                title: "Sustainability",
                description:
                  "We create solutions that are environmentally responsible and economically viable for the long term.",
                examples: [
                  "Solar-powered financial infrastructure",
                  "Carbon-neutral operations",
                  "Climate-resilient agricultural financing",
                ],
              },
              {
                icon: <Target className="h-10 w-10 text-[#00CC66]" />,
                title: "Impact-Driven",
                description:
                  "We measure our success by the positive change we create in communities, not just by financial metrics.",
                examples: [
                  "Rigorous impact assessment frameworks",
                  "Community feedback integration",
                  "Transparent reporting on social outcomes",
                ],
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="border-2 border-[#003366]/10 hover:border-[#003366]/30 transition-all group hover:shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#4C4EFB] mb-3">{value.title}</h3>
                  <p className="text-white mb-4">{value.description}</p>

                  <div className="bg-[#003366]/5 p-4 rounded-lg mt-4 text-left opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-500">
                    <h4 className="font-semibold text-[#4C4EFB] mb-2 text-sm">How We Apply This:</h4>
                    <ul className="space-y-1">
                      {value.examples.map((example, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#00CC66] mr-2 text-xs">•</span>
                          <span className="text-white text-sm">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-[#003366]">What People Say About Us</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Hear from the communities and individuals who have experienced the impact of our work.
            </p>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {[
                {
                  quote:
                    "Pollen AI's loan program helped me expand my farm from 2 acres to 10 acres. The AI credit scoring saw potential in me that traditional banks couldn't see.",
                  name: "Grace Mulenga",
                  role: "Small-scale Farmer, Zambia",
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  quote:
                    "As a woman entrepreneur without collateral, getting financing was impossible until I found Pollen AI. Their platform gave me the capital to grow my business by 300% in just one year.",
                  name: "Fatima Nkosi",
                  role: "Retail Business Owner, Malawi",
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  quote:
                    "The solar irrigation system we financed through Pollen AI has transformed our community. We can now grow crops year-round, even during the dry season.",
                  name: "Joseph Banda",
                  role: "Community Leader, Rural Zambia",
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  quote:
                    "Pollen AI's platform is revolutionary. It's helping us reach the most underserved communities with financial services that are truly accessible and affordable.",
                  name: "Dr. Amina Mohammed",
                  role: "Director, Financial Inclusion Institute",
                  image: "/placeholder.svg?height=200&width=200",
                },
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                  <div className="p-2">
                    <Card className="border-2 border-[#003366]/10 hover:border-[#003366]/30 transition-all h-full">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="mb-6">
                          <svg className="h-8 w-8 text-[#00CC66]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <p className="text-white italic mb-6 flex-grow">{testimonial.quote}</p>
                        <div className="flex items-center mt-auto">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#4C4EFB]">{testimonial.name}</h4>
                            <p className="text-sm text-[#FFC000]">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative mr-2 static translate-y-0" />
              <CarouselNext className="relative ml-2 static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Awards and Recognition Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-[#003366]">Awards & Recognition</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our commitment to innovation and impact has been recognized globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                award: "Financial Inclusion Innovation Award",
                organization: "Global FinTech Alliance",
                year: "2023",
                icon: <Award className="h-10 w-10 text-[#00CC66]" />,
              },
              {
                award: "Climate Finance Leadership Award",
                organization: "Sustainable Finance Initiative",
                year: "2022",
                icon: <Award className="h-10 w-10 text-[#00CC66]" />,
              },
              {
                award: "Best Use of AI in Financial Services",
                organization: "African Tech Summit",
                year: "2022",
                icon: <Award className="h-10 w-10 text-[#00CC66]" />,
              },
              {
                award: "Social Impact Entrepreneur of the Year",
                organization: "World Economic Forum",
                year: "2021",
                icon: <Briefcase className="h-10 w-10 text-[#00CC66]" />,
              },
              {
                award: "Blockchain Innovation Award",
                organization: "Distributed Ledger Consortium",
                year: "2021",
                icon: <Award className="h-10 w-10 text-[#00CC66]" />,
              },
              {
                award: "Top 10 African Startups to Watch",
                organization: "African Business Magazine",
                year: "2020",
                icon: <Award className="h-10 w-10 text-[#00CC66]" />,
              },
            ].map((item, index) => (
              <Card key={index} className="border-2 border-[#003366]/10 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-[#00CC66]/10 p-3 rounded-full mr-4">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-[#4C4EFB] text-lg">{item.award}</h3>
                      <p className="text-[#00CC66] font-medium">{item.year}</p>
                      <p className="text-white mt-1">{item.organization}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 md:py-24 bg-[#003366] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Join Our Mission</h2>
              <p className="text-white/80 text-lg">
                We're looking for passionate individuals who want to make a difference in the world of financial
                inclusion. Join our diverse team and help us build innovative solutions that transform lives.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-full mr-4 mt-1">
                    <Users className="h-5 w-5 text-[#00CC66]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Diverse & Inclusive Culture</h3>
                    <p className="text-white/70">
                      We celebrate diversity and create an environment where everyone can thrive.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-full mr-4 mt-1">
                    <Target className="h-5 w-5 text-[#00CC66]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Meaningful Impact</h3>
                    <p className="text-white/70">
                      Your work will directly contribute to improving financial access for underserved communities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-full mr-4 mt-1">
                    <BarChart3 className="h-5 w-5 text-[#00CC66]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Innovation & Growth</h3>
                    <p className="text-white/70">
                      Opportunities to work with cutting-edge technologies and grow your career.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/careers">
                  <Button size="lg" className="bg-white text-[#003366] hover:bg-white/90">
                    View Open Positions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=800&width=600" alt="Pollen AI Team" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

