"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ChevronRight, 
  Mail, 
  User,
  Eye, 
  EyeOff, 
  AlertTriangle,
  UserCircle,
  Briefcase,
  Settings,
  Terminal
} from "lucide-react";

const ROLES = [
  { id: "patient",    label: "PATIENT",     desc: "Medical recipient / consumer", icon: UserCircle },
  { id: "pharmacist", label: "PHARMACIST",  desc: "Verified retail dispenser",    icon: Briefcase },
  { id: "admin",      label: "ADMIN",       desc: "System management operator",   icon: Settings },
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "patient" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/auth/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "REGISTRATION_FAILED");
        setIsLoading(false);
      }
    } catch {
      setError("NETWORK_ERROR: UNABLE_TO_REACH_AUTH_NODE");
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen bg-[#020202] text-[#F2F2F2] flex overflow-hidden font-mono relative">
      {/* LEFT SIDE - VISUAL HUD */}
      <div className="hidden lg:flex flex-col w-[420px] shrink-0 relative bg-[#040404] border-r border-[#0E0E0E] p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#39FF14 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 flex flex-col h-full">
          <Link href="/" className="flex items-center gap-3 mb-16 group">
            <div className="w-10 h-10 bg-[#060606] border border-[#0E0E0E] flex items-center justify-center group-hover:border-[#39FF14] transition-colors">
              <ShieldCheck className="w-5 h-5 text-[#39FF14]" />
            </div>
            <span className="font-bebas text-3xl text-white tracking-[2px]">
              MEDCHAIN_<span className="text-[#39FF14]">AI</span>
            </span>
          </Link>

          <div className="flex-1 flex flex-col justify-center gap-8">
            <div className="space-y-2">
              <span className="text-[9px] text-[#39FF14] tracking-[3px] font-bold">{`// NEW_IDENTITY_REQUEST`}</span>
              <h2 className="text-5xl font-bebas text-white leading-none">
                REGISTER_<span className="text-[#39FF14]">NODE</span>
              </h2>
            </div>

            <p className="text-xs text-[#444] leading-relaxed tracking-[1px]">
              ESTABLISHING_SECURE_IDENTITY...<br />
              ALLOCATING_CLEARANCE_LEVEL...<br />
              BINDING_TO_BLOCKCHAIN_LEDGER...<br />
              IDENTITY_STATUS: <span className="text-[#39FF14]">PENDING</span>
            </p>

            <div className="p-4 bg-[#060606] border border-[#0E0E0E]">
              <p className="text-[9px] text-[#333] leading-relaxed font-mono">
                Each identity is permanently recorded on the Polygon blockchain ledger. Your clearance level determines what data you can access.
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 text-[9px] text-[#333]">
              <Terminal size={10} />
              <span>PROTOCOL_NODE_V4.2 // IDENTITY_SERVICES</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-48 h-48 border border-[#39FF14]/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-12 right-12 w-32 h-32 border border-[#FF006E]/5 rounded-full pointer-events-none" />
      </div>

      {/* RIGHT SIDE - REGISTER FORM */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8 bg-[#020202]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md flex flex-col gap-8"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-bebas text-4xl text-white tracking-[1px]">CREATE_IDENTITY</h3>
            <span className="text-[9px] text-[#444] tracking-[2px]">SELECT CLEARANCE LEVEL AND FILL CREDENTIALS.</span>
          </div>

          {/* ROLE SELECTION */}
          <div className="flex flex-col gap-3">
            <label className="text-[9px] text-[#444] font-bold tracking-[2px]">_CLEARANCE_LEVEL</label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map(({ id, label, desc, icon: Icon }) => {
                const active = formData.role === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: id })}
                    className={`p-3 flex flex-col gap-2 border text-left transition-all ${
                      active
                        ? "border-[#39FF14] bg-[#0D2B05]"
                        : "border-[#0E0E0E] bg-[#060606] hover:border-[#333]"
                    }`}
                  >
                    <Icon size={16} className={active ? "text-[#39FF14]" : "text-[#333]"} />
                    <span className={`text-[9px] font-bold tracking-[1px] ${active ? "text-[#39FF14]" : "text-[#444]"}`}>{label}</span>
                    <span className="text-[8px] text-[#333] leading-tight">{desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] text-[#444] font-bold tracking-[2px]">_FULL_NAME</label>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#060606] border border-[#0E0E0E] p-4 text-xs text-white focus:outline-none focus:border-[#39FF14] transition-colors font-mono"
                  placeholder="JOHN_DOE"
                  required
                />
                <User className="absolute right-4 top-4 text-[#1A1A1A]" size={14} />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] text-[#444] font-bold tracking-[2px]">_USER_EMAIL</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#060606] border border-[#0E0E0E] p-4 text-xs text-white focus:outline-none focus:border-[#39FF14] transition-colors font-mono"
                  placeholder="username@medchain.o1"
                  required
                />
                <Mail className="absolute right-4 top-4 text-[#1A1A1A]" size={14} />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] text-[#444] font-bold tracking-[2px]">_ACCESS_KEY</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
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

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full py-5 bg-[#39FF14] hover:bg-[#32E612] text-[#020202] font-bebas text-xl tracking-[2px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "REGISTERING_IDENTITY..." : "INITIALIZE_IDENTITY"}
              {!isLoading && <ChevronRight size={18} />}
            </button>
          </form>

          <div className="flex flex-col items-center gap-2 text-[10px] text-[#333]">
            <p>EXISTING_ENTITY? <Link href="/auth/login" className="text-[#39FF14] hover:underline underline-offset-4">AUTHENTICATE_HERE</Link></p>
            <div className="flex items-center gap-2 mt-2 opacity-50">
              <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse" />
              <span className="tracking-[2px]">ENCRYPTED_CHANNEL</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.02] bg-[url('/noise.png')] mix-blend-overlay" />
    </main>
  );
}
