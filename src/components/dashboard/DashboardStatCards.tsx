"use client";

import React, { useEffect, useState, useRef } from "react";

// Tiny inline sparkline SVG
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const w = 80, h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={points} stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
};

// Count-up hook
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const frame = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.floor(eased * target));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);
  return value;
}

// Sparkline data seed
const genSparkline = (base: number, points = 7) =>
  Array.from({ length: points }, () => base + Math.floor(Math.random() * base * 0.3 - base * 0.1));

interface StatCardProps {
  label: string;
  suffix?: string;
  baseValue: number;
  accent: string;
  trend: string;
  trendColor: string;
  showSparkline?: boolean;
  increment?: boolean; // auto-increment every few seconds
}

const StatCard = ({ label, suffix, baseValue, accent, trend, trendColor, showSparkline, increment }: StatCardProps) => {
  const [live, setLive] = useState(baseValue);
  const [spark] = useState(() => genSparkline(baseValue));
  const displayed = useCountUp(live, 1400);

  useEffect(() => {
    if (!increment) return;
    const interval = setInterval(() => {
      setLive(v => v + Math.floor(Math.random() * 3 + 1));
    }, Math.random() * 4000 + 4000);
    return () => clearInterval(interval);
  }, [increment]);

  return (
    <div className="bg-[#040404] border border-[#0E0E0E] border-l-2 flex flex-col gap-3 p-6 relative overflow-hidden group hover:bg-[#060606] transition-colors"
         style={{ borderLeftColor: accent }}>
      {/* Label */}
      <span className="text-[8px] text-[#333] uppercase tracking-[2px]" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
        {label}
      </span>

      {/* Number */}
      <div className="flex items-end gap-2">
        <span className="font-bebas text-5xl leading-none" style={{ color: accent }}>
          {displayed.toLocaleString()}{suffix}
        </span>
      </div>

      {/* Sparkline */}
      {showSparkline && (
        <div className="opacity-60">
          <Sparkline data={[...spark.slice(0, -1), live]} color={accent} />
        </div>
      )}

      {/* Trend */}
      <span className="text-[9px] font-mono" style={{ color: trendColor }}>
        {trend}
      </span>

      {/* Active dot — shows increment is live */}
      {increment && (
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <div className="w-1 h-1 animate-pulse" style={{ backgroundColor: accent }} />
          <span className="text-[7px] font-mono" style={{ color: accent, opacity: 0.6 }}>LIVE</span>
        </div>
      )}
    </div>
  );
};

export const DashboardStatCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px', backgroundColor: '#0E0E0E' }}>
    <StatCard
      label="SCANS / TODAY"
      baseValue={142802}
      accent="#39FF14"
      trend="↑ 12% vs yesterday"
      trendColor="#39FF14"
      showSparkline
      increment
    />
    <StatCard
      label="SUSPICIOUS FLAGS"
      baseValue={14}
      accent="#FF006E"
      trend="↑ 3 new in last hour"
      trendColor="#FF006E"
      showSparkline
      increment
    />
    <StatCard
      label="VERIFIED PHARMACIES"
      baseValue={2481}
      accent="#F2F2F2"
      trend="↔ No change today"
      trendColor="#444"
    />
    <StatCard
      label="ACTIVE MANUFACTURERS"
      baseValue={312}
      accent="#F2F2F2"
      trend="↑ 4 new this week"
      trendColor="#444"
    />
  </div>
);
