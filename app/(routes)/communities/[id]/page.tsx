
"use client"
import { motion, AnimatePresence } from 'framer-motion';

import {
  Users, MapPin, BookOpen, Music, FlaskConical, Landmark, Calendar,
  Play, Headphones, FileText, Lock, Eye, Globe, Shield, Box
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { KnowledgeRecord } from '@/lib/types/community';
import { AccessLevel } from '@/lib/constants/community';
import { useAppCommunityStore } from '@/lib/store/appCommunityStore';
import { useState } from 'react';
import { Layout } from '@/app/components/botanical/layout/layout';
import Link from 'next/link';
import { Breadcrumb } from '@/app/components/ui/custom-bread-crumb';
import { Hero } from '@/app/components/botanical/sections/hero';
import { useParams } from 'next/navigation';


const domainIcons: Record<string, React.ElementType> = {
  biodiversity: FlaskConical,
  medicine: FlaskConical,
  music: Music,
  artifacts: Landmark,
  history: BookOpen,
  agriculture: Globe,
  language: BookOpen,
  ceremony: Landmark,
  crafts: Landmark,
  oral_tradition: Headphones,
  dance: Music,
  food: Globe,
};

const mediaIcons: Record<string, React.ElementType> = {
  audio: Headphones,
  video: Play,
  text: FileText,
  image: Eye,
  '3d_artifact': Box,
  document: FileText,
};

const accessColors: Record<AccessLevel, string> = {
  public: 'bg-primary/10 text-primary',
  community_only: 'bg-accent/20 text-accent-foreground',
  restricted: 'bg-destructive/10 text-destructive',
  sacred: 'bg-destructive/20 text-destructive',
};

function KnowledgeCard({ record }: { record: KnowledgeRecord }) {
  const MediaIcon = mediaIcons[record.mediaType] || FileText;
  const DomainIcon = domainIcons[record.domain] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 transition-all"
    >
      {record.thumbnailUrl && (
        <div className="aspect-video overflow-hidden relative">
          <img src={record.thumbnailUrl} alt={record.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 image-overlay" />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm gap-1">
              <MediaIcon className="w-3 h-3" />
              {record.mediaType === '3d_artifact' ? '3D' : record.mediaType}
            </Badge>
          </div>
          {record.accessLevel !== 'public' && (
            <div className="absolute top-3 right-3">
              <Badge className={accessColors[record.accessLevel]}>
                <Lock className="w-3 h-3 mr-1" />
                {record.accessLevel.replace('_', ' ')}
              </Badge>
            </div>
          )}
        </div>
      )}

      <div className="p-5 space-y-3">
        {!record.thumbnailUrl && (
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="gap-1">
              <MediaIcon className="w-3 h-3" />
              {record.mediaType === '3d_artifact' ? '3D Artifact' : record.mediaType}
            </Badge>
            {record.accessLevel !== 'public' && (
              <Badge className={accessColors[record.accessLevel]}>
                <Lock className="w-3 h-3 mr-1" />
                {record.accessLevel.replace('_', ' ')}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <DomainIcon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm group-hover:text-primary transition-colors">{record.title}</h4>
            <p className="text-xs text-muted-foreground capitalize">{record.domain.replace('_', ' ')} · {record.language}</p>
          </div>
        </div>

        <p className="text-sm text-foreground/70 line-clamp-3">{record.description}</p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {record.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        {record.narrator && (
          <p className="text-xs text-muted-foreground pt-2 border-t border-border">
            Narrated by: <span className="text-foreground/80">{record.narrator}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}

const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getCommunityById } = useAppCommunityStore();
  const community = getCommunityById(id || '');
  const [activeTab, setActiveTab] = useState('all');

  if (!community) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-semibold mb-2">Community Not Found</h1>
            <Link href="/" className="text-primary hover:underline">Return home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const domains = ['all', ...Array.from(new Set(community.knowledgeRecords.map(r => r.domain)))];
  const filteredRecords = activeTab === 'all'
    ? community.knowledgeRecords
    : community.knowledgeRecords.filter(r => r.domain === activeTab);

  const breadcrumb = (
    <Breadcrumb
      items={[
        { label: 'Communities', href: '/' },
        { label: community.name },
      ]}
    />
  );

  return (
    <>
      <Hero
        title={community.name}
        subtitle={community.description}
        backgroundImage={community.bannerImage || community.heroImage}
        breadcrumb={breadcrumb}
        height="medium"
      />


      <section className="py-4 bg-secondary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{community.region}, {community.country}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" />{community.population}</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-primary" />{community.languages.join(', ')}</span>
            {community.subGroups && (
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-primary" />{community.subGroups.join(', ')}</span>
            )}
          </div>
        </div>
      </section>

      <section className="py-3 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 flex flex-wrap gap-2 b">
          {community.tkLabels.map(l => (
            <Badge key={l} variant="outline" className="border-primary/30 text-primary text-xs">{l}</Badge>
          ))}
          {community.bcLabels.map(l => (
            <Badge key={l} variant="outline" className="border-accent/50 text-accent-foreground text-xs">{l}</Badge>
          ))}
        </div>
      </section>


      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8 text-black/80">Knowledge Records</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
              {domains.map((domain) => {
                const Icon = domain === 'all' ? BookOpen : (domainIcons[domain] || BookOpen);
                return (
                  <TabsTrigger key={domain} value={domain} className="capitalize gap-1.5 text-xs">
                    <Icon className="w-3 h-3" />
                    {domain === 'all' ? 'All' : domain.replace('_', ' ')}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRecords.map((record) => (
                <KnowledgeCard key={record.id} record={record} />
              ))}
            </AnimatePresence>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No records found in this category.
            </div>
          )}
        </div>
      </section>


      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8 text-black/80">Community Members</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {community.members.filter(m => m.isPublic).map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl border border-border bg-background"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold">{member.name}</h4>
                    <p className="text-xs text-muted-foreground capitalize">{member.title || member.role}</p>
                  </div>
                </div>
                {member.bio && <p className="text-sm text-foreground/70 mb-2">{member.bio}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {member.languages.map(l => (
                    <span key={l} className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">{l}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {community.events.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="section-title mb-8 text-black/80">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {community.events.map((event) => (
                <div key={event.id} className="p-5 rounded-xl border border-border bg-card">
                  {event.image && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</span>
                    <Badge variant="secondary" className="text-xs capitalize">{event.type}</Badge>
                  </div>
                  <h4 className="font-display font-semibold mb-1">{event.title}</h4>
                  <p className="text-sm text-foreground/70 mb-2">{event.description}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8 text-black/80">Governance & Compliance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-border bg-background">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Governance Structure
              </h3>
              <p className="text-sm text-foreground/70">{community.governanceStructure}</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-background">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                International Compliance
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  { label: 'UNDRIP', value: community.compliance.unDeclarationOnIndigenousRights },
                  { label: 'Nagoya Protocol', value: community.compliance.nagoyaProtocol },
                  { label: 'WIPO TK', value: community.compliance.wipoTraditionalKnowledge },
                  { label: 'Kunming-Montreal', value: community.compliance.kunmingMontrealGBF },
                  { label: 'Local Contexts', value: community.compliance.localContextsLabels },
                  { label: 'FPIC Obtained', value: community.compliance.fpicObtained },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${value ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
</>
  );
};

export default CommunityDetail;
