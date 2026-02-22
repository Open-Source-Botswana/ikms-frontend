

"use client"
import { ArrowLeft } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppCommunityStore } from '@/lib/store/appCommunityStore';
import { useEffect, useRef } from 'react';
import { Layout } from '@/app/components/botanical/layout/layout';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const communityColors: Record<string, string> = {
  'san-khoi': '#E6A817',
  'batlokwa': '#4A9BD9',
  'balete': '#D94A7A',
};

export default function CulturalMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const { communities } = useAppCommunityStore();

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, { zoomControl: false })
      .setView([-22.5, 24.0], 6);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    communities.forEach((community) => {
      const color = communityColors[community.id] || '#22c55e';

      // Add migration routes as polylines
      community.migrationRoutes.forEach((route) => {
        if (route.coordinates.length >= 2) {
          const polyline = L.polyline(
            route.coordinates.map(([lat, lng]) => [lat, lng] as L.LatLngExpression),
            {
              color: route.color || color,
              weight: 3,
              opacity: 0.7,
              dashArray: '8, 6',
            }
          ).addTo(map);

          polyline.bindPopup(`
            <div style="font-family: sans-serif; min-width: 180px;">
              <strong style="font-size: 13px;">${route.name}</strong>
              <p style="font-size: 11px; color: #888; margin: 4px 0;">${route.period}</p>
              <p style="font-size: 12px; margin: 4px 0;">${route.description}</p>
            </div>
          `);
        }
      });

      // Add location markers
      community.locations.forEach((location) => {
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="width: 14px; height: 14px; background: ${color}; border-radius: 50%; border: 2px solid rgba(0,0,0,0.5); box-shadow: 0 0 8px ${color}80;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        const marker = L.marker(
          [location.coordinates[0], location.coordinates[1]],
          { icon }
        ).addTo(map);

        marker.bindPopup(`
          <div style="font-family: sans-serif; min-width: 200px;">
            <strong style="font-size: 13px;">${location.name}</strong>
            <p style="font-size: 11px; color: #888; margin: 4px 0; text-transform: capitalize;">${location.type.replace('_', ' ')}</p>
            <p style="font-size: 12px; margin: 4px 0;">${location.description}</p>
            ${location.population ? `<p style="font-size: 11px; color: #aaa;">Population: ${location.population}</p>` : ''}
            <a href="/communities/${community.id}" style="color: #22c55e; font-size: 12px; text-decoration: none;">View ${community.name} →</a>
          </div>
        `);
      });
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [communities]);

  return (

      <div className="pt-24">
        {/* Header */}
        <div className="bg-card border-b border-border py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
              </Link>
              <div>
                <h1 className="font-display text-xl font-semibold">Cultural Migration Map</h1>
                <p className="text-sm text-muted-foreground">Migration routes and current habitation of San, Batlokwa & Balete communities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative">
          <div ref={mapContainerRef} className="h-[calc(100vh-180px)] w-full" />

          {/* Legend */}
          <div className="absolute bottom-6 left-6 z-[1000] bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border max-w-xs">
            <h4 className="text-sm font-semibold mb-3">Communities</h4>
            <div className="space-y-2">
              {communities.map((c) => {
                const color = communityColors[c.id] || '#22c55e';
                return (
                  <Link key={c.id} href={`/communities/${c.id}`} className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span>{c.name}</span>
                    <span className="text-xs text-muted-foreground">({c.locations.length} sites)</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-border space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-6 h-0 border-t-2 border-dashed border-muted-foreground" />
                <span>Migration route</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                <span>Settlement / Site</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}
