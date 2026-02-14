import { PlantImages } from '@/lib/types/ethnobotanical';
import { set } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../../ui/button';


interface ImageGalleryProps {
    images: PlantImages[];
}
export default function ImageGallery({ images }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

const prev = () => setSelectedIndex(i => i !== null ? (i - 1 + images.length) % images.length : null);
  const next = () => setSelectedIndex(i => i !== null ? (i + 1) % images.length : null);

  const selected = selectedIndex !== null ? images[selectedIndex] : null;

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg border">
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative group cursor-pointer rounded-lg overflow-hidden border border-border"
                            onClick={() => openLightbox(index)}
                        >
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={img.url}
                                    alt={img.captions || 'Plant image'}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                <div>
                                    {img.captions && <p className="text-xs font-medium text-foreground line-clamp-2">{img.captions}</p>}
                                    {img.credit && <p className="text-xs text-muted-foreground">📷 {img.credit}</p>}
                                </div>
                            </div>
                            {img.isBanner && (
                                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center gap-0.5">
                                    <Camera className="w-2.5 h-2.5" /> Main
                                </span>
                            )}
                        </motion.div>
                    </div>

                ))}
            </div>

                  <AnimatePresence>
        {selected && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.url}
                alt={selected.captions || 'Plant image'}
                className="max-h-[70vh] rounded-lg object-contain"
              />
              <div className="mt-4 text-center">
                {selected.captions && <p className="text-sm font-medium">{selected.captions}</p>}
                {selected.credit && <p className="text-xs text-muted-foreground mt-1">📷 {selected.credit}</p>}
                <p className="text-xs text-muted-foreground mt-1">{selectedIndex + 1} / {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </>


    )
}
