/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { Button } from '@/app/components/ui/button'
import { heroData } from '@/lib/hero_data'
import { Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

// import { motion } from 'motion/react';
interface FloatingElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  speed?: number // duration in seconds
  distance?: number // distance in pixels
  delay?: number // delay in seconds
  className?: string
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  speed = 3, // duration in seconds
  distance = 10, // distance in pixels
  delay = 0, // delay in seconds
  className = '',
  ...props
}) => {
  const floatingStyle = {
    animation: `floatCustom ${speed}s ease-in-out ${delay}s infinite`,
    '--float-distance': `${distance}px`,
  }

  return (
    <div className={className} style={floatingStyle} {...props}>
      <style>{`
        @keyframes floatCustom {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(calc(-1 * var(--float-distance)));
          }
        }
      `}</style>
      {children}
    </div>
  )
}
export function HeroSection() {

  const route = useRouter()
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pd-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-accent/30 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/10 filter blur-3xl"></div>
      </div>

      <div className="container p-4 mx-auto ">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* <span className="inline-block px-4 py-2 mb-6 rounded-full bg-white text-primary text-sm font-medium animate-fade-in">

                    </span> */}
          <FloatingElement
            speed={4}
            distance={15}
            delay={0}
            className="flex items-center space-x-2 bg-card/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 bg-white"
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-orange-400 text-accent" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {heroData.titleTag}
            </span>
          </FloatingElement>

          <h1
            className="mb-6 animate-slide-down"
            style={{ animationDelay: '0.1s' }}
          >
            {heroData.title}
          </h1>
          <p
            className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-down"
            style={{ animationDelay: '0.2s' }}
          >
            {heroData.subDescription}
          </p>

          {/* hero buttons */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {route.push("/waitlist")}}
                size="lg"
                className="gap-3 bg-gradient-to-r from-amber-700 to-amber-300 hover:from-primary/90 hover:to-emerald-500/90 text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all"
              >
                🌱 Join WaitList
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-3 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-full px-8 py-4"
              >
                <Heart className="w-5 h-5" />
                Support Our Mission
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden -z-10">
        <img
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Botswana landscape"
          className="h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/60" />
      </div>
    </section>
  )
}
