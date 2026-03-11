"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Scan", path: "/scan" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Map", path: "/fraud-map" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // Prevent layout shift from scrollbar disappearing
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      if (scrollY) {
        const top = Math.abs(parseInt(scrollY, 10));
        window.scrollTo(0, top);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        const top = Math.abs(parseInt(scrollY, 10));
        window.scrollTo(0, top);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b h-16 md:h-auto ${
        isScrolled 
          ? "bg-[#020202]/95 backdrop-blur-md border-[#0E0E0E] py-3 md:py-3" 
          : "bg-transparent border-transparent py-4 md:py-6"
      }`}
    >
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <ShieldCheck className="w-8 h-8 text-[#39FF14]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF006E] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-2xl text-white leading-none tracking-[1px]">
              MEDCHAIN <span className="text-[#39FF14]">AI</span>
            </span>
            <span className="text-[7px] text-[#444] font-mono tracking-[3px] uppercase leading-none mt-1">
              BLOCKCHAIN_PROTOCOL_V4
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`
                font-mono text-[10px] uppercase tracking-[2px] transition-all duration-200
                ${pathname === link.path 
                  ? "text-[#39FF14] border-b border-[#39FF14] pb-1" 
                  : "text-[#444] hover:text-[#39FF14]"}
              `}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#333] hover:text-[#39FF14] transition-colors"
              aria-label={isMuted ? "Unmute interface" : "Mute interface"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <Link href="/scan">
              <Button size="sm" variant="ghost" className="h-9 px-6">
                SCAN_UNIT
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#39FF14]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#020202] z-[200] flex flex-col items-center justify-center gap-6 p-6 md:hidden overflow-hidden"
          >
            <button 
              className="absolute top-8 right-8 text-[#39FF14]"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="absolute top-8 left-8">
               <ShieldCheck className="w-10 h-10 text-[#39FF14]" />
            </div>
            
            {NAV_LINKS.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  href={link.path}
                  className="font-bebas text-4xl uppercase text-[#444] hover:text-[#39FF14] transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <div className="w-full max-w-xs mt-6 pt-6 border-t border-[#1A1A1A]">
              <Link href="/scan" className="w-full">
                <Button fullWidth size="md">
                  ACCESS SCANNER
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
