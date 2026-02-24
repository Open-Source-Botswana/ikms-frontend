"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */

import { HeroSection } from '@/app/components/shared/hero-section'

//import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

import MainFooter from '../components/layout/footer'
import FairUsageProvider from '@/lib/providers/fair-usage-provider'
// import MapPage from './(routes)/map/page'
import Navigation from '../utils/nav/navigation'
import ContributionSection from '../components/shared/landing/contribution-section'
import { BookOpen, Landmark, Music, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import CommunitiesSection from '../components/shared/landing/communities-section'
//import prisma from '@/lib/prisma'

export default function Home() {
  //const { userId } = await auth()

  // const href = userId ? '/dashboard' : '/sign-up'
  // const href = userId ? '/onboarding' : '/sign-up'

  // const match = await prisma.user.findUnique({
  //     where: {
  //         clerkId: userId as string,
  //     },
  // })

  // console.log(">> Current User >>", match)
  return (
    <FairUsageProvider>
      <div className="min-h-screen flex flex-col ">
        {/* <HomeNavigation/> */}
        {/* <Navigation /> */}
        <main className="flex-grow">
          {/* TODO: update the hero section */}
          {/* <HeroSection href={href} /> */}

          <HeroSection />
          <section className="py-4 bg-black/50 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                {['UNDRIP', 'UNDP', 'WIPO', 'Nagoya Protocol', 'Kunming-Montreal GBF', 'Swakopmund Protocol', 'Local Contexts', 'Berne Convention'].map((standard) => (
                  <span key={standard} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50">
                    <Shield className="w-3 h-3 text-primary" />
                    {standard}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <CommunitiesSection/>
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
              <h2 className="section-title text-black/80 mb-8">Interactive Heritage</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Landmark, title: '3D Artifacts', desc: 'Explore digitized cultural artifacts in 3D — pottery, tools, rock art', count: 3 },
                  { icon: Music, title: 'Audio & Video', desc: 'Listen to oral traditions, songs, and healing ceremonies in local languages', count: 6 },
                  { icon: BookOpen, title: 'Stories & Articles', desc: 'Read documented knowledge on medicine, agriculture, and ecology', count: 8 },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-xl border border-border bg-background"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                    <span className="text-xs text-primary font-medium">{item.count} items available</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          {/* featured articles */}
          {/* <ArticleSection /> */}
          {/* categories */}
          {/* <CategoryStatsSection /> */}
          {/* recent articles */}
          {/* <RecentArticlesSection /> */}
          {/* Contribute section */}
          {/* <ContributeSection/> */}
          {/* footer */}
          {/* <Footer /> */}
          {/* <MapPage/> */}

          {/* Contact */}
          <ContributionSection />

          {/* <MainFooter /> */}
          {/* <Chatbot /> */}
        </main>
        {/* <MainFooter /> */}
      </div>
    </FairUsageProvider>
  )
}
