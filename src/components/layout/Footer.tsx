"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Github, Instagram, Linkedin, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020202] border-t border-[#0E0E0E] px-6 py-24 relative overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-[500px] h-[1px] bg-gradient-to-l from-[#39FF14]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[1px] bg-gradient-to-r from-[#FF006E]/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        {/* Left: Logo & Tagline (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-[#060606] border border-[#0E0E0E] flex items-center justify-center group-hover:border-[#39FF14] transition-colors">
              <ShieldCheck className="w-6 h-6 text-[#39FF14]" />
            </div>
            <span className="font-bebas text-4xl text-white tracking-[2px]">
              MEDCHAIN_<span className="text-[#39FF14]">AI</span>
            </span>
          </Link>
          <p className="text-[#444] font-mono text-[11px] uppercase tracking-[3px] leading-relaxed max-w-sm">
            TERMINATING COUNTERFEIT PHARMACEUTICALS THROUGH NEURAL_VERIFICATION AND IMMUTABLE_BLOCKCHAIN_PROTOCOLS.
          </p>
          <div className="flex items-center gap-4">
             <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-[#39FF14]" />)}
             </div>
             <span className="font-mono text-[9px] text-[#39FF14] tracking-[2px]">SYSTEM_STATUS: NOMINAL</span>
          </div>
        </div>

        {/* Center: Navigation (3 cols) */}
        <div className="md:col-span-3 flex flex-col gap-8">
          <h4 className="text-white font-bebas text-xl uppercase tracking-[2px]">
            PROTOCOL_NAV
          </h4>
          <div className="flex flex-col gap-4">
            {["SCANNER", "MARKETPLACE", "FRAUD_HEATMAP", "TERMINAL_LOGS"].map((link) => (
              <Link 
                key={link} 
                href="#" 
                className="text-[#444] hover:text-[#39FF14] font-mono text-[10px] uppercase tracking-[2px] transition-all hover:translate-x-1"
              >
                {link}_
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Technical Info (4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-8 md:items-end md:text-right">
          <h4 className="text-white font-bebas text-xl uppercase tracking-[2px]">
            NODE_INFRASTRUCTURE
          </h4>
          <div className="flex flex-col gap-2 font-mono text-[10px] text-[#444] uppercase tracking-[2px]">
            <p>LOCATION: IIT_KHARAGPUR // INDIA </p>
            <p>CORE_ENGINE: BUILDeX_V1.0</p>
            <p>ENCRYPTION: 1024_BIT_RSA</p>
            <p className="text-white mt-4">ESTABLISHED_2026</p>
          </div>
          
          <div className="flex gap-4 mt-4">
            {[
              { icon: Github, label: "GH", href: "https://github.com/saiyamjain468" },
              { icon: Instagram, label: "IG", href: "https://instagram.com/saiyamjain343" },
              { icon: Linkedin, label: "LN", href: "https://www.linkedin.com/in/saiyam-jain-468-" }
            ].map((social, i) => (
              <Link 
                key={i} 
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#0E0E0E] flex items-center justify-center text-[#444] hover:border-[#39FF14] hover:text-[#39FF14] transition-all"
              >
                <social.icon size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-[#0E0E0E] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Terminal size={12} className="text-[#39FF14]" />
          <p className="text-[9px] text-[#444] font-mono uppercase tracking-[3px]">
            © 2026 MEDCHAIN_AI. ALL RIGHTS RESERVED. [ VERSION_1.0.4-STABLE ]
          </p>
        </div>
        
        <div className="flex gap-8">
          {["PRIVACY_POLICY", "TERM_OF_SERVICE", "LEGAL_DOCS"].map((item) => (
            <Link 
              key={item} 
              href="#" 
              className="text-[#444] hover:text-white transition-colors text-[9px] font-mono uppercase tracking-[2px]"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
