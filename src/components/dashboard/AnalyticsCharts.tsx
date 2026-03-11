"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });

const scanData = [
    { time: '00:00', scans: 120 },
    { time: '04:00', scans: 80 },
    { time: '08:00', scans: 450 },
    { time: '12:00', scans: 800 },
    { time: '16:00', scans: 650 },
    { time: '20:00', scans: 300 },
    { time: '23:59', scans: 150 },
];

const ratioData = [
    { name: 'AUTHENTIC', value: 85, color: '#39FF14' },
    { name: 'SUSPICIOUS', value: 15, color: '#FF006E' },
];

export function AnalyticsCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full h-full">
            {/* Line Chart */}
            <div className="lg:col-span-8 flex flex-col h-full min-h-[350px]">
                <div className="mb-6 flex items-center justify-between border-b border-[#0E0E0E] pb-2">
                    <h3 className="text-[10px] font-mono font-bold text-[#444] uppercase tracking-[2px]">THROUGHPUT_MATRIX / LIVE</h3>
                    <span className="text-[9px] font-mono text-[#39FF14] tracking-[1px]">NODES: 14_STABLE</span>
                </div>
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={scanData}>
                            <CartesianGrid vertical={false} stroke="#0E0E0E" />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#333', fontSize: 9, fontFamily: 'Share Tech Mono' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#333', fontSize: 9, fontFamily: 'Share Tech Mono' }}
                            />
                            <Tooltip
                                contentStyle={{ 
                                    backgroundColor: '#060606', 
                                    border: '1px solid #39FF14',
                                    borderRadius: '0px',
                                    fontFamily: 'Share Tech Mono',
                                    fontSize: '10px'
                                }}
                                itemStyle={{ color: '#39FF14', textTransform: 'uppercase' }}
                                cursor={{ stroke: '#39FF14', strokeWidth: 1 }}
                            />
                            <Line
                                type="stepAfter"
                                dataKey="scans"
                                stroke="#39FF14"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, fill: '#39FF14', strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Chart / Confidence */}
            <div className="lg:col-span-4 flex flex-col h-full min-h-[350px]">
                <div className="mb-6 flex items-center justify-between border-b border-[#0E0E0E] pb-2">
                    <h3 className="text-[10px] font-mono font-bold text-[#444] uppercase tracking-[2px]">VERDICT_RATIO</h3>
                    <span className="text-[9px] font-mono text-[#FF006E] tracking-[1px]">DETECTION_ACTIVE</span>
                </div>
                <div className="flex-1 relative flex items-center justify-center">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="font-bebas text-4xl text-white">100%</span>
                        <span className="font-mono text-[8px] text-[#333]">V_CONFIDENCE</span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={ratioData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={85}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="#020202"
                                strokeWidth={2}
                            >
                                {ratioData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-8 space-y-2">
                    {ratioData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-[#0E0E0E] pb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2" style={{ backgroundColor: item.color }} />
                                <span className="font-mono text-[10px] text-[#F2F2F2] uppercase">{item.name}</span>
                            </div>
                            <span className="font-mono text-[10px] text-white font-bold">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
