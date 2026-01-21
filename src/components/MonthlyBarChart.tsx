"use client";

import { useState } from "react";

interface MonthlyBarChartProps {
    data: {
        month: string;
        partnerA: number;
        partnerB: number;
    }[];
}

export default function MonthlyBarChart({ data }: MonthlyBarChartProps) {
    const [activeMonth, setActiveMonth] = useState("Jun");

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold serif-vibe">Pertumbuhan Bulanan</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#7ca29d]"></span>
                        <span className="text-xs font-bold text-slate-400">Dinda</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                        <span className="text-xs font-bold text-slate-400">Raka</span>
                    </div>
                </div>
            </div>
            <div className="relative h-64 flex items-end justify-between gap-4">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-slate-50 w-full h-0"></div>
                    <div className="border-b border-slate-50 w-full h-0"></div>
                    <div className="border-b border-slate-50 w-full h-0"></div>
                    <div className="border-b border-slate-50 w-full h-0"></div>
                </div>
                {data.map((item) => (
                    <div
                        key={item.month}
                        className="flex-1 flex flex-col justify-end items-center gap-1 group cursor-pointer"
                        onClick={() => setActiveMonth(item.month)}
                    >
                        <div className="w-full max-w-[40px] flex flex-col-reverse rounded-t-lg overflow-hidden h-full">
                            <div
                                className="bg-[#7ca29d] rounded-t-sm transition-all duration-500"
                                style={{ height: `${item.partnerA}%` }}
                            ></div>
                            <div
                                className="bg-amber-400 rounded-t-sm transition-all duration-500"
                                style={{ height: `${item.partnerB}%` }}
                            ></div>
                        </div>
                        <span
                            className={`text-[10px] font-bold mt-2 uppercase ${activeMonth === item.month
                                    ? "text-[#7ca29d] font-extrabold"
                                    : "text-slate-400"
                                }`}
                        >
                            {item.month}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
