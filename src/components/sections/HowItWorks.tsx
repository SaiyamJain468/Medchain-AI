"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShieldCheck, Activity, Zap } from "lucide-react";

const STEPS = [
  {
    id: "01",
    title: "NEURAL_IMAGING",
    desc: "AI-powered vision system captures 480 precision points of the medicine packaging. Micro-anomalies in print and texture are flagged instantly.",
    icon: Search,
    stats: "[ SENSOR: ACTIVE ] [ RESOLUTION: 8K ]",
  },
  {
    id: "02",
    title: "LEDGER_VERIFY",
    desc: "Every batch movement is cross-referenced with the immutable Polygon blockchain. Cryptographic proof ensures zero tampering since origin.",
    icon: ShieldCheck,
    stats: "[ BLOCK: #912808 ] [ STATUS: VALIDATED ]",
  },
  {
    id: "03",
    title: "GEO_FENCING",
    desc: "Global fraud detection engine identifies suspicious GPS shifts and unauthorized supply chain detours in real-time.",
    icon: Activity,
    stats: "[ NODES: 2,491 ] [ LATENCY: 8MS ]",
  },
  {
    id: "04",
    title: "PROTOCOL_EXIT",
    desc: "Total transparency delivered to the patient. Authentic medicines receive a green cryptographic signature and legal certificate.",
    icon: Zap,
    stats: "[ EXIT_CODE: 0X0 ] [ SECURE: TRUE ]",
  },
];

export const HowItWorks = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the x translation based on the number of slides
  // Total slides = 1 (title) + STEPS.length + 1 (final CTA)
  const totalSlides = STEPS.length + 2;
  const xMovement = `-${((totalSlides - 1) * 100) / totalSlides}%`;
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", xMovement]);

  return (
    <section ref={targetRef} className="relative bg-[#020202] w-full" style={{ height: `${totalSlides * 100}vh` }}>
      {/* The sticky container locks to the top of the viewport for the duration of the 600vh scroll */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        <motion.div style={{ x, width: `${totalSlides * 100}vw` }} className="flex h-full">
          {/* TITLE SLIDE */}
          <div className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center border-r border-[#0E0E0E] px-12 relative">
            <span className="font-mono text-[10px] text-[#39FF14] tracking-[4px] uppercase mb-8">
              // MEDCHAIN_PROTOCOL_V4.0
            </span>
            <h2 className="text-7xl md:text-[180px] font-bebas text-white leading-none tracking-tighter uppercase text-center relative z-10">
              SYSTEM <br />
              <span className="text-[#39FF14]">ARCHITECTURE_</span>
            </h2>
            <div className="mt-12 flex items-center gap-4 font-mono text-[9px] text-[#444] uppercase tracking-[2px]">
              SCROLL TO INITIATE SEQUENCE <div className="w-12 h-[1px] bg-[#39FF14] animate-pulse" />
            </div>
          </div>

          {/* STEP SLIDES */}
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="w-screen h-screen flex-shrink-0 flex items-center justify-center border-r border-[#0E0E0E] px-6 md:px-24"
              >
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-6">
                      <span className="font-bebas text-9xl text-[#0E0E0E] select-none">{step.id}</span>
                      <div className="h-[2px] flex-1 bg-[#0E0E0E]" />
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <h3 className="text-4xl md:text-7xl lg:text-8xl font-bebas text-white uppercase tracking-[2px]">
                        {step.title}
                      </h3>
                      <p className="font-mono text-[10px] md:text-sm lg:text-base text-[#444] uppercase leading-relaxed max-w-xl">
                        {step.desc}
                      </p>
                    </div>

                    <div className="p-3 md:p-4 border border-[#0E0E0E] bg-[#060606] font-mono text-[8px] text-[#39FF14] tracking-[3px] w-fit">
                      {step.stats}
                    </div>
                  </div>

                  <div className="relative aspect-square flex items-center justify-center p-8 lg:p-12 bg-[#060606] border border-[#0E0E0E] group overflow-hidden">
                    {/* DECORATIVE ELEMENTS */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#39FF14] opacity-50" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#39FF14] opacity-50" />
                    
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Icon size={80} className="md:w-[120px] md:h-[120px] text-[#39FF14] group-hover:drop-shadow-[0_0_30px_#39FF14] transition-all duration-300" />
                    </motion.div>

                    {/* SCAN LINE ANIMATION */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#39FF14]/20 animate-scan pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* FINAL SLIDE */}
          <div className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center px-12 relative">
             <h2 className="text-8xl md:text-[180px] font-bebas text-[#39FF14] leading-none tracking-tighter uppercase text-center mb-12">
              SECURE.<br />READY.
            </h2>
            <Link href="/scan">
              <button className="px-16 py-8 border-2 border-[#39FF14] text-[#39FF14] font-bebas text-4xl hover:bg-[#39FF14] hover:text-[#020202] transition-colors leading-none tracking-[2px]">
                ACCESS_SCAN_TERMINAL
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Auxiliary Link component for within this file
import Link from "next/link";
