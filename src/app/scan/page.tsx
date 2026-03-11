"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { 
  History,
  Info,
  Terminal,
  Cpu,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScanArea } from "@/components/ui/ScanArea";
import { useScramble } from "@/hooks/useScramble";

type ScanStatus = "idle" | "scanning" | "verifying" | "success" | "suspicious" | "error";

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [batchId, setBatchId] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  const { displayValue: terminalTitle } = useScramble("NEURAL_SCAN_TERMINAL_V4", 1500, 200);

  const startScanning = useCallback(async () => {
    try {
      setStatus("scanning");
      setResult(null);
      
      codeReader.current = new BrowserMultiFormatReader();
      const videoInputDevices = await codeReader.current.listVideoInputDevices();
      const selectedDeviceId = videoInputDevices.length > 0 ? videoInputDevices[0].deviceId : undefined;

      if (!selectedDeviceId) throw new Error("No camera found.");

      codeReader.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (res) => {
          if (res) {
            handleVerify(res.getText());
          }
        }
      );
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    setRecentScans([
      { name: "AMOXICILLIN_X9", batch: "AX-9021", status: "verified", time: "02:14:00" },
      { name: "PARACETAMOL_ULTRA", batch: "PA-1022", status: "suspicious", time: "01:05:22" },
      { name: "LIPITOR_MAX", batch: "LP-4432", status: "verified", time: "22:15:09" },
    ]);
  }, []);

  const handleVerify = async (id: string) => {
    if (codeReader.current) codeReader.current.reset();
    setStatus("verifying");
    setBatchId(id);
    
    // Simulate network delay
    setTimeout(() => {
      // For demo purposes, if it starts with 'S' it's suspicious
      if (id.startsWith("S")) {
        setStatus("suspicious");
      } else {
        setStatus("success");
      }
    }, 2500);
  };

  const handleRescan = () => {
    setResult(null);
    setBatchId("");
    startScanning();
  };

  return (
    <main className="min-h-screen bg-[#020202] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: SCAN INTERFACE (8 COLS) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Terminal size={16} className="text-[#39FF14]" />
              <h1 className="text-4xl md:text-6xl font-bebas text-white uppercase tracking-[1px]">
                {terminalTitle || "NEURAL_SCAN_TERMINAL_V4"}
              </h1>
            </div>
            <p className="font-mono text-[10px] text-[#444] uppercase tracking-[3px]">
              CROSS_REFERENCING NEURAL_OBJECT_MODELS WITH GLOBAL_LEDGER_NODES
            </p>
          </div>

          <div className="relative">
            <ScanArea status={status}>
              {(status === "idle" || status === "scanning") && (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale brightness-125 contrast-125"
                />
              )}
              {status === "idle" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020202]/60 backdrop-blur-sm z-30">
                  <Button onClick={startScanning} className="h-16 px-12 text-lg">
                    INITIALIZE_SCANNER
                  </Button>
                  <p className="mt-4 font-mono text-[9px] text-[#444] uppercase tracking-[2px]">
                    PERMISSION_REQUIRED: CAMERA_ACCESS
                  </p>
                </div>
              )}
            </ScanArea>

            {/* FLOATING HUD OVERLAYS */}
            <div className="absolute -top-4 -right-4 bg-[#FF006E] px-3 py-1 text-[8px] font-mono text-[#020202] tracking-[2px] font-bold z-50">
              LIVE_DATA_STREAM
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <label className="font-mono text-[10px] text-[#444] uppercase tracking-[2px]">Manual Input Override</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="ENTER_BATCH_SERIAL_NUMBER..." 
                  value={batchId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBatchId(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button 
                  disabled={!batchId || status === "verifying"}
                  onClick={() => handleVerify(batchId)}
                  className="px-8"
                >
                  VERIFY
                </Button>
              </div>
            </div>

            <div className="p-6 border border-[#0E0E0E] bg-[#060606] flex flex-col gap-4">
               <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#444] uppercase mb-2">System Diagnostics</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-[#39FF14]" />
                    <div className="w-1 h-1 bg-[#39FF14]" />
                    <div className="w-1 h-1 bg-[#39FF14]" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-[#333]">BLOCKCHAIN_SYNC</span>
                    <span className="font-mono text-[10px] text-[#39FF14]">OPERATIONAL</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-[#333]">AI_NEURAL_MODEL</span>
                    <span className="font-mono text-[10px] text-[#39FF14]">STABLE_V4.2</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGS & INFO (4 COLS) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="border border-[#0E0E0E] bg-[#060606] p-8">
            <div className="flex items-center gap-2 mb-6">
              <History size={16} className="text-[#39FF14]" />
              <h3 className="font-bebas text-2xl text-white tracking-[1px] uppercase">LOCAL_SCAN_LOG</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {recentScans.map((scan, i) => (
                <div key={i} className="flex flex-col gap-1 py-3 border-b border-[#0E0E0E] last:border-0 group cursor-pointer hover:bg-[#020202] transition-colors -mx-2 px-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-white tracking-[1px]">{scan.name}</span>
                    <Badge variant={scan.status === "verified" ? "verified" : "suspicious"}>
                      {scan.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[8px] text-[#444]">
                    <span>ID: {scan.batch}</span>
                    <span>{scan.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" fullWidth className="mt-6 font-mono text-[9px] tracking-[2px]">
              VIEW_ALL_LOGS
            </Button>
          </div>

          <div className="border border-[#0E0E0E] p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-[#39FF14]" />
              <h3 className="font-bebas text-2xl text-white tracking-[1px] uppercase">SECURITY_PROTOCOL</h3>
            </div>
            <div className="space-y-4 font-mono text-[10px] text-[#444] uppercase leading-relaxed">
              <p>1. PLACE ORIGINAL PACKAGING WITHIN TARGETING BRACKETS.</p>
              <p>2. ENSURE OPTIMAL LIGHTING FOR NEURAL PRINT ANALYSIS.</p>
              <p>3. DO NOT MOVE DEVICE DURING BLOCKCHAIN HANDSHAKE.</p>
            </div>
            <div className="pt-4 border-t border-[#0E0E0E] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Cpu size={14} className="text-[#39FF14]" />
                <span className="font-mono text-[9px] text-white">AI_CO_PROCESSOR: ENABLED</span>
              </div>
              <div className="flex items-center gap-3">
                <Database size={14} className="text-[#39FF14]" />
                <span className="font-mono text-[9px] text-white">POLYGON_MAINNET: LINKED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FINAL VERDICT ACTION BUTTON (Only if success/suspicious) */}
      <AnimatePresence>
        {(status === "success" || status === "suspicious") && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-6"
          >
            <Button 
              fullWidth 
              size="lg" 
              className="h-20 text-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
              onClick={handleRescan}
              variant={status === "success" ? "primary" : "danger"}
            >
              ACKNOWLEDGE & CONTINUE_
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
