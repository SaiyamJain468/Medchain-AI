"use client";

import React from "react";
import { Terminal, Settings, User, Shield, Bell, HardDrive, Cpu } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Badge";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0E0E0E] pb-6 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Settings size={12} className="text-[#444]" />
            <Tag className="bg-[#111] text-[#444] border-none text-[9px] px-2">VERSION: 4.8.2-NODE</Tag>
          </div>
          <h1 className="text-4xl md:text-5xl font-bebas tracking-[1px] text-white">
            SYSTEM_<span className="text-[#39FF14]">PREFERENCES</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT PROFILE */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <Card className="p-8 border-[#0E0E0E] flex flex-col gap-6 items-center text-center">
              <div className="w-24 h-24 bg-[#1A1A1A] border border-[#0E0E0E] flex items-center justify-center text-[#39FF14] text-4xl font-bebas">
                 {session?.user?.name?.[0]?.toUpperCase() || "JD"}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bebas text-white tracking-[2px] uppercase">{session?.user?.name || "GUEST_IDENT"}</h3>
                <span className="text-[10px] font-mono text-[#39FF14] tracking-[3px]">ROOT_ACCESS_GRANTED</span>
              </div>
              <Button variant="secondary" className="w-full border-[#0E0E0E] text-[10px] uppercase">
                 Edit_Profile_Bio
              </Button>
           </Card>

           <Card className="p-6 border-[#0E0E0E] flex flex-col gap-4">
              <span className="text-[10px] font-mono text-[#333] uppercase">Node_Architecture</span>
              <div className="flex flex-col gap-3">
                 {[
                   { icon: <Cpu size={14} />, label: "PROCESSOR", val: "QUANTUM_K1" },
                   { icon: <HardDrive size={14} />, label: "STORAGE_HIVES", val: "14_ACTIVE" },
                   { icon: <Shield size={14} />, label: "ENCRYPTION", val: "AES_256_BLOCK" },
                 ].map(item => (
                   <div key={item.label} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 text-[#444]">
                         {item.icon}
                         <span className="font-mono">{item.label}</span>
                      </div>
                      <span className="font-mono text-[#39FF14]">{item.val}</span>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        {/* RIGHT SETTINGS */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           <Card className="p-6 md:p-8 flex flex-col gap-8">
              {/* SECTION: AUTH */}
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-2 border-b border-[#0E0E0E] pb-2">
                    <User size={14} className="text-[#39FF14]" />
                    <h4 className="text-lg font-bebas text-white tracking-[1px]">ACCOUNT_SECURITY</h4>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-mono text-[#333] uppercase">EMAIL_ADDRESS</label>
                       <div className="bg-[#060606] border border-[#0E0E0E] p-3 text-[12px] font-mono text-[#666]">
                          {session?.user?.email || "NOT_LOGGED_IN@DOMAIN.NET"}
                       </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-mono text-[#333] uppercase">2FA_STATUS</label>
                       <div className="bg-[#0D2B05] border border-[#0E0E0E] p-3 text-[12px] font-mono text-[#39FF14] flex justify-between">
                          ACTIVE <span>ENABLED</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* SECTION: NOTIFICATIONS */}
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-2 border-b border-[#0E0E0E] pb-2">
                    <Bell size={14} className="text-[#39FF14]" />
                    <h4 className="text-lg font-bebas text-white tracking-[1px]">SYSTEM_MESSAGING</h4>
                 </div>

                 <div className="space-y-4">
                    {[
                      "Email notifications on fraud detection",
                      "Desktop alerts for supply chain anomalies",
                      "Daily blockchain verification summaries",
                    ].map(label => (
                      <div key={label} className="flex items-center justify-between p-4 bg-[#060606] border border-[#0E0E0E]">
                         <span className="text-[12px] text-[#888]">{label}</span>
                         <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#39FF14]" />
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                 <Button variant="secondary" className="border-[#0E0E0E] text-[10px]">RESET_DEFAULTS</Button>
                 <Button className="bg-[#39FF14] text-black font-bold text-[10px] border-none px-8">SAVE_PROTOCOL_UPDATES</Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
