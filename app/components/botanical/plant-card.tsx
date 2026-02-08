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
  onCardClick: (plant: EthnobotanicalMetadata) => void;
}
export default function PlantCard({
  plant,
  onCardClick,
  index,
}: PlantCardProps) {
  return (
    <Link
      key={plant.id}
      href={`/botanical/research/${plant.id}`}
      className="group relative overflow-hidden rounded-xl border border-border bg-background hover:border-primary/50 transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={plant.image}
          alt={plant.localNames[0]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
              {plant.localNames[0]}
            </h3>
            <p className="text-sm text-muted-foreground italic">
              {plant.scientificName}
            </p>
          </div>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {plant.family}
          </span>
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
    </Link>

    // <motion.div

    //   whileHover={{
    //     scale: 1.03,
    //     y: -4,
    //   }}
    //   transition={{
    //     type: 'spring',
    //     stiffness: 400,
    //     damping: 20,
    //   }}
    //   className="cursor-pointer"
    //   onClick={() => onCardClick(plant)}
    // >
    //   <Link
    //   href={`/botanical/research/${plant.id}`}
    //   className="group relative overflow-hidden rounded-lg card-hover block"
    //   style={{ animationDelay: `${index * 100}ms` }}
    // >
    //   <Card
    //     className={cn(
    //       'glass-card leaf-shadow rounded-3xl overflow-hidden group relative'
    //       "group relative overflow-hidden transition-all duration-300",
    //       "hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-gray-800"
    //     )}
    //   >
    //     <div className="relative overflow-hidden">
    //       <ImageWithFallback
    //         src={plant.image}
    //         alt={plant.name}
    //         className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
    //       />
    //       <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    //       <div className="absolute top-3 right-3">
    //         <Badge className="bg-white/90 backdrop-blur-sm text-slate-500 border-primary/20 shadow-sm">
    //           🌸 {plant.family}
    //         </Badge>
    //       </div>
    //       <div className="absolute top-3 left-3">
    //         <div className="w-8 h-8 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center text-lg">
    //           🌿
    //         </div>
    //       </div>
    //     </div>

    //     <CardContent className="p-4">
    //       <div className="space-y-3">
    //         <div>
    //           <h3 className="text-lg font-semibold">{plant.localNames && plant.localNames[0]}</h3>
    //           <p className="text-sm text-muted-foreground italic">
    //             {plant.scientificName}
    //           </p>
    //           <p className="text-sm text-muted-foreground italic">
    //             {plant.localNames &&
    //               `Name: ${plant.name}`}
    //           </p>
    //           {/* <p className="text-sm text-muted-foreground italic">
    //             {plant.localNames &&
    //               `Also known as: ${plant.localNames.join(', ')}`}
    //           </p> */}
    //           <div className="flex items-center gap-2 text-sm text-muted-foreground">
    //             <span>🌍</span>
    //             <span>{plant.origin}</span>
    //           </div>
    //         </div>

    //         <motion.div
    //           className="overflow-hidden"
    //           initial={{ height: 0, opacity: 0 }}
    //           whileHover={{ height: 'auto', opacity: 1 }}
    //           transition={{ duration: 0.3 }}
    //         >
    //           <div className="pt-2 border-t space-y-2">
    //             <div>
    //               <p className="text-xs font-medium text-muted-foreground mb-1">
    //                 Parts Used:
    //               </p>
    //               <div className="flex flex-wrap gap-1">
    //                 {plant.partsUsed.slice(0, 3).map(part => (
    //                   <Badge key={part} variant="outline" className="text-xs">
    //                     {part}
    //                   </Badge>
    //                 ))}
    //                 {plant.partsUsed.length > 3 && (
    //                   <Badge variant="outline" className="text-xs">
    //                     +{plant.partsUsed.length - 3}
    //                   </Badge>
    //                 )}
    //               </div>
    //             </div>

    //             <div>
    //               <p className="text-xs font-medium text-muted-foreground mb-1">
    //                 Key Properties:
    //               </p>
    //               <div className="flex flex-wrap gap-1">
    //                 {plant.medicinalQualities.slice(0, 2).map(quality => (
    //                   <Badge
    //                     key={quality}
    //                     variant="default"
    //                     className="text-xs"
    //                   >
    //                     {quality}
    //                   </Badge>
    //                 ))}
    //                 {plant.medicinalQualities.length > 2 && (
    //                   <Badge variant="default" className="text-xs">
    //                     +{plant.medicinalQualities.length - 2}
    //                   </Badge>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </motion.div>

    //         <p className="text-sm text-muted-foreground line-clamp-2">
    //           {plant.description}
    //         </p>
    //       </div>
    //     </CardContent>
    //   </Card>
    //   </Link>
    // </motion.div>
  );
}
