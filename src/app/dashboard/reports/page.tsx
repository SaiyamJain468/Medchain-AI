"use client";

import React from "react";
import { Terminal, Download, Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Badge";
import { RecentReportsTable } from "@/components/dashboard/RecentReportsTable";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0E0E0E] pb-6 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-[#39FF14]" />
            <Tag className="bg-[#0D2B05] text-[#39FF14] border-none text-[9px] px-2">LOG_ARCHIVE_V1.0</Tag>
          </div>
          <h1 className="text-4xl md:text-5xl font-bebas tracking-[1px] text-white">
            SCAN_<span className="text-[#39FF14]">REPORTS</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#333] group-hover:text-[#39FF14] transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH_LOGS..." 
              className="bg-[#060606] border border-[#0E0E0E] pl-9 pr-4 py-2 text-[10px] font-mono text-[#F2F2F2] outline-none focus:border-[#39FF14] transition-all w-[240px]"
            />
          </div>
          <Button variant="secondary" className="border-[#0E0E0E] text-[10px] h-9 px-4">
            <Filter size={12} className="mr-2" /> FILTER_RESULTS
          </Button>
        </div>
      </div>

      {/* REPORTS TABLE */}
      <Card className="p-4 md:p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bebas text-white tracking-[1px]">HISTORICAL_SCAN_DATA</h3>
            <span className="text-[9px] font-mono text-[#333]">ALL_VERIFIED_DRUG_BATCHES</span>
          </div>
          <Button variant="secondary" className="border-[#0E0E0E] text-[10px] h-9 px-4">
            <Download size={12} className="mr-2" /> EXPORT_CSV
          </Button>
        </div>
        
        <RecentReportsTable />
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "TOTAL_SCANS", value: "1,284", sub: "+12%_THIS_MONTH", color: "#39FF14" },
          { label: "VERIFIED_BATCHES", value: "1,242", sub: "96.7%_ACCURACY", color: "#39FF14" },
          { label: "TAMPER_ALERTS", value: "42", sub: "ACTION_REQUIRED", color: "#FF006E" },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 border-[#0E0E0E] flex flex-col gap-2 relative overflow-hidden group hover:border-[#39FF14]/30 transition-colors">
             <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal size={40} className="text-[#39FF14]" />
             </div>
             <span className="text-[9px] font-mono text-[#444] tracking-[2px]">{stat.label}</span>
             <span className="text-3xl font-bebas text-white tracking-[1px]">{stat.value}</span>
             <span className="text-[8px] font-mono" style={{ color: stat.color }}>{stat.sub}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
