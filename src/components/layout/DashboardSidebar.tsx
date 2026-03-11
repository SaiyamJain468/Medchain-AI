"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LogOut, X, Terminal } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const SIDEBAR_ITEMS = [
  { id: "overview",      label: "OVERVIEW",       glyph: "⬡",  href: "/dashboard" },
  { id: "reports",       label: "SCAN REPORTS",   glyph: "◈",  href: "/dashboard/reports" },
  { id: "fraud",         label: "FRAUD ALERTS",   glyph: "⚠",  href: "/dashboard/alerts", hasAlert: true },
  { id: "pharmacy",      label: "PHARMACIES",      glyph: "⊞",  href: "/dashboard/pharmacy" },
  { id: "manufacturers", label: "MANUFACTURERS",   glyph: "⬟",  href: "/dashboard/manufacturers" },
  { id: "settings",      label: "SETTINGS",        glyph: "○",  href: "/dashboard/settings" },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(14);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-6 left-6 w-10 h-10 border border-[#0E0E0E] bg-[#020202] flex items-center justify-center text-[#39FF14] z-[60]"
        aria-label="Toggle sidebar"
      >
        <Terminal size={18} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        w-[240px] h-screen fixed left-0 top-0 bg-[#040404] border-r border-[#0E0E0E] flex flex-col z-50
        transition-transform duration-300 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

        {/* ── LOGO ── */}
        <div className="p-6 border-b border-[#0E0E0E]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#060606] border border-[#0E0E0E] flex items-center justify-center group-hover:border-[#39FF14] transition-colors">
              <ShieldCheck className="w-4 h-4 text-[#39FF14]" />
            </div>
            <span className="font-bebas text-2xl text-white tracking-[2px]">
              MEDCHAIN_<span className="text-[#39FF14]">AI</span>
            </span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-6 right-6 text-[#333] hover:text-[#39FF14]"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── SYSTEM STATUS BLOCK ── */}
        <div className="px-4 pt-4 pb-2">
          <div className="bg-[#060606] border border-[#0E0E0E] p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: '#333', textTransform: 'uppercase' }}>
                SYS STATUS
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#39FF14] animate-pulse" />
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', color: '#39FF14' }}>ONLINE</span>
              </div>
            </div>
            {[
              ["UPTIME", "99.97%"],
              ["LAST SYNC", "0.8s ago"],
              ["NODES", "14 connected"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: '#444' }}>{k}</span>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', color: '#39FF14' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── NAV ── */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between px-5 py-3 group transition-all duration-150 ${
                  isActive
                    ? "bg-[#060606] border-l-2 border-[#39FF14]"
                    : "border-l-2 border-transparent hover:bg-[#060606]/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm select-none ${isActive ? "text-[#39FF14]" : "text-[#333] group-hover:text-[#39FF14]"}`}>
                    {item.glyph}
                  </span>
                  <span
                    className={`text-[13px] font-semibold tracking-[0.5px] transition-colors ${
                      isActive ? "text-[#F2F2F2]" : "text-[#444] group-hover:text-[#39FF14]"
                    }`}
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}
                  >
                    {item.label}
                  </span>
                </div>
                {item.hasAlert && (
                  <span
                    className="text-[#020202] font-bold text-[8px] px-1.5 py-0.5 min-w-[20px] text-center"
                    style={{ backgroundColor: '#FF006E', fontFamily: "'Share Tech Mono', monospace", borderRadius: 0 }}
                  >
                    {alertCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── USER FOOTER ── */}
        <div className="p-4 border-t border-[#0E0E0E] bg-[#030303] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {/* Square avatar (no border-radius) */}
            <div
              className="w-8 h-8 flex items-center justify-center text-[#39FF14]"
              style={{ backgroundColor: '#1A1A1A', fontFamily: "'Bebas Neue', cursive", fontSize: '18px', borderRadius: 0 }}
            >
              {session?.user?.name?.[0]?.toUpperCase() || "JD"}
            </div>
            <div className="flex flex-col gap-0.5">
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '13px', color: '#F2F2F2' }}>
                {session?.user?.name || "GUEST_USER"}
              </span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#333' }}>
                {(session?.user as any)?.role || "USER"}
              </span>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 transition-colors w-full group"
            style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: '#333' }}>
            <LogOut size={12} className="group-hover:text-[#FF006E] transition-colors" />
            <span className="uppercase tracking-[2px] group-hover:text-[#FF006E] transition-colors">SIGN OUT</span>
          </button>
        </div>
      </aside>
    </>
  );
};
