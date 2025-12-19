'use client'

import { useState, useEffect } from 'react'

import { BookOpen, Scale, Search } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { usePathname } from 'next/navigation'
import { languagesMetadata } from '@/lib/languages-data'
import { Separator } from '../../ui/separator'
import LanguageCard from './language-card'
import { motion } from 'framer-motion'
import FolkloreLanguageCard from './folklore-language-card';

export default function LanguagesBrowse() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [filteredLanguages, setFilteredLanguages] = useState(
    languagesMetadata.filter(language => language.isActive === true)
  )
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])


  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-28">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 md:p-12 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(202,138,4,0.1),transparent_50%)]" />

        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }}
          className="inline-block mb-4"
        ></motion.div>

        <h1 className="text-4xl md:text-5xl mb-4">
          {' '}
          Practice local languages
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Learn smarter, not harder with our simple and interactive tools, Start
          speaking confidently today!
        </p>
      </motion.div>

      {/* Main Content */}
      <main className="pt-10 pb-16 px-4 mx-auto">
        <div className="container px-4 mx-auto">

          <Separator className="mb-8" />
          <section id='learning-tabs'>
            <Tabs defaultValue="languages" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
                <TabsTrigger value="languages">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Languages
                </TabsTrigger>
                <TabsTrigger value="folklore">
                  <Scale className="w-4 h-4 mr-2" />
                  Folklore
                </TabsTrigger>
                <TabsTrigger value="practice">
                  <Search className="w-4 h-4 mr-2" />
                  Practice
                </TabsTrigger>

              </TabsList>

              <TabsContent value="languages" className="space-y-4">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div
                        key={index}
                        className="h-[300px] rounded-xl bg-muted/60 animate-pulse"
                      />
                    ))}
                  </div>
                ) : filteredLanguages.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-medium mb-2">No Language found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter to find what you are looking
                      for.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex justify-between items-center">
                      <p className="text-muted-foreground">
                        Showing {filteredLanguages.length}{' '}
                        {filteredLanguages.length === 1 ? 'result' : 'results'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredLanguages.map(data => (
                        <LanguageCard
                          lanMetadata={data}
                          className="animate-fade-in h-full sm:h-auto sm:max-w-sm"
                          key={data.id}
                        />
                      ))}
                    </div>
                  </>
                )}

              </TabsContent>

              <TabsContent value="folklore" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  <FolkloreLanguageCard
                    className="animate-fade-in h-full sm:h-auto sm:max-w-sm"
                    lanName='Setswana'
                  />

                </div>

              </TabsContent>




            </Tabs>
          </section>



        </div>
      </main>
    </div>
  )
}
