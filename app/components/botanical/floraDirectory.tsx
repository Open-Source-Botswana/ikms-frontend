import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { ChevronUp } from 'lucide-react'

import { EthnobotanicalMetadata } from '@/lib/types/ethnobotanical'
import { mockPlants } from '@/app/utils/data/ethnobotany'
import BotanicalSearchBar from './search-bar'
import PlantCardMain from './plant-card-2'
import { usePlantStore } from '@/lib/store/plantStore'

export default function EthnoFloraDirectory() {
  const [botanicalData, setBotanicalData] =
    useState<EthnobotanicalMetadata[]>(mockPlants)

    const {plants} = usePlantStore.getState()



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


    const [selectedPlant, setSelectedPlant] = useState<EthnobotanicalMetadata | null>(
      null
    )

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFamily, setSelectedFamily] = useState('All Families')
    const [selectedOrigin, setSelectedOrigin] = useState('All Origins')
    const [selectedPartUsed, setSelectedPartUsed] = useState('All Parts')
    const [selectedCondition, setSelectedCondition] = useState('All Conditions')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
      setCurrentPage(1)
    }, [
      searchTerm,
      selectedFamily,
      selectedOrigin,
      selectedPartUsed,
      selectedCondition,
    ])
    const clearFilters = () => {
      setSearchTerm('')
      setSelectedFamily('All Families')
      setSelectedOrigin('All Origins')
      setSelectedPartUsed('All Parts')
      setSelectedCondition('All Conditions')
    }

    const filteredPlants = useMemo(() => {
      return plants.filter(plant => {
        const matchesSearch =
          plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.medicinalQualities.some(quality =>
            quality.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          plant.traditionalUses.some(use =>
            use.toLowerCase().includes(searchTerm.toLowerCase())
          )

        const matchesFamily =
          selectedFamily === 'All Families' || plant.family === selectedFamily
        const matchesOrigin =
          selectedOrigin === 'All Origins' || plant.origin === selectedOrigin
        const matchesPartUsed =
          selectedPartUsed === 'All Parts' ||
          plant.partsUsed.some(part => part === selectedPartUsed)

        return matchesSearch && matchesFamily && matchesOrigin && matchesPartUsed
      })
    }, [
      plants,
      searchTerm,
      selectedFamily,
      selectedOrigin,
      selectedPartUsed,
    ])

  return (

    // <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 mt-28">
    <div className="min-h-screen">
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* {title && (
          <h2 className="section-title text-foreground mb-10 text-white">{title}</h2>
        )} */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex-1">
              <BotanicalSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedFamily={selectedFamily}
                onFamilyChange={setSelectedFamily}
                selectedOrigin={selectedOrigin}
                onOriginChange={setSelectedOrigin}
                selectedPartUsed={selectedPartUsed}
                onPartUsedChange={setSelectedPartUsed}
                selectedCondition={selectedCondition}
                onConditionChange={setSelectedCondition}
                onClearFilters={clearFilters}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-white text-muted-foreground">
            Showing {plants.length} of {filteredPlants.length} plants
            {filteredPlants.length !== plants.length &&
              ` (filtered from ${plants.length} total)`}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant, index) => (
            <PlantCardMain key={index+plant.id} plant={plant} index={index} />
            // <ResearchCard key={area.id} research={area} index={index} />
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
