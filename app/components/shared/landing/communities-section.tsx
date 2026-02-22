import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, FileText, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { useAppCommunityStore } from '@/lib/store/appCommunityStore';
import { domainIcons } from '@/app/utils/helpers';

export default function CommunitiesSection() {

    const { communities } = useAppCommunityStore()
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="section-title text-black/80">Communities</h2>
                        <p className="text-muted-foreground mt-2">
                            Explore the indigenous communities of Botswana and their living knowledge
                        </p>
                    </div>
                    <Link href="/communities/map">
                        <Button variant="outline">
                            <MapPin className="w-4 h-4 mr-2" />
                            Cultural Map
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {communities.map((community, index) => (
                        <motion.div
                            key={community.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                        >
                            <Link
                                href={`/community/${community.id}`}
                                className="group block relative overflow-hidden rounded-xl border border-border bg-card card-hover"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img
                                        src={community.heroImage}
                                        alt={community.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 image-overlay" />
                                    <div className="absolute top-3 right-3 flex gap-1.5">
                                        {community.tkLabels.slice(0, 2).map((label) => (
                                            <Badge key={label} variant="secondary" className="bg-card/80 backdrop-blur-sm text-xs">
                                                {label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                                            {community.name}
                                        </h3>
                                        {community.subGroups && (
                                            <p className="text-sm text-primary/80 mt-1">
                                                {community.subGroups.join(' · ')}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                            <MapPin className="w-3 h-3" />
                                            {community.region}, {community.country}
                                        </div>
                                    </div>

                                    <p className="text-sm text-foreground/70 line-clamp-3">
                                        {community.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5">
                                        {community.knowledgeDomains.slice(0, 5).map((domain) => {
                                            const Icon = domainIcons[domain] || BookOpen;
                                            return (
                                                <span
                                                    key={domain}
                                                    className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground capitalize"
                                                >
                                                    <Icon className="w-3 h-3" />
                                                    {domain.replace('_', ' ')}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <FileText className="w-3 h-3" />
                                                {community.totalRecords} records
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {community.members.length} members
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1 text-primary font-medium">
                                            Explore <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
