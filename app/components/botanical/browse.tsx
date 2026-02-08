"use client"
import React, { use, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


import { ChevronUp } from 'lucide-react'

import { Hero } from './sections/hero'
import { CategoryNav } from './sections/category-nav'
import {  categoryFilters } from "@/app/utils/data/researchAreas";
import { ResearchGrid } from './sections/research-grid'
import { EthnobotanicalMetadata } from '@/lib/types/ethnobotanical'
import { mockPlants } from '@/app/utils/data/ethnobotany'
import { usePlantStore } from '@/lib/store/plantStore'

export default function BotanicalBrowse() {
  const [botanicalData, setBotanicalData] =
    useState<EthnobotanicalMetadata[]>(mockPlants)

  const {plants, setPlants} = usePlantStore()

   useEffect(() => {
     setPlants(botanicalData)
   }, [plants]);

  const [activeCategory, setActiveCategory] = useState("All");


  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (

    // <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 mt-28">
    <div className="min-h-screen">
      <Hero
        title="Our Land, Our Future"
        subtitle="Dithunya tsa mo gae — Advancing research for a sustainable tomorrow"
        backgroundImage="https://s.hdnux.com/photos/01/41/40/46/25561474/3/ratio3x2_960.webp"
        height="large"
      />
      <CategoryNav
        categories={categoryFilters}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <ResearchGrid
        areas={botanicalData}
        title="Discover our research"
      />

      <section className="bg-black/80 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="section-title mb-6">Identification Tools</h2>
              <p className="text-white text-muted-foreground mb-6 leading-relaxed">
                Access our comprehensive suite of identification tools designed for researchers,
                conservation managers, and citizen scientists. From algae to invertebrates,
                our resources support species identification across diverse ecosystems.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Algae", "Plants", "Ecosystems", "Invertebrates", "AI-Insights", "GeoMapper"].map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="/assets/botanical/Adansonia-digitata.jpg"
                alt="Research tools"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 image-overlay" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Research Publications" },
              { value: "12K", label: "Species Documented" },
              { value: "150", label: "Active Scientists" },
              { value: "30+", label: "Years of Research" }
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-4xl md:text-5xl font-display font-bold text-secondary">
                  {stat.value}
                </div>
                <div className="text-white text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-3 rounded-full shadow-lg z-50 hover:shadow-xl transition-shadow"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}
