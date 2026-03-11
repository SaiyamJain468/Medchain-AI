"use client";

import { useEffect, useState } from "react";
import { 
  Download,
  Terminal,
  ChevronRight,
  Clock
} from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardStatCards } from "@/components/dashboard/DashboardStatCards";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Badge";
const AnalyticsCharts = dynamic(() => import("@/components/dashboard/AnalyticsCharts").then((mod) => mod.AnalyticsCharts), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#030303] animate-pulse border border-[#0E0E0E]" />
});

const FraudMapEmbed = dynamic(() => import("@/components/dashboard/FraudMapEmbed").then((mod) => mod.FraudMapEmbed), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#030303] animate-pulse border border-[#0E0E0E]" />
});

import { RecentReportsTable } from "@/components/dashboard/RecentReportsTable";
import { ManufacturersList } from "@/components/dashboard/ManufacturersList";
import dynamic from "next/dynamic";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', { 
        weekday: 'short', 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }).toUpperCase().replace(',', ''));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      {/* TOP TERMINAL HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0E0E0E] pb-6 gap-4">
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center gap-2">
             <Terminal size={12} className="text-[#39FF14] hidden md:block" />
            <Tag className="bg-[#0D2B05] text-[#39FF14] border-none text-[9px] px-2">AUTH_NODE_V2.4</Tag>
            <span className="text-[#333] font-mono text-[10px] truncate">{`// SESSION_ID: 4x29A_883Z`}</span>
         </div>
         <h1 className="text-large md:text-5xl font-bebas tracking-[1px] text-white break-all leading-tight">
           COMMAND_<span className="text-[#39FF14]">CENTRAL</span>
         </h1>
       </div>

        <div className="flex flex-col items-end gap-2 text-right">
           <div className="flex items-center gap-2 font-mono text-[10px] text-[#444]">
              <Clock size={10} />
              <span>{currentTime || "INITIALIZING_CLOCK..."}</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                  <span className="text-[9px] font-mono text-[#333]">LAST_DATA_REFRESH</span>
                  <span className="text-[10px] font-mono text-[#39FF14]">0.42s_AGO</span>
              </div>
              <div className="w-px h-8 bg-[#0E0E0E]" />
              <Button size="sm" variant="secondary" className="px-4 bg-[#060606] border-[#0E0E0E] text-[10px]">
                  REFRESH_LIVE_FEED
              </Button>
           </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <DashboardStatCards />

      {/* ANALYTICS & NODES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <Card className="lg:col-span-8 p-4 md:p-8 flex flex-col gap-6 md:gap-8 min-h-[400px] md:min-h-[500px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg md:text-xl font-bebas text-white tracking-[1px] flex items-center gap-2">
                NEURAL_ANALYTICS_STREAM
              </h3>
              <span className="text-[9px] font-mono text-[#333]">REAL_TIME_NODE_METRICS</span>
            </div>
            <div className="flex gap-2">
              {["1H", "24H", "7D", "30D"].map((t) => (
                <button key={t} className={`px-2 py-1 font-mono text-[9px] border border-[#0E0E0E] transition-colors ${t === "24H" ? "bg-[#39FF14] text-[#020202]" : "text-[#444] hover:text-[#F2F2F2]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <AnalyticsCharts />
          </div>
        </Card>

        <Card className="lg:col-span-4 p-4 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg md:text-xl font-bebas text-white tracking-[1px]">ACTIVE_NODES</h3>
            <span className="text-[9px] font-mono text-[#333]">TOP_MANUFACTURING_HUBS</span>
          </div>
          <ManufacturersList />
          <Button variant="secondary" className="mt-4 border-[#0E0E0E] text-[10px] font-mono tracking-[2px] w-full">
              VIEW_ALL_NODES <ChevronRight size={10} className="ml-2" />
          </Button>
        </Card>
      </div>

      {/* HEATMAP & FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <Card className="lg:col-span-4 p-4 md:p-8 flex flex-col gap-6 lg:min-h-[400px]">
          <div className="flex items-center justify-between">
             <div className="flex flex-col gap-1">
              <h3 className="text-lg md:text-xl font-bebas text-[#FF006E] tracking-[1px]">FRAUD_HEATMAP</h3>
              <span className="text-[9px] font-mono text-[#333]">LIVE_THREAT_DETECTION</span>
            </div>
            <Tag className="bg-[#1F0010] text-[#FF006E] border-none px-2 uppercase text-[9px]">Live</Tag>
          </div>
          <div className="flex-1 min-h-[200px] md:min-h-[250px] border border-[#0E0E0E] bg-[#030303] overflow-hidden">
            <FraudMapEmbed />
          </div>
        </Card>

        <Card className="lg:col-span-8 p-4 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg md:text-xl font-bebas text-white tracking-[1px]">FRAUD_INTELLIGENCE_FEED</h3>
              <span className="text-[9px] font-mono text-[#333]">TAMPER_PROTECTION_LOGS</span>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[9px] font-mono text-[#333] uppercase">Auto_Refresh: ON</span>
                <Download 
                  size={14} 
                  className="text-[#333] hover:text-white cursor-pointer" 
                  role="button"
                  aria-label="Download report"
                />
            </div>
          </div>
          <RecentReportsTable />
        </Card>
      </div>
    </div>
  );
}
