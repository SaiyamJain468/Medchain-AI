"use client";

import { useEffect, useState } from "react";
import { 
  Building2, 
  MapPin, 
  Star, 
  Search, 
  Pill, 
  ShoppingCart,
  Lock,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge, Tag } from "@/components/ui/Badge";
import { Footer } from "@/components/layout/Footer";

interface MedicineListing {
  _id: string;
  drugName: string;
  manufacturer: string;
  price: number;
  stock: number;
  isBlockchainVerified: boolean;
}

interface Pharmacy {
  _id: string;
  name: string;
  location: string;
  city: string;
  isBlockchainVerified: boolean;
  rating: number;
  listings: MedicineListing[];
}

export default function MarketplacePage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for initial overhaul visual
    setTimeout(() => {
      setPharmacies([
        {
          _id: "1",
          name: "Apollo Nexus Node-7",
          location: "HSR Layout, Bangalore",
          city: "Bangalore",
          isBlockchainVerified: true,
          rating: 4.8,
          listings: [
            { _id: "m1", drugName: "Amoxicillin X-9", manufacturer: "Pfizer", price: 12.50, stock: 45, isBlockchainVerified: true },
            { _id: "m2", drugName: "Lipitor Max", manufacturer: "Pfizer", price: 45.00, stock: 12, isBlockchainVerified: true },
          ]
        },
        {
          _id: "2",
          name: "MedPlus Secure Terminal",
          location: "Andheri West, Mumbai",
          city: "Mumbai",
          isBlockchainVerified: true,
          rating: 4.5,
          listings: [
            { _id: "m3", drugName: "Paracetamol Ultra", manufacturer: "GSK", price: 5.20, stock: 120, isBlockchainVerified: true },
          ]
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-24 px-6">

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <Tag>BLOCKCHAIN NETWORK</Tag>
            <h1 className="text-5xl md:text-7xl font-mono font-bold text-white leading-tight uppercase tracking-tighter">
              MEDICINE <br />
              MARKETPLACE<span className="animate-pulse">_</span>
            </h1>
          </div>
          <p className="text-[#555555] max-w-sm font-mono text-xs leading-relaxed uppercase tracking-tighter">
            Access life-saving medication exclusively from blockchain-vetted 
            pharmaceutical partners and retail nodes. Zero compromise.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="relative">
            <Input 
              placeholder="SEARCH NODE OR MEDICINE..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444]" size={14} />
          </div>
          <div className="relative">
            <select
              className="w-full bg-[#111111] border border-[rgba(57,255,20,0.12)] text-[#555555] px-4 py-4 font-mono text-xs uppercase tracking-widest outline-none focus:border-[#39FF14] transition-colors appearance-none"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">GLOBAL ALL NODES</option>
              <option value="Bangalore">BANGALORE CENTER</option>
              <option value="Mumbai">MUMBAI TERMINAL</option>
              <option value="Delhi">DELHI HUB</option>
            </select>
            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-[#39FF14]" size={16} />
          </div>
          <Button variant="secondary" fullWidth className="h-full">
            REFRESH ENGINE <RefreshCw className="ml-2" size={14} />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence>
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="toxic-card h-[400px] animate-pulse bg-white/5" />
              ))
            ) : (
              pharmacies.map((pharmacy) => (
                <motion.div
                  key={pharmacy._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col"
                >
                  <Card className="flex flex-col h-full">
                    {/* Pharmacy Header */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                           <Badge variant="verified">NODE_SECURE</Badge>
                           <div className="flex items-center gap-1 text-[#39FF14]">
                             <Star size={10} fill="currentColor" />
                             <span className="text-[10px] font-mono font-bold">{pharmacy.rating}</span>
                           </div>
                        </div>
                        <h3 className="text-3xl font-mono font-bold text-white uppercase tracking-tighter">
                          {pharmacy.name}
                        </h3>
                        <p className="text-[#555555] text-[10px] font-mono flex items-center gap-1 uppercase">
                          <MapPin size={10} /> {pharmacy.location}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#39FF14] transition-colors">
                        <Building2 className="text-[#39FF14]" size={20} />
                      </div>
                    </div>

                    {/* Inventory Preview */}
                    <div className="flex flex-col gap-4 mb-8">
                       <h4 className="text-[8px] text-[#555555] font-mono tracking-[0.3em] uppercase border-b border-white/5 pb-2">
                         Live Inventory Ledger
                       </h4>
                       <div className="space-y-3">
                         {pharmacy.listings.map((listing) => (
                           <div key={listing._id} className="flex items-center justify-between p-3 bg-white/2 border border-white/5 hover:border-[#39FF14]/30 transition-colors group/item">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                                 <Pill size={14} className="text-[#555555] group-hover/item:text-[#39FF14]" />
                               </div>
                               <div className="flex flex-col">
                                 <span className="text-xs font-mono font-bold text-white">{listing.drugName}</span>
                                 <span className="text-[8px] text-[#555555] font-mono uppercase">{listing.manufacturer}</span>
                               </div>
                             </div>
                             <div className="flex flex-col items-end">
                               <span className="text-sm font-mono font-bold text-[#39FF14]">₹{(listing.price * 83).toFixed(0)}</span>
                               <span className="text-[8px] text-[#39FF14]/50 font-mono uppercase">{listing.stock} IN STOCK</span>
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>

                    <div className="mt-auto flex gap-4">
                      <Button fullWidth className="group">
                        ORDER NOW <ShoppingCart className="ml-2 w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                      </Button>
                      <Button variant="secondary" className="px-6">
                        <Lock size={16} />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Load More GLITCH Button */}
        <div className="flex justify-center mt-12">
           <button className="relative px-8 py-4 bg-transparent border border-[#39FF14] text-[#39FF14] font-mono text-xs uppercase tracking-[0.4em] group overflow-hidden">
             <span className="relative z-10">LOAD MORE NODES // 012</span>
             <div className="absolute inset-0 bg-[#39FF14] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
             <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:text-black transition-opacity duration-300 z-20">
               LOAD_NP4_FETCHING...
             </span>
           </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
