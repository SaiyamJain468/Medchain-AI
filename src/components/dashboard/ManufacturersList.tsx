"use client";

import React from 'react';

const manufacturers = [
    { id: 'NODE-PZ', name: 'PFIZER_GLOBAL', joinedDate: '2024-01-15', totalBatches: 12450, status: 'VERIFIED' },
    { id: 'NODE-MS', name: 'MODERNA_SECURE', joinedDate: '2024-02-20', totalBatches: 8300, status: 'VERIFIED' },
    { id: 'NODE-NM', name: 'NOVAMED_LABS', joinedDate: '2026-03-01', totalBatches: 15, status: 'PENDING' },
    { id: 'NODE-ZC', name: 'ZYDUS_CADILA', joinedDate: '2025-11-10', totalBatches: 3200, status: 'VERIFIED' },
];

export function ManufacturersList() {
    return (
        <div className="flex flex-col gap-1">
            {manufacturers.map((mfg) => (
                <div key={mfg.id} className="p-4 bg-[#030303] border-b border-[#0E0E0E] hover:bg-[#060606] transition-all group flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#060606] border border-[#0E0E0E] flex items-center justify-center group-hover:border-[#39FF14] transition-colors overflow-hidden">
                             <div className="w-full h-full flex items-center justify-center font-bebas text-lg text-[#333] group-hover:text-[#39FF14]">
                                {mfg.name.charAt(0)}
                             </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-mono font-bold text-white uppercase tracking-[1px]">{mfg.name}</span>
                            <span className="text-[8px] text-[#333] font-mono tracking-[1px]">{mfg.id} // BATCHES: {mfg.totalBatches.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className={`text-[8px] font-mono px-2 py-0.5 border ${
                            mfg.status === 'VERIFIED' 
                            ? 'border-[#39FF14] text-[#39FF14]' 
                            : 'border-[#444] text-[#444]'
                        }`}>
                            {mfg.status}
                        </span>
                        <span className="text-[9px] font-mono text-[#333]">{mfg.joinedDate}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
