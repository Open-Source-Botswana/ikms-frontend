import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Circle, Layers, ZoomIn, ZoomOut, Locate } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import type { GeographicalFeature } from '@/lib/types/ethnobotanical';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LocationMapProps {
  locations: GeographicalFeature[];
  className?: string;
}

export function LocationMap({ locations, className }: LocationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<GeographicalFeature | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // map centered on Kgalagadi region
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView([-25.5, 21.5], 7);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);


    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg flex items-center justify-center">
        <div class="w-2 h-2 bg-background rounded-full"></div>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });


    locations.forEach((location) => {
      if (location.geometry.coordinates) {
        const coords = location.geometry.coordinates as number[];

        if (location.type === 'Circle' && location.geometry.radiusMeters) {

          const circle = L.circle([coords[1], coords[0]], {
            radius: location.geometry.radiusMeters,
            color: 'hsl(142, 76%, 36%)',
            fillColor: 'hsl(142, 76%, 36%)',
            fillOpacity: 0.2,
            weight: 2,
          }).addTo(map);

          circle.on('click', () => setSelectedLocation(location));
        } else {

          const marker = L.marker([coords[1], coords[0]], { icon: customIcon }).addTo(map);
          marker.on('click', () => setSelectedLocation(location));
        }
      }
    });

    mapRef.current = map;
    setIsMapReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [locations]);

  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleCenter = () => {
    if (mapRef.current && locations.length > 0) {
      const bounds = L.latLngBounds(
        locations
          .filter(loc => loc.geometry.coordinates)
          .map(loc => {
            const coords = loc.geometry.coordinates as number[];
            return [coords[1], coords[0]] as [number, number];
          })
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case 'Circle':
        return Circle;
      default:
        return MapPin;
    }
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden border border-border", className)}>

      <div ref={mapContainerRef} className="h-[400px] w-full bg-muted" />


      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card/90 backdrop-blur-sm"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card/90 backdrop-blur-sm"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleCenter}
          className="bg-card/90 backdrop-blur-sm"
        >
          <Locate className="w-4 h-4" />
        </Button>
      </div>


      <div className="absolute top-4 left-4 z-[1000]">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
          <div className="flex items-center gap-2 text-xs font-medium mb-2">
            <Layers className="w-3 h-3" />
            <span>Legend</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary border border-background" />
              <span className="text-muted-foreground">Collection Site</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/30 border border-primary" />
              <span className="text-muted-foreground">Distribution Zone</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location List */}
      <div className="p-4 bg-card border-t border-border">
        <h4 className="text-sm font-medium mb-3">Collection Sites ({locations.length})</h4>
        <div className="grid gap-2 max-h-48 overflow-y-auto">
          {locations.map((location) => {
            const Icon = getFeatureIcon(location.type);
            const isSelected = selectedLocation?.id === location.id;

            return (
              <motion.button
                key={location.id}
                onClick={() => {
                  setSelectedLocation(location);
                  if (mapRef.current && location.geometry.coordinates) {
                    const coords = location.geometry.coordinates as number[];
                    mapRef.current.setView([coords[1], coords[0]], 10);
                  }
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                  isSelected ? "bg-primary/10 border border-primary/30" : "bg-muted/50 hover:bg-muted"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted-foreground/10"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{location.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{location.description}</p>
                  {location.type === 'Circle' && location.geometry.radiusMeters && (
                    <p className="text-xs text-primary mt-1">
                      Radius: {(location.geometry.radiusMeters / 1000).toFixed(1)} km
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Location Detail */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-sm"
          >
            <div className="bg-card/95 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-medium text-sm">{selectedLocation.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{selectedLocation.description}</p>
                  {selectedLocation.geometry.coordinates && (
                    <p className="text-xs text-primary/80 mt-2 font-mono">
                      {(selectedLocation.geometry.coordinates as number[])[1].toFixed(4)}°,
                      {(selectedLocation.geometry.coordinates as number[])[0].toFixed(4)}°
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLocation(null)}
                  className="text-muted-foreground"
                >
                  ×
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
