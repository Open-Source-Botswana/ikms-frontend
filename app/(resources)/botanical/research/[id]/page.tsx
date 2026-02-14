"use client"
import { useParams } from "next/navigation";

import { Layout } from "@/app/components/botanical/layout/layout";
import Link from "next/link";
import { ArrowLeft, BookOpen, Code, Download, ExternalLink, FileText, FlaskConical, Globe, Heart, ImageIcon, Leaf, MapPin, Microscope, Shield, Stethoscope, Users } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Hero } from "@/app/components/botanical/sections/hero";
import { Breadcrumb } from "@/app/components/ui/custom-bread-crumb";
import { chemicalCompounds, getPlantById, mockPlants, relatedSpecies } from "@/app/utils/data/ethnobotany";
import { motion } from "framer-motion";
import { InfoCard } from "@/app/components/botanical/detail/info-card";
import { ExpandableSection } from "@/app/components/botanical/detail/expandable-section";
import { TagList } from "@/app/components/botanical/detail/tag-list";
import { ChemicalComposition } from "@/app/components/botanical/detail/chemical-composition";
import { SpeciesMapper } from "@/app/components/botanical/detail/species-mapper";
import { AIChatbot } from "@/app/components/botanical/detail/botany-chatbot";
import { VerificationTimeline } from "@/app/components/botanical/detail/verification-timeline";
import { ComplianceBadges } from "@/app/components/botanical/detail/compliance";
import { LocationMap } from "@/app/components/botanical/detail/location-map";
import { JSONExportViewer } from "@/app/components/botanical/detail/JSONLDExport-viewer";
import { BreadcrumbItem } from "@/lib/types/botanical";
import ImageGallery from "@/app/components/botanical/detail/image-gallery";



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};


const ResearchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const plant = getPlantById(id || '');
  // const plant = mockPlants.find((r) => r.id === id);
  if (!plant) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-display font-semibold mb-4">Research Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The research area you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Research", href: "/botanical" },
    { label: plant.name, href: "/" }
  ] as BreadcrumbItem[];

  return (
    <Layout>

      <Hero
        title={plant.localNames && plant.localNames[0] || plant.name}
        subtitle={plant.description}
        backgroundImage={plant.image}
        height="large"
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
      />


      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info Cards */}
              <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4">
                <InfoCard
                  title="Family"
                  value={plant.family}
                  icon={Leaf}
                  variant="highlight"
                />
                <InfoCard
                  title="Origin"
                  value={plant.origin}
                  icon={MapPin}
                />
                <InfoCard
                  title="Parts Used"
                  value={plant.partsUsed?.join(', ')}
                  icon={FlaskConical}
                />
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants}>
                <ExpandableSection title="Overview" icon={BookOpen} defaultOpen>
                  <div className="space-y-4">
                    <p className="text-foreground/80 leading-relaxed">
                      {plant.description}
                    </p>
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-muted-foreground">Other Names</h4>
                      <TagList tags={[...(plant.otherNames || []), ...(plant.localNames || [])]} variant="default" />
                    </div>
                  </div>
                </ExpandableSection>
              </motion.div>

              {/* Medicinal Qualities */}
              <motion.div variants={itemVariants}>
                <ExpandableSection title="Medicinal Qualities" icon={Heart} defaultOpen>
                  <TagList tags={plant.medicinalQualities} variant="success" size="md" />
                </ExpandableSection>
              </motion.div>

              {/* Traditional Uses */}
              <motion.div variants={itemVariants}>
                <ExpandableSection title="Traditional Uses" icon={Users}>
                  <ul className="space-y-2">
                    {plant.traditionalUses?.map((use, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm text-foreground/80">{use}</span>
                      </motion.li>
                    ))}
                  </ul>
                </ExpandableSection>
              </motion.div>

              {/* Modern Medicine */}
              <motion.div variants={itemVariants}>
                <ExpandableSection title="Modern Medicine" icon={Stethoscope}>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Active Compounds</h4>
                      <TagList tags={plant.modernMedicine?.activeCompounds} variant="primary" />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Clinical Studies</h4>
                      <ul className="space-y-2">
                        {plant.modernMedicine?.clinicalStudies?.map((study, i) => (
                          <li key={i} className="text-sm text-foreground/80 pl-4 border-l-2 border-primary/30">
                            {study}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Approved Uses</h4>
                      <ul className="space-y-1">
                        {plant.modernMedicine?.approvedUses?.map((use, i) => (
                          <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plant.modernMedicine?.contradictions && plant.modernMedicine.contradictions.length > 0 && (
                      <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                        <h4 className="text-sm font-medium text-destructive mb-2">Contradictions & Warnings</h4>
                        <ul className="space-y-1">
                          {plant.modernMedicine.contradictions.map((c, i) => (
                            <li key={i} className="text-sm text-destructive/80">{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </ExpandableSection>
              </motion.div>

              {/* Chemical Composition */}
              <motion.div variants={itemVariants}>
                <ExpandableSection title="Chemical Composition" icon={FlaskConical}>
                  <ChemicalComposition compounds={chemicalCompounds} />
                </ExpandableSection>
              </motion.div>

              {/* Research Studies */}
              <motion.div variants={itemVariants}>
                <ExpandableSection title="Research & Studies" icon={Microscope}>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Recent Studies</h4>
                    <div className="space-y-3">
                      {plant.research?.recentStudies?.map((study, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-muted/50 rounded-lg border border-border"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h5 className="font-medium text-sm">{study.title}</h5>
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex-shrink-0">
                              {study.year}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/70 mt-2">{study.findings}</p>
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            Source: {study.source}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-medium mb-2">Future Research Directions</h4>
                      <ul className="space-y-2">
                        {plant.research?.futureDirections?.map((direction, i) => (
                          <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            {direction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </motion.div>

              {/* Species Mapper */}
              <motion.div variants={itemVariants}>
                <ExpandableSection title="Related Species" icon={Leaf}>
                  <SpeciesMapper
                    currentSpecies={{
                      name: plant.name,
                      scientificName: plant.scientificName
                    }}
                    relatedSpecies={relatedSpecies}
                  />
                </ExpandableSection>
              </motion.div>


              {plant.galleryImages && plant.galleryImages.length > 0 && (
                <motion.div variants={itemVariants}>
                  <ExpandableSection title="Image Gallery" icon={ImageIcon} defaultOpen>
                    <ImageGallery images={plant.galleryImages} />
                  </ExpandableSection>

                  </motion.div>


              )

              }

              {/* Location Map */}
              {plant.locationMetadata && plant.locationMetadata.length > 0 && (
                <motion.div variants={itemVariants}>
                  <ExpandableSection title="Geographic Distribution" icon={Globe} defaultOpen>
                    <LocationMap locations={plant.locationMetadata} />
                  </ExpandableSection>
                </motion.div>
              )}

              {/* JSON-LD Export */}
              {plant.jsonLdExport && (
                <motion.div variants={itemVariants}>
                  <ExpandableSection title="Linked Data Export" icon={Code}>
                    <JSONExportViewer data={plant.jsonLdExport} />
                  </ExpandableSection>
                </motion.div>
              )}

              {/* References */}
              <motion.div variants={itemVariants}>
                <ExpandableSection title="References" icon={FileText}>
                  <ul className="space-y-2">
                    {plant.references?.map((ref, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        {ref}
                      </li>
                    ))}
                  </ul>
                </ExpandableSection>
              </motion.div>

              {/* AI Chatbot */}
              {/* <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    💬
                  </span>
                  Chat with Plant Data
                </h3>
                <AIChatbot plantData={plant} />
              </motion.div> */}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="sticky top-24 space-y-6"
              >
                {/* Verification Workflow */}
                <div className="bg-card p-5 rounded-xl border border-border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Verification Status
                  </h3>
                  <VerificationTimeline
                    stages={plant.verificationStages}
                    currentStage={plant.currentStage}
                  />
                </div>

                {/* Compliance & Labels */}
                <div className="bg-card p-5 rounded-xl border border-border">
                  <h3 className="font-semibold mb-4">Compliance & Labels</h3>
                  <ComplianceBadges
                    compliance={plant.standardsCompliance}
                    consentStatus={plant.consentStatus}
                    sensitivityLevel={plant.sensitivityLevel}
                  />

                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium mb-2">Traditional Knowledge Labels</h4>
                    <TagList tags={plant.tkLabels} variant="success" />
                  </div>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-2">Biocultural Labels</h4>
                    <TagList tags={plant.bcLabels} variant="primary" />
                  </div>
                </div>

                {/* Cultural Authority */}
                <div className="bg-card p-5 rounded-xl border border-border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Cultural Authority
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Community</p>
                      <p className="font-medium">{plant.culturalAuthority?.communityName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Territory</p>
                      <p>{plant.culturalAuthority?.territory}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Representative</p>
                      <p>{plant.culturalAuthority?.representative}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Governance System</p>
                      <p>{plant.culturalAuthority?.indigenousSystem}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card p-5 rounded-xl border border-border">
                  <h3 className="font-semibold mb-4">Resources</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Data Sheet
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Benefit Agreement
                    </Button>
                  </div>
                </div>

                {/* Metadata Footer */}
                <div className="text-xs text-muted-foreground space-y-1 px-2">
                  <p>DOI: {plant.docId}</p>
                  <p>Created: {plant.dateCreated && new Date(plant.dateCreated).toLocaleDateString()}</p>
                  <p>Updated: {plant.lastUpdated && new Date(plant.lastUpdated).toLocaleDateString()}</p>
                  <p className="pt-2 border-t border-border mt-2">
                    {plant.copyrightNotice}
                  </p>
                </div>
              </motion.div>
            </aside>
          </motion.div>

          {/* Back Link */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 pt-8 border-t border-border"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to all plants
            </Link>
          </motion.div>
        </div>
      </section>


    </Layout>
  )

}

export default ResearchDetail;
