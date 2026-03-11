"use client";

import { useEffect, useState, useRef } from "react";
import { AlertCircle, ChevronLeft, Settings, Maximize2 } from "lucide-react";
import Link from "next/link";

interface FraudReport {
  _id: string;
  latitude: number;
  longitude: number;
  city: string;
  medicineName?: string;
  reason: string;
  reportedAt: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
}

const MOCK_REPORTS: FraudReport[] = [
  { _id: "REP-1", latitude: 12.9716, longitude: 77.5946, city: "BANGALORE",  reason: "BATCH_MISMATCH",   reportedAt: "12:44:02", severity: "HIGH"     },
  { _id: "REP-2", latitude: 19.0760, longitude: 72.8777, city: "MUMBAI",     reason: "CRYPTO_FAILURE",   reportedAt: "13:21:55", severity: "CRITICAL"  },
  { _id: "REP-3", latitude: 28.6139, longitude: 77.2090, city: "DELHI",      reason: "RECALLED_STOCK",   reportedAt: "14:10:12", severity: "MEDIUM"    },
  { _id: "REP-4", latitude: 13.0827, longitude: 80.2707, city: "CHENNAI",    reason: "UNKNOWN_ORIGIN",   reportedAt: "14:55:30", severity: "HIGH"      },
  { _id: "REP-5", latitude: 22.5726, longitude: 88.3639, city: "KOLKATA",    reason: "TAMPER_DETECTED",  reportedAt: "15:20:11", severity: "CRITICAL"  },
];

export default function FraudMapPage() {
  const [reports] = useState<FraudReport[]>(MOCK_REPORTS);
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current || !mapRef.current) return;

    import("leaflet").then((L) => {
      // Fix default icon paths broken by webpack
      // @ts-expect-error - leaflet internal
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        attributionControl: false,
      });

      // Carto Dark — 100% free, no API key
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      // Inject pulse keyframes once
      if (!document.getElementById("fm-pulse-style")) {
        const style = document.createElement("style");
        style.id = "fm-pulse-style";
        style.textContent = `
          @keyframes fmpulse { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(3);opacity:0} }
          .leaflet-popup-content-wrapper { background:#060606!important; border:1px solid #39FF14!important; border-radius:0!important; color:#F2F2F2!important; font-family:monospace!important; font-size:10px!important; padding:0!important; }
          .leaflet-popup-tip { background:#39FF14!important; }
          .leaflet-popup-content { margin:8px 12px!important; }
        `;
        document.head.appendChild(style);
      }

      // Add animated markers for each fraud report
      MOCK_REPORTS.forEach((report) => {
        const color = report.severity === "CRITICAL" ? "#FF006E" : report.severity === "HIGH" ? "#FFAA00" : "#39FF14";
        const icon = L.divIcon({
          className: "",
          html: `
            <div style="position:relative;width:20px;height:20px;display:flex;align-items:center;justify-content:center;">
              <div style="position:absolute;width:20px;height:20px;border-radius:50%;background:${color};opacity:0.5;animation:fmpulse 1.4s ease-out infinite;"></div>
              <div style="width:8px;height:8px;background:transparent;border:2px solid ${color};transform:rotate(45deg);position:relative;z-index:1;"></div>
            </div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        L.marker([report.latitude, report.longitude], { icon })
          .addTo(map)
          .bindPopup(
            `<div><b style="color:${color}">${report.city}</b><br/>
            <span style="color:#888">${report.reason}</span><br/>
            <span style="color:#39FF14;font-size:9px">${report.severity} // ${report.reportedAt}</span></div>`
          );
      });

      mapInstanceRef.current = map;
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[#020202] text-[#F2F2F2] overflow-hidden font-mono relative">
      {/* Leaflet CSS */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* HUD OVERLAY - TOP BAR */}
      <header className="absolute top-0 left-0 right-0 h-16 bg-[#040404]/80 backdrop-blur-md border-b border-[#0E0E0E] z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#444] hover:text-[#39FF14] transition-colors group">
            <ChevronLeft size={16} />
            <span className="text-[10px] font-bold tracking-[2px]">RETURN_TO_BASE</span>
          </Link>
          <div className="w-px h-6 bg-[#0E0E0E]" />
          <div className="flex flex-col min-w-0">
            <h1 className="text-xs md:text-sm font-bebas tracking-[1px] text-white">FRAUD_INTELLIGENCE_SYSTEM</h1>
            <span className="text-[7px] md:text-[8px] text-[#39FF14] tracking-[1px] animate-pulse">ACTIVE_SURVEILLANCE_NODE_V4.2</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-[#333]">LIVE_NODES</span>
            <span className="text-[10px] text-[#39FF14]">14_STABLE</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-[#333]">SYS_LATENCY</span>
            <span className="text-[10px] text-[#39FF14]">0.04ms</span>
          </div>
          <div className="w-px h-6 bg-[#0E0E0E]" />
          <Settings size={14} className="text-[#333] cursor-pointer hover:text-white" />
        </div>
      </header>

      {/* LEFT HUD - THREAT FEED */}
      <aside className="absolute left-6 top-24 bottom-6 w-72 bg-[#040404]/90 backdrop-blur-xl border border-[#0E0E0E] z-40 p-6 flex flex-col gap-6 hidden md:flex">
        <div className="flex flex-col gap-1 border-b border-[#0E0E0E] pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bebas text-white tracking-[2px]">ACTIVE_THREATS</h2>
            <AlertCircle size={14} className="text-[#FF006E] animate-pulse" />
          </div>
          <span className="text-[8px] text-[#333]">REAL_TIME_INCIDENT_STREAM</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {reports.map((report) => (
            <div key={report._id} className="p-3 bg-[#060606] border border-[#0E0E0E] border-l-2 border-l-[#FF006E] hover:border-[#39FF14] transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-[#39FF14] font-bold">{report._id}</span>
                <span className="text-[8px] text-[#333]">{report.reportedAt}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-white font-bold">{report.medicineName || "UNIDENTIFIED_AGENT"}</span>
                <span className="text-[9px] text-[#444] uppercase tracking-[1px]">{report.city} {`//`} {report.reason}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-[#FF006E] animate-pulse" />
                  <span className="text-[8px] text-[#FF006E] font-bold">{report.severity}</span>
                </div>
                <span className="text-[8px] text-[#1A1A1A] group-hover:text-[#39FF14] transition-colors">TRACK_SOURCE →</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-[#0E0E0E]">
          <div className="flex flex-col gap-2 bg-[#060606] p-3 border border-[#0E0E0E]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] text-[#333]">CRYPTO_ENTROPY</span>
              <span className="text-[8px] text-[#39FF14]">94.2%</span>
            </div>
            <div className="w-full h-1 bg-[#0E0E0E]">
              <div className="w-[94%] h-full bg-[#39FF14]" />
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT HUD - GEOSPATIAL STATS */}
      <aside className="absolute right-6 top-24 bottom-6 w-56 bg-[#040404]/90 backdrop-blur-xl border border-[#0E0E0E] z-40 p-6 flex-col gap-8 hidden lg:flex">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bebas text-white tracking-[2px]">GEOSPATIAL_METRICS</h3>
          <span className="text-[8px] text-[#333]">DISTRIBUTION_ANALYTICS</span>
        </div>
        <div className="space-y-6">
          {[
            { label: "NORTH_CLUSTER", value: 42, color: "#39FF14" },
            { label: "SOUTH_HUB",     value: 28, color: "#FF006E" },
            { label: "WEST_TERMINAL", value: 15, color: "#39FF14" },
            { label: "EAST_PORT",     value: 15, color: "#333"    },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-[#444] tracking-[1px]">{item.label}</span>
                <span className="text-white font-bold">{item.value}%</span>
              </div>
              <div className="w-full h-0.5 bg-[#0E0E0E]">
                <div className="h-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-[9px] text-[#333] font-bold uppercase tracking-[2px]">NETWORK_RADAR</h4>
          <div className="aspect-square border border-[#0E0E0E] bg-[#060606] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 border border-[#39FF14]/10 rounded-full animate-ping" />
            <div className="absolute inset-4 border border-[#39FF14]/5 rounded-full" />
            <div className="absolute inset-8 border border-[#39FF14]/5 rounded-full" />
            <div className="w-px h-full bg-[#39FF14]/10 absolute" />
            <div className="w-full h-px bg-[#39FF14]/10 absolute" />
            <div className="w-1.5 h-1.5 bg-[#39FF14] z-10 shadow-[0_0_10px_#39FF14]" />
          </div>
        </div>
        <button className="mt-auto w-full py-3 bg-[#060606] border border-[#0E0E0E] font-bebas text-xs tracking-[2px] text-[#333] hover:text-[#39FF14] hover:border-[#39FF14] transition-all flex items-center justify-center gap-2">
          <Maximize2 size={12} />
          FULL_SCREEN_HUD
        </button>
      </aside>

      {/* MAP CANVAS — Leaflet, no API key needed */}
      <div ref={mapRef} className="absolute inset-0 z-0" style={{ minHeight: "100vh" }} />

      {/* SCANLINE EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-[45] opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
    </div>
  );
}
