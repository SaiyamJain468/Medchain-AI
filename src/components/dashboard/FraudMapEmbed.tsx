"use client";

import React, { useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

const hotspots = [
  { id: 1, lon: 77.5946, lat: 12.9716, city: 'Bangalore', severity: 'high' },
  { id: 2, lon: 72.8777, lat: 19.0760, city: 'Mumbai',    severity: 'medium' },
  { id: 3, lon: 77.2090, lat: 28.6139, city: 'Delhi',     severity: 'high' },
  { id: 4, lon: 88.3639, lat: 22.5726, city: 'Kolkata',   severity: 'medium' },
  { id: 5, lon: 80.2707, lat: 13.0827, city: 'Chennai',   severity: 'low' },
];

export function FraudMapEmbed() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || mapInstanceRef.current || !mapContainerRef.current) return;

    // Dynamically import leaflet so it only runs client-side
    import('leaflet').then((L) => {
      // Fix default marker icon paths broken by webpack
      // @ts-expect-error - leaflet internal
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapContainerRef.current!, {
        center: [20.5937, 78.9629],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
      });

      // Dark OpenStreetMap tile provider (Carto Dark — completely free, no key)
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map);

      // Add fraud hotspot markers
      hotspots.forEach((spot) => {
        const color = spot.severity === 'high' ? '#FF006E' : spot.severity === 'medium' ? '#FFAA00' : '#39FF14';
        const pulseIcon = L.divIcon({
          className: '',
          html: `
            <div style="position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center;">
              <div style="
                position:absolute;width:24px;height:24px;border-radius:50%;
                background:${color};opacity:0.35;
                animation:ping 1.4s cubic-bezier(0,0,0.2,1) infinite;
              "></div>
              <div style="
                width:10px;height:10px;border-radius:50%;
                background:${color};border:2px solid #000;
                position:relative;z-index:1;
              "></div>
            </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        L.marker([spot.lat, spot.lon], { icon: pulseIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:monospace;font-size:10px;background:#111;color:#39FF14;border:1px solid #39FF14;padding:6px 10px;">`
            + `<b>${spot.city.toUpperCase()}</b><br/>SEVERITY: ${spot.severity.toUpperCase()}</div>`,
            { className: 'fraud-popup' }
          );
      });

      // Inject pulse keyframes
      if (!document.getElementById('leaflet-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'leaflet-pulse-style';
        style.textContent = `@keyframes ping{0%{transform:scale(1);opacity:0.35}100%{transform:scale(2.5);opacity:0}}`;
        document.head.appendChild(style);
      }

      mapInstanceRef.current = map;
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="w-full h-full relative group">
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: 250 }} />

      {/* HUD overlay */}
      <div className="absolute bottom-4 left-4 p-2 bg-[#0D0D0D]/80 border border-white/10 backdrop-blur-sm pointer-events-none group-hover:border-[#39FF14]/30 transition-colors z-[1000]">
        <div className="flex items-center gap-2">
          <Globe className="text-[#39FF14]" size={12} />
          <span className="text-[8px] font-mono text-white uppercase tracking-widest">Live Node Feed</span>
        </div>
      </div>
    </div>
  );
}
