"use client";

import React from "react";
import { Terminal, Building2, Package, Globe, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Badge";

const MOCK_MANUFACTURERS = [
  { name: "PFIZER_CORP", loc: "USA", batch: "1,240", status: "ACTIVE", security: "LV_A" },
  { name: "SANOFI_TRANS", loc: "FRANCE", batch: "892", status: "ACTIVE", security: "LV_A" },
  { name: "MODERNA_NET", loc: "SWITZERLAND", batch: "432", status: "STANDBY", security: "LV_B" },
  { name: "BAYER_SYST", loc: "GERMANY", batch: "1,102", status: "ACTIVE", security: "LV_A" },
];

export default function ManufacturersPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0E0E0E] pb-6 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Building2 size={12} className="text-[#39FF14]" />
            <Tag className="bg-[#0D2B05] text-[#39FF14] border-none text-[9px] px-2">NODES_VERIFIED: 14</Tag>
          </div>
          <h1 className="text-4xl md:text-5xl font-bebas tracking-[1px] text-white">
            MANUFACTURER_<span className="text-[#39FF14]">HUBS</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-[#39FF14] text-black font-bold h-9 px-4 border-none text-[10px]">
            ADD_NEW_NODE
          </Button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_MANUFACTURERS.map((node) => (
          <Card key={node.name} className="p-6 border-[#0E0E0E] hover:border-[#39FF14]/20 transition-all flex flex-col gap-6">
             <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 border border-[#1A1A1A] bg-[#060606] flex items-center justify-center text-[#39FF14]">
                      <Globe size={18} />
                   </div>
                   <div className="flex flex-col gap-0.5">
                      <span className="text-lg font-bebas text-white tracking-[1px]">{node.name}</span>
                      <span className="text-[9px] font-mono text-[#333] tracking-[2px]">{node.loc}</span>
                   </div>
                </div>
                <Tag className={`${node.status === 'ACTIVE' ? 'bg-[#0D2B05] text-[#39FF14]' : 'bg-[#1A1A1A] text-[#444]'} border-none px-2 text-[8px]`}>
                   {node.status}
                </Tag>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#030303] border border-[#0E0E0E] p-3 flex flex-col gap-1">
                   <span className="text-[8px] font-mono text-[#333]">BATCHES_VERIFIED</span>
                   <span className="text-xl font-bebas text-[#F2F2F2] tracking-[1px]">{node.batch}</span>
                </div>
                <div className="bg-[#030303] border border-[#0E0E0E] p-3 flex flex-col gap-1">
                   <span className="text-[8px] font-mono text-[#333]">SECURITY_CLEARANCE</span>
                   <span className="text-xl font-bebas text-[#39FF14] tracking-[1px]">{node.security}</span>
                </div>
             </div>

             <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                   <ShieldCheck size={14} className="text-[#39FF14]" />
                   <span className="text-[9px] font-mono text-[#F2F2F2]">IMPENDING_DATA_AUDIT: OK</span>
                </div>
                <Button variant="secondary" className="border-[#0E0E0E] h-8 px-3 text-[9px] uppercase">
                   Manage_Node
                </Button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
