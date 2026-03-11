"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Activity, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DnaHelix } from "./DnaHelix";
import { useScramble } from "@/hooks/useScramble";

export const Hero = () => {
  const { displayValue: title1 } = useScramble("COUNTERFEIT", 2000, 500);
  const { displayValue: title2 } = useScramble("MEDICINES", 2000, 800);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
      <DnaHelix />
      
      {/* HUD ELEMENTS - TOP LEFT */}
      <div className="absolute top-32 left-8 hidden lg:flex flex-col gap-2 font-mono text-[8px] text-[#444] tracking-[2px] z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#39FF14] animate-pulse" />
          [ SYSTEM: ONLINE ]
        </div>
        <div>[ NODES: 14 CONNECTED ]</div>
        <div>[ LATENCY: 12MS ]</div>
      </div>

      {/* HUD ELEMENTS - TOP RIGHT */}
      <div className="absolute top-32 right-8 hidden lg:flex flex-col items-end gap-2 font-mono text-[8px] text-[#444] tracking-[2px] z-10">
        <div className="flex items-center gap-2">
          [ SCANS: 2,847,291 ]
          <span className="w-1.5 h-1.5 bg-[#39FF14]" />
        </div>
        <div>[ VERIFIED: 99.4% ]</div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Badge variant="verified" className="px-4 py-1">
            AI + BLOCKCHAIN PROTOCOL V4.0
          </Badge>
        </motion.div>

        <div className="flex flex-col items-center mb-8">
          <h1 className="text-7xl md:text-[140px] font-bebas leading-[0.85] text-white tracking-tighter">
            {title1 || "COUNTERFEIT"}
          </h1>
          <h1 className="text-7xl md:text-[140px] font-bebas leading-[0.85] text-[#39FF14] tracking-tighter">
            {title2 || "MEDICINES"}
          </h1>
          <h2 
            className="text-3xl md:text-6xl font-bebas text-[#444] mt-4 glitch-text"
            data-text="end here."
          >
            end here.
          </h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-w-xl text-[#888] font-mono text-sm md:text-base uppercase tracking-[2px] mb-12 leading-relaxed"
        >
          Securing India's supply chain with real-time neural verification. <br className="hidden md:block" />
          Join 2.8 million scans. Protect your health.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link href="/scan">
            <Button size="lg" className="px-12 h-16 text-lg group">
              START SCANNING <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="px-12 h-16 text-lg">
            HOW IT WORKS
          </Button>
        </motion.div>
      </div>

      {/* BOTTOM TICKER / DECORATION */}
      <div className="absolute bottom-12 left-0 w-full px-8 flex justify-between items-end z-10">
        <div className="hidden md:flex flex-col gap-1 font-mono text-[7px] text-[#1A1A1A]">
          <div>// BLOCK_HASH: 0x4f9a...2b1c</div>
          <div>// TIMESTAMP: 2026-03-12T14:32:07Z</div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#444]">
            <Globe size={12} className="text-[#39FF14]" />
            GLOBAL REACH
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#444]">
            <ShieldCheck size={12} className="text-[#39FF14]" />
            IMMUTABLE LEDGER
          </div>
        </div>
      </div>
    </section>
  );
};
