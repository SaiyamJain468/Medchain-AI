"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ChevronRight, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  Activity,
  ExternalLink
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState("PATIENT");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("AUTHENTICATION_FAILED: INVALID_CREDENTIALS");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("SYSTEM_ERROR: UNABLE_TO_CONNECT_TO_AUTH_NODE");
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen bg-[#020202] text-[#F2F2F2] flex overflow-hidden font-mono relative">
      {/* LEFT SIDE - VISUAL HUD */}
      <div className="hidden lg:flex flex-1 relative bg-[#040404] border-r border-[#0E0E0E] flex-col p-12 overflow-hidden">
        {/* MEDICAL GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#39FF14 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative z-10 flex flex-col h-full">
            <Link href="/" className="flex items-center gap-3 mb-24 group">
                <div className="w-10 h-10 bg-[#060606] border border-[#0E0E0E] flex items-center justify-center group-hover:border-[#39FF14] transition-colors">
                    <ShieldCheck className="w-5 h-5 text-[#39FF14]" />
                </div>
                <span className="font-bebas text-3xl text-white tracking-[2px]">
                    MEDCHAIN_<span className="text-[#39FF14]">AI</span>
                </span>
            </Link>

            <div className="flex-1 flex flex-col justify-center">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="max-w-md space-y-8"
                >
                    <div className="space-y-2">
                        <Tag className="bg-[#0D2B05] text-[#39FF14] border-none text-[10px] uppercase">Security_Protocol_v4.2</Tag>
                        <h2 className="text-6xl font-bebas text-white leading-none">
                            ACCESSING_<span className="text-[#39FF14]">PORTAL</span>
                        </h2>
                    </div>
                    
                    <p className="text-xs text-[#444] leading-relaxed tracking-[1px] font-mono">
                        INITIALIZING_SECURE_HANDSHAKE... <br />
                        ENCRYPTING_PAYLOAD_SHA256... <br />
                        VERIFYING_BLOCKCHAIN_SYNC_O1... <br />
                        SYSTEM_STATUS: <span className="text-[#39FF14]">SECURE</span>
                    </p>

                    <div className="flex gap-4">
                        <div className="p-4 bg-[#060606] border border-[#0E0E0E] flex-1">
                            <span className="text-[8px] text-[#333] mb-1 block">NODE_LOAD</span>
                            <div className="h-1 bg-[#0E0E0E] w-full">
                                <div className="h-full bg-[#39FF14] w-[42%]" />
                            </div>
                        </div>
                        <div className="p-4 bg-[#060606] border border-[#0E0E0E] flex-1">
                            <span className="text-[8px] text-[#333] mb-1 block">ACTIVE_THREADS</span>
                            <span className="text-sm font-bold text-white uppercase">1,402</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="mt-auto flex items-center gap-4 text-[9px] text-[#333]">
                <span className="flex items-center gap-1"><Activity size={10} /> LIVE_FEED</span>
                <span>{`// 2024_NODE_NETWORK`}</span>
                <span className="ml-auto flex items-center gap-1"><ExternalLink size={10} /> PROTOCOL_DOCS</span>
            </div>
        </div>

        {/* FLOATING HUD ELEMENTS */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 w-64 h-64 border border-[#39FF14]/5 rounded-full animate-spin-slow pointer-events-none" />
        <div className="absolute top-1/2 right-12 -translate-y-1/2 w-48 h-48 border border-[#FF006E]/5 rounded-full animate-reverse-spin pointer-events-none" />
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#020202]">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm flex flex-col gap-10"
        >
            <div className="flex flex-col gap-2">
                <h3 className="font-bebas text-4xl text-white tracking-[1px]">IDENTITY_VERIFY</h3>
                <span className="text-[9px] text-[#444] tracking-[2px] uppercase">Please terminate active sessions before login.</span>
            </div>

            {/* ROLE TABS */}
            <div className="flex border-b border-[#0E0E0E]">
                {["PATIENT", "PHARMACIST", "ADMIN"].map((role) => (
                    <button
                        key={role}
                        onClick={() => setActiveRole(role)}
                        className={`flex-1 py-3 text-[10px] font-bold tracking-[2px] transition-all relative ${
                            activeRole === role ? "text-[#39FF14]" : "text-[#333] hover:text-[#444]"
                        }`}
                    >
                        {role}
                        {activeRole === role && (
                            <motion.div layoutId="auth-tab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#39FF14]" />
                        )}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-[#1F0010] border border-[#FF006E] p-4 flex items-center gap-3 text-[#FF006E] text-[10px] font-bold"
                        >
                            <AlertTriangle size={14} />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col gap-2">
                    <label className="text-[9px] text-[#444] font-bold tracking-[2px]">_USER_EMAIL</label>
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#060606] border border-[#0E0E0E] p-4 text-xs text-white focus:outline-none focus:border-[#39FF14] transition-colors font-mono"
                            placeholder="username@medchain.o1"
                            required
                        />
                        <Mail className="absolute right-4 top-4 text-[#1A1A1A]" size={14} />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-[9px] text-[#444] font-bold tracking-[2px]">_ACCESS_KEY</label>
                        <span className="text-[9px] text-[#333] hover:text-[#39FF14] cursor-pointer transition-colors underline underline-offset-4">FORGOT?</span>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#060606] border border-[#0E0E0E] p-4 text-xs text-white focus:outline-none focus:border-[#39FF14] transition-colors font-mono"
                            placeholder="••••••••••••"
                            required
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-[#1A1A1A] hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className="accent-[#39FF14] bg-[#060606] border-[#0E0E0E]" id="remember" />
                    <label htmlFor="remember" className="text-[9px] text-[#333] cursor-pointer">PERSIST_IDENTITY_NODE</label>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="mt-4 w-full py-5 bg-[#39FF14] hover:bg-[#32E612] text-[#020202] font-bebas text-xl tracking-[2px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                    {isLoading ? "INITIATING_SEQUENCE..." : "VALIDATE_IDENTIFIER"}
                    {!isLoading && <ChevronRight size={18} />}
                </button>
            </form>

            <div className="flex flex-col items-center gap-4 text-[10px] text-[#333]">
                <p>UNREGISTERED_ENTITY? <Link href="/auth/register" className="text-[#39FF14] hover:underline underline-offset-4">CREATE_ID</Link></p>
                <div className="flex items-center gap-2 mt-4 opacity-50">
                    <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse" />
                    <span className="tracking-[2px]">ENCRYPTED_ENDPOINT</span>
                </div>
            </div>
        </motion.div>
      </div>

      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.02] bg-[url('/noise.png')] mix-blend-overlay" />
    </main>
  );
}

const Tag = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`px-2 py-0.5 font-mono font-bold ${className}`}>
        {children}
    </span>
);
