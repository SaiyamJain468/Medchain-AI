"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

const recentReports = [
    { id: 'TX-482a', drugName: 'AMOXICILLIN_500MG', batchId: 'AX-9021', location: 'APOLLO_NODE_7_BGL', time: '2M_AGO', severity: 'HIGH', status: 'INVESTIGATING' },
    { id: 'TX-991c', drugName: 'LISINOPRIL_10MG', batchId: 'LP-4432', location: 'MEDPLUS_TERM_MUM', time: '1H_AGO', severity: 'CRITICAL', status: 'CONFIRMED' },
    { id: 'TX-102b', drugName: 'METFORMIN_1000MG', batchId: 'MF-1022', location: 'GLOBAL_HUB_DEL', time: '5H_AGO', severity: 'LOW', status: 'RESOLVED' },
    { id: 'TX-881x', drugName: 'ATORVASTATIN_20MG', batchId: 'AT-8812', location: 'WELLNESS_BGL', time: '12H_AGO', severity: 'MED', status: 'INVESTIGATING' },
    { id: 'TX-442f', drugName: 'PARACETAMOL_500MG', batchId: 'PC-2024', location: 'PHARMA_NODE_4_KOL', time: '1D_AGO', severity: 'HIGH', status: 'INVESTIGATING' },
];

export function RecentReportsTable() {
    return (
        <div className="w-full overflow-x-auto border border-[#0E0E0E] bg-[#030303]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-[#060606] border-b border-[#0E0E0E]">
                        <th className="p-3 text-[9px] font-mono text-[#333] uppercase tracking-[2px]">#_ID</th>
                        <th className="p-3 text-[9px] font-mono text-[#333] uppercase tracking-[2px]">DRUG_NOMENCLATURE</th>
                        <th className="p-3 text-[9px] font-mono text-[#333] uppercase tracking-[2px]">ORIGIN_NODE</th>
                        <th className="p-3 text-[9px] font-mono text-[#333] uppercase tracking-[2px]">SEVERITY</th>
                        <th className="p-3 text-[9px] font-mono text-[#333] uppercase tracking-[2px]">STATUS</th>
                        <th className="p-3 text-[9px] font-mono text-[#333] uppercase tracking-[2px]">TIME</th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#0E0E0E]">
                    {recentReports.map((report) => (
                        <tr key={report.id} className="hover:bg-[#060606] transition-colors group">
                            <td className="p-3 text-[10px] font-mono text-[#39FF14]">{report.id}</td>
                            <td className="p-3">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-mono font-bold text-white uppercase">{report.drugName}</span>
                                    <span className="text-[8px] text-[#333] font-mono">BATCH_{report.batchId}</span>
                                </div>
                            </td>
                            <td className="p-3 text-[10px] font-mono text-[#444] uppercase">{report.location}</td>
                            <td className="p-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 ${
                                        report.severity === 'CRITICAL' || report.severity === 'HIGH' 
                                        ? 'bg-[#FF006E]' 
                                        : report.severity === 'MED' ? 'bg-orange-500' : 'bg-[#333]'
                                    }`} />
                                    <span className={`text-[10px] font-mono ${
                                        report.severity === 'CRITICAL' || report.severity === 'HIGH' 
                                        ? 'text-[#FF006E]' 
                                        : report.severity === 'MED' ? 'text-orange-500' : 'text-[#333]'
                                    }`}>
                                        {report.severity}
                                    </span>
                                </div>
                            </td>
                            <td className="p-3">
                                <span className={`text-[9px] font-mono border px-2 py-0.5 ${
                                    report.status === 'CONFIRMED' 
                                    ? 'bg-[#FF006E] text-[#020202] border-[#FF006E]' 
                                    : report.status === 'RESOLVED'
                                    ? 'border-[#39FF14] text-[#39FF14]'
                                    : 'border-orange-500 text-orange-500'
                                }`}>
                                    {report.status}
                                </span>
                            </td>
                            <td className="p-3 text-[10px] font-mono text-[#333]">{report.time}</td>
                            <td className="p-3 text-right">
                                <ArrowRight size={12} className="text-[#333] group-hover:text-[#39FF14] transition-colors inline cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
