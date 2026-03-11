"use client";

import React from "react";
import { Terminal, AlertTriangle, ShieldX, Bell, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Badge";

const MOCK_ALERTS = [
  { id: 1, type: "TAMPER_DETECTED", location: "Mumbai Hub", batch: "Batch_#9982", time: "2m ago", severity: "CRITICAL" },
  { id: 2, type: "OUT_OF_BOUNDS", location: "Global Transit", batch: "Batch_#4421", time: "15m ago", severity: "HIGH" },
  { id: 3, type: "UNAUTHORIZED_SCAN", location: "Delhi Pharma", batch: "Batch_#1029", time: "1h ago", severity: "MEDIUM" },
  { id: 4, type: "TEMP_FLUCTUATION", location: "Cold Storage A", batch: "Batch_#7729", time: "3h ago", severity: "LOW" },
];

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0E0E0E] pb-6 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle size={12} className="text-[#FF006E]" />
            <Tag className="bg-[#1F0010] text-[#FF006E] border-none text-[9px] px-2">THREAT_LEVEL: HIGH</Tag>
          </div>
          <h1 className="text-4xl md:text-5xl font-bebas tracking-[1px] text-white">
            FRAUD_<span className="text-[#39FF14]">ALERTS</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="border-[#0E0E0E] text-[10px] h-9 px-4">
            <Bell size={12} className="mr-2" /> MUTE_NOTIFICATIONS
          </Button>
          <Button className="bg-[#FF006E] hover:bg-[#D0005B] text-white text-[10px] h-9 px-4 border-none">
             INITIATE_LOCKDOWN
          </Button>
        </div>
      </div>

      {/* ALERT FEED */}
      <div className="grid grid-cols-1 gap-4">
        {MOCK_ALERTS.map((alert) => (
          <Card key={alert.id} className="p-5 border-[#0E0E0E] hover:border-[#FF006E]/30 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 flex items-center justify-center border ${alert.severity === 'CRITICAL' ? 'border-[#FF006E] text-[#FF006E] bg-[#1F0010]' : 'border-[#0E0E0E] text-[#444] group-hover:text-[#F2F2F2]'}`}>
                <ShieldX size={20} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                   <span className="text-sm font-bold tracking-[1px] text-white font-bebas">{alert.type}</span>
                   <Tag className="bg-[#0D0D0D] text-[#333] border-[#1A1A1A] text-[8px] px-1.5">{alert.severity}</Tag>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-[#333]">
                   <span className="flex items-center gap-1"><MapPin size={10} /> {alert.location}</span>
                   <span>BATCH_ID: {alert.batch}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
               <span className="text-[10px] font-mono text-[#444]">{alert.time}</span>
               <Button variant="secondary" className="border-[#0E0E0E] text-[9px] h-7 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  INVESTIGATE
               </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* EMERGENCY SUMMARY */}
      <Card className="p-8 border border-dashed border-[#FF006E]/20 bg-[#1F0010]/10 flex flex-col gap-4 text-center">
         <AlertTriangle size={32} className="text-[#FF006E] mx-auto opacity-50" />
         <div className="flex flex-col gap-1">
           <h3 className="text-xl font-bebas text-white">EMERGENCY_SYSTEM_PROTOCOLS</h3>
           <p className="text-[10px] font-mono text-[#444] max-w-md mx-auto">
             IF_A_BATCH_HAS_BEEN_COMPROMISED_SELECT_INITIATE_LOCKDOWN_TO_INVALIDATE_ITS_BLOCKCHAIN_ID_ACROSS_THE_GLOBAL_LEDGER_IMMEDIATELY.
           </p>
         </div>
      </Card>
    </div>
  );
}
