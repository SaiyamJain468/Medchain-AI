"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Plus,
    Package,
    ShieldCheck,
    Trash2,
    Building,
    ArrowLeft,
    DollarSign
} from "lucide-react";

interface MedicineListing {
    _id: string;
    drugName: string;
    manufacturer: string;
    price: number;
    stock: number;
    isBlockchainVerified: boolean;
}

// In a real hackathon, we fetch the logged in pharmacy ID via auth session
// Defaulting to a dummy object ID for demo purposes
const MOCK_PHARMACY_ID = "60c72b2f9b1e8a001c8e4b5a";

export default function PharmacyDashboard() {
    const [listings, setListings] = useState<MedicineListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // New Listing Form State
    const [formData, setFormData] = useState({
        drugName: "",
        manufacturer: "",
        price: "",
        stock: "",
        isBlockchainVerified: false
    });

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            // In reality, this endpoint reads the pharmacyId from the session JWT
            const res = await fetch(`/api/dashboard/medicines?pharmacyId=${MOCK_PHARMACY_ID}`);
            const data = await res.json();
            if (data.success) {
                setListings(data.listings);
            }
        } catch (err) {
            console.error("Failed to fetch listings", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddListing = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                pharmacyId: MOCK_PHARMACY_ID,
                ...formData
            };

            const res = await fetch("/api/dashboard/medicines", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.success) {
                setListings([data.listing, ...listings]);
                setFormData({ drugName: "", manufacturer: "", price: "", stock: "", isBlockchainVerified: false });
            } else {
                alert("Failed to add listing: " + data.message);
            }
        } catch (err) {
            console.error("Error adding listing", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">

            {/* Top Navigation */}
            <nav className="h-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 z-50 sticky top-0">
                <div className="flex items-center gap-4">
                    <Link href="/marketplace" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition text-slate-300">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-medcyan-500/20 text-medcyan-400 rounded-xl flex items-center justify-center border border-medcyan-500/30">
                            <Building className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">Partner Dashboard</h1>
                            <p className="text-xs text-medcyan-400 font-medium">Apollo Pharmacy (Demo)</p>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">

                {/* Left Column - Add New Medicine Form */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-28">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-medcyan-400" /> List New Medicine
                        </h2>

                        <form onSubmit={handleAddListing} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Drug Name</label>
                                <input
                                    required type="text"
                                    value={formData.drugName}
                                    onChange={e => setFormData({ ...formData, drugName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-medcyan-500 outline-none text-white transition"
                                    placeholder="e.g. Paracetamol 500mg"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Manufacturer</label>
                                <input
                                    required type="text"
                                    value={formData.manufacturer}
                                    onChange={e => setFormData({ ...formData, manufacturer: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-medcyan-500 outline-none text-white transition"
                                    placeholder="e.g. Pfizer Inc."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price ($)</label>
                                    <input
                                        required type="number" step="0.01" min="0"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-medcyan-500 outline-none text-white transition"
                                        placeholder="25.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stock Qty</label>
                                    <input
                                        required type="number" min="0"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-medcyan-500 outline-none text-white transition"
                                        placeholder="150"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-center gap-3 p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-xl cursor-pointer hover:bg-emerald-500/10 transition">
                                    <input
                                        type="checkbox"
                                        checked={formData.isBlockchainVerified}
                                        onChange={e => setFormData({ ...formData, isBlockchainVerified: e.target.checked })}
                                        className="w-5 h-5 accent-emerald-500"
                                    />
                                    <div>
                                        <span className="block font-bold text-emerald-400 text-sm">Blockchain Verified Batch</span>
                                        <span className="text-xs text-slate-400 mt-0.5 block">Item origin is registered on the ledger</span>
                                    </div>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 mt-4 bg-medcyan-500 hover:bg-medcyan-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? "Processing..." : <><Plus className="w-5 h-5" /> Add to Inventory</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column - Inventory List */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Package className="w-5 h-5 text-slate-400" /> Current Inventory
                        </h2>
                        <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-medium text-slate-300">
                            Total Items: {listings.length}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="p-12 text-center text-slate-500">
                            <div className="w-8 h-8 border-2 border-medcyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            Loading inventory...
                        </div>
                    ) : listings.length === 0 ? (
                        <div className="p-16 text-center bg-slate-900 border border-slate-800 border-dashed rounded-2xl">
                            <Package className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                            <h3 className="text-lg font-bold text-slate-300">Your Inventory is empty</h3>
                            <p className="text-slate-500 mt-2">Use the form to list your first medicine.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {listings.map((listing) => (
                                <div key={listing._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col sm:flex-row justify-between sm:items-center gap-4">

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-lg text-white">{listing.drugName}</h3>
                                            {listing.isBlockchainVerified && (
                                                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider rounded flex items-center gap-1">
                                                    <ShieldCheck className="w-3 h-3" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500">{listing.manufacturer}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Price</p>
                                            <p className="font-bold text-medcyan-400 flex items-center justify-end"><DollarSign className="w-4 h-4" />{listing.price.toFixed(2)}</p>
                                        </div>

                                        <div className="text-right w-20">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Stock</p>
                                            <p className={`font-bold ${listing.stock > 10 ? 'text-white' : 'text-orange-400'} flex items-center justify-end`}>
                                                {listing.stock} <span className="text-xs ml-1 font-normal text-slate-500 text-left">units</span>
                                            </p>
                                        </div>

                                        <button className="p-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-xl transition">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
