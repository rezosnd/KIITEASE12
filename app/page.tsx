"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { BookOpen, Users, RefreshCw, FileText, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const cardHoverEffect = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
  }

  return (
    <div className="sci-fi-container">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden sci-fi-grid">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                For KIIT University Students & Faculty
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold sci-fi-text-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                KIIT<span className="text-primary">{"{ease}"}</span>
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                A comprehensive platform for KIIT University students and faculty. Access teacher reviews, premium study
                notes, section swapping, and more.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button size="lg" className="sci-fi-button sci-fi-glow" asChild>
                  <Link href="/register">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="sci-fi-button" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="weather-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Platform Stats</h3>
                  <div className="weather-icon">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                    <motion.div
                      className="weather-value"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      5.2k
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Premium Users</div>
                    <motion.div
                      className="weather-value"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      1.8k
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Notes Shared</div>
                    <motion.div
                      className="weather-value"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      3.4k
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Teacher Reviews</div>
                    <motion.div
                      className="weather-value"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      7.6k
                    </motion.div>
                  </div>
                </div>
                <div className="sci-fi-divider"></div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Last updated: Today</div>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Refresh
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* HUD Effects */}
        <div className="hud__effects flex absolute bottom-4 left-4">
          <div className="effect__long"></div>
          <div className="effect__small"></div>
          <div className="effect__long"></div>
          <div className="effect__small"></div>
          <div className="effect__small"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to enhance your academic experience at KIIT University
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <motion.div
                className="sci-fi-card sci-fi-glow h-full"
                variants={cardHoverEffect}
                initial="rest"
                whileHover="hover"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Teacher Reviews</h3>
                  <p className="text-muted-foreground mb-4">
                    Read and write reviews for teachers. Premium users can access all reviews.
                  </p>
                  <Button variant="ghost" className="sci-fi-button w-full" asChild>
                    <Link href="/teachers">
                      Explore Teachers <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <motion.div
                className="sci-fi-card sci-fi-glow h-full"
                variants={cardHoverEffect}
                initial="rest"
                whileHover="hover"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Premium Notes</h3>
                  <p className="text-muted-foreground mb-4">
                    Access high-quality study notes shared by premium users across all branches.
                  </p>
                  <Button variant="ghost" className="sci-fi-button w-full" asChild>
                    <Link href="/notes">
                      Browse Notes <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <motion.div
                className="sci-fi-card sci-fi-glow h-full"
                variants={cardHoverEffect}
                initial="rest"
                whileHover="hover"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Section Swapping</h3>
                  <p className="text-muted-foreground mb-4">
                    Request to swap your section with other students from the same branch.
                  </p>
                  <Button variant="ghost" className="sci-fi-button w-full" asChild>
                    <Link href="/section-swap">
                      Swap Section <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <motion.div
                className="sci-fi-card sci-fi-glow h-full"
                variants={cardHoverEffect}
                initial="rest"
                whileHover="hover"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Referral System</h3>
                  <p className="text-muted-foreground mb-4">
                    Refer friends and earn rewards. Get premium days or discounts for successful referrals.
                  </p>
                  <Button variant="ghost" className="sci-fi-button w-full" asChild>
                    <Link href="/referrals">
                      My Referrals <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 mx-auto">
          <Card className="sci-fi-card overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Upgrade to Premium</h2>
                  <p className="text-muted-foreground mb-6">
                    Get access to all teacher reviews, premium notes, and exclusive features.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      View all teacher reviews
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      Download and upload study notes
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      Priority in section swapping
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      Enhanced referral rewards
                    </li>
                  </ul>
                  <Button className="sci-fi-button sci-fi-glow" asChild>
                    <Link href="/premium">
                      Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <motion.div
                  className="flex-1 bg-gradient-to-br from-primary/20 to-primary/5 p-8 md:p-12 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">₹499</div>
                    <div className="text-muted-foreground">per semester</div>
                    <div className="sci-fi-divider"></div>
                    <div className="text-sm text-muted-foreground">One-time payment, no recurring charges</div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold text-primary sci-fi-text-glow">KIIT{"{ease}"}</div>
              <p className="text-muted-foreground mt-2">A platform for KIIT University students and faculty</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="sci-fi-divider"></div>
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} KIITease. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
