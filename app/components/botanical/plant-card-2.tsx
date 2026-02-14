import React from 'react';

import { MedicinalPlant } from '@/lib/types/botanical';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../shared/image-with-fallback';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { EthnobotanicalMetadata } from '@/lib/types/ethnobotanical';
import { FlaskConical, Leaf, Shield } from 'lucide-react';

interface PlantCardProps {
  plant: EthnobotanicalMetadata;
  index: number;
//   onCardClick: (plant: EthnobotanicalMetadata) => void;
}
export default function PlantCardMain({
  plant,
//   onCardClick,
  index,
}: PlantCardProps) {
  return (

    <motion.div
      whileHover={{
        scale: 1.03,
        y: -2,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 20,
      }}
      className="cursor-pointer"
    >
      <Link
        href={`/ethnobotany/flora/${plant.id}`}
        className="group relative overflow-hidden rounded-lg card-hover block"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <Card
          className=
            'glass-card leaf-shadow rounded-3xl overflow-hidden group relative'
        >
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={plant.image && plant.image || plant.galleryImages && (plant.galleryImages.find((img) => img.isBanner)?.url || plant.galleryImages[0].url)}
              alt={plant.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute top-3 right-3">
              <Badge className="bg-white/90 backdrop-blur-sm text-slate-500 border-primary/20 shadow-sm">
                🌸 {plant.family}
              </Badge>
            </div>
            <div className="absolute top-3 left-3">
              <div className="w-8 h-8 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center text-lg">
                🌿
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">
                  {plant.localNames && plant.localNames[0]}
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  {plant.scientificName}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {plant.localNames && `Name: ${plant.name}`}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>🌍</span>
                  <span>{plant.origin}</span>
                </div>
              </div>

              <p className="text-sm text-foreground/70 line-clamp-2">
                {plant.description}
              </p>

              <div className="flex items-center gap-4 pt-2 border-t border-border text-sm text-muted-foreground">
                <span className="flex items-center gap-1 text-black">
                  <Leaf className="w-3 h-3 text-green-400" />
                  {plant.partsUsed.length} parts used
                </span>
                <span className="flex items-center gap-1">
                  <FlaskConical className="w-3 h-3" />
                  {plant.medicinalQualities.length} qualities
                </span>
                <span className="flex items-center gap-1 text-black">
                  <Shield className="w-3 h-3 text-green-500" />
                  {plant.consentStatus}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
