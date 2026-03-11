"use client";

import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Globe } from 'lucide-react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibW9ja2FjY291bnQiLCJhIjoiY2x4eHh5ZnpwMDF2bjJqb200eXVzeDRtciJ9.MockTokenForDemo123';

const hotspots = [
    { id: 1, longitude: 77.5946, latitude: 12.9716, city: 'Bangalore', severity: 'high' },
    { id: 2, longitude: 72.8777, latitude: 19.0760, city: 'Mumbai', severity: 'medium' },
    { id: 3, longitude: 77.2090, latitude: 28.6139, city: 'Delhi', severity: 'high' },
];

export function FraudMapEmbed() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-full bg-[#111111] animate-pulse"></div>;

    return (
        <div className="w-full h-full relative group">
            <Map
                initialViewState={{
                    longitude: 78.9629,
                    latitude: 20.5937,
                    zoom: 3.5
                }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
            >
                <NavigationControl position="top-right" />

                {hotspots.map((spot) => (
                    <Marker
                        key={spot.id}
                        longitude={spot.longitude}
                        latitude={spot.latitude}
                        anchor="bottom"
                    >
                        <div className="relative flex items-center justify-center">
                            <div className={`absolute w-6 h-6 rounded-full opacity-50 animate-ping ${
                                spot.severity === 'high' ? 'bg-[#FF006E]' : 'bg-[#FFAA00]'
                            }`}></div>
                            <MapPin className={`relative z-10 w-5 h-5 ${
                                spot.severity === 'high' ? 'text-[#FF006E]' : 'text-[#FFAA00]'
                            }`} />
                        </div>
                    </Marker>
                ))}
            </Map>
            
            <div className="absolute bottom-4 left-4 p-2 bg-[#0D0D0D]/80 border border-white/10 backdrop-blur-sm pointer-events-none group-hover:border-[#39FF14]/30 transition-colors">
               <div className="flex items-center gap-2">
                 <Globe className="text-[#39FF14]" size={12} />
                 <span className="text-[8px] font-mono text-white uppercase tracking-widest">Live Node Feed</span>
               </div>
            </div>
        </div>
    );
}
