"use client";

import React from "react";
import Link from "next/link";
import { Activity, AlertTriangle, Database } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, StatCard } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Badge";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020202]">
      <Hero />

      {/* --- PHASE 3: PROBLEM SECTION --- */}
      <section className="relative py-20 md:py-32 px-6 border-t border-[#0E0E0E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-12 md:mb-20">
            <Tag>SYSTEM_THREAT_REPORT</Tag>
            <h2 className="text-large font-bebas text-white">
              THE PROBLEM IS <br />
              <span className="text-[#FF006E] glitch-text" data-text="FATAL_FOR_MILLIONS_">FATAL_FOR_MILLIONS_</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            <Card variant="danger" className="min-h-[300px] flex flex-col justify-between group">
              <div>
                <AlertTriangle className="text-[#FF006E] mb-6 group-hover:animate-pulse" size={32} />
                <h3 className="text-2xl font-bebas text-white mb-4 tracking-[1px]">CLONED IDENTITY</h3>
                <p className="font-mono text-[11px] text-[#444] uppercase leading-relaxed">
                  Existing QR codes and holograms are easily replicated by professional counterfeiting syndicates. Serial numbers are static, predictable, and insecure.
                </p>
              </div>
              <div className="font-mono text-[9px] text-[#FF006E] tracking-[2px] mt-8">
                [ THREAT_LEVEL: EXTREME ]
              </div>
            </Card>

            <Card variant="danger" className="min-h-[300px] flex flex-col justify-between group">
              <div>
                <Database className="text-[#FF006E] mb-6 group-hover:animate-pulse" size={32} />
                <h3 className="text-2xl font-bebas text-white mb-4 tracking-[1px]">FRAGMENTED DATA</h3>
                <p className="font-mono text-[11px] text-[#444] uppercase leading-relaxed">
                  Supply chain visibility ends at the distributor. Pharmacies and patients are left in the dark, with zero real-time tools to verify authenticity.
                </p>
              </div>
              <div className="font-mono text-[9px] text-[#FF006E] tracking-[2px] mt-8">
                [ VISIBILITY: 0% ]
              </div>
            </Card>

            <Card variant="danger" className="min-h-[300px] flex flex-col justify-between group">
              <div>
                <Activity className="text-[#FF006E] mb-6 group-hover:animate-pulse" size={32} />
                <h3 className="text-2xl font-bebas text-white mb-4 tracking-[1px]">ANALOG FRAUD</h3>
                <p className="font-mono text-[11px] text-[#444] uppercase leading-relaxed">
                  Regulators rely on manual inspections and delayed reporting. By the time fraud is detected, the medicine has already reached thousands.
                </p>
              </div>
              <div className="font-mono text-[9px] text-[#FF006E] tracking-[2px] mt-8">
                [ DELAY_INDEX: CRITICAL ]
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* --- BRUTAL STATS BAR --- */}
      <section className="bg-[#050505] border-y border-[#0E0E0E] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1">
          <StatCard 
            label="MARKET_INFILTRATION" 
            value="1 in 5" 
            trend="↑ 4.2% CRITICAL"
            variant="danger"
          />
          <StatCard 
            label="ANNUAL_FATALITIES" 
            value="120K" 
            trend="↑ HIGH_ALERT"
            variant="danger"
          />
          <StatCard 
            label="ECONOMIC_LOSS" 
            value="₹12T" 
            trend="↑ IMPACT_FATAL"
            variant="danger"
          />
        </div>
      </section>

      {/* --- PHASE 4: HOW IT WORKS (HORIZONTAL) --- */}
      <HowItWorks />

      {/* --- CTA SECTION --- */}
      <section className="relative py-32 md:py-48 px-6 bg-[#030303] border-t border-[#0E0E0E] overflow-hidden">
        {/* BIG BG TEXT */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[150px] md:text-[300px] text-[#050505] pointer-events-none select-none z-0 opacity-50">
          MEDCHAIN
        </div>
        
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-10 relative z-10">
          <h2 className="text-large md:text-[140px] font-bebas text-white leading-[0.85] tracking-tighter uppercase">
            THE ANTIDOTE <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #39FF14' }}>IS HERE.</span>
          </h2>
          
          <p className="font-mono text-sm md:text-lg text-[#444] uppercase tracking-[4px] max-w-2xl">
            Join 2.4M verified medicine scans. Free for patients. Secure for the first time in history.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-4">
             <Link href="/scan">
              <Button size="lg" className="h-16 px-12 text-lg">
                GET_STARTED_FREE →
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="h-16 px-12 text-lg">
              WATCH_DEMO
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 font-mono text-[9px] text-[#444] uppercase tracking-[2px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#39FF14]" /> NO ACCOUNT REQUIRED
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#39FF14]" /> UNIVERSAL SMARTPHONE SUPPORT
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#39FF14]" /> OPEN-SOURCE BLOCKCHAIN LEDGER
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
