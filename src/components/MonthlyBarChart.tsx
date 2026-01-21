"use client";

import { useState } from "react";

interface MonthlyBarChartProps {
    data: {
        month: string;
        partnerA: number;
        partnerB: number;
    }[];
    partnerNames?: [string, string];
    colors?: [string, string];
}

export default function MonthlyBarChart({
    data,
    partnerNames = ["Partner A", "Partner B"],
    colors = ["#7ca29d", "#fbbf24"]
}: MonthlyBarChartProps) {
    const defaultMonth = data.length > 0 ? data[data.length - 1].month : "";
    const [activeMonth, setActiveMonth] = useState(defaultMonth);

    // Find max value for scaling
    const maxValue = Math.max(
        ...data.map(item => Math.max(item.partnerA, item.partnerB)),
        1 // prevent division by zero
    );

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold serif-vibe">Pertumbuhan Bulanan</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[0] }}></span>
                        <span className="text-xs font-bold text-slate-400 capitalize">{partnerNames[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[1] }}></span>
                        <span className="text-xs font-bold text-slate-400 capitalize">{partnerNames[1]}</span>
                    </div>
                </div>
            </div>
            <div className="relative flex-1 flex items-end justify-between gap-4 mt-4">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-slate-50 w-full h-0"></div>
                    <div className="border-b border-slate-50 w-full h-0"></div>
                    <div className="border-b border-slate-50 w-full h-0"></div>
                    <div className="border-b border-slate-50 w-full h-0"></div>
                </div>
                {data.slice(-6).map((item) => (
                    <div
                        key={item.month}
                        className="flex-1 flex flex-col justify-end items-center gap-1 group cursor-pointer"
                        onClick={() => setActiveMonth(item.month)}
                    >
                        <div className="w-full max-w-[40px] flex flex-col-reverse rounded-t-lg overflow-hidden h-full gap-0.5">
                            <div
                                className="rounded-t-sm transition-all duration-700 delay-100"
                                style={{
                                    height: `${(item.partnerA / maxValue) * 100}%`,
                                    backgroundColor: colors[0],
                                    minHeight: item.partnerA > 0 ? '4px' : '0'
                                }}
                            ></div>
                            <div
                                className="rounded-t-sm transition-all duration-700"
                                style={{
                                    height: `${(item.partnerB / maxValue) * 100}%`,
                                    backgroundColor: colors[1],
                                    minHeight: item.partnerB > 0 ? '4px' : '0'
                                }}
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
