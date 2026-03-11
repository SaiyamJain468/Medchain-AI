"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScanAreaProps {
  status?: "idle" | "scanning" | "verifying" | "success" | "suspicious" | "error";
  children?: React.ReactNode;
}

export const ScanArea: React.FC<ScanAreaProps> = ({ status = "idle", children }) => {
  return (
    <div className="relative aspect-video bg-[#020202] overflow-hidden border border-[#0E0E0E] group">
      {/* TARGETING BRACKETS */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#39FF14] z-20 transition-all duration-500 group-hover:w-16 group-hover:h-16" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#39FF14] z-20 transition-all duration-500 group-hover:w-16 group-hover:h-16" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#39FF14] z-20 transition-all duration-500 group-hover:w-16 group-hover:h-16" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#39FF14] z-20 transition-all duration-500 group-hover:w-16 group-hover:h-16" />

      {/* ROTATING SEARCH RING (When Scanning/Verifying) */}
      {(status === "scanning" || status === "verifying") && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border border-dashed border-[#39FF14]/30 rounded-full flex items-center justify-center"
          >
             <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-48 h-48 border border-dashed border-[#39FF14]/50 rounded-full"
            />
          </motion.div>
        </div>
      )}

      {/* SCAN LINE */}
      {status === "scanning" && (
        <motion.div 
          className="absolute left-0 w-full h-[1px] bg-[#39FF14] shadow-[0_0_20px_#39FF14] z-20"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* DATA OVERLAYS */}
      <div className="absolute top-8 left-20 z-20 font-mono text-[8px] text-[#39FF14] tracking-[2px] opacity-70">
        [ RESOLUTION: 8K_PROX ] <br />
        [ FOCUS: AUTO_NEURAL ]
      </div>
      
      <div className="absolute bottom-8 right-20 z-20 font-mono text-[8px] text-[#39FF14] tracking-[2px] opacity-70 text-right">
        [ LATENCY: 12MS ] <br />
        [ ENCRYPTION: AES_256 ]
      </div>

      {children}

      {/* FULLSCREEN VERDICT ALERTS */}
      {status === "success" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#39FF14]/10 backdrop-blur-[2px] flex flex-col items-center justify-center z-40"
        >
          <div className="border-4 border-[#39FF14] p-8 bg-[#020202] flex flex-col items-center gap-4">
            <span className="text-8xl font-bebas text-[#39FF14] leading-none">SAFE</span>
            <div className="font-mono text-[10px] text-[#39FF14] tracking-[4px] uppercase">
               AUTHENTICITY_VERIFIED_100%
            </div>
            <div className="w-full h-[1px] bg-[#39FF14]/20 my-4" />
            <div className="font-mono text-[8px] text-[#39FF14]/60 uppercase">
              DECRYPTION_COMPLETE // BATCH_VALID
            </div>
          </div>
        </motion.div>
      )}

      {status === "suspicious" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#FF006E]/20 backdrop-blur-[4px] flex flex-col items-center justify-center z-40"
        >
          <div className="border-4 border-[#FF006E] p-12 bg-[#020202] flex flex-col items-center gap-6 animate-pulse">
            <span className="text-8xl font-bebas text-[#FF006E] leading-none">DANGER</span>
            <div className="font-mono text-[12px] text-[#FF006E] tracking-[4px] font-bold uppercase text-center">
               COUNTERFEIT_DETECTED <br /> DO_NOT_CONSUME
            </div>
            <div className="w-full h-2 bg-[#FF006E]/20" />
            <div className="font-mono text-[8px] text-[#FF006E] uppercase">
              REPORT_FILED_TO_CDSCO // SYSTEM_LOCKED
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
