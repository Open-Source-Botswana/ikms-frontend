'use client'
import React from 'react'
// import { motion } from 'motion/react'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import {
  BookOpen,
  Calendar,
  Heart,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function ContributionSection() {
  const router = useRouter()
  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      {/* Collaboration Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-20"
      >
        <div className="glass-card leaf-shadow rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1645264215548-8062498a7225"
                alt="Traditional knowledge sharing in indigenous community setting"
                className="w-full h-64 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <Badge className="bg-white/90 backdrop-blur-sm text-primary border-primary/20 shadow-sm text-lg px-4 py-2">
                  <Users className="w-5 h-5 mr-2" />
                  Collaborate with IKMS
                </Badge>
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Join Our Knowledge-Sharing Community
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We use culturally inclusive, land-based approaches to connect
                with us. We are excited to learn more about what you wish to
                share and offer for the people in your local school, community,
                or organization.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="px-3 py-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Traditional Knowledge
                </Badge>
                <Badge variant="outline" className="px-3 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Community Partnership
                </Badge>
                <Badge variant="outline" className="px-3 py-2">
                  🌿 Cultural Preservation
                </Badge>
              </div>
              <Button
                onClick={() => router.push("waitlist")}
                className="self-start bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white rounded-full px-6 py-3"
              >
                Start Collaborating
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Support Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-20"
      >
        <div className="glass-card leaf-shadow rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Support the Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Join IKMS in creating new pathways with Indigenous Peoples that
                lead to a more just system by addressing critical socio economic
                and representation issues to get there.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">
                    Fund indigenous-led research initiatives
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">
                    Support community-based education programs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    🌱
                  </div>
                  <span className="text-foreground">
                    Preserve traditional medicinal knowledge
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="self-start border-primary/30 text-primary hover:bg-primary hover:text-white rounded-full px-6 py-3"
              >
                <Heart className="w-4 h-4 mr-2" />
                Make a Donation
              </Button>
            </div>
            <div className="relative h-64 lg:h-auto order-1 lg:order-2">
              <img
                src="https://www.sundaystandard.info/wp-content/uploads/2020/09/THE-BASARWA.jpg"
                alt="Indigenous family standing together representing community support"
                className="w-full h-94 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
              <div className="absolute top-6 right-6">
                <Badge className="bg-white/90 backdrop-blur-sm text-primary border-primary/20 shadow-sm text-lg px-4 py-2">
                  <Heart className="w-5 h-5 mr-2" />
                  Support the Mission
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* What We Do & How We Do It Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-green-600 to-emerald-500 bg-clip-text text-transparent">
            Our Approach
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building sustainable partnerships through education, measurement,
            and long-term planning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Training and Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="glass-card leaf-shadow rounded-2xl h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Training and Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We work with educators and Indigenous organizations and
                  communities to build and deliver training, professional
                  development and access to resources, and peer networks that
                  empower Indigenous professionals in their efforts to work
                  towards Indigenous well-being.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Education Programs
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Professional Development
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Peer Networks
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Measuring Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="glass-card leaf-shadow rounded-2xl h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Measuring Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Honoring Indigenous principles regarding data ownership and
                  control, we work with Indigenous communities and organizations
                  to establish their own metrics of success. IKMS designs tools
                  to support schools, organizations, and communities to collect
                  and analyze data that helps track positive outcomes and
                  measure impact over time.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Data Sovereignty
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Impact Measurement
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Community Metrics
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Long-term Planning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Card className="glass-card leaf-shadow rounded-2xl h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-primary rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Long-term Operational Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  To encourage sustained impact over the long term, our
                  organizational and community leadership to identify and build
                  supports that are forward-thinking and built to last. The
                  future needs future resource planning, we work together to get
                  ahead.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Strategic Planning
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Resource Development
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Sustainability
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="text-center"
      >
        <div className="glass-card leaf-shadow rounded-3xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join our community of knowledge keepers, researchers, and advocates
            working to preserve traditional wisdom while building bridges to a
            unified and modern society.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("waitlist")}
              size="lg"
              className="gap-3 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all"
            >
              🌿 Share Your Knowledge
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-3 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-full px-8 py-4"
            >
              <Target className="w-5 h-5" />
              Learn More About Our Work
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Contribute Modal */}
      {/* <ContributeModal
          isOpen={showContributeModal}
          onClose={() => setShowContributeModal(false)}
        /> */}
    </div>
  )
}
